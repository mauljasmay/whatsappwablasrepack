# WhatsApp Agent - Quick Setup & Installation Guide

## 🚀 **Quick Setup - Choose Your Environment**

### Option 1: Universal Setup (Easiest) ⭐
```bash
# Clone repository
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack

# Run universal setup wizard
chmod +x setup.sh
./setup.sh
```

The universal `setup.sh` script will:
- ✅ **Auto-detect** Ubuntu Server or cPanel Hosting
- ✅ **Install** Bun runtime (or Node.js)
- ✅ **Clone** project from GitHub
- ✅ **Install** dependencies
- ✅ **Build** for production
- ✅ **Configure** server (Nginx for Ubuntu)
- ✅ **Create** monitoring scripts
- ✅ **Start** services automatically

---

### Option 2: Ubuntu Server Setup
```bash
# Clone repository
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack

# Make script executable
chmod +x install.sh

# Run Ubuntu installer (requires sudo)
sudo ./install.sh
```

### Option 3: cPanel Hosting Setup
```bash
# Clone repository
git clone https://github.com/mauljasmay/whatsappwablasrepack.git
cd whatsappwablasrepack

# Make script executable
chmod +x cpanel-install.sh

# Run cPanel installer
./cpanel-install.sh
```

---

## 📋 **Script Descriptions**

### `setup.sh` - Universal Setup Wizard ⭐
**Best for: Quick setup, beginners, or unsure about environment**

**Features:**
- ✅ Auto-detect Ubuntu Server or cPanel Hosting
- ✅ Install Bun runtime (fastest) or Node.js
- ✅ Clone project from GitHub
- ✅ Install all dependencies
- ✅ Build for production
- ✅ Configure server (Nginx, Supervisor for Ubuntu)
- ✅ Create monitoring and restart scripts
- ✅ Set proper permissions
- ✅ Start all services
- ✅ Post-installation instructions

**Usage:**
```bash
# Auto-detect and setup
./setup.sh

# Specify environment
ENVIRONMENT=ubuntu ./setup.sh
ENVIRONMENT=cpanel ./setup.sh
```

---

### `install.sh` - Ubuntu Server Installation
**Best for: Ubuntu VPS, dedicated servers, production deployments**

**Features:**
- ✅ System requirements check
- ✅ Ubuntu version detection
- ✅ Install system dependencies (Nginx, Supervisor, UFW, Fail2ban, etc.)
- ✅ Install Bun runtime
- ✅ Clone/update project from GitHub
- ✅ Configure Nginx with reverse proxy
- ✅ Setup SSL with Let's Encrypt (optional)
- ✅ Configure Supervisor for process management
- ✅ Setup UFW firewall (allow ports: 22, 80, 443, 3000, 3002)
- ✅ Configure Fail2ban for intrusion prevention
- ✅ Setup automatic updates (cron at 2 AM)
- ✅ Set file permissions (www-data:www-data)
- ✅ Start all services (Nginx, WhatsApp Agent, WebSocket)
- ✅ Display post-installation instructions

**Usage:**
```bash
# Interactive setup with SSL prompt
sudo ./install.sh

# Or skip SSL and use HTTP only
sudo SKIP_SSL=true ./install.sh
```

---

### `cpanel-install.sh` - cPanel Hosting Installation
**Best for: Shared hosting, cPanel accounts, easy deployments**

**Features:**
- ✅ Check for cPanel environment
- ✅ Install Node.js (via NVM) or Bun
- ✅ Setup project in public_html
- ✅ Install dependencies
- ✅ Build for production
- ✅ Create `.env.production` with defaults
- ✅ Create Apache `.htaccess` with optimizations
- ✅ Setup restart script (`restart.sh`)
- ✅ Create monitoring script (`monitor.sh`)
- ✅ Setup cron jobs for auto-restart (every 6 hours)
- ✅ Create logs directory
- ✅ Post-installation instructions for cPanel

**Usage:**
```bash
# Run from home directory
./cpanel-install.sh

# After installation:
cd ~/public_html/whatsapp-agent
./restart.sh    # Start application
./monitor.sh    # Check status
```

---

### `update.sh` - Update Manager
**Best for: Checking updates, installing updates, rollback**

