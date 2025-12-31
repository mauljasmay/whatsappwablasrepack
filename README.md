# WhatsApp Agent - Wablas Repack

A comprehensive WhatsApp API gateway service similar to Jogja.wablas.com, built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![Ubuntu](https://img.shields.io/badge/Ubuntu-20.04+-E95420?style=flat-square&logo=ubuntu)
![cPanel](https://img.shields.io/badge/cPanel-Ready-orange?style=flat-square&logo=cpanel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Project Overview

**WhatsApp Agent - Wablas Repack** is a professional-grade WhatsApp API gateway service designed for businesses of all sizes. It provides a complete solution for sending and receiving WhatsApp messages at scale, with an intuitive admin dashboard, real-time updates, and enterprise-grade security features.

### Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive interface with dark mode support
- 🔐 **Admin Dashboard** - Secure admin panel with role-based access
- 📱 **Mobile Optimized** - Fully responsive design for all devices
- 🚀 **Full Speed** - Optimized for maximum performance (Lighthouse 95+)
- 🔄 **GitHub Updates** - One-click updates from GitHub repository
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📡 **Real-time** - WebSocket-powered live updates
- 🔒 **Secure** - Authentication, firewall, and SSL support

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Ubuntu Server Installation](#-ubuntu-server-installation)
- [cPanel Hosting Installation](#-cpanel-hosting-installation)
- [Performance Optimizations](#-performance-optimizations)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 📱 Device Management
- **Connect Multiple Devices** - Manage multiple WhatsApp numbers
- **QR Code Scanning** - Easy device connection via QR code
- **Real-time Status** - Live monitoring of device status
- **Battery Monitoring** - Track device battery levels
- **Device Actions** - Connect, disconnect, manage, and delete devices
- **Plan Management** - Lite, Pro, and Enterprise plans

### 💬 Messaging System
- **Single Messages** - Send individual messages instantly
- **Bulk Messages** - Send to thousands of contacts at once
- **Group Messaging** - Support for WhatsApp groups
- **Message Personalization** - Use variables to personalize messages
- **Status Tracking** - Real-time delivery status (queued → sent → delivered)
- **Message History** - Complete log of all sent messages
- **Media Support** - Send images, videos, documents (up to 2MB)

### 👥 Contact Management
- **Full CRUD Operations** - Create, read, update, delete contacts
- **Personalization Fields** - Name, nickname, address, birthday, email, gender
- **Bulk Import/Export** - CSV and Excel support
- **Search & Filter** - Quickly find contacts
- **Group Support** - Manage contact groups

### 📥 Real-time Inbox
- **Live Updates** - Receive messages instantly via WebSocket
- **Message Filtering** - Filter by sender, date, status
- **Auto-refresh** - Automatic updates without page reload
- **Message Actions** - Reply, forward, delete messages

### ⚙️ Settings & Configuration
- **API Key Management** - Secure API token handling
- **Webhook Configuration** - Set up webhooks for notifications
- **Company Information** - Branding and business details
- **Regional Settings** - Timezone and language preferences
- **Auto-reconnect** - Automatic device reconnection
- **Plan Management** - Monitor and upgrade plans

### 🎨 User Interface
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Mobile-first approach with breakpoints
- **Mobile Menu** - Optimized navigation for mobile devices
- **Modern Components** - Built with shadcn/ui
- **Smooth Animations** - Framer Motion transitions
- **Accessibility** - WCAG compliant with ARIA support

### 🔐 Admin Dashboard
- **Authentication System** - Secure login with credentials
- **GitHub Updates** - Check and install updates directly from GitHub
- **System Status** - Monitor all services and resources
- **Log Management** - View and export system logs
- **Service Control** - Start, stop, restart services
- **Rollback Support** - Easy rollback if updates fail

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **React 19** - Latest React features

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible primitive components
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management
- **Framer Motion** - Smooth animations

### Backend & Real-time
- **Socket.io** - WebSocket for real-time updates
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **SQLite** - Embedded database (production can use PostgreSQL)

### Development Tools
- **Bun** - Fast JavaScript runtime
- **ESLint** - Code linting
- **TypeScript** - Type checking

### Server (Ubuntu)
- **Nginx** - Reverse proxy and web server
- **Supervisor** - Process management
- **UFW** - Firewall configuration
- **Fail2ban** - Intrusion prevention
- **Certbot** - Let's Encrypt SSL certificates

### Server (cPanel)
- **Apache** - Web server with mod_rewrite
- **Node.js/Bun** - JavaScript runtime
- **Cron Jobs** - Automated task scheduling
- **.htaccess** - Configuration and optimization

## 📦 Prerequisites

### For Ubuntu Server

```bash
# System Requirements
- Ubuntu 20.04 LTS or higher
- At least 1GB RAM (2GB recommended)
- 10GB free disk space
- Root or sudo access

# Domain (Optional but recommended)
- Registered domain name
- DNS A record pointing to your server IP
```

### For cPanel Hosting

```bash
# System Requirements
- cPanel hosting with SSH access
- Node.js 18+ or Bun support
- 5GB disk space minimum
- 1GB RAM minimum (2GB recommended)

# Domain (Required)
- Registered domain name pointed to cPanel account
- cPanel subdirectory access
```

### For Local Development

```bash
# Required
- Node.js 18+ or Bun
- npm or bun
- Git

# Recommended
- VS Code or similar IDE
- Modern web browser (Chrome, Firefox, Safari)
```

## 🚀 Quick Start

### Clone Repository

```bash
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack
```

### Local Development

```bash
# Install dependencies
bun install

# Initialize database
bun run db:push

# Start development server
bun run dev

# Start WebSocket service (in another terminal)
cd mini-services/whatsapp-socket
bun run dev
```

### Access Application

- **Landing Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/app
- **Admin**: Click "Admin" button in header → Use credentials below

## 🐧 Ubuntu Server Installation

### Automated Installation (Recommended)

The easiest way to install WhatsApp Agent on Ubuntu is using the automated installation script.

#### Step 1: Connect to Your Server

```bash
# SSH into your server
ssh user@your-server-ip

# Switch to root
sudo -i
```

#### Step 2: Download Installation Script

```bash
# Clone repository
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack

# Make script executable
chmod +x install.sh

# Run installer
sudo ./install.sh
```

#### Step 3: Follow Installation Prompts

The installer will:

1. ✅ Check system requirements
2. ✅ Install system dependencies (Nginx, Supervisor, UFW, Fail2ban, etc.)
3. ✅ Install Bun runtime
4. ✅ Clone and setup project
5. ✅ Configure Nginx web server
6. ✅ Setup SSL (optional, if domain provided)
7. ✅ Configure Supervisor for process management
8. ✅ Setup firewall (UFW)
9. ✅ Configure fail2ban for security
10. ✅ Set up automatic daily updates
11. ✅ Start all services

#### Step 4: Post-Installation

After installation completes:

```bash
# Check service status
sudo supervisorctl status

# View logs
sudo tail -f /var/log/whatsapp-agent.out.log
```

### Manual Installation

If you prefer manual installation or need to customize the setup, follow the detailed steps in the installation script.

## 🌐 cPanel Hosting Installation

### Prerequisites for cPanel

- **SSH Access** - Required for running installation scripts
- **Node.js Support** - cPanel must support Node.js (version 18+)
- **Bun Support** - Alternative runtime (faster)
- **Sufficient Disk Space** - Minimum 5GB available
- **Sufficient RAM** - Minimum 1GB RAM available
- **Domain Configuration** - Domain pointed to your hosting account

### Automated cPanel Installation

#### Step 1: Connect to Your cPanel Account

1. Log in to your cPanel account
2. Go to "Terminal" or access via SSH
3. Navigate to your home directory

#### Step 2: Download and Run Installation Script

```bash
# Clone repository
git clone https://github.com/mauljasmay/whatsappwablasrepack.git

# Navigate to project
cd whatsappwablasrepack

# Make script executable
chmod +x cpanel-install.sh

# Run installer
./cpanel-install.sh
```

The script will:

1. ✅ Check for Node.js/Bun and install if needed
2. ✅ Install project dependencies
3. ✅ Build the project
4. ✅ Create production environment file
5. ✅ Optimize assets for web
6. ✅ Create .htaccess for Apache optimization
7. ✅ Set up cron jobs for automatic restart
8. ✅ Create monitoring and restart scripts
9. ✅ Provide access instructions

#### Step 3: Configure Domain

1. In cPanel, go to "Subdomains"
2. Add a new subdomain (e.g., `whatsapp.yourdomain.com`)
3. Point document root to `public_html/whatsapp-agent`
4. Wait for DNS propagation (usually 5-30 minutes)

#### Step 4: Configure SSL (Optional but Recommended)

1. In cPanel, go to "SSL/TLS Status"
2. Check if Let's Encrypt is available
3. If available, select your domain and issue certificate
4. Auto-configuration will update Apache

#### Step 5: Access Your Application

- **URL**: https://whatsapp.yourdomain.com (or http://your-ip/whatsapp-agent)
- **Dashboard**: https://whatsapp.yourdomain.com/app
- **Admin**: Click "Admin" button in header

#### Step 6: Monitor Your Application

The installation script creates monitoring tools:

```bash
# Check application status
./monitor.sh

# Restart application
./restart.sh

# View logs
tail -f ~/logs/app.log
```

### Manual cPanel Installation

If you prefer manual setup:

#### Step 1: Upload Files

1. Create a new subdomain in cPanel
2. Upload project files via File Manager (or use FTP/SFTP)
3. Extract files if needed
4. Ensure `public_html/whatsapp-agent` contains the project files

#### Step 2: Install Dependencies

```bash
# SSH to your cPanel account
ssh user@your-domain.com

# Navigate to project
cd public_html/whatsapp-agent

# Install dependencies (choose one)
bun install

# Or
npm install
```

#### Step 3: Build Project

```bash
# Build for production
bun run build

# Or
npm run build
```

#### Step 4: Create Environment File

```bash
# Create .env.production file
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
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com
EOF
```

#### Step 5: Start Application

There are several ways to start the application on cPanel:

**Method 1: Using Node Manager (cPanel)**

1. In cPanel, go to "Software" → "Setup Node.js App"
2. Create new application:
   - Node.js version: 18+ or latest
   - Application mode: Production
   - Application root: `whatsapp-agent`
   - Application URL: `whatsapp.yourdomain.com`
   - Application startup file: `package.json`
   - Application startup method: `bun run start` or `npm start`

**Method 2: Using Supervisor (Recommended)**

```bash
# Install Supervisor (if not available)
# Some cPanel installations don't have Supervisor pre-installed
# You may need to ask your hosting provider

# Create Supervisor config
cat > supervisord.conf <<EOF
[program:whatsapp-agent]
command=bun run start
directory=$(pwd)
autostart=true
autorestart=true
stderr_logfile=$(pwd)/logs/app.err.log
stdout_logfile=$(pwd)/logs/app.out.log
user=$(whoami)
environment=NODE_ENV="production"
EOF

# Start application
supervisord -c supervisord.conf
```

**Method 3: Using PM2 (Alternative)**

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start bun --name "whatsapp-agent" -- run start
pm2 save
pm2 startup
```

**Method 4: Using Cron (Simple)**

```bash
# Add cron job to keep process alive
# In cPanel, go to Cron Jobs
# Add: */5 * * * * cd ~/public_html/whatsapp-agent && bun run start > ~/logs/cron.log 2>&1
```

#### Step 6: Configure Apache (.htaccess)

The project includes a pre-configured `.htaccess` file with optimizations:

- ✅ Gzip compression
- ✅ Brotli compression (if available)
- ✅ Browser caching headers
- ✅ Static asset caching
- ✅ Security headers (XSS, Frame, CSP)
- ✅ CORS configuration
- ✅ File upload size limits

Ensure `.htaccess` is in your `public_html/whatsapp-agent` directory.

## 🚀 Performance Optimizations

### Page Speed Optimizations (Lighthouse 95+)

#### Code Splitting
The project uses Next.js automatic code splitting:

```javascript
// Pages are automatically code-split
// Dynamic imports for better caching
import dynamic from 'next/dynamic'
```

#### Image Optimization
- ✅ Next.js Image optimization
- ✅ WebP format support
- ✅ Responsive image sizes
- ✅ Lazy loading
- ✅ Priority hints

#### Bundle Optimization
- ✅ Tree shaking
- ✅ Code minification (SWC)
- ✅ External bundle analysis
- ✅ Chunk splitting strategy

#### Caching Strategy
- ✅ Static asset caching (1 year)
- ✅ API response caching (1 hour)
- ✅ Browser cache headers
- ✅ Service Worker caching (optional)

#### Server-Side Optimizations
- ✅ Edge Runtime (Next.js 15)
- ✅ Server components
- ✅ Streaming responses
- ✅ Incremental Static Regeneration (ISR)

### Web Performance Best Practices

#### 1. Enable HTTP/2

In `.htaccess` or Nginx config:

```apache
# Apache
Protocols h2 h2c http/1.1
```

```nginx
# Nginx
listen 443 ssl http2;
```

#### 2. Use CDN for Static Assets

```javascript
// next.config.ts
images: {
  loader: 'custom',
  loaderFile: './lib/image-loader.js',
}
```

#### 3. Optimize Fonts

```css
/* Use font-display */
@font-face {
  font-display: swap;
}
```

#### 4. Reduce JavaScript Payload

- ✅ Dynamic imports
- ✅ Code splitting
- ✅ Lazy loading components
- ✅ Remove unused dependencies

#### 5. Optimize CSS

- ✅ Purge unused CSS
- ✅ Critical CSS inline
- ✅ Minification (Tailwind purge in production)

### Mobile Performance

- ✅ Mobile-first responsive design
- ✅ Touch-friendly targets (44px minimum)
- ✅ Optimized for 3G/4G networks
- ✅ Reduced JavaScript for mobile
- ✅ Lazy load images on mobile

### Desktop Performance

- ✅ Optimized for high-speed connections
- ✅ Enhanced features on desktop
- ✅ Preload critical resources
- ✅ Service Worker for caching (desktop)

### Performance Monitoring

Use these scripts to monitor performance:

```bash
# Build analysis
bun run analyze

# Build with profiling
bun run build:profile

# Lighthouse CI
# Add to your CI/CD pipeline
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

### Performance Checklist

Before deploying, ensure:

- ✅ All images optimized and WebP format
- ✅ Minified CSS and JS
- ✅ Enabled compression (Gzip/Brotli)
- ✅ Proper caching headers
- ✅ CDN for static assets (optional but recommended)
- ✅ Database queries optimized
- ✅ No memory leaks
- ✅ Efficient state management
- ✅ Lazy loading above the fold
- ✅ Preconnect to important domains

## 📂 Project Structure

```
whatsappwablasrepack/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── devices/            # Device management
│   │   │   ├── send-message/       # Message sending
│   │   │   ├── v2/                 # Bulk messaging
│   │   │   ├── check-phone-number/  # Phone verification
│   │   │   ├── contacts/           # Contact management
│   │   │   ├── qr-code/            # QR code generation
│   │   │   └── device-status/      # Device status
│   │   ├── page.tsx               # Main application dashboard
│   │   ├── page-landing.tsx     # Beautiful landing page
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── theme-provider.tsx     # Theme provider
│   │   └── theme-toggle.tsx      # Theme toggle component
│   ├── hooks/
│   │   ├── use-toast.ts           # Toast notifications
│   │   ├── use-mobile.ts          # Mobile detection
│   │   └── use-whatsapp-socket.ts # WebSocket hook
│   └── lib/
│       ├── db.ts                  # Database client
│       └── utils.ts               # Utility functions
├── mini-services/
│   └── whatsapp-socket/           # Real-time WebSocket service
│       ├── index.ts               # Service entry point
│       └── package.json           # Service dependencies
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── install.sh                    # Ubuntu server installation script
├── update.sh                     # Update management script
├── cpanel-install.sh             # cPanel hosting installation script
├── .htaccess                    # Apache optimization for cPanel
├── next.config.ts                # Next.js configuration (optimized)
├── package.json                  # Project dependencies and scripts
└── README.md                     # This file
```

## 📖 Available Scripts

```bash
# Development
bun run dev              # Start Next.js dev server (port 3000)
bun run dev:fast         # Start with turbo (faster)

# Building & Optimizing
bun run build            # Build for production
bun run analyze          # Analyze bundle size
bun run build:profile    # Build with profiling
bun run optimize         # Optimize images

# Code Quality
bun run lint            # Run ESLint
bun run lint:fix         # Auto-fix lint errors
bun run format           # Format code with Prettier
bun run type-check       # Check TypeScript types

# Database
bun run db:push         # Push schema to database
bun run db:generate     # Generate Prisma client
bun run db:migrate      # Run migrations
bun run db:reset        # Reset database
bun run db:seed         # Seed database with sample data

# Deployment
bun run deploy:cpanel    # Deploy to cPanel
bun run deploy:ubuntu    # Deploy to Ubuntu
bun run deploy           # Generic deployment

# Updates & Management
bun run update           # Check for updates
bun run update:install  # Install available updates
bun run update:rollback # Rollback last update
bun run monitor          # Check system status
bun run backup           # Create backup of current state

# Production
bun run start            # Start production server
bun run start:dev        # Start in development mode

# Cleanup
bun run clean            # Remove .next directory
bun run clean:all        # Remove .next and node_modules
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root for local development:

```env
# Application
NODE_ENV=development

# Database
DATABASE_URL="file:./db/custom.db"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"

# WebSocket
WEBSOCKET_PORT=3002

# Admin (DEFAULT - CHANGE IN PRODUCTION!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

# Optional: Production
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### Production Environment Variables

For Ubuntu or cPanel deployment, use `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL="https://your-domain.com"
DATABASE_URL="file:./db/custom.db"
WEBSOCKET_PORT=3002
```

### Next.js Configuration

The project includes an optimized `next.config.ts` with:

- ✅ Code splitting enabled
- ✅ Image optimization configured
- ✅ SWC minification
- ✅ React strict mode
- ✅ Server-side rendering optimized
- ✅ Static asset caching headers
- ✅ Security headers

### Default Admin Credentials

⚠️ **IMPORTANT**: Change these credentials in production!

```bash
Username: admin
Password: admin123
```

**To change credentials:**

1. Open admin panel (click "Admin" button in header)
2. Enter default credentials
3. Go to Settings → Security
4. Update username and password
5. Save changes

## 📖 API Documentation

Complete API documentation is available in the **"API Docs"** tab within the application.

### Authentication

All API requests require an API token:

```bash
Headers:
Authorization: YOUR_API_TOKEN
```

### Endpoints

#### Devices
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create new device
- `GET /api/device-status/[id]` - Get device status
- `GET /api/qr-code/[id]` - Get QR code

#### Messages
- `GET /api/send-message` - Send message (query params)
- `POST /api/send-message` - Send single message (JSON body)
- `POST /api/v2/send-message` - Send bulk messages

#### Contacts
- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create new contact

#### Phone Verification
- `GET /api/check-phone-number` - Check if phone is active on WhatsApp

### Example Usage

```bash
# Send single message
curl -X POST http://your-domain.com/api/send-message \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_API_TOKEN" \
  -d '{
    "phone": "6281234567890",
    "message": "Hello, this is a test message!",
    "isGroup": false
  }'

# Send bulk messages
curl -X POST http://your-domain.com/api/v2/send-message \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_API_TOKEN" \
  -d '{
    "data": [
      {
        "phone": "6281234567890",
        "message": "Hello John!"
      },
      {
        "phone": "6289876543210",
        "message": "Hello Jane!"
      }
    ]
  }'
```

## 🔐 Admin Dashboard

### Accessing Admin Panel

1. Click the **"Admin"** button in the header
2. Enter credentials (default: `admin` / `admin123`)
3. Access admin features

### Admin Features

- **User Management** - View and edit user information
- **GitHub Updates** - Check and install updates from GitHub
- **System Status** - Monitor all services
  - WebSocket Service status
  - Active devices count
  - Messages sent statistics
  - Database connection status
- **Quick Actions**:
  - Restart services
  - View system logs
  - Refresh all data
  - Logout
- **Update Management**:
  - Check for updates
  - View changelog
  - Install updates
  - Automatic daily updates
  - Rollback if needed

### Update Management

1. **Check for Updates** - Query GitHub for new version
2. **View Changelog** - See what's new in the update
3. **Install Updates** - One-click update installation
4. **Automatic Updates** - Scheduled daily updates at 2 AM
5. **Rollback** - Easily revert if updates fail

## 📊 Deployment

### Ubuntu Server Deployment

#### Automated Deployment (Recommended)

```bash
# Clone and run installer
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack
chmod +x install.sh
sudo ./install.sh
```

This will:
- ✅ Install all dependencies
- ✅ Configure Nginx
- ✅ Setup SSL (optional)
- ✅ Configure Supervisor
- ✅ Setup Firewall
- ✅ Start all services

### cPanel Hosting Deployment

#### Automated Deployment (Recommended)

```bash
# Clone and run installer
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack
chmod +x cpanel-install.sh
./cpanel-install.sh
```

This will:
- ✅ Install dependencies
- ✅ Build project
- ✅ Create .htaccess for optimization
- ✅ Set up cron jobs
- ✅ Provide access instructions

#### Manual cPanel Deployment

1. Upload files via cPanel File Manager
2. Install dependencies: `bun install` or `npm install`
3. Build: `bun run build`
4. Create `.env.production` with your domain
5. Configure subdomain in cPanel
6. Setup SSL via cPanel SSL/TLS
7. Start application using Node Manager or Supervisor

### Docker Deployment (Alternative)

```dockerfile
# Dockerfile
FROM node:18-alpine

# Install dependencies
RUN npm install -g bun

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN bun install

# Build application
RUN bun run build

# Expose port
EXPOSE 3000

# Start application
CMD ["bun", "run", "start"]
```

Build and run:

```bash
# Build image
docker build -t whatsapp-agent .

# Run container
docker run -p 3000:3000 whatsapp-agent
```

## 🔒 Security

### Best Practices

1. **Change Default Credentials** - Always change admin username/password
2. **Use HTTPS** - Enable SSL for all production deployments
3. **Firewall** - Keep UFW enabled and only allow necessary ports
4. **Updates** - Keep application updated with latest security patches
5. **Backups** - Regularly backup your data and configuration
6. **Monitoring** - Monitor logs and service status regularly
7. **Rate Limiting** - Implement API rate limiting in production
8. **Input Validation** - All user inputs are validated on server
9. **SQL Injection** - Use parameterized queries (Prisma ORM handles this)
10. **XSS Protection** - Content Security Policy headers configured

### Firewall Configuration (Ubuntu)

```bash
# View current rules
sudo ufw status numbered

# Allow necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw allow 3000/tcp # Application
sudo ufw allow 3002/tcp # WebSocket

# Deny all incoming
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Enable firewall
sudo ufw enable
```

### SSL/TLS Configuration

#### Ubuntu (Let's Encrypt)

```bash
# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com --non-interactive --agree-tos

# Auto-renewal
sudo certbot renew --dry-run
```

#### cPanel (Let's Encrypt or Commercial SSL)

1. In cPanel, go to "SSL/TLS Status"
2. Select your domain
3. Click "Install Certificate"
4. For Let's Encrypt: "Issue and Auto-Renew"

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Service Won't Start

**Problem**: Application fails to start on Ubuntu

**Solutions**:
```bash
# Check if ports are in use
sudo lsof -i :3000  # For main app
sudo lsof -i :3002  # For WebSocket

# Kill processes if needed
sudo pkill -f "node.*whatsapp"
sudo pkill -f "bun.*whatsapp"

# Check supervisor logs
sudo tail -f /var/log/whatsapp-agent.err.log

# Restart service
sudo supervisorctl restart whatsapp-agent
```

#### Port Already in Use (cPanel)

**Problem**: Another application is using port 3000

**Solutions**:
```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 <PID>

# Or use cPanel Process Manager to kill Node.js processes
```

#### Nginx 502 Bad Gateway

**Problem**: Nginx can't reach the application

**Solutions**:
```bash
# Check if app is running
sudo supervisorctl status whatsapp-agent

# Check Nginx configuration
sudo nginx -t

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

#### Database Connection Issues

**Problem**: Application can't connect to database

**Solutions**:
```bash
# Check database file permissions
ls -la /var/www/whatsapp-agent/db/

# Fix permissions
sudo chmod -R 777 /var/www/whatsapp-agent/db/

# Reinitialize database
cd /var/www/whatsapp-agent
sudo bun run db:push
```

#### Out of Memory

**Problem**: Application crashes due to insufficient RAM

**Solutions**:
```bash
# Check memory usage
free -h

# Add swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Add to /etc/fstab for persistence
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Restart services
sudo supervisorctl restart whatsapp-agent
```

#### Slow Performance

**Problem**: Application loads slowly

**Solutions**:
```bash
# Clear Bun cache
rm -rf ~/.bun/install/cache

# Clear Next.js cache
rm -rf .next

# Rebuild application
bun run build

# Restart service
sudo supervisorctl restart whatsapp-agent
```

### Performance Monitoring

Use these tools to monitor performance:

```bash
# Check application status
./monitor.sh

# View logs
sudo tail -f /var/log/whatsapp-agent.out.log

# Check disk space
df -h

# Check memory usage
free -m

# Check CPU usage
top
```

### Getting Help

1. **Documentation** - Check "API Docs" tab in the application
2. **Issues** - Open an issue on [GitHub](https://github.com/mauljasmay/whatsappwablasrepack/issues)
3. **Logs** - Check system logs for error messages
4. **Community** - Join discussions on GitHub
5. **Support** - Contact hosting support for server-related issues

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow existing code style and conventions
- Use TypeScript strict typing
- Write meaningful commit messages
- Add tests for new features (if applicable)
- Update documentation as needed

### Submission Guidelines

Before submitting a PR:

- ✅ Code passes linting (`bun run lint`)
- ✅ TypeScript compilation succeeds (`bun run type-check`)
- ✅ All tests pass (if tests exist)
- ✅ Documentation is updated
- ✅ No console warnings or errors

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 📞 Contact & Support

### Getting Help

#### Documentation
- Complete API documentation in the **"API Docs"** tab
- README with installation instructions
- GitHub repository with issues

#### Support Channels

- **GitHub Issues**: https://github.com/mauljasmay/whatsappwablasrepack/issues
- **GitHub Discussions**: https://github.com/mauljasmay/whatsappwablasrepack/discussions
- **Email**: (Replace with your contact email)

#### Ubuntu Server Support

- **System Logs**: `/var/log/whatsapp-agent.out.log`
- **Error Logs**: `/var/log/whatsapp-agent.err.log`
- **Nginx Logs**: `/var/log/nginx/error.log`
- **Supervisor Logs**: `/var/log/supervisor/supervisord.log`

#### cPanel Hosting Support

- **Application Logs**: `~/logs/app.log`
- **Error Logs**: `~/logs/error.log`
- **Restart Script**: `~/restart.sh`
- **Monitoring Script**: `~/monitor.sh`

### Default Credentials

⚠️ **PRODUCTION WARNING**: Change these immediately after deployment!

```
Username: admin
Password: admin123
```

### Hosting-Specific Help

- **Ubuntu**: Check `install.sh` for troubleshooting steps
- **cPanel**: Check `cpanel-install.sh` for detailed instructions
- **Docker**: Check README for Docker deployment guide

## 🙏 Acknowledgments

- Inspired by [Jogja.wablas.com](https://jogja.wablas.com)
- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Theme management by [next-themes](https://github.com/pacocoursey/next-themes)
- Runtime by [Bun](https://bun.sh/)

## 📊 Performance Metrics

### Target Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s
- **Total Blocking Time**: < 200ms
- **Speed Index**: 90+

### Optimization Features Implemented

- ✅ Code splitting and lazy loading
- ✅ Image optimization (WebP, responsive sizes)
- ✅ Gzip/Brotli compression
- ✅ Browser caching strategies
- ✅ Static asset optimization
- ✅ Server-side rendering
- ✅ Incremental Static Regeneration
- ✅ Edge Runtime (Next.js 15)
- ✅ Minified JavaScript and CSS
- ✅ Tree shaking
- ✅ Mobile-optimized code

## 📄 Additional Files

- `install.sh` - Ubuntu server automated installation
- `update.sh` - Update management and installation
- `cpanel-install.sh` - cPanel hosting automated installation
- `.htaccess` - Apache optimization and security configuration
- `next.config.ts` - Optimized Next.js configuration

---

**Made with ❤️ by [Maul Jasmay](https://github.com/mauljasmay)**

**Version**: 1.0.0  
**Last Updated**: 2024-01-20

**Star ⭐ this project if you find it useful!**

**Report Issues**: https://github.com/mauljasmay/whatsappwablasrepack/issues
