#!/bin/bash

# WhatsApp Agent - Ubuntu Server Installation Script
# Version: 1.0.0
# Author: Maul Jasmay
# Description: Automated installation for WhatsApp Agent on Ubuntu servers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/mauljasmay/whatsappwablasrepack.git"
PROJECT_DIR="/var/www/whatsapp-agent"
SERVICE_NAME="whatsapp-agent"
WEB_SOCKET_SERVICE="whatsapp-socket"
BACKUP_DIR="/var/backups/whatsapp-agent"

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Print header
print_header() {
    echo ""
    print_message "============================================" "${BLUE}"
    print_message " WhatsApp Agent - Ubuntu Installer" "${GREEN}"
    print_message "============================================" "${BLUE}"
    echo ""
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_message "Please run as root (use sudo)" "${RED}"
        exit 1
    fi
}

# Check Ubuntu version
check_ubuntu() {
    if [[ ! -f /etc/os-release ]]; then
        print_message "Cannot detect OS version" "${RED}"
        exit 1
    fi

    . /etc/os-release
    if [[ "$ID" != "ubuntu" ]]; then
        print_message "This script is designed for Ubuntu. Detected: $ID" "${YELLOW}"
        read -p "Continue anyway? (y/n): " continue
        if [[ $continue != "y" ]]; then
            exit 1
        fi
    fi

    print_message "Detected Ubuntu: $VERSION_ID" "${GREEN}"
}

# Install system dependencies
install_dependencies() {
    print_message "Installing system dependencies..." "${YELLOW}"

    apt-get update
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
        sqlite3

    print_message "System dependencies installed successfully" "${GREEN}"
}

# Install Bun
install_bun() {
    print_message "Installing Bun runtime..." "${YELLOW}"

    if command -v bun &> /dev/null; then
        print_message "Bun is already installed: $(bun --version)" "${GREEN}"
        return
    fi

    curl -fsSL https://bun.sh/install/bun | bash

    # Add bun to PATH
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"

    # Add to bashrc
    echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
    echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc

    print_message "Bun installed successfully: $(bun --version)" "${GREEN}"
}

# Clone or update repository
setup_project() {
    print_message "Setting up project..." "${YELLOW}"

    # Create backup if exists
    if [[ -d "$PROJECT_DIR" ]]; then
        print_message "Project directory exists. Creating backup..." "${YELLOW}"
        mkdir -p "$BACKUP_DIR"
        mv "$PROJECT_DIR" "$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S)"
    fi

    # Clone repository
    mkdir -p "$(dirname $PROJECT_DIR)"
    git clone "$REPO_URL" "$PROJECT_DIR"

    cd "$PROJECT_DIR"

    # Install dependencies
    print_message "Installing Node.js dependencies..." "${YELLOW}"
    bun install

    # Build project
    print_message "Building project..." "${YELLOW}"
    bun run build

    # Setup database
    print_message "Setting up database..." "${YELLOW}"
    bun run db:push

    print_message "Project setup completed" "${GREEN}"
}

# Setup Nginx
setup_nginx() {
    print_message "Setting up Nginx..." "${YELLOW}"

    # Create Nginx config
    cat > /etc/nginx/sites-available/whatsapp-agent <<EOF
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
}
EOF

    # Enable site
    ln -sf /etc/nginx/sites-available/whatsapp-agent /etc/nginx/sites-enabled/

    # Remove default site
    rm -f /etc/nginx/sites-enabled/default

    # Test and restart Nginx
    nginx -t
    systemctl restart nginx

    print_message "Nginx setup completed" "${GREEN}"
}