**Features:**
- ✅ Check for GitHub updates
- ✅ Display changelog (if update available)
- ✅ Install updates with automatic backup
- ✅ Rollback to previous backup
- ✅ Show current status (git, database, services)
- ✅ Clean old backups (keep last 5)
- ✅ Detailed error handling and messages

**Usage:**
```bash
# Check for updates
./update.sh check

# Install updates
./update.sh install

# Rollback to previous version
./update.sh rollback

# Show current status
./update.sh status

# Clean old backups
./update.sh clean
```

---

## 📦 **Package.json Scripts**

### Development
```bash
bun run dev              # Start development server (port 3000)
bun run start:dev        # Start dev with next
bun run analyze          # Analyze bundle size
bun run lint             # Run ESLint
bun run lint:fix         # Auto-fix lint errors
bun run format           # Format code with Prettier
bun run type-check       # Check TypeScript types
```

### Building
```bash
bun run build            # Build for production
bun run build:profile    # Build with profiling
bun run clean            # Clean .next directory
bun run clean:all        # Clean .next and node_modules
bun run verify           # Verify build
```

### Database
```bash
bun run db:push          # Push schema to database
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Run migrations
bun run db:reset         # Reset database
bun run db:seed          # Seed database with sample data
```

### Setup & Deployment
```bash
bun run setup            # Run universal setup wizard
bun run setup:quick      # Quick build and start
bun run deploy           # Git commit (manual deploy)
bun run deploy:cpanel    # Run cPanel installer
bun run deploy:ubuntu    # Run Ubuntu installer
```

### Updates & Management
```bash
bun run update            # Check for updates
bun run update:install   # Install updates
bun run backup            # Create backup archive
bun run check             # Verify dependencies and build
bun run health            # Check application health
```

### Monitoring
```bash
bun run monitor           # Start WebSocket service
bun run monitor:socket    # Start socket service
```

---

## 🔍 **Health Check API**

### Endpoint: `/api/health`

**Response Example:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "environment": "production",
  "version": "1.0.0",
  "checks": {
    "database": {
      "status": "connected",
      "message": "Database accessible"
    },
    "build": {
      "status": "built",
      "message": "Production build found"
    },
    "environment": {
      "status": "ok",
      "message": "Production environment"
    },
    "filesystem": {
      "status": "ok",
      "message": "File system accessible"
    }
  },
  "services": {
    "webapp": {
      "status": "running",
      "message": "Web application running"
    },
    "websocket": {
      "status": "running",
      "message": "WebSocket service running"
    }
  },
  "uptime": {
    "process_uptime": 3600.5,
    "message": "Process running since startup"
  },
  "memory": {
    "used": {
      "rss": 12345678,
      "heapTotal": 23456789,
      "heapUsed": 9876543,
      "external": 1234567
    },
    "total": {
      "rss": 12345678,
      "heapTotal": 23456789,
      "heapUsed": 9876543,
      "external": 1234567
    },
    "message": "Memory usage information"
  }
}
```

**Usage:**
```bash
# Check health
curl http://localhost:3000/api/health

# With verbose
curl -v http://localhost:3000/api/health

# Check specific check
curl http://localhost:3000/api/health | jq '.checks.database.status'
```

---

## 📖 **Troubleshooting**

### Installation Fails

**Problem:** "Permission denied"
```bash
# Solution: Make scripts executable
chmod +x setup.sh cpanel-install.sh install.sh update.sh

# Or run with bash explicitly
bash setup.sh
```

**Problem:** "Command not found: bun"
```bash
# Solution: Install Bun
curl -fsSL https://bun.sh/install/bun | bash

# Or use npm
npm install
npm run build
npm start
```

**Problem:** "Module not found" errors
```bash
# Solution: Clean install dependencies
rm -rf node_modules package-lock.json
bun install

# Or try with npm
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

**Problem:** Build fails with errors
```bash
# Solution: Check TypeScript errors
bun run type-check

# Solution: Run linter
bun run lint

# Solution: Clean and rebuild
bun run clean
bun run build
```

### Application Won't Start

**Problem:** Application fails to start
```bash
# Check health
curl http://localhost:3000/api/health

# Check logs
# Ubuntu
sudo tail -f /var/log/whatsapp-agent.out.log

# cPanel
cd ~/public_html/whatsapp-agent
tail -f logs/app.log

# Check if port is in use
sudo lsof -i :3000  # Ubuntu
lsof -i :3000        # cPanel

# Kill process
sudo pkill -f "bun.*whatsapp"  # Ubuntu
pkill -f "bun.*whatsapp"        # cPanel
```

