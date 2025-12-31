#!/bin/bash

# WhatsApp Agent - Update Manager Script (FIXED)
# Version: 2.0.0
# Author: Maul Jasmay
# Description: Check for, install, and rollback updates from GitHub

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="${REPO_URL:-https://github.com/mauljasmay/whatsappwablasrepack.git}"
PROJECT_DIR="${PROJECT_DIR:-/var/www/whatsapp-agent}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/whatsapp-agent}"
CURRENT_VERSION=$(grep '"version"' /var/www/whatsapp-agent/package.json | cut -d'"' -f 4 2>/dev/null || echo "1.0.0")

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Print header
print_header() {
    echo ""
    print_message "============================================" "${BLUE}"
    print_message " WhatsApp Agent - Update Manager" "${GREEN}"
    print_message "============================================" "${BLUE}"
    echo ""
}

# Print update info
print_update_info() {
    local latest_version="$1"
    local has_update="$2"
    local changelog=("${@:3}")

    echo ""
    print_message "Current Version: $CURRENT_VERSION" "${YELLOW}"
    print_message "Latest Version: $latest_version" "${YELLOW}"

    if [[ $has_update == true ]]; then
        print_message "Update Available!" "${GREEN}"
        echo ""
        print_message "What's New:" "${CYAN}"
        for item in "${changelog[@]}"; do
            echo "   • $item"
        done
    else
        print_message "You're up to date!" "${GREEN}"
    fi
    echo ""
}

# Check for updates
check_updates() {
    print_message "Checking for updates..." "${YELLOW}"

    cd "$PROJECT_DIR" 2>/dev/null || {
        print_message "Error: Project directory not found" "${RED}"
        exit 1
    }

    # Fetch latest from GitHub
    print_message "Fetching from GitHub..." "${YELLOW}"
    git fetch origin 2>/dev/null || {
        print_message "Error: Failed to fetch from GitHub" "${RED}"
        exit 1
    }

    # Get version from package.json
    LOCAL=$(git rev-parse @ 2>/dev/null || echo "unknown")
    REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "unknown")
    BASE=$(git merge-base @ @{u} 2>/dev/null || echo "unknown")

    # Check if update available
    if [[ $LOCAL == $REMOTE ]]; then
        print_update_info "$CURRENT_VERSION" "false"
        return 1
    else
        # Get changelog
        CHANGELOG=$(git log $BASE..REMOTE --oneline 2>/dev/null | head -10)

        # Get latest version from remote
        REMOTE_VERSION=$(git ls-remote --tags origin 2>/dev/null | grep -v '^' | tail -1 | awk -F'/' '{print $NF}')
        if [[ -z "$REMOTE_VERSION" ]]; then
            REMOTE_VERSION="${CURRENT_VERSION}.1"
        fi

        print_update_info "$REMOTE_VERSION" "true" "${CHANGELOG[@]}"
        return 0
    fi
}

# Create backup before update
create_backup() {
    print_message "Creating backup..." "${YELLOW}"

    mkdir -p "$BACKUP_DIR"
    BACKUP_NAME="backup-pre-update-$(date +%Y%m%d-%H%M%S)"

    # Backup database
    if [[ -d "$PROJECT_DIR/db" ]]; then
        cp -r "$PROJECT_DIR/db" "$BACKUP_DIR/$BACKUP_NAME/db"
    fi

    # Backup .next directory
    if [[ -d "$PROJECT_DIR/.next" ]]; then
        cp -r "$PROJECT_DIR/.next" "$BACKUP_DIR/$BACKUP_NAME/.next"
    fi

    # Backup package.json
    cp "$PROJECT_DIR/package.json" "$BACKUP_DIR/$BACKUP_NAME/"

    print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"
}

