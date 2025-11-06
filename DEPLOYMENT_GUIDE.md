# Hostinger VPS Deployment Guide

## Prerequisites
- Hostinger VPS access (SSH)
- Domain name (optional, for production)
- Git repository access

---

## Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh root@your-domain.com
```

If you have a non-root user:
```bash
ssh your-username@your-vps-ip
```

---

## Step 2: Update System Packages

```bash
# For CentOS/RHEL/AlmaLinux
sudo yum update -y

# For Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
```

---

## Step 3: Install Docker

### For CentOS/RHEL/AlmaLinux (Hostinger usually uses this):

```bash
# Remove old Docker versions if any
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# Install required packages
sudo yum install -y yum-utils

# Add Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

### For Ubuntu/Debian:

```bash
# Remove old Docker versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install prerequisites
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

---

## Step 4: Fix Docker iptables Issue (if needed)

If Docker fails to start (iptables error), run:

```bash
# Load required kernel modules
sudo modprobe ip_tables
sudo modprobe iptable_nat
sudo modprobe iptable_filter
sudo modprobe iptable_mangle

# Make modules load on boot
echo "ip_tables" | sudo tee -a /etc/modules-load.d/docker.conf
echo "iptable_nat" | sudo tee -a /etc/modules-load.d/docker.conf
echo "iptable_filter" | sudo tee -a /etc/modules-load.d/docker.conf
echo "iptable_mangle" | sudo tee -a /etc/modules-load.d/docker.conf

# Configure Docker daemon
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "iptables": false
}
EOF

# Restart Docker
sudo systemctl restart docker
sudo systemctl status docker
```

---

## Step 5: Clone Your Repository

```bash
# Navigate to a suitable directory
cd /opt
# or
cd /home/your-username

# Clone your repository
git clone https://github.com/your-username/Crypto-Complience-Tracker.git
cd Crypto-Complience-Tracker

# Or if you already have it, pull latest changes
git pull origin main
```

---

## Step 6: Configure Firewall

```bash
# For CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --permanent --add-port=27017/tcp
sudo firewall-cmd --reload

# For Ubuntu/Debian (ufw)
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw allow 27017/tcp
sudo ufw reload

# Check firewall status
sudo firewall-cmd --list-all  # CentOS
# or
sudo ufw status  # Ubuntu
```

---

## Step 7: Create Environment File (Optional)

Create a `.env` file in the project root for production settings:

```bash
cd /opt/Crypto-Complience-Tracker
# or wherever your project is

nano .env
```

Add these variables (adjust as needed):

```env
# MongoDB Configuration
MONGODB_URL=mongodb://admin:admin123@mongodb:27017/crypto-compliance?authSource=admin
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password-here

# Backend Configuration
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-use-long-random-string
JWT_EXPIRES_IN=7d

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://your-domain.com:3001/api
# Or if using IP: http://your-vps-ip:3001/api
```

Save and exit (Ctrl+X, then Y, then Enter)

---

## Step 8: Build and Start Containers

```bash
# Make sure you're in the project root
cd /opt/Crypto-Complience-Tracker

# Build and start all services
docker compose up -d --build

# Check if containers are running
docker compose ps

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f mongodb
```

---

## Step 9: Verify Services Are Running

```bash
# Check container status
docker compose ps

# Test backend API
curl http://localhost:3001/api/test

# Test frontend (should return HTML)
curl http://localhost:3000

# Check MongoDB
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

---

## Step 10: Access Your Application

- **Frontend**: `http://your-vps-ip:3000` or `http://your-domain.com:3000`
- **Backend API**: `http://your-vps-ip:3001/api` or `http://your-domain.com:3001/api`

---

## Step 11: Set Up Nginx Reverse Proxy (Recommended for Production)

### Install Nginx:

```bash
# CentOS/RHEL
sudo yum install -y nginx

# Ubuntu/Debian
sudo apt install -y nginx

sudo systemctl start nginx
sudo systemctl enable nginx
```

### Create Nginx Configuration:

```bash
sudo nano /etc/nginx/conf.d/crypto-compliance.conf
```

Add this configuration:

```nginx
# Frontend
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Backend API
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 12: Set Up SSL with Let's Encrypt (Optional but Recommended)

```bash
# Install Certbot
# CentOS/RHEL
sudo yum install -y certbot python3-certbot-nginx

# Ubuntu/Debian
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com -d api.your-domain.com

# Auto-renewal is set up automatically
```

---

## Step 13: Useful Commands

### View logs:
```bash
docker compose logs -f              # All services
docker compose logs -f frontend     # Frontend only
docker compose logs -f backend      # Backend only
```

### Restart services:
```bash
docker compose restart              # Restart all
docker compose restart frontend     # Restart specific service
```

### Stop services:
```bash
docker compose down                 # Stop and remove containers
docker compose down -v              # Also remove volumes (⚠️ deletes data)
```

### Update application:
```bash
cd /opt/Crypto-Complience-Tracker
git pull
docker compose up -d --build
```

### Backup MongoDB:
```bash
docker compose exec mongodb mongodump --archive=/data/db/backup.archive
docker compose cp mongodb:/data/db/backup.archive ./backup-$(date +%Y%m%d).archive
```

---

## Troubleshooting

### If containers won't start:
```bash
# Check Docker status
sudo systemctl status docker

# Check logs
docker compose logs

# Check disk space
df -h

# Check memory
free -h
```

### If port is already in use:
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :3001

# Kill process (replace PID)
sudo kill -9 <PID>
```

### If MongoDB connection fails:
```bash
# Check MongoDB logs
docker compose logs mongodb

# Test MongoDB connection
docker compose exec mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

---

## Security Recommendations

1. **Change default passwords** in `.env` file
2. **Use strong JWT_SECRET** (generate with: `openssl rand -base64 32`)
3. **Restrict MongoDB port** (27017) to localhost only in firewall
4. **Set up fail2ban** for SSH protection
5. **Keep system updated**: `sudo yum update` or `sudo apt update`
6. **Use SSH keys** instead of passwords
7. **Enable firewall** and only open necessary ports

---

## Monitoring

### Set up automatic restarts:
Docker Compose already has `restart: unless-stopped` configured.

### Monitor resource usage:
```bash
docker stats
```

### Set up log rotation:
Docker handles this automatically, but you can configure it in `/etc/docker/daemon.json`

---

## Next Steps

1. ✅ Test your application
2. ✅ Set up domain DNS records
3. ✅ Configure SSL certificates
4. ✅ Set up monitoring/alerting
5. ✅ Configure backups
6. ✅ Set up CI/CD (optional)

Your application should now be running on your Hostinger VPS! 🚀

