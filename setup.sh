#!/bin/bash

# WhatsApp Agent - Universal Setup Script
# Version: 2.0.0
# Author: Maul Jasmay
# Description: Universal setup for both Ubuntu Server and cPanel Hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Print header
print_header() {
    echo ""
    print_message "============================================" "${CYAN}"
    print_message " WhatsApp Agent - Universal Setup" "${GREEN}"
    print_message "============================================" "${CYAN}"
    echo ""
}

# Check environment
check_environment() {
    print_message "Detecting environment..." "${YELLOW}"

    # Check if on Ubuntu
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        if [[ "$ID" == "ubuntu" ]]; then
            ENVIRONMENT="ubuntu"
            print_message "✓ Detected Ubuntu Server: $VERSION_ID" "${GREEN}"
            return
        fi
    fi

    # Check if cPanel (look for cPanel files)
    if [[ -d "/usr/local/cpanel" ]] || [[ -d "/etc/cpanel" ]] || command -v cpanel &> /dev/null; then
        ENVIRONMENT="cpanel"
        print_message "✓ Detected cPanel Hosting" "${GREEN}"
        return
    fi

    # Fallback - ask user
    print_message "Unable to auto-detect environment" "${YELLOW}"
    echo ""
    print_message "Select your environment:" "${CYAN}"
    echo "  1) Ubuntu Server"
    echo "  2) cPanel Hosting"
    echo ""
    read -p "Enter choice [1-2]: " env_choice

    case $env_choice in
        1)
            ENVIRONMENT="ubuntu"
            print_message "Selected: Ubuntu Server" "${GREEN}"
            ;;
        2)
            ENVIRONMENT="cpanel"
            print_message "Selected: cPanel Hosting" "${GREEN}"
            ;;
        *)
            print_message "Invalid choice. Defaulting to Ubuntu Server" "${RED}"
            ENVIRONMENT="ubuntu"
            ;;
    esac
}

# Check if root (Ubuntu only)
check_root() {
    if [[ "$ENVIRONMENT" == "ubuntu" ]]; then
        if [[ $EUID -ne 0 ]]; then
            print_message "Error: Ubuntu installation requires root privileges" "${RED}"
            print_message "Please run with: sudo bash $0" "${YELLOW}"
            exit 1
        fi
    fi
}

# Install Bun runtime
install_bun() {
    print_message "Installing Bun runtime..." "${YELLOW}"

    if command -v bun &> /dev/null; then
        print_message "✓ Bun is already installed: $(bun --version)" "${GREEN}"
        return
    fi

    # Download and install Bun
    curl -fsSL https://bun.sh/install/bun | bash

    # Add to PATH
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"

    # Add to bashrc
    echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
    echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc

    print_message "✓ Bun installed: $(bun --version)" "${GREEN}"
}

