#!/bin/bash

# WhatsApp Agent - Update Script
# Version: 1.0.0
# Author: Maul Jasmay
# Description: Update WhatsApp Agent from GitHub

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_DIR="/var/www/whatsapp-agent"
REPO_URL="https://github.com/mauljasmay/whatsappwablasrepack.git"
BACKUP_DIR="/var/backups/whatsapp-agent"
TEMP_DIR="/tmp/whatsapp-agent-update"

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_message "Please run as root (use sudo)" "${RED}"
        exit 1
    fi
}

# Check for updates
check_updates() {
    print_message "Checking for updates..." "${YELLOW}"

    cd "$PROJECT_DIR"

    # Fetch latest changes
    git fetch origin

    # Get current and remote versions
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})
    BASE=$(git merge-base @ @{u})

    if [[ $LOCAL == $REMOTE ]]; then
        print_message "✓ Already up to date" "${GREEN}"
        return 1
    else
        print_message "✓ Updates available!" "${GREEN}"
        echo ""
        print_message "Changes to be applied:" "${BLUE}"
        git log $BASE..REMOTE --oneline | head -10
        return 0
    fi
}

# Create backup
create_backup() {
    print_message "Creating backup..." "${YELLOW}"

    # Create backup directory
    mkdir -p "$BACKUP_DIR"

    # Backup current version
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"

    # Keep only last 5 backups
    cd "$BACKUP_DIR"
    ls -t | tail -n +6 | xargs -r rm -rf

    print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"
}

# Install updates
install_updates() {
    print_message "Installing updates..." "${YELLOW}"

    cd "$PROJECT_DIR"

    # Pull latest changes
    git pull origin main

    # Update dependencies
    print_message "Updating dependencies..." "${YELLOW}"
    bun install

    # Build project
    print_message "Building project..." "${YELLOW}"
    bun run build

    # Update database
    print_message "Updating database..." "${YELLOW}"
    bun run db:push

    # Restart services
    print_message "Restarting services..." "${YELLOW}"
    supervisorctl restart whatsapp-agent
    supervisorctl restart whatsapp-socket
    systemctl restart nginx

    print_message "✓ Updates installed successfully" "${GREEN}"
}

# Rollback function
rollback() {
    print_message "Rolling back to previous version..." "${YELLOW}"

    # Find latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR" | head -1)

    if [[ -z "$LATEST_BACKUP" ]]; then
        print_message "No backups found!" "${RED}"
        exit 1
    fi

    # Stop services
    supervisorctl stop whatsapp-agent
    supervisorctl stop whatsapp-socket

    # Restore backup
    rm -rf "$PROJECT_DIR"
    cp -r "$BACKUP_DIR/$LATEST_BACKUP" "$PROJECT_DIR"

    # Start services
    supervisorctl start whatsapp-agent
    supervisorctl start whatsapp-socket

    print_message "✓ Rolled back to: $LATEST_BACKUP" "${GREEN}"
}

# Check status
check_status() {
    cd "$PROJECT_DIR"

    print_message "Current Status:" "${YELLOW}"
    echo ""
    echo "📁 Project: $PROJECT_DIR"
    echo "🔗 Repository: $REPO_URL"
    echo ""

    # Git status
    echo "📊 Version Information:"
    LOCAL=$(git rev-parse --short @)
    echo "   Current: $LOCAL"
    git fetch origin &> /dev/null
    REMOTE=$(git rev-parse --short @{u})
    echo "   Latest:   $REMOTE"
    echo ""

    # Service status
    echo "🔌 Service Status:"
    echo "   WhatsApp Agent: $(supervisorctl status whatsapp-agent | grep -q RUNNING && echo '✓ Running' || echo '✗ Stopped')"
    echo "   WebSocket:      $(supervisorctl status whatsapp-socket | grep -q RUNNING && echo '✓ Running' || echo '✗ Stopped')"
    echo "   Nginx:         $(systemctl is-active nginx && echo '✓ Running' || echo '✗ Stopped')"
    echo ""

    # Recent updates
    if [[ -f /var/log/whatsapp-updates.log ]]; then
        echo "📝 Recent Updates:"
        tail -5 /var/log/whatsapp-updates.log
    fi
}

# Display help
show_help() {
    echo "WhatsApp Agent - Update Manager"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  check     Check for available updates"
    echo "  install   Install available updates"
    echo "  rollback  Rollback to previous version"
    echo "  status    Show current status"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 check      # Check for updates"
    echo "  $0 install    # Install updates"
    echo "  $0 rollback   # Rollback if issues occur"
    echo "  $0 status     # View current status"
    echo ""
}

# Main
case "$1" in
    check)
        check_root
        check_updates
        ;;
    install)
        check_root
        if check_updates; then
            create_backup
            install_updates
        else
            print_message "Nothing to update" "${YELLOW}"
        fi
        ;;
    rollback)
        check_root
        rollback
        ;;
    status)
        check_root
        check_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_message "Unknown command: $1" "${RED}"
        echo ""
        show_help
        exit 1
        ;;
esac