### Database Issues

**Problem:** Database connection errors
```bash
# Solution: Check database file exists
ls -la db/

# Solution: Fix permissions (Ubuntu)
sudo chmod -R 777 /var/www/whatsapp-agent/db

# Solution: Fix permissions (cPanel)
cd ~/public_html/whatsapp-agent
chmod -R 777 db/

# Solution: Reset database
bun run db:reset
```

### Update Issues

**Problem:** Update installation fails
```bash
# Solution: Rollback to previous version
./update.sh rollback

# Solution: Manual rollback (Ubuntu)
cd /var/backups/whatsapp-agent
ls -t
# Copy latest backup to project directory

# Solution: Manual rollback (cPanel)
cd ~/backups/whatsapp-agent
ls -t
# Copy latest backup to project directory
```

---

## 🔒 **Security Best Practices**

### Production Deployment
1. **Change Default Credentials**
   - Username: `admin` → Change to strong username
   - Password: `admin123` → Change to strong password

2. **Enable SSL/TLS**
   - Ubuntu: Use Let's Encrypt (during install or manually)
   - cPanel: Configure SSL in cPanel SSL/TLS

3. **Firewall Configuration**
   - Ubuntu: UFW enabled by installer
   - cPanel: Check with hosting provider

4. **Update Regularly**
   - Automatic updates enabled (daily at 2 AM)
   - Manual: `./update.sh check` → `./update.sh install`

5. **Monitor Logs**
   - Check logs regularly for suspicious activity
   - Use `./monitor.sh` or `sudo tail -f /var/log/whatsapp-agent.out.log`

6. **Backup Strategy**
   - Automatic backups before updates
   - Manual: `bun run backup`
   - Keep backups off-site (disaster recovery)

---

## 📊 **Monitoring & Maintenance**

### Ubuntu Server
```bash
# Check application status
./update.sh status

# Monitor application
sudo tail -f /var/log/whatsapp-agent.out.log

# Supervisor status
sudo supervisorctl status whatsapp-agent
sudo supervisorctl status whatsapp-socket

# Restart application
sudo supervisorctl restart whatsapp-agent

# Stop application
sudo supervisorctl stop whatsapp-agent

# View all logs
sudo supervisorctl tail whatsapp-agent stderr
sudo supervisorctl tail whatsapp-agent stdout
```

### cPanel Hosting
```bash
# Check status
./monitor.sh

# Restart application
./restart.sh

# View logs
tail -f logs/app.log

# Check disk usage
du -sh ./

# Check memory
free -m
```

### Automatic Maintenance
**Ubuntu:**
- ✅ Automatic updates: Daily at 2 AM (crontab)
- ✅ Automatic restart: Via Supervisor (autorestart=true)
- ✅ Log rotation: Via Supervisor (log rotation enabled)

**cPanel:**
- ✅ Automatic restart: Every 6 hours (crontab)
- ✅ Log management: Check with `./monitor.sh`
- ✅ Manual backup: `bun run backup`

---

## 🚨 **Common Errors & Solutions**

### Error: "EADDRINUSE: address already in use"
**Problem:** Port 3000 is already in use
```bash
# Solution: Find and kill process
sudo lsof -i :3000
sudo kill -9 <PID>

# Or use different port
PORT=3001 bun run start
```

### Error: "Cannot find module 'xxx'"
**Problem:** Module not installed
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
bun install
```

### Error: "Failed to connect to database"
**Problem:** Database file missing or corrupted
```bash
# Solution: Reset database
bun run db:push

# Or recreate
rm -rf db/custom.db
bun run db:push
```

### Error: "Permission denied"
**Problem:** Insufficient permissions
```bash
# Ubuntu: Run with sudo
sudo ./install.sh

# cPanel: Check directory permissions
ls -la ./
chmod -R 755 .
chmod -R 777 db/
```

### Error: "Build failed with errors"
**Problem:** TypeScript or ESLint errors
```bash
# Solution: Check TypeScript
bun run type-check

# Solution: Fix ESLint
bun run lint:fix

