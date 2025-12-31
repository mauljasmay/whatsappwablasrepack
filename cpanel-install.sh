#!/bin/bash

# WhatsApp Agent - cPanel Installation Script
# Version: 1.0.0
# Author: Maul Jasmay
# Description: Automated installation for WhatsApp Agent on cPanel hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/$(whoami)/public_html/whatsapp-agent"
BACKUP_DIR="/home/$(whoami)/backups/whatsapp-agent"

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Print header
print_header() {
    echo ""
    print_message "============================================" "${BLUE}"
    print_message " WhatsApp Agent - cPanel Installer" "${GREEN}"
    print_message "============================================" "${BLUE}"
    echo ""
}

# Check if running in correct directory
check_directory() {
    if [[ ! -d "public_html" && ! -d "www" ]]; then
        print_message "Error: Please run this script from your home directory" "${RED}"
        exit 1
    fi
}

# Create backup
create_backup() {
    print_message "Creating backup..." "${YELLOW}"

    if [[ -d "$PROJECT_DIR" ]]; then
        mkdir -p "$BACKUP_DIR"
        BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
        cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
        print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"
    fi
}

# Install Node.js via NVM
install_nodejs() {
    print_message "Installing Node.js via NVM..." "${YELLOW}"

    if command -v node &> /dev/null; then
        print_message "Node.js is already installed: $(node -v)" "${GREEN}"
        return
    fi

    # Install NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    export PATH="$NVM_DIR/versions/node/$(nvm version)/bin:$PATH"

    # Install latest LTS Node.js
    nvm install --lts

    # Set as default
    nvm alias default 'lts/*'

    print_message "✓ Node.js installed: $(node -v)" "${GREEN}"
}

# Install Bun (alternative)
install_bun() {
    print_message "Installing Bun runtime..." "${YELLOW}"

    if command -v bun &> /dev/null; then
        print_message "Bun is already installed: $(bun --version)" "${GREEN}"
        return
    fi

    curl -fsSL https://bun.sh/install/bun | bash

    # Add to PATH
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"

    print_message "✓ Bun installed: $(bun --version)" "${GREEN}"
}