# Setup SSL with Let's Encrypt
setup_ssl() {
    read -p "Enter your domain name (leave blank to skip SSL setup): " domain

    if [[ -z "$domain" ]]; then
        print_message "Skipping SSL setup" "${YELLOW}"
        return
    fi

    print_message "Setting up SSL for $domain..." "${YELLOW}"

    # Update Nginx config for SSL
    cat > /etc/nginx/sites-available/whatsapp-agent <<EOF
server {
    listen 80;
    server_name $domain;

    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name $domain;

    ssl_certificate /etc/letsencrypt/live/$domain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$domain/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

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
}
EOF

    # Obtain SSL certificate
    certbot --nginx -d "$domain" --non-interactive --agree-tos --redirect

    print_message "SSL setup completed for $domain" "${GREEN}"
}

# Setup Supervisor
setup_supervisor() {
    print_message "Setting up Supervisor..." "${YELLOW}"

    # Install supervisor if not installed
    if ! command -v supervisorctl &> /dev/null; then
        apt-get install -y supervisor
    fi

    # Create main service config
    cat > /etc/supervisor/conf.d/whatsapp-agent.conf <<EOF
[program:whatsapp-agent]
command=bun run start
directory=$PROJECT_DIR
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/whatsapp-agent.err.log
stdout_logfile=/var/log/whatsapp-agent.out.log
environment=NODE_ENV="production"
EOF

    # Create WebSocket service config
    cat > /etc/supervisor/conf.d/whatsapp-socket.conf <<EOF
[program:whatsapp-socket]
command=bun run dev
directory=$PROJECT_DIR/mini-services/whatsapp-socket
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/whatsapp-socket.err.log
stdout_logfile=/var/log/whatsapp-socket.out.log
environment=PORT="3002"
EOF

    # Reread and update supervisor
    supervisorctl reread
    supervisorctl update

    print_message "Supervisor setup completed" "${GREEN}"
}

# Setup UFW Firewall
setup_firewall() {
    print_message "Configuring firewall..." "${YELLOW}"

    # Enable UFW
    ufw --force enable

    # Allow SSH
    ufw allow 22/tcp

    # Allow HTTP/HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp

    # Allow application ports
    ufw allow 3000/tcp
    ufw allow 3002/tcp

    # Reload UFW
    ufw reload

    print_message "Firewall configured" "${GREEN}"
}

# Configure fail2ban
setup_fail2ban() {
    print_message "Setting up fail2ban..." "${YELLOW}"

    cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 6

[nginx-noscript]
enabled = true
port = http,https
filter = nginx-noscript
logpath = /var/log/nginx/error.log
maxretry = 6

[nginx-badbots]
enabled = true
port = http,https
filter = nginx-badbots
logpath = /var/log/nginx/error.log
maxretry = 2
EOF

    systemctl restart fail2ban

    print_message "Fail2ban configured" "${GREEN}"
}

# Setup automatic updates
setup_updates() {
    print_message "Setting up automatic updates..." "${YELLOW}"

    # Create update script
    cat > /usr/local/bin/whatsapp-update <<'EOF'
#!/bin/bash
cd $PROJECT_DIR

# Pull latest changes
git pull origin main

# Update dependencies
bun install

# Build project
bun run build

# Update database
bun run db:push

# Restart services
supervisorctl restart whatsapp-agent
supervisorctl restart whatsapp-socket

echo "Update completed at $(date)" >> /var/log/whatsapp-updates.log
EOF

    chmod +x /usr/local/bin/whatsapp-update

    # Add to crontab for daily updates at 2 AM
    (crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/whatsapp-update") | crontab -

    print_message "Automatic updates configured (daily at 2 AM)" "${GREEN}"
}

# Create update management script
create_update_manager() {
    print_message "Creating update manager..." "${YELLOW}"

    cat > /usr/local/bin/whatsapp-manager <<'EOF'
#!/bin/bash

PROJECT_DIR="$PROJECT_DIR"
REPO_URL="$REPO_URL"

check_update() {
    cd $PROJECT_DIR
    git fetch origin
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})
    BASE=$(git merge-base @ @{u})

    if [[ $LOCAL == $REMOTE ]]; then
        echo "No updates available"
        return 1
    else
        echo "Update available!"
        git log $BASE..REMOTE --oneline
        return 0
    fi
}

