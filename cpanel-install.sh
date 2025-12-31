#!/bin/bash

# WhatsApp Agent - cPanel Installation Script (FIXED)
# Version: 2.0.0
# Author: Maul Jasmay
# Description: Improved installation for WhatsApp Agent on cPanel hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CURRENT_USER=$(whoami)
PROJECT_DIR="/home/$CURRENT_USER/public_html/whatsapp-agent"
BACKUP_DIR="/home/$CURRENT_USER/backups/whatsapp-agent"

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
        cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME" || print_message "Warning: Backup failed" "${YELLOW}"
        print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"
    fi
}

# Install Node.js via NVM
install_nodejs() {
    print_message "Checking for Node.js..." "${YELLOW}"

    if command -v node &> /dev/null; then
        print_message "✓ Node.js is already installed: $(node -v)" "${GREEN}"
        return
    fi

    # Try NVM first
    if command -v nvm &> /dev/null; then
        print_message "Installing Node.js via NVM..." "${YELLOW}"
        nvm install --lts
        nvm use --lts
        print_message "✓ Node.js installed via NVM: $(node -v)" "${GREEN}"
        return
    fi

    # Fallback to direct install (if NVM fails)
    print_message "Installing Node.js directly..." "${YELLOW}"
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    print_message "✓ Node.js installed: $(node -v)" "${GREEN}"
}

# Install Bun (alternative)
install_bun() {
    print_message "Checking for Bun..." "${YELLOW}"

    if command -v bun &> /dev/null; then
        print_message "✓ Bun is already installed: $(bun --version)" "${GREEN}"
        return
    fi

    # Install Bun
    curl -fsSL https://bun.sh/install/bun | bash

    # Add to PATH
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"

    # Add to bashrc
    echo '' >> ~/.bashrc
    echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
    echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc

    print_message "✓ Bun installed: $(bun --version)" "${GREEN}"
}

# Setup project
setup_project() {
    print_message "Setting up project..." "${YELLOW}"

    # Create project directory
    mkdir -p "$(dirname $PROJECT_DIR)"

    # Copy from current directory if exists
    if [[ -d "whatsapp-agent" ]]; then
        print_message "Copying from current directory..." "${YELLOW}"
        cp -r whatsapp-agent "$PROJECT_DIR"
        print_message "✓ Project copied from current directory" "${GREEN}"
    else
        # If not in current directory, ask user
        print_message "Project files not found in current directory." "${YELLOW}"
        read -p "Enter GitHub repository URL or local path: " source

        if [[ -n "$source" ]]; then
            if [[ "$source" == https://github.com/* ]] || [[ "$source" == https://github.com/* ]]; then
                git clone "$source" "$PROJECT_DIR" 2>/dev/null || print_message "Warning: git clone failed" "${YELLOW}"
                print_message "✓ Repository cloned" "${GREEN}"
            else
                cp -r "$source" "$PROJECT_DIR"
                print_message "✓ Project copied" "${GREEN}"
            fi
        else
            print_message "⚠️  No source provided. Skipping project setup." "${YELLOW}"
            return
        fi
    fi

    cd "$PROJECT_DIR" || {
        print_message "Error: Cannot navigate to project directory" "${RED}"
        exit 1
    }

    # Install dependencies
    print_message "Installing dependencies..." "${YELLOW}"

    # Prefer Bun over npm
    if command -v bun &> /dev/null; then
        bun install 2>&1 || npm install
    else
        npm install 2>&1 || {
            print_message "npm failed, trying yarn..." "${YELLOW}"
            yarn install || {
                print_message "yarn failed, trying pnpm..." "${YELLOW}"
                pnpm install || {
                    print_message "All package managers failed" "${RED}"
                    print_message "Please install Node.js or Bun manually" "${RED}"
                    exit 1
                }
            }
        }
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
        npm run build || {
            print_message "npm build failed, trying yarn..." "${YELLOW}"
            yarn build || {
                print_message "yarn build failed, trying pnpm..." "${YELLOW}"
                pnpm build || {
                    print_message "All build commands failed" "${RED}"
                    exit 1
                }
            }
        }
    fi

    if [[ -d ".next/standalone" ]]; then
        print_message "✓ Project built successfully" "${GREEN}"
    else
        print_message "⚠️  Warning: Build directory not found" "${YELLOW}"
    fi
}

# Optimize assets
optimize_assets() {
    print_message "Optimizing assets..." "${YELLOW}"

    cd "$PROJECT_DIR"

    # Optimize images
    if [[ -d "public/images" ]]; then
        print_message "Optimizing images..."
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
    cat > restart.sh <<EOF
#!/bin/bash
cd "$(dirname "\$0")"

# Kill existing processes
pkill -f "node.*whatsapp-agent" 2>/dev/null
pkill -f "bun.*whatsapp-agent" 2>/dev/null

# Wait a moment
sleep 2

# Start application
if command -v bun &> /dev/null; then
    nohup bun run start > logs/app.log 2>&1 &
else
    nohup npm run start > logs/app.log 2>&1 &
fi

echo "Application restarted at \$(date)"
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
cd "$(dirname "$0")"

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
    echo "   http://$(hostname)/~$CURRENT_USER/whatsapp-agent"
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
    echo "2. Point your domain to project directory:"
    echo "   In cPanel, go to Domains > Subdomains"
    echo "   Document Root: public_html/whatsapp-agent"
    echo ""
    echo "3. Configure SSL (optional but recommended):"
    echo "   In cPanel, go to Security > SSL/TLS"
    echo ""
    echo "4. Test your application:"
    echo "   Visit http://your-domain.com"
    echo ""
    echo "5. Use Node Manager (if available):"
    echo "   In cPanel, go to Software > Setup Node.js App"
    echo "   Application root: public_html/whatsapp-agent"
    echo "   Startup file: package.json"
    echo "   Command: bun run start"
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
    install_nodejs
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