# Solution: Clean rebuild
bun run clean:all
bun run build
```

---

## 📞 **Getting Help**

### Documentation
- **Complete README**: https://github.com/mauljasmay/whatsappwablasrepack#readme
- **API Docs**: `/api/payment` or in-app API Docs tab
- **Xendit Integration**: https://docs.xendit.co/docs/payments-via-api-overview

### Support Channels
- **GitHub Issues**: https://github.com/mauljasmay/whatsappwablasrepack/issues
- **GitHub Discussions**: https://github.com/mauljasmay/whatsappwablasrepack/discussions
- **Xendit Support**: https://help.xendit.co

### Community
- **Xendit Developers**: https://developers.xendit.co
- **Xendit Community**: https://community.xendit.co

---

## 🎯 **Recommended Setup Flow**

### For New Ubuntu Server:
1. `sudo apt-get update`
2. `git clone https://github.com/mauljasmay/whatsappwablasrepack.git`
3. `cd whatsappwablasrepack`
4. `chmod +x setup.sh`
5. `sudo ./setup.sh`
6. Configure SSL when prompted
7. Access application: `http://your-server-ip`
8. Change admin credentials
9. Test all features

### For New cPanel Account:
1. Upload files via File Manager (or clone via SSH)
2. Extract to `public_html/whatsapp-agent`
3. `chmod +x setup.sh`
4. `./setup.sh` (or run `cpanel-install.sh` directly)
5. Configure subdomain in cPanel
6. Configure SSL in cPanel (optional but recommended)
7. Access application: `https://your-subdomain.com`
8. Change admin credentials
9. Test all features

### For Development:
1. `git clone https://github.com/mauljasmay/whatsappwablasrepack.git`
2. `cd whatsappwablasrepack`
3. `bun install`
4. `bun run db:push`
5. `bun run dev`
6. Access application: `http://localhost:3000`

---

## ✅ **Verification Checklist**

After installation, verify:

- [ ] Application starts successfully
- [ ] Can access via browser
- [ ] Health check returns `{"status": "healthy"}`
- [ ] Can login with admin credentials
- [ ] Can access all main features
- [ ] Mobile responsive on phone
- [ ] Dark mode toggle works
- [ ] API endpoints respond correctly
- [ ] Database connection works
- [ ] Logs show no critical errors
- [ ] SSL works (if configured)
- [ ] Services are running (Supervisor/cron)
- [ ] Backups are being created

---

## 🔧 **Advanced Configuration**

### Custom Port
```bash
# Edit .env.production
PORT=3001

# Start application
PORT=3001 bun run start
```

### Custom Domain
```bash
# Edit .env.production
NEXT_PUBLIC_API_URL=https://custom-domain.com
NEXTAUTH_URL=https://custom-domain.com
```

### Production Database (PostgreSQL)
```bash
# Update DATABASE_URL in .env.production
DATABASE_URL=postgresql://user:password@localhost:5432/whatsapp-agent

# Install PostgreSQL client
bun add @prisma/client pg
```

### Custom Supervisor Configuration
```bash
# Edit /etc/supervisor/conf.d/whatsapp-agent.conf
[program:whatsapp-agent]
command=bun run start
directory=/var/www/whatsapp-agent
user=www-data
autostart=true
autorestart=true
environment=NODE_ENV="production",CUSTOM_VAR="value"

# Reload Supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart whatsapp-agent
```

---

## 📚 **Additional Resources**

### Project Documentation
- Main README: Comprehensive guide with all features
- This File: Quick setup and installation
- GitHub: Source code and issues
- In-App: API Docs tab with complete API reference

### External Documentation
- Next.js: https://nextjs.org/docs
- Bun: https://bun.sh/docs
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Xendit: https://docs.xendit.co

---

## 🎉 **Summary**

The project now has **4 installation/management scripts**:

1. **`setup.sh`** ⭐ - Universal setup wizard (recommended)
2. **`install.sh`** - Ubuntu server installation
3. **`cpanel-install.sh`** - cPanel hosting installation
4. **`update.sh`** - Update and rollback manager

**New Features:**
- ✅ Health check API endpoint
- ✅ Universal setup wizard
- ✅ Improved error handling
- ✅ Rollback functionality
- ✅ Better validation
- ✅ Color-coded output
- ✅ Progress indicators
- ✅ Detailed help messages

---

**For any issues or questions, check the troubleshooting section above or open a GitHub issue!**

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-20  
**Author**: Maul Jasmay