# Ubuntu Server Setup
setup_ubuntu() {
    print_message "Setting up for Ubuntu Server..." "${YELLOW}"
    echo ""

    # Configuration
    REPO_URL="${REPO_URL:-https://github.com/mauljasmay/whatsappwablasrepack.git}"
    PROJECT_DIR="/var/www/whatsapp-agent"
    SERVICE_NAME="whatsapp-agent"
    SOCKET_SERVICE="whatsapp-socket"

    # Update package lists
    print_message "Updating package lists..." "${YELLOW}"
    apt-get update -qq

    # Install system dependencies
    print_message "Installing system dependencies..." "${YELLOW}"
    apt-get install -y \
        curl \
        wget \
        git \
        build-essential \
        python3 \
        python3-pip \
        nginx \
        certbot \
        python3-certbot-nginx \
        ufw \
        fail2ban \
        htop \
        tmux \
        supervisor \
        sqlite3 \
        jq \
        net-tools

    print_message "✓ System dependencies installed" "${GREEN}"

    # Install Bun
    install_bun

    # Create backup if exists
    if [[ -d "$PROJECT_DIR" ]]; then
        print_message "Creating backup..." "${YELLOW}"
        BACKUP_DIR="/var/backups/whatsapp-agent"
        mkdir -p "$BACKUP_DIR"
        BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
        cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
        print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"
    fi

    # Clone or update repository
    print_message "Setting up project..." "${YELLOW}"
    mkdir -p "$(dirname $PROJECT_DIR)"

    if [[ -d "$PROJECT_DIR" ]]; then
        print_message "Updating existing project..." "${YELLOW}"
        cd "$PROJECT_DIR"
        git pull origin main
    else
        print_message "Cloning repository..." "${YELLOW}"
        git clone "$REPO_URL" "$PROJECT_DIR"
    fi

    # Install dependencies
    print_message "Installing Node.js dependencies..." "${YELLOW}"
    cd "$PROJECT_DIR"
    bun install

    # Build project
    print_message "Building project..." "${YELLOW}"
    bun run build

    # Setup database
    print_message "Setting up database..." "${YELLOW}"
    mkdir -p db
    bun run db:push

    # Setup Nginx
    print_message "Setting up Nginx..." "${YELLOW}"
    cat > /etc/nginx/sites-available/$SERVICE_NAME <<EOF
server {
    listen 80;
    server_name _;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /ws/ {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    # Enable site
    ln -sf /etc/nginx/sites-available/$SERVICE_NAME /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default

    # Test and restart Nginx
    nginx -t && systemctl restart nginx
    print_message "✓ Nginx configured and restarted" "${GREEN}"

    # Setup Supervisor
    print_message "Setting up Supervisor..." "${YELLOW}"

    if ! command -v supervisorctl &> /dev/null; then
        apt-get install -y supervisor
    fi

    # Create main service config
    cat > /etc/supervisor/conf.d/$SERVICE_NAME.conf <<EOF
[program:$SERVICE_NAME]
command=bun run start
directory=$PROJECT_DIR
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/$SERVICE_NAME.err.log
stdout_logfile=/var/log/$SERVICE_NAME.out.log
environment=NODE_ENV="production"
EOF

    # Create WebSocket service config
    cat > /etc/supervisor/conf.d/$SOCKET_SERVICE.conf <<EOF
[program:$SOCKET_SERVICE]
command=bun run dev
directory=$PROJECT_DIR/mini-services/whatsapp-socket
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/$SOCKET_SERVICE.err.log
stdout_logfile=/var/log/$SOCKET_SERVICE.out.log
environment=PORT="3002"
EOF

    # Reread and update supervisor
    supervisorctl reread
    supervisorctl update

    print_message "✓ Supervisor configured" "${GREEN}"

    # Setup UFW firewall
    print_message "Setting up firewall..." "${YELLOW}"
    ufw --force enable
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 3000/tcp
    ufw allow 3002/tcp
    ufw reload
    print_message "✓ Firewall configured" "${GREEN}"

    # Setup fail2ban
    print_message "Setting up fail2ban..." "${YELLOW}"
    systemctl restart fail2ban
    print_message "✓ Fail2ban restarted" "${GREEN}"

    # Set permissions
    print_message "Setting file permissions..." "${YELLOW}"
    chown -R www-data:www-data "$PROJECT_DIR"
    chmod -R 755 "$PROJECT_DIR"
    chmod -R 777 "$PROJECT_DIR/db"
    chmod -R 777 "$PROJECT_DIR/mini-services"
    print_message "✓ Permissions set" "${GREEN}"

    # Start services
    print_message "Starting services..." "${YELLOW}"
    supervisorctl start $SERVICE_NAME
    supervisorctl start $SOCKET_SERVICE
    print_message "✓ Services started" "${GREEN}"

    return "$PROJECT_DIR"
}

# cPanel Hosting Setup
setup_cpanel() {
    print_message "Setting up for cPanel Hosting..." "${YELLOW}"
    echo ""

    # Get user information
    CURRENT_USER=$(whoami)
    HOME_DIR="/home/$CURRENT_USER"
    PROJECT_DIR="$HOME_DIR/public_html/whatsapp-agent"

    # Install Bun
    install_bun

    # Check for existing project
    print_message "Checking for existing project..." "${YELLOW}"

    if [[ -d "$PROJECT_DIR" ]]; then
        print_message "Project directory exists" "${YELLOW}"
        read -p "Backup and update existing? [y/N]: " update_existing

        if [[ $update_existing == "y" ]] || [[ $update_existing == "Y" ]]; then
            # Create backup
            BACKUP_DIR="$HOME_DIR/backups/whatsapp-agent"
            mkdir -p "$BACKUP_DIR"
            BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
            cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
            print_message "✓ Backup created: $BACKUP_NAME" "${GREEN}"

            cd "$PROJECT_DIR"
            git pull origin main 2>/dev/null || print_message "No git repository, skipping update" "${YELLOW}"
        fi
    else
        # Copy from current directory or clone
        if [[ -d "whatsapp-agent" ]]; then
            print_message "Copying from current directory..." "${YELLOW}"
            mkdir -p "$(dirname $PROJECT_DIR)"
            cp -r whatsapp-agent "$PROJECT_DIR"
        else
            read -p "Enter GitHub repository URL [leave blank to skip]: " repo_url

            if [[ -n "$repo_url" ]]; then
                git clone "$repo_url" "$PROJECT_DIR"
                print_message "✓ Repository cloned" "${GREEN}"
            else
                print_message "⚠️  Please manually upload project files to: $PROJECT_DIR" "${YELLOW}"
                read -p "Press Enter to continue..." dummy
            fi
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

    # Build project
    print_message "Building project..." "${YELLOW}"
    if command -v bun &> /dev/null; then
        bun run build
    else
        npm run build
    fi
    print_message "✓ Project built" "${GREEN}"

    # Create .env.production
    print_message "Creating environment file..." "${YELLOW}"
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
    print_message "" "⚠️  IMPORTANT: Edit .env.production with your actual domain!" "${YELLOW}"

    # Set permissions
    print_message "Setting file permissions..." "${YELLOW}"
    chmod -R 755 .
    chmod -R 777 db/
    chmod -R 777 mini-services/

    # Create restart script
    print_message "Creating restart script..." "${YELLOW}"
    cat > restart.sh <<'EOF'
#!/bin/bash
cd "$(dirname "$0")"

# Kill existing processes
pkill -f "node.*whatsapp"
pkill -f "bun.*whatsapp"

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

    # Create monitoring script
    print_message "Creating monitoring script..." "${YELLOW}"
    cat > monitor.sh <<'EOF'
#!/bin/bash
cd "$(dirname "$0")"

# Check if application is running
check_app() {
    if pgrep -f "bun.*whatsapp" > /dev/null || pgrep -f "node.*whatsapp" > /dev/null; then
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
    if (( $(echo $DISK_USAGE | sed 's/%//') > 90 ) )); then
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

    print_message "" "⚠️  NEXT STEPS:" "${YELLOW}"
    echo "1. Point your domain to project directory:"
    echo "   In cPanel, go to Domains > Subdomains"
    echo "   Document Root: public_html/whatsapp-agent"
    echo ""
    echo "2. Configure SSL (optional but recommended):"
    echo "   In cPanel, go to Security > SSL/TLS"
    echo ""
    echo "3. Start application:"
    echo "   Option A: Use cPanel Node Manager"
    echo "   Option B: Use PM2 (if available)"
    echo "   Option C: Run: ./restart.sh"
    echo ""
    echo "4. Monitor application:"
    echo "   ./monitor.sh"
    echo ""
    echo "📋 Available Commands:"
    echo "   cd $PROJECT_DIR        # Navigate to project"
    echo "   ./restart.sh            # Restart application"
    echo "   ./monitor.sh           # Check status"
    echo "   ./monitor.sh           # View logs"

    return "$PROJECT_DIR"
}

# Display success message
display_success() {
    local PROJECT_DIR="$1"
    local ENV="$2"

    echo ""
    print_message "========================================" "${GREEN}"
    print_message " Installation Complete!" "${GREEN}"
    print_message "========================================" "${GREEN}"
    echo ""
    echo "📁 Project Location: $PROJECT_DIR"
    echo ""

    if [[ "$ENV" == "ubuntu" ]]; then
        echo "🌐 Access Your Application:"
        echo "   HTTP: http://$(hostname -I | cut -d' ' -f1)"
        echo "   HTTPS: https://your-domain.com (after SSL setup)"
        echo ""
        echo "📋 Ubuntu Commands:"
        echo "   cd $PROJECT_DIR"
        echo "   sudo supervisorctl status"
        echo "   sudo tail -f /var/log/whatsapp-agent.out.log"
        echo "   sudo ./install.sh update      # Check for updates"
        echo "   sudo ./install.sh install    # Install updates"
        echo "   sudo systemctl status nginx"
        echo "   sudo systemctl status fail2ban"
    else
        echo "🌐 Access Your Application:"
        echo "   HTTP: http://$(hostname)/~$(whoami)/whatsapp-agent"
        echo "   HTTPS: https://your-domain.com (after SSL setup)"
        echo ""
        echo "📋 cPanel Commands:"
        echo "   cd $PROJECT_DIR"
        echo "   ./restart.sh            # Restart application"
        echo "   ./monitor.sh           # Check application status"
        echo "   ./monitor.sh           # View application logs"
    fi

    echo ""
    echo "📖 Documentation:"
    echo "   https://github.com/mauljasmay/whatsappwablasrepack"
    echo ""

    echo "🔐 Default Admin Credentials:"
    echo "   Username: admin"
    echo "   Password: admin123"
    echo ""
    print_message "⚠️  IMPORTANT: Change these credentials in production!" "${YELLOW}"
    echo ""
}

# Main setup function
main() {
    print_header
    check_environment
    check_root
    echo ""

    if [[ "$ENVIRONMENT" == "ubuntu" ]]; then
        PROJECT_DIR=$(setup_ubuntu)
        display_success "$PROJECT_DIR" "ubuntu"
    elif [[ "$ENVIRONMENT" == "cpanel" ]]; then
        PROJECT_DIR=$(setup_cpanel)
        display_success "$PROJECT_DIR" "cpanel"
    else
        print_message "Error: Unknown environment" "${RED}"
        exit 1
    fi
}

# Run main function
main
