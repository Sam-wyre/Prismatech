# PrismaTech Landing Page

> AI-powered web development platform - Landing page with waitlist functionality

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Deployment
```bash
# Deploy to Netlify
npm run deploy

# Deploy to staging
npm run deploy:staging
```

## 📁 Project Structure

```
prismatech/
├── index.html              # Main landing page
├── about.html              # About page
├── faq.html                # FAQ page
├── terms-of-service.html   # Terms of service
├── privacy-policy.html     # Privacy policy
├── acceptable-use-policy.html # Acceptable use policy
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── netlify.toml            # Netlify configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Features

- ✅ Responsive design
- ✅ Waitlist functionality with EmailJS
- ✅ Google Sheets integration
- ✅ Social media links
- ✅ SEO optimized
- ✅ Mobile-friendly
- ✅ Fast loading

## 🔧 Configuration

### Environment Variables (Netlify)
```
EMAILJS_USER_ID=your_emailjs_user_id
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
GOOGLE_SHEETS_SCRIPT_URL=your_google_script_url
```

### EmailJS Setup
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up Gmail service
3. Create email template
4. Update configuration in `script.js`

### Google Sheets Setup
1. Create Google Sheet for waitlist data
2. Set up Google Apps Script
3. Update `GOOGLE_SHEETS_CONFIG` in `script.js`

## 🚀 Deployment

### Netlify (Recommended)
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy automatically on push to `main`

### Manual Deployment
```bash
# Build and deploy
npm run build
npm run deploy
```

## 📊 Analytics

- Google Analytics 4 (to be added)
- Netlify Analytics
- EmailJS conversion tracking
- Google Sheets waitlist data

## 🔄 Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Pull Request**
   - Create PR to `main` branch
   - Netlify will create preview deployment
   - Review and merge

3. **Production Deployment**
   - Merge to `main` branch
   - Automatic deployment to production

## 📈 Future Roadmap

- [ ] Add Google Analytics
- [ ] Implement A/B testing
- [ ] Enhanced waitlist features
- [ ] Main application development
- [ ] User migration strategy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: support@prismatech.co.uk
- Twitter: [@prismatech_ai](https://twitter.com/prismatech_ai)
- LinkedIn: [prismatechai](https://linkedin.com/company/prismatechai)
