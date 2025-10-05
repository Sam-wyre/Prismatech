# EmailJS & Google Sheets Setup Guide for PrismaTech

## 🎯 Overview
This guide will help you set up EmailJS to send notifications to `support@prismatech.co.uk` when someone joins the waitlist, and optionally integrate with Google Sheets for data collection.

---

## 📧 Step 1: EmailJS Account Setup

### 1.1 Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create an account using your PrismaTech email
3. Verify your email address

### 1.2 Get Your User ID
1. After logging in, go to **Account** → **General**
2. Copy your **Public Key** (this is your User ID)
3. Update `script.js` line 160: `USER_ID: 'your_actual_user_id_here'`

---

## 🔧 Step 2: Configure Gmail Service

### 2.1 Add Gmail Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Select **Gmail** from the list
4. Click **Connect Account**
5. Sign in with your PrismaTech Gmail account (`support@prismatech.co.uk` or your main email)
6. Grant necessary permissions

### 2.2 Get Service ID
1. After connecting, you'll see a **Service ID** (e.g., `service_abc123`)
2. Update `script.js` line 161: `SERVICE_ID: 'your_service_id_here'`

---

## 📝 Step 3: Create Email Template

### 3.1 Create New Template
1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** `PrismaTech Waitlist Notification`

**Subject:** `New Waitlist Signup - {{user_email}}`

**Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3498db, #2c3e50); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .highlight { color: #e67e22; font-weight: bold; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        .logo-container { display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .logo-icon { position: relative; width: 40px; height: 40px; transform: rotate(-45deg); margin-right: 12px; }
        .logo-facet { position: absolute; width: 0; height: 0; border-style: solid; }
        .logo-facet.top { top: 0; left: 50%; transform: translateX(-50%); border-width: 0 20px 20px 20px; border-color: transparent transparent #ffffff transparent; }
        .logo-facet.left { bottom: 0; left: 0; border-width: 20px 0 20px 20px; border-color: transparent transparent transparent #ffffff; }
        .logo-facet.right { bottom: 0; right: 0; border-width: 20px 20px 20px 0; border-color: transparent #e67e22 transparent transparent; }
        .logo-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 0; height: 0; border-style: solid; border-width: 0 0 8px 8px; border-color: transparent transparent #ffffff transparent; margin-left: 2px; margin-top: -1px; }
        .logo-text { font-size: 24px; font-weight: 700; color: white; letter-spacing: 0.5px; }
        .signup-details { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #e67e22; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .detail-row { margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .detail-row:last-child { border-bottom: none; margin-bottom: 0; }
        .detail-label { font-weight: 600; color: #2c3e50; display: inline-block; width: 100px; }
        .detail-value { color: #3498db; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                <div class="logo-icon">
                    <div class="logo-facet top"></div>
                    <div class="logo-facet left"></div>
                    <div class="logo-facet right"></div>
                    <div class="logo-play"></div>
                </div>
                <span class="logo-text">PrismaTech</span>
            </div>
            <h2 style="margin: 0; font-size: 28px;">🎉 New Waitlist Signup!</h2>
        </div>
        <div class="content">
            <p>Hello PrismaTech Team,</p>
            
            <p>Great news! A new user has joined the PrismaTech waitlist and is excited about our AI-powered web development platform.</p>
            
            <div class="signup-details">
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">{{user_email}}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">{{timestamp}}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Source:</span>
                    <span class="detail-value">{{source}}</span>
                </div>
            </div>
            
            <p>This brings us one step closer to launching PrismaTech! 🚀</p>
            
            <p style="background: #e8f4fd; padding: 15px; border-radius: 6px; border-left: 4px solid #3498db; margin: 20px 0;">
                <strong>Next Steps:</strong> Consider reaching out to this early adopter to gather feedback or offer early access to beta features.
            </p>
            
            <p>Best regards,<br><strong>PrismaTech System</strong></p>
        </div>
        <div class="footer">
            <p>This is an automated notification from the PrismaTech waitlist system.</p>
            <p>Visit our website: <a href="https://prismatech.co.uk" style="color: #3498db;">prismatech.co.uk</a></p>
        </div>
    </div>
</body>
</html>
```

### 3.2 Get Template ID
1. After saving the template, you'll see a **Template ID** (e.g., `template_xyz789`)
2. Update `script.js` line 162: `TEMPLATE_ID: 'your_template_id_here'`

---

## 📊 Step 4: Google Sheets Integration

### 4.1 Google Sheets Setup
For automatic Google Sheets integration, follow the detailed guide:
**📋 See: `GOOGLE_SHEETS_SETUP.md` for complete instructions**

### 4.2 Quick Overview
1. Create Google Sheet with proper headers
2. Set up Google Apps Script
3. Deploy as Web App
4. Update `script.js` with your Web App URL
5. Enable Google Sheets integration

### 4.3 What Gets Saved
Every waitlist signup automatically saves:
- **Email:** User's email address
- **Timestamp:** When they signed up
- **Source:** "PrismaTech Website" 
- **Status:** "Active"

---

## 🧪 Step 5: Testing

### 5.1 Test EmailJS
1. Open your website
2. Click "Join Waitlist"
3. Enter a test email
4. Submit the form
5. Check your email for the notification

### 5.2 Test LocalStorage Backup
1. Open browser console (F12)
2. Type: `viewCollectedEmails()`
3. You should see the collected emails

### 5.3 Export Data
1. In console, type: `exportEmailsAsCSV()`
2. This will download a CSV file with all collected emails

---

## 🔧 Step 6: Update Configuration

Once you have all the IDs, update your `script.js` file:

```javascript
const EMAILJS_CONFIG = {
    USER_ID: 'your_actual_user_id_here',
    SERVICE_ID: 'your_service_id_here',
    TEMPLATE_ID: 'your_template_id_here'
};
```

---

## 🚀 Step 7: Production Deployment

### 7.1 Remove Testing Functions
Before going live, remove these lines from `script.js`:
- Lines 278-287 (viewCollectedEmails function)
- Lines 289-297 (exportEmailsAsCSV function)
- Lines 299-300 (global function assignments)

### 7.2 Add Error Handling
The current code already includes:
- Email validation
- Fallback to localStorage
- Error logging
- Success/error user feedback

---

## 📋 Final Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] All IDs updated in script.js
- [ ] Test email received
- [ ] Google Sheet created (optional)
- [ ] Testing functions removed (for production)
- [ ] Website tested on different browsers

---

## 🆘 Troubleshooting

### Common Issues:

1. **"EmailJS is not defined"**
   - Check if EmailJS CDN is loaded
   - Verify USER_ID is correct

2. **"Service not found"**
   - Verify SERVICE_ID is correct
   - Check if Gmail service is properly connected

3. **"Template not found"**
   - Verify TEMPLATE_ID is correct
   - Check if template is published

4. **Emails not sending**
   - Check browser console for errors
   - Verify Gmail account permissions
   - Check spam folder

---

## 📞 Support

If you need help with the setup:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- PrismaTech Support: support@prismatech.co.uk

---

*Last Updated: January 27, 2025*
*Project: PrismaTech Landing Page*
