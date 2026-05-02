# PoolCalculator ⚡

A professional, fast, and lightweight suite of electronics calculators designed for students, hobbyists, and engineers.

## 🚀 Features
- **Resistor Calculator**: Supports 4, 5, and 6-band color codes + Bidirectional value-to-color validation.
- **Capacitor Calculator**: Decode Ceramic, Film, and SMD marking codes.
- **Inductor Calculator**: Supports Axial (Color Band), Helical, and SMD Inductors.
- **LED Resistor Calculator**: Calculate the perfect current-limiting resistor for your circuit.
- **SMD Resistor Code**: Decode 3-digit, 4-digit, and EIA-96 surface-mount codes.
- **Privacy-First**: Integrated Cookie Consent system compliant with Google AdSense.
- **Dark Mode**: High-contrast professional dark theme.
- **SEO Optimized**: Pre-configured meta tags for all tools.

---

## 🛠 VPS Deployment Guide (Nginx)

This guide explains how to host PoolCalculator on a VPS using Nginx on a non-standard port (to avoid conflicts with Docker/other services).

### 1. Build the Project
On your local machine or server, run:
```bash
npm install
npm run build
```
This creates a `build/` folder containing the production-ready static files.

### 2. Configure Nginx
Create a new Nginx configuration file (e.g., `/etc/nginx/sites-available/poolcalculator`):

```nginx
server {
    # Listen on a custom port (e.g., 3005)
    listen 3005;
    server_name your-domain.com; # Replace with your domain or IP

    root /var/www/poolcalculator/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Optional: Enable Gzip compression for faster performance
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 3. Deploy Files
Upload the contents of the `build/` folder to `/var/www/poolcalculator/build` on your VPS.

### 4. Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/poolcalculator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Firewall Configuration
Ensure the custom port is open:
```bash
sudo ufw allow 3005
```

---

## 🏗 Development
To run the project locally in development mode:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

---

## 🎨 Technology Stack
- **Frontend**: React.js
- **Routing**: React Router DOM
- **SEO**: React Helmet Async
- **Styling**: Vanilla CSS (Custom Variable System)
- **Deployment**: Optimized for Static Hosting / Nginx

---

## 📄 License
This project is for educational and hobbyist use. (C) 2026 PoolCalculator.