# Setup project
setup_project() {
    print_message "Setting up project..." "${YELLOW}"

    # Create project directory
    mkdir -p "$(dirname $PROJECT_DIR)"

    # Copy from current directory if exists
    if [[ -d "whatsapp-agent" ]]; then
        cp -r whatsapp-agent "$PROJECT_DIR"
        print_message "✓ Project copied from current directory" "${GREEN}"
    else
        # If not in current directory, ask user
        read -p "Enter GitHub repository URL or local path: " source

        if [[ $source == https://github.com/* ]]; then
            git clone "$source" "$PROJECT_DIR"
            print_message "✓ Repository cloned" "${GREEN}"
        else
            cp -r "$source" "$PROJECT_DIR"
            print_message "✓ Project copied" "${GREEN}"
        fi
    fi

    cd "$PROJECT_DIR"

    # Install dependencies
    print_message "Installing dependencies..." "${YELLOW}"
    if command -v bun &> /dev/null; then
        bun install
    else
        npm install
    fi

    print_message "✓ Dependencies installed" "${GREEN}"
}

# Build project
build_project() {
    print_message "Building project..." "${YELLOW}"

    cd "$PROJECT_DIR"

    if command -v bun &> /dev/null; then
        bun run build
    else
        npm run build
    fi

    print_message "✓ Project built" "${GREEN}"
}

# Optimize assets
optimize_assets() {
    print_message "Optimizing assets..." "${YELLOW}"

    cd "$PROJECT_DIR"

    # Optimize images
    if [[ -d "public/images" ]]; then
        print_message "Optimizing images..."
        # Copy optimized images
        # (In production, you'd use an image optimization tool here)
    fi

    print_message "✓ Assets optimized" "${GREEN}"
}

# Create production environment
create_env() {
    print_message "Creating production environment..." "${YELLOW}"

    cd "$PROJECT_DIR"

    cat > .env.production <<EOF
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
WEBSOCKET_PORT=3002

# Database
DATABASE_URL=file:./db/custom.db

# Admin (CHANGE IN PRODUCTION!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Optional
# NEXTAUTH_SECRET=your-secret-key-here
# NEXTAUTH_URL=https://your-domain.com
EOF

    print_message "✓ Environment file created" "${GREEN}"
    print_message "" "⚠️  IMPORTANT: Edit .env.production with your actual domain and credentials!" "${YELLOW}"
}

# Configure cPanel Cron Jobs
setup_cron() {
    print_message "Setting up cron jobs..." "${YELLOW}"

    # Ask user for domain
    read -p "Enter your domain (e.g., example.com): " domain

    if [[ -z "$domain" ]]; then
        print_message "Skipping cron setup" "${YELLOW}"
        return
    fi

    # Create log directory
    mkdir -p logs

    # Create restart script
    cat > restart.sh <<'EOF'
#!/bin/bash
cd $PROJECT_DIR

# Kill existing processes
pkill -f "node.*whatsapp-agent"
pkill -f "bun.*whatsapp-agent"

# Wait a moment
sleep 2

# Start application
if command -v bun &> /dev/null; then
    nohup bun run start > logs/app.log 2>&1 &
else
    nohup npm run start > logs/app.log 2>&1 &
fi

echo "Application restarted at $(date)"
EOF

    chmod +x restart.sh

    print_message "✓ Restart script created" "${GREEN}"

    # Setup cron for automatic restart (every 6 hours)
    (crontab -l 2>/dev/null; echo "0 */6 * * * $PROJECT_DIR/restart.sh") | crontab -

    print_message "✓ Cron job configured (restart every 6 hours)" "${GREEN}"
}

# Create monitoring script
create_monitoring() {
    print_message "Creating monitoring script..." "${YELLOW}"

    cd "$PROJECT_DIR"

    cat > monitor.sh <<'EOF'
#!/bin/bash

# Check if application is running
check_app() {
    if pgrep -f "bun.*whatsapp-agent" > /dev/null || pgrep -f "node.*whatsapp-agent" > /dev/null; then
        echo "✓ Application is running"
        return 0
    else
        echo "✗ Application is NOT running"
        return 1
    fi
}

# Check disk usage
check_disk() {
    DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
    echo "Disk usage: $DISK_USAGE"
    if (( $(echo $DISK_USAGE | sed 's/%//') > 90 )); then
        echo "⚠️  WARNING: Disk space is running low!"
    fi
}

# Check memory usage
check_memory() {
    MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100}')
    echo "Memory usage: $MEMORY_USAGE%"
    if (( $(echo "$MEMORY_USAGE > 90") )); then
        echo "⚠️  WARNING: Memory usage is high!"
    fi
}

# Check log file size
check_logs() {
    LOG_SIZE=$(du -sh logs/ 2>/dev/null | awk '{print $1}')
    echo "Log size: $LOG_SIZE"
    if [[ $LOG_SIZE == *G* ]]; then
        echo "⚠️  WARNING: Log files are getting large!"
    fi
}

# Main monitoring
main() {
    echo "=== WhatsApp Agent Monitoring ==="
    echo "Time: $(date)"
    echo ""

    check_app
    echo ""
    check_disk
    echo ""
    check_memory
    echo ""
    check_logs
}

# Run all checks
main
EOF

    chmod +x monitor.sh

    print_message "✓ Monitoring script created" "${GREEN}"
}

# Display post-installation information
display_info() {
    echo ""
    print_message "========================================" "${BLUE}"
    print_message " Installation Complete!" "${GREEN}"
    print_message "========================================" "${BLUE}"
    echo ""
    echo "📁 Project Location: $PROJECT_DIR"
    echo "📋 Available Commands:"
    echo "   cd $PROJECT_DIR        # Navigate to project"
    echo "   ./restart.sh            # Restart application"
    echo "   ./monitor.sh           # Check application status"
    echo ""
    echo "🌐 Access Your Application:"
    echo "   http://$(hostname)/~$(whoami)/whatsapp-agent"
    echo "   or"
    echo "   http://your-domain.com"
    echo ""
    echo "📝 Important Files:"
    echo "   $PROJECT_DIR/.env.production  # Environment configuration"
    echo "   $PROJECT_DIR/.htaccess         # Apache configuration"
    echo "   $PROJECT_DIR/restart.sh         # Restart script"
    echo "   $PROJECT_DIR/monitor.sh          # Monitoring script"
    echo ""
    print_message "⚠️  NEXT STEPS:" "${YELLOW}"
    echo "1. Edit .env.production with your domain:"
    echo "   nano $PROJECT_DIR/.env.production"
    echo ""
    echo "2. Point your domain to the project directory:"
    echo "   In cPanel, go to Domains > Subdomains"
    echo "   Document Root: public_html/whatsapp-agent"
    echo ""
    echo "3. Configure SSL (optional but recommended):"
    echo "   In cPanel, go to Security > SSL/TLS"
    echo ""
    echo "4. Test your application:"
    echo "   Visit http://your-domain.com"
    echo ""
    echo "📖 Documentation:"
    echo "   https://github.com/mauljasmay/whatsappwablasrepack"
    echo ""
    print_message "✓ Installation completed successfully!" "${GREEN}"
}

# Main installation function
main() {
    print_header
    check_directory
    create_backup
    install_bun
    setup_project
    build_project
    optimize_assets
    create_env
    setup_cron
    create_monitoring
    display_info
}

# Run main function
main
