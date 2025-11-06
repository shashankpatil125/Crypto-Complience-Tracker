# Quick Commands Guide - After Docker Setup

## ✅ Current Status Check

### 1. Check if all containers are running:
```bash
docker compose ps
```
**Expected output:** All 3 services (frontend, backend, mongodb) should show "Up" status

### 2. Check container logs:
```bash
# View all logs
docker compose logs

# View logs for specific service
docker compose logs frontend
docker compose logs backend
docker compose logs mongodb

# Follow logs in real-time
docker compose logs -f
```

### 3. Test if services are responding:
```bash
# Test backend API
curl http://localhost:3001/api/test

# Test frontend
curl http://localhost:3000

# Check MongoDB connection
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

---

## 🌐 Access Your Application

### Find your server IP:
```bash
# Get your VPS IP address
hostname -I
# or
ip addr show
```

### Access URLs:
- **Frontend**: `http://YOUR_VPS_IP:3000`
- **Backend API**: `http://YOUR_VPS_IP:3001/api`
- **Test API**: `http://YOUR_VPS_IP:3001/api/test`

**Example:**
- If your IP is `123.45.67.89`:
  - Frontend: `http://123.45.67.89:3000`
  - Backend: `http://123.45.67.89:3001/api`

---

## 🔧 Common Management Commands

### Restart services:
```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart frontend
docker compose restart backend
docker compose restart mongodb
```

### Stop services:
```bash
# Stop all services (containers remain)
docker compose stop

# Stop and remove containers
docker compose down

# Stop, remove containers AND volumes (⚠️ deletes MongoDB data)
docker compose down -v
```

### Start services:
```bash
# Start stopped services
docker compose start

# Start and rebuild (after code changes)
docker compose up -d --build
```

### View resource usage:
```bash
# See CPU, memory usage of containers
docker stats

# Exit: Press Ctrl+C
```

---

## 🔄 Update Application (After Code Changes)

```bash
# Navigate to project directory
cd /path/to/Crypto-Complience-Tracker

# Pull latest code
git pull

# Rebuild and restart containers
docker compose up -d --build

# Check logs
docker compose logs -f
```

---

## 🗄️ MongoDB Management

### Access MongoDB shell:
```bash
docker compose exec mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

### Backup MongoDB:
```bash
# Create backup
docker compose exec mongodb mongodump --archive=/data/db/backup.archive --gzip

# Copy backup to host
docker compose cp mongodb:/data/db/backup.archive.gz ./backup-$(date +%Y%m%d).archive.gz
```

### Restore MongoDB:
```bash
# Copy backup to container
docker compose cp ./backup.archive.gz mongodb:/data/db/backup.archive.gz

# Restore
docker compose exec mongodb mongorestore --archive=/data/db/backup.archive.gz --gzip
```

---

## 🔍 Troubleshooting Commands

### Check if ports are in use:
```bash
# Check port 3000
sudo lsof -i :3000

# Check port 3001
sudo lsof -i :3001

# Check port 27017
sudo lsof -i :27017
```

### Check disk space:
```bash
df -h
```

### Check memory:
```bash
free -h
```

### View detailed container info:
```bash
# Inspect specific container
docker inspect crypto-compliance-tracker-frontend
docker inspect crypto-compliance-tracker-backend
docker inspect crypto-compliance-tracker-mongodb
```

### Check Docker system info:
```bash
docker system df
docker system info
```

---

## 🔥 Firewall Check (If Can't Access from Outside)

### Check firewall status:
```bash
# CentOS/RHEL
sudo firewall-cmd --list-all

# Ubuntu/Debian
sudo ufw status
```

### Open ports if needed:
```bash
# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload

# Ubuntu/Debian
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw reload
```

---

## 📝 Environment Configuration

### View current environment variables:
```bash
docker compose exec frontend env | grep NEXT_PUBLIC
docker compose exec backend env | grep MONGODB
```

### Update environment variables:
```bash
# Edit .env file
nano .env

# After editing, restart containers
docker compose down
docker compose up -d
```

---

## 🚀 Next Steps (Production Setup)

### 1. Set up Nginx Reverse Proxy:
```bash
# Install Nginx
sudo yum install -y nginx  # CentOS
# or
sudo apt install -y nginx  # Ubuntu

# Create config
sudo nano /etc/nginx/conf.d/crypto-compliance.conf
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Set up SSL (Let's Encrypt):
```bash
# Install Certbot
sudo yum install -y certbot python3-certbot-nginx  # CentOS
# or
sudo apt install -y certbot python3-certbot-nginx  # Ubuntu

# Get certificate
sudo certbot --nginx -d your-domain.com
```

### 3. Update Frontend API URL:
Edit `.env` file:
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
# or
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

Then restart:
```bash
docker compose restart frontend
```

---

## 📊 Monitoring Commands

### Watch logs continuously:
```bash
docker compose logs -f --tail=100
```

### Check container health:
```bash
docker compose ps
# Look for "healthy" status
```

### Monitor resource usage:
```bash
watch docker stats
```

---

## 🛑 Emergency Commands

### If containers keep crashing:
```bash
# Stop everything
docker compose down

# Remove all containers and volumes
docker compose down -v

# Clean Docker system
docker system prune -a

# Rebuild from scratch
docker compose up -d --build
```

### If MongoDB won't start:
```bash
# Check MongoDB logs
docker compose logs mongodb

# Remove MongoDB volume and restart
docker compose down
docker volume rm crypto-compliance-tracker_mongodb_data
docker compose up -d
```

---

## ✅ Quick Health Check Script

Run this to check everything:
```bash
echo "=== Container Status ==="
docker compose ps

echo ""
echo "=== Backend Health ==="
curl -s http://localhost:3001/api/test | head -20

echo ""
echo "=== Frontend Health ==="
curl -s http://localhost:3000 | head -20

echo ""
echo "=== MongoDB Health ==="
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')" --quiet

echo ""
echo "=== Disk Space ==="
df -h | grep -E 'Filesystem|/dev/'

echo ""
echo "=== Memory Usage ==="
free -h
```

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| View logs | `docker compose logs -f` |
| Restart all | `docker compose restart` |
| Stop all | `docker compose down` |
| Start all | `docker compose up -d` |
| Rebuild | `docker compose up -d --build` |
| Check status | `docker compose ps` |
| View stats | `docker stats` |
| Access MongoDB | `docker compose exec mongodb mongosh -u admin -p admin123 --authenticationDatabase admin` |

---

**Your application should now be accessible at:**
- Frontend: `http://YOUR_VPS_IP:3000`
- Backend: `http://YOUR_VPS_IP:3001/api`

If you can't access from outside, check firewall settings above! 🔥


