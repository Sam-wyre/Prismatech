# 🚀 PrismaTech Setup Guide

## **Step 1: Create GitHub Repository**

### **Option A: Create on GitHub.com**
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name: `prismatech` or `prismatech-landing`
4. Description: "PrismaTech AI-powered web development platform"
5. Make it **Public** (for free Netlify hosting)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### **Option B: Use GitHub CLI**
```bash
gh repo create prismatech --public --description "PrismaTech AI-powered web development platform"
```

## **Step 2: Connect Local Repository to GitHub**

```bash
# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/prismatech.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## **Step 3: Set up Netlify Integration**

### **Method 1: Connect GitHub to Netlify (Recommended)**
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" as provider
4. Select your `prismatech` repository
5. Configure build settings:
   - **Build command**: `npm run build` (or leave empty for static site)
   - **Publish directory**: `.` (root directory)
6. Click "Deploy site"

### **Method 2: Manual Deployment**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## **Step 4: Configure Environment Variables**

### **In Netlify Dashboard:**
1. Go to Site settings → Environment variables
2. Add these variables:

```
EMAILJS_USER_ID=your_emailjs_user_id
EMAILJS_SERVICE_ID=your_service_id  
EMAILJS_TEMPLATE_ID=your_template_id
GOOGLE_SHEETS_SCRIPT_URL=your_google_script_url
```

### **Get Your Values:**
- **EmailJS**: Follow `EMAILJS_SETUP_GUIDE.md`
- **Google Sheets**: Follow `GOOGLE_SHEETS_SETUP.md`

## **Step 5: Set up GitHub Actions (Optional but Recommended)**

### **Add Netlify Secrets to GitHub:**
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:

```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

### **Get Netlify Tokens:**
```bash
# Get auth token
netlify status

# Get site ID from Netlify dashboard
# Or run: netlify sites:list
```

## **Step 6: Test the Setup**

### **Local Development:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### **Test Deployment:**
1. Make a small change to `index.html`
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify deployment"
   git push origin main
   ```
3. Check Netlify dashboard for deployment status
4. Visit your live site

## **Step 7: Set up Branch Strategy**

### **Create Development Branch:**
```bash
# Create and switch to develop branch
git checkout -b develop
git push -u origin develop
```

### **Branch Protection Rules (GitHub):**
1. Go to repository Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews
   - Require status checks
   - Restrict pushes to main branch

## **Step 8: Configure Custom Domain (Optional)**

### **In Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain: `prismatech.ai`
3. Configure DNS records as instructed
4. Enable HTTPS

## **🎯 Next Steps After Setup**

### **Immediate (This Week):**
- [ ] Test waitlist functionality
- [ ] Verify email notifications work
- [ ] Check Google Sheets integration
- [ ] Test on mobile devices

### **Short Term (Next 2 Weeks):**
- [ ] Add Google Analytics
- [ ] Implement A/B testing
- [ ] Add more waitlist features
- [ ] Optimize for SEO

### **Medium Term (Next 2 Months):**
- [ ] Begin main app development
- [ ] Plan user migration strategy
- [ ] Set up staging environment
- [ ] Implement monitoring

## **🔧 Troubleshooting**

### **Common Issues:**

**1. Netlify Build Fails:**
```bash
# Check build logs in Netlify dashboard
# Common fix: Update netlify.toml
```

**2. Environment Variables Not Working:**
```bash
# Redeploy after adding env vars
netlify deploy --prod
```

**3. GitHub Actions Fails:**
```bash
# Check secrets are set correctly
# Verify NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID
```

**4. EmailJS Not Working:**
```bash
# Check browser console for errors
# Verify EmailJS configuration in script.js
```

## **📊 Monitoring Setup**

### **Add to index.html:**
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

### **Netlify Analytics:**
- Enable in Netlify dashboard
- Monitor page views, unique visitors
- Track form submissions

## **🚀 Production Checklist**

- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Analytics configured
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Performance optimized
- [ ] Mobile testing completed

## **📞 Support**

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Netlify and GitHub documentation
3. Check browser console for errors
4. Contact support: support@prismatech.co.uk

---

**🎉 Congratulations!** Your PrismaTech landing page is now set up with:
- ✅ Git version control
- ✅ Automated deployments
- ✅ Environment configuration
- ✅ CI/CD pipeline
- ✅ Production-ready infrastructure