# Install updates
install_updates() {
    print_message "Installing updates..." "${YELLOW}"

    cd "$PROJECT_DIR"

    # Create backup first
    create_backup

    # Pull latest changes
    print_message "Pulling latest changes..." "${YELLOW}"
    git pull origin main 2>/dev/null || {
        print_message "Error: Failed to pull from GitHub" "${RED}"
        exit 1
    }

    # Install dependencies
    print_message "Updating dependencies..." "${YELLOW}"
    if command -v bun &> /dev/null; then
        bun install 2>&1 || {
            print_message "Error: bun install failed, trying npm..." "${YELLOW}"
            npm install
        }
    else
        npm install 2>&1 || {
            print_message "Error: npm install failed" "${RED}"
            exit 1
        }
    fi

    # Build project
    print_message "Building project..." "${YELLOW}"
    if command -v bun &> /dev/null; then
        bun run build 2>&1 || {
            print_message "Error: bun build failed, trying npm..." "${YELLOW}"
            npm run build
        }
    else
        npm run build 2>&1 || {
            print_message "Error: Build failed" "${RED}"
            exit 1
        }
    fi

    # Update database
    print_message "Updating database..." "${YELLOW}"
    if command -v bun &> /dev/null; then
        bun run db:push 2>&1 || {
            print_message "Error: Database update failed" "${YELLOW}"
        }
    fi

    print_message "✓ Updates installed successfully!" "${GREEN}"
    print_message "" "⚠️  IMPORTANT: Restart services to apply changes:" "${YELLOW}"
    print_message "   sudo supervisorctl restart whatsapp-agent" "${BLUE}"
    print_message "   sudo supervisorctl restart whatsapp-socket" "${BLUE}"
}

