# PrismaTech API Credentials (PRIVATE - DO NOT COMMIT)

## 🔐 **EmailJS Configuration**

### **Service Setup:**
- **Service ID**: `service_imnci9r`
- **Template ID**: `template_isi3elk`
- **User ID**: `VNuJdjzDdft2YpL0a`

### **Email Template Configuration:**
```
Subject: New PrismaTech Waitlist Signup
From: {{user_email}}
To: your-email@prismatech.co.uk

Content:
New waitlist signup:
- Email: {{user_email}}
- Timestamp: {{timestamp}}
- Source: {{source}}
```

## 🔐 **Google Sheets Configuration**

### **Google Apps Script URL:**
```
https://script.google.com/macros/s/AKfycbwWAmOWBgy6-EzeLz2PFGDMJhiiHZoA73SqfyRT2KoKq5vEYsAluu-BO6Xu_g0wi5DQ/exec
```

### **Google Sheet Structure:**
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Email | Timestamp | Source | Status |
| user@example.com | 2025-01-27T10:30:00Z | PrismaTech Website | Active |

## 🔐 **Environment Variables for Netlify**

### **Production Environment:**
```
EMAILJS_USER_ID=VNuJdjzDdft2YpL0a
EMAILJS_SERVICE_ID=service_imnci9r
EMAILJS_TEMPLATE_ID=template_isi3elk
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwWAmOWBgy6-EzeLz2PFGDMJhiiHZoA73SqfyRT2KoKq5vEYsAluu-BO6Xu_g0wi5DQ/exec
```

## 🔐 **Social Media Accounts**

### **Twitter:**
- **Handle**: @prismatech_ai
- **URL**: https://twitter.com/prismatech_ai

### **LinkedIn:**
- **Company**: prismatechai
- **URL**: https://linkedin.com/company/prismatechai

## 🔐 **Domain Configuration**

### **Primary Domain:**
- **URL**: https://www.prismatech.co.uk
- **Netlify Site ID**: [Get from Netlify dashboard]

### **Email Configuration:**
- **Support Email**: support@prismatech.co.uk
- **Business Email**: [Your business email]

## 🔐 **Analytics Configuration**

### **Google Analytics:**
- **Measurement ID**: [To be added]
- **Property ID**: [To be added]

### **Netlify Analytics:**
- **Enabled**: Yes
- **Dashboard**: [Netlify dashboard link]

## 🔐 **Security Notes**

- ✅ All credentials stored in Netlify environment variables
- ✅ No hardcoded API keys in code
- ✅ Google Apps Script has proper permissions
- ✅ EmailJS service configured with rate limiting
- ✅ HTTPS enabled on all domains

## 🔐 **Backup Information**

### **EmailJS Backup:**
- **Account**: [Your EmailJS account]
- **Backup Email**: [Backup email for notifications]

### **Google Sheets Backup:**
- **Sheet ID**: [Google Sheet ID for backup]
- **Owner**: [Your Google account]

---

**⚠️ IMPORTANT:** This file contains sensitive information and should never be committed to the repository. Keep it local only.
