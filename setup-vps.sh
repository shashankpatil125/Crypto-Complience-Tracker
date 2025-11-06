#!/bin/bash

# Quick Setup Script for Hostinger VPS
# Run this script on your VPS after connecting via SSH

set -e

echo "🚀 Crypto Compliance Tracker - VPS Setup Script"
echo "================================================"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Detect OS
if [ -f /etc/redhat-release ]; then
    OS="centos"
    echo "✅ Detected CentOS/RHEL/AlmaLinux"
elif [ -f /etc/debian_version ]; then
    OS="debian"
    echo "✅ Detected Ubuntu/Debian"
else
    echo "❌ Unsupported OS"
    exit 1
fi

# Update system
echo ""
echo "📦 Updating system packages..."
if [ "$OS" = "centos" ]; then
    yum update -y
    yum install -y yum-utils
elif [ "$OS" = "debian" ]; then
    apt update && apt upgrade -y
    apt install -y ca-certificates curl gnupg lsb-release
fi

# Install Docker
echo ""
echo "🐳 Installing Docker..."
if [ "$OS" = "centos" ]; then
    yum remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine 2>/dev/null || true
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
elif [ "$OS" = "debian" ]; then
    apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

# Start Docker
echo ""
echo "▶️  Starting Docker service..."
systemctl start docker
systemctl enable docker

# Fix iptables issue
echo ""
echo "🔧 Configuring Docker networking..."
modprobe ip_tables 2>/dev/null || true
modprobe iptable_nat 2>/dev/null || true
modprobe iptable_filter 2>/dev/null || true
modprobe iptable_mangle 2>/dev/null || true

mkdir -p /etc/modules-load.d
echo "ip_tables" >> /etc/modules-load.d/docker.conf
echo "iptable_nat" >> /etc/modules-load.d/docker.conf
echo "iptable_filter" >> /etc/modules-load.d/docker.conf
echo "iptable_mangle" >> /etc/modules-load.d/docker.conf

mkdir -p /etc/docker
cat > /etc/docker/daemon.json <<EOF
{
  "iptables": false
}
EOF

systemctl restart docker

# Configure firewall
echo ""
echo "🔥 Configuring firewall..."
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-port=3000/tcp
    firewall-cmd --permanent --add-port=3001/tcp
    firewall-cmd --permanent --add-port=27017/tcp
    firewall-cmd --reload
    echo "✅ Firewalld configured"
elif command -v ufw &> /dev/null; then
    ufw allow 3000/tcp
    ufw allow 3001/tcp
    ufw allow 27017/tcp
    echo "✅ UFW configured"
else
    echo "⚠️  No firewall detected. Please configure manually."
fi

# Verify Docker installation
echo ""
echo "✅ Verifying Docker installation..."
docker --version
docker compose version

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <your-repo-url>"
echo "2. Navigate to project: cd Crypto-Complience-Tracker"
echo "3. Create .env file with your configuration"
echo "4. Start services: docker compose up -d --build"
echo ""
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"