# Rollback update
rollback_update() {
    print_message "Rolling back update..." "${YELLOW}"

    # List available backups
    print_message "Available backups:" "${BLUE}"
    echo ""

    local backups=()
    local i=1

    if [[ -d "$BACKUP_DIR" ]]; then
        for backup in $(ls -t "$BACKUP_DIR" | head -5); do
            echo "   $i) $backup"
            backups+=("$BACKUP_DIR/$backup")
            ((i++))
        done
    else
        print_message "Error: No backups found" "${RED}"
        exit 1
    fi

    if [[ ${#backups[@]} -eq 0 ]]; then
        print_message "No backups available" "${RED}"
        exit 1
    fi

    # Ask user which backup to restore
    echo ""
    read -p "Select backup to restore [1-${#backups[@]}]: " backup_choice

    if [[ $backup_choice -lt 1 ]] || [[ $backup_choice -gt ${#backups[@]} ]]; then
        print_message "Invalid choice" "${RED}"
        exit 1
    fi

    SELECTED_BACKUP="${backups[$((backup_choice-1))]}"

    print_message "Restoring backup: $(basename $SELECTED_BACKUP)..." "${YELLOW}"

    # Stop services first
    if command -v supervisorctl &> /dev/null; then
        supervisorctl stop whatsapp-agent 2>/dev/null
        supervisorctl stop whatsapp-socket 2>/dev/null
    fi

    cd "$PROJECT_DIR"

    # Restore database
    if [[ -d "$SELECTED_BACKUP/db" ]]; then
        rm -rf db/
        cp -r "$SELECTED_BACKUP/db" .
        print_message "✓ Database restored" "${GREEN}"
    fi

    # Restore .next directory
    if [[ -d "$SELECTED_BACKUP/.next" ]]; then
        rm -rf .next/
        cp -r "$SELECTED_BACKUP/.next" .
        print_message "✓ Build directory restored" "${GREEN}"
    fi

    # Restore package.json
    if [[ -f "$SELECTED_BACKUP/package.json" ]]; then
        cp "$SELECTED_BACKUP/package.json" .
        print_message "✓ Package configuration restored" "${GREEN}"
    fi

    print_message "✓ Rollback completed!" "${GREEN}"
    print_message "" "⚠️  IMPORTANT: Restart services to apply changes:" "${YELLOW}"
    print_message "   sudo supervisorctl restart whatsapp-agent" "${BLUE}"
    print_message "   sudo supervisorctl restart whatsapp-socket" "${BLUE}"
}

# Show status
show_status() {
    print_message "Current Status:" "${BLUE}"
    echo ""

    cd "$PROJECT_DIR" 2>/dev/null || {
        print_message "Error: Project directory not found" "${RED}"
        exit 1
    }

    # Git status
    LOCAL=$(git rev-parse @ 2>/dev/null || echo "unknown")
    REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "unknown")
    BASE=$(git merge-base @ @{u} 2>/dev/null || echo "unknown")

    print_message "Git Status:" "${YELLOW}"
    if [[ $LOCAL == $REMOTE ]]; then
        print_message "   Status: Up to date" "${GREEN}"
    else
        print_message "   Status: Update available" "${YELLOW}"
        print_message "   Local:  ${LOCAL:0:8}" "${CYAN}"
        print_message "   Remote: ${REMOTE:0:8}" "${CYAN}"
    fi
    echo ""

    # Build status
    if [[ -d ".next/standalone" ]]; then
        print_message "✓ Production build exists" "${GREEN}"
    else
        print_message "✗ Production build not found" "${YELLOW}"
    fi

    # Database status
    if [[ -f "db/custom.db" ]]; then
        DB_SIZE=$(du -sh db/custom.db 2>/dev/null | cut -f1)
        print_message "✓ Database exists ($DB_SIZE)" "${GREEN}"
    else
        print_message "✗ Database not found" "${YELLOW}"
    fi

    # Backup status
    if [[ -d "$BACKUP_DIR" ]]; then
        BACKUP_COUNT=$(ls "$BACKUP_DIR" 2>/dev/null | wc -l)
        print_message "✓ Backups available: $BACKUP_COUNT" "${GREEN}"
    else
        print_message "✗ No backups found" "${YELLOW}"
    fi

    # Service status
    echo ""
    print_message "Service Status:" "${YELLOW}"
    if command -v supervisorctl &> /dev/null; then
        WHATSAPP_STATUS=$(supervisorctl status whatsapp-agent | grep -q RUNNING && echo "Running" || echo "Stopped")
        SOCKET_STATUS=$(supervisorctl status whatsapp-socket | grep -q RUNNING && echo "Running" || echo "Stopped")

        print_message "   WhatsApp Agent: $WHATSAPP_STATUS" "${CYAN}"
        print_message "   WebSocket Service: $SOCKET_STATUS" "${CYAN}"
    else
        print_message "   Supervisor: Not available" "${YELLOW}"
    fi

    # Nginx status
    if command -v systemctl &> /dev/null; then
        NGINX_STATUS=$(systemctl is-active nginx && echo "Running" || echo "Stopped")
        print_message "   Nginx: $NGINX_STATUS" "${CYAN}"
    fi
}

# Clean old backups
clean_backups() {
    print_message "Cleaning old backups..." "${YELLOW}"

    local keep_count=5

    if [[ -d "$BACKUP_DIR" ]]; then
        local total=$(ls "$BACKUP_DIR" 2>/dev/null | wc -l)
        if [[ $total -gt $keep_count ]]; then
            local to_delete=$((total - keep_count))
            ls -t "$BACKUP_DIR" | tail -n "$to_delete" | while read backup; do
                rm -rf "$BACKUP_DIR/$backup"
                print_message "   Deleted: $backup" "${YELLOW}"
            done
            print_message "✓ Cleaned $to_delete old backup(s)" "${GREEN}"
        else
            print_message "✓ No old backups to clean" "${GREEN}"
        fi
    else
        print_message "✓ No backups found" "${GREEN}"
    fi
}

# Show help
show_help() {
    echo ""
    print_message "WhatsApp Agent - Update Manager" "${GREEN}"
    echo ""
    print_message "Usage:" "${YELLOW}"
    echo "  ./update.sh [COMMAND] [OPTIONS]"
    echo ""
    print_message "Commands:" "${YELLOW}"
    echo "  check        Check for available updates from GitHub"
    echo "  install      Install latest updates from GitHub"
    echo "  rollback     Rollback to a previous backup"
    echo "  status       Show current status"
    echo "  clean        Clean old backups (keep last 5)"
    echo "  help         Show this help message"
    echo ""
    print_message "Environment Variables:" "${YELLOW}"
    echo "  REPO_URL      GitHub repository URL (default: https://github.com/mauljasmay/whatsappwablasrepack.git)"
    echo "  PROJECT_DIR   Project directory (default: /var/www/whatsapp-agent)"
    echo "  BACKUP_DIR    Backup directory (default: /var/backups/whatsapp-agent)"
    echo ""
    print_message "Examples:" "${YELLOW}"
    echo "  ./update.sh check"
    echo "  ./update.sh install"
    echo "  ./update.sh rollback"
    echo "  REPO_URL=custom/repo.git ./update.sh check"
    echo ""
}

# Main function
main() {
    local command="${1:-help}"

    case $command in
        check)
            print_header
            check_updates
            ;;
        install)
            print_header
            check_updates
            echo ""
            read -p "Proceed with installation? [y/N]: " confirm
            if [[ $confirm == "y" ]] || [[ $confirm == "Y" ]]; then
                install_updates
                echo ""
                print_message "⚠️  IMPORTANT: Restart services to apply changes:" "${YELLOW}"
                print_message "   sudo supervisorctl restart whatsapp-agent" "${BLUE}"
                print_message "   sudo supervisorctl restart whatsapp-socket" "${BLUE}"
            else
                print_message "Installation cancelled" "${YELLOW}"
            fi
            ;;
        rollback)
            print_header
            rollback_update
            ;;
        status)
            print_header
            show_status
            ;;
        clean)
            print_header
            clean_backups
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_message "Unknown command: $command" "${RED}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
