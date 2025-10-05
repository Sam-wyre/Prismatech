# Google Sheets Integration Setup Guide

## 🎯 Overview
This guide will help you set up automatic Google Sheets integration so that every waitlist signup is automatically saved to your Google Sheet.

---

## 📊 Step 1: Create Google Sheet

### 1.1 Create New Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"PrismaTech Waitlist"**

### 1.2 Set Up Column Headers
In row 1, add these headers:
- **A1:** Email
- **B1:** Timestamp  
- **C1:** Source
- **D1:** Status

### 1.3 Format the Sheet
1. Select row 1 (headers)
2. Make them **bold** and **center-aligned**
3. Add a background color (e.g., light blue)
4. Freeze row 1: **View** → **Freeze** → **1 row**

---

## 🔧 Step 2: Create Google Apps Script

### 2.1 Open Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and replace with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Add the data to the sheet
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.source,
      data.status
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({message: "PrismaTech Waitlist API is running"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 2.2 Save the Script
1. Click **Save** (Ctrl+S)
2. Name it **"PrismaTech Waitlist Handler"**

---

## 🚀 Step 3: Deploy as Web App

### 3.1 Deploy the Script
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to **Type**
3. Select **Web app**
4. Fill in the details:
   - **Description:** PrismaTech Waitlist API
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**

### 3.2 Get the Web App URL
1. After deployment, you'll see a **Web app URL**
2. Copy this URL - it looks like: `https://script.google.com/macros/s/ABC123.../exec`
3. This is your **SCRIPT_URL**

---

## 🔗 Step 4: Update Your Website

### 4.1 Update script.js Configuration
Replace the Google Sheets configuration in your `script.js`:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_URL/exec',
    ENABLED: true // Set to true to enable Google Sheets integration
};
```

### 4.2 Test the Integration
1. Open your website
2. Open browser console (F12)
3. Submit a test email
4. Check console for "Successfully saved to Google Sheets" message
5. Check your Google Sheet for the new row

---

## 🧪 Step 5: Testing

### 5.1 Test the Web App Directly
1. Open your Web App URL in a browser
2. You should see: `{"message":"PrismaTech Waitlist API is running"}`

### 5.2 Test with a Real Signup
1. Go to your website
2. Click "Join Waitlist"
3. Enter a test email
4. Submit the form
5. Check your Google Sheet - you should see a new row

### 5.3 Verify Data
Your Google Sheet should show:
- **Email:** The user's email address
- **Timestamp:** When they signed up (ISO format)
- **Source:** "PrismaTech Website"
- **Status:** "Active"

---

## 🔒 Step 6: Security & Permissions

### 6.1 Review Permissions
1. When you first run the script, Google will ask for permissions
2. Click **Review permissions**
3. Choose your Google account
4. Click **Advanced** → **Go to [Project Name] (unsafe)**
5. Click **Allow**

### 6.2 Make Sheet Private (Optional)
1. In your Google Sheet, click **Share**
2. Remove "Anyone with the link" access
3. Add specific email addresses who should have access
4. The web app will still work even if the sheet is private

---

## 📈 Step 7: Advanced Features (Optional)

### 7.1 Add Data Validation
You can add this to your Apps Script to prevent duplicates:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Check if email already exists
    const lastRow = sheet.getLastRow();
    const emailColumn = 1; // Column A
    const emails = sheet.getRange(2, emailColumn, lastRow - 1, 1).getValues().flat();
    
    if (emails.includes(data.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: "Email already exists"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the data if email doesn't exist
    sheet.appendRow([data.email, data.timestamp, data.source, data.status]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 7.2 Add Email Notifications
You can modify the script to send email notifications when new signups occur:

```javascript
// Add this inside the doPost function after adding the row
MailApp.sendEmail({
  to: 'support@prismatech.co.uk',
  subject: 'New Waitlist Signup - ' + data.email,
  body: 'A new user joined the waitlist: ' + data.email
});
```

---

## 🚨 Troubleshooting

### Common Issues:

1. **"Script not found" error**
   - Check that the Web App URL is correct
   - Make sure the script is deployed as a Web App

2. **"Permission denied" error**
   - Make sure the Web App is set to "Anyone" access
   - Check that you've granted all necessary permissions

3. **Data not appearing in sheet**
   - Check the Apps Script logs: **Executions** tab
   - Verify the column headers match exactly

4. **CORS errors**
   - Make sure you're using the `/exec` URL, not `/dev`
   - Check that the Web App is deployed (not just saved)

---

## 📋 Final Checklist

- [ ] Google Sheet created with proper headers
- [ ] Apps Script created and saved
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied to script.js
- [ ] GOOGLE_SHEETS_CONFIG.ENABLED set to true
- [ ] Test signup works
- [ ] Data appears in Google Sheet
- [ ] Permissions granted

---

## 🎉 You're Done!

Now every time someone joins your waitlist:
1. ✅ Email notification sent to support@prismatech.co.uk
2. ✅ Data saved to localStorage (backup)
3. ✅ Data automatically added to Google Sheet
4. ✅ User sees success message

Your waitlist system is now fully integrated with Google Sheets!

---

*Last Updated: January 27, 2025*
*Project: PrismaTech Landing Page*