install_update() {
    cd $PROJECT_DIR
    echo "Installing updates..."
    git pull origin main
    bun install
    bun run build
    bun run db:push
    supervisorctl restart whatsapp-agent
    supervisorctl restart whatsapp-socket
    echo "Update completed"
}

case "$1" in
    check)
        check_update
        ;;
    install)
        install_update
        ;;
    *)
        echo "Usage: $0 {check|install}"
        exit 1
        ;;
esac
EOF

    chmod +x /usr/local/bin/whatsapp-manager
}

# Set permissions
set_permissions() {
    print_message "Setting file permissions..." "${YELLOW}"

    chown -R www-data:www-data "$PROJECT_DIR"
    chmod -R 755 "$PROJECT_DIR"
    chmod -R 777 "$PROJECT_DIR/db"
    chmod -R 777 "$PROJECT_DIR/mini-services"

    print_message "Permissions set" "${GREEN}"
}

# Start services
start_services() {
    print_message "Starting services..." "${YELLOW}"

    # Start WhatsApp Agent
    supervisorctl start whatsapp-agent

    # Start WebSocket service
    supervisorctl start whatsapp-socket

    # Start Nginx
    systemctl start nginx

    print_message "Services started" "${GREEN}"
}

# Display status
display_status() {
    echo ""
    print_message "========================================" "${BLUE}"
    print_message " Installation Status" "${GREEN}"
    print_message "========================================" "${BLUE}"
    echo ""
    echo "📁 Project Directory: $PROJECT_DIR"
    echo "🌐 Nginx: $(systemctl is-active nginx && echo 'Running' || echo 'Stopped')"
    echo "📡 WhatsApp Agent: $(supervisorctl status whatsapp-agent | grep -q RUNNING && echo 'Running' || echo 'Stopped')"
    echo "🔌 WebSocket Service: $(supervisorctl status whatsapp-socket | grep -q RUNNING && echo 'Running' || echo 'Stopped')"
    echo "🔥 Firewall: $(ufw status | head -n 1)"
    echo ""
}

# Display next steps
display_next_steps() {
    echo ""
    print_message "========================================" "${BLUE}"
    print_message " Next Steps" "${GREEN}"
    print_message "========================================" "${BLUE}"
    echo ""
    echo "1️⃣  Access your application:"
    echo "   http://YOUR_SERVER_IP"
    echo ""
    echo "2️⃣  View logs:"
    echo "   Main app:     sudo tail -f /var/log/whatsapp-agent.out.log"
    echo "   WebSocket:     sudo tail -f /var/log/whatsapp-socket.out.log"
    echo "   Nginx:        sudo tail -f /var/log/nginx/error.log"
    echo ""
    echo "3️⃣  Manage services:"
    echo "   Start:   sudo supervisorctl start whatsapp-agent"
    echo "   Stop:    sudo supervisorctl stop whatsapp-agent"
    echo "   Restart:  sudo supervisorctl restart whatsapp-agent"
    echo "   Status:  sudo supervisorctl status"
    echo ""
    echo "4️⃣  Check for updates:"
    echo "   whatsapp-manager check"
    echo ""
    echo "5️⃣  Install updates:"
    echo "   whatsapp-manager install"
    echo ""
    echo "6️⃣  Admin credentials (DEFAULT - CHANGE IN PRODUCTION):"
    echo "   Username: admin"
    echo "   Password: admin123"
    echo ""
    print_message "⚠️  IMPORTANT: Change default admin credentials!" "${YELLOW}"
    print_message "📖 Documentation: https://github.com/mauljasmay/whatsappwablasrepack" "${BLUE}"
    echo ""
}

# Main installation function
main() {
    print_header
    check_root
    check_ubuntu
    install_dependencies
    install_bun
    setup_project
    setup_nginx
    setup_ssl
    setup_supervisor
    setup_firewall
    setup_fail2ban
    setup_updates
    create_update_manager
    set_permissions
    start_services
    display_status
    display_next_steps
}

# Run main function
main
