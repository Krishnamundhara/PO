# Deployment Guide

This guide covers deploying your PO Generator app to production.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Supabase database set up with all tables
- [ ] Environment variables configured
- [ ] Company details added
- [ ] Sample data (mills, products, customers) added for testing
- [ ] PDF generation tested
- [ ] Offline functionality verified

## Option 1: Deploy to Vercel (Recommended)

Vercel offers the best experience for Vite + React apps with zero configuration.

### Steps:

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PO Generator app"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/po-generator.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```
   - Click "Deploy"

4. **Access Your App**
   - Your app will be available at `https://your-project.vercel.app`
   - Custom domain can be added in Vercel settings

### Continuous Deployment

Once set up, every push to `main` branch automatically deploys!

## Option 2: Deploy to Netlify

### Steps:

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   
   **Method A: Drag and Drop**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to Netlify's drop zone
   
   **Method B: Git Integration**
   - Push code to GitHub (see Vercel steps above)
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables in "Site settings" → "Environment variables"
   - Click "Deploy site"

3. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

## Option 3: Deploy to Your Own Server

### Prerequisites:
- A server with Node.js installed
- Nginx or Apache configured
- SSL certificate (Let's Encrypt recommended)

### Steps:

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   ```bash
   # Using SCP
   scp -r dist/* user@your-server:/var/www/po-generator/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /var/www/po-generator;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript;
   }
   ```

4. **Set Up SSL**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Option 4: Deploy with Docker

### Dockerfile

Create a `Dockerfile` in the root:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Build and Run

```bash
# Build image
docker build -t po-generator .

# Run container
docker run -p 80:80 po-generator
```

## Post-Deployment

### 1. Test the Deployment

- [ ] Sign up works
- [ ] Login works
- [ ] All pages load
- [ ] Can create mills, products, customers
- [ ] Can create purchase orders
- [ ] PDF generation works
- [ ] PDF download works
- [ ] PDF sharing works (on mobile)
- [ ] Offline mode works
- [ ] Data syncs after going online

### 2. Configure Custom Domain

**Vercel:**
- Go to Project Settings → Domains
- Add your domain
- Update DNS records as instructed

**Netlify:**
- Go to Site settings → Domain management
- Add custom domain
- Update DNS records

### 3. Enable Analytics (Optional)

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

In `src/App.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react'

// Add <Analytics /> component
```

**Google Analytics:**
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. Set Up Error Monitoring (Optional)

**Sentry:**
```bash
npm install @sentry/react
```

Configure in `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## Performance Optimization

### 1. Enable Caching

In `vite.config.js`, caching is already configured for PWA.

### 2. Image Optimization

If you add images:
- Use WebP format
- Compress images (tinypng.com)
- Use appropriate sizes
- Lazy load images

### 3. Monitor Performance

Use these tools:
- Lighthouse (Chrome DevTools)
- GTmetrix
- WebPageTest

Target metrics:
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Largest Contentful Paint: < 2.5s

## Backup & Maintenance

### Database Backups

Supabase automatically backs up your database. To export:
1. Go to Supabase Dashboard
2. Database → Backups
3. Download backup

### Regular Updates

Keep dependencies updated:
```bash
npm outdated
npm update
```

### Security Updates

Monitor for security issues:
```bash
npm audit
npm audit fix
```

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors
- Verify all imports

### Environment Variables Not Working

- Ensure they start with `VITE_`
- Restart build after changing env vars
- Check they're added in deployment platform

### App Loads but Doesn't Work

- Check browser console for errors
- Verify Supabase credentials
- Check CORS settings in Supabase
- Verify database tables exist

### PDF Generation Fails

- Check browser compatibility (Chrome/Edge recommended)
- Verify company details are set
- Check browser console for errors

## Support

For issues:
1. Check browser console
2. Check server logs
3. Verify Supabase connection
4. Review deployment platform logs

---

**Congratulations! Your PO Generator is now live! 🚀**
