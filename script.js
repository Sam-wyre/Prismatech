// Demo typing animation
function startTypingDemo() {
  const prompts = [
    "Create a modern restaurant website with online booking...",
    "Build an e-commerce store for handmade jewelry...",
    "Make a portfolio site for a photographer...",
    "Design a SaaS landing page with pricing tiers..."
  ];

  let currentPrompt = 0;
  const demoInput = document.getElementById('demoPrompt');

  function typePrompt() {
    const text = prompts[currentPrompt];
    let characterIndex = 0;
    demoInput.value = '';

    const typing = setInterval(() => {
      if (characterIndex < text.length) {
        demoInput.value += text.charAt(characterIndex);
        characterIndex++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          currentPrompt = (currentPrompt + 1) % prompts.length;
          typePrompt();
        }, 3000);
      }
    }, 50);
  }

  typePrompt();
}

// Modal functions
function openWaitlistModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('waitlistModal');
  overlay.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeWaitlistModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('waitlistModal');
  modal.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function (e) {
  if (e.target === this) {
    closeWaitlistModal();
  }
});

// This function is no longer needed - using initializeCounters() instead

// Animate non-waitlist counters when page loads
function animateCounters() {
  const counters = [
    { id: 'buildTime', target: 5, suffix: '' },
    { id: 'integrations', target: 57, suffix: '+' }
  ];

  counters.forEach((counter) => {
    const element = document.getElementById(counter.id);
    if (element) {
      const increment = counter.target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= counter.target) {
          element.textContent = counter.target + counter.suffix;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + counter.suffix;
        }
      }, 30);
    }
  });
}

// Animate time display for 24/7 support
function animateTimeDisplay() {
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');

  setInterval(() => {
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    hours.textContent = currentHours;
    minutes.textContent = currentMinutes;

    // Create a "blinking" effect every few seconds
    if (now.getSeconds() % 3 === 0) {
      hours.style.color = '#2ecc71';
      minutes.style.color = '#2ecc71';
      setTimeout(() => {
        hours.style.color = '';
        minutes.style.color = '';
      }, 500);
    }
  }, 1000);
}

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Start typing animation
    setTimeout(() => {
        startTypingDemo();
    }, 1000);

    // Initialize counters with actual data
    initializeCounters();

    // Delay counter animation for better effect
    setTimeout(() => {
        animateCounters();
    }, 1500);

    animateTimeDisplay();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Initialize counters with actual waitlist data
function initializeCounters() {
    const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    const baseCount = 1247; // Starting count
    const actualCount = baseCount + existingEmails.length;
    
    // Update hero counter immediately
    const heroCounter = document.getElementById('heroWaitlist');
    if (heroCounter) {
        heroCounter.textContent = actualCount.toLocaleString();
    }
    
    // Update stats counter immediately
    const statsCounter = document.getElementById('waitlistCount');
    if (statsCounter) {
        statsCounter.textContent = actualCount.toLocaleString();
    }
    
    // Update today's signups counter
    updateTodaysSignups();
    
    console.log('Initialized counters with base count:', baseCount, '+ new signups:', existingEmails.length, '= total:', actualCount);
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    USER_ID: 'VNuJdjzDdft2YpL0a', // Replace with your EmailJS User ID
    SERVICE_ID: 'service_imnci9r',   // Replace with your Gmail service ID
    TEMPLATE_ID: 'template_isi3elk'  // Replace with your email template ID
};

// Google Sheets Configuration
const GOOGLE_SHEETS_CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwWAmOWBgy6-EzeLz2PFGDMJhiiHZoA73SqfyRT2KoKq5vEYsAluu-BO6Xu_g0wi5DQ/exec', // Replace with your Google Apps Script URL
    ENABLED: true // Set to true when Google Sheets is set up
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.USER_ID);
    }
});

// Waitlist form handling
document.getElementById('waitlistForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    console.log('Form submitted!'); // Debug log
    
    // Get form data
    const formData = new FormData(this);
    const email = formData.get('email');
    
    console.log('Email extracted:', email); // Debug log
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;
    
    // Validate email
    if (!isValidEmail(email)) {
        console.log('Email validation failed'); // Debug log
        alert('Please enter a valid email address.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        return;
    }
    
    console.log('Email validation passed'); // Debug log
    
    // Try EmailJS first, fallback to localStorage
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.USER_ID !== 'YOUR_EMAILJS_USER_ID') {
        console.log('Using EmailJS path'); // Debug log
        sendEmailNotification(email);
    } else {
        console.log('Using fallback path'); // Debug log
        // Fallback to localStorage if EmailJS not configured
        saveToLocalStorage(email);
        // Try Google Sheets even if EmailJS not configured
        if (GOOGLE_SHEETS_CONFIG.ENABLED) {
            console.log('Saving to Google Sheets'); // Debug log
            saveToGoogleSheets(email);
        }
        showSuccessMessage(this);
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send email notification using EmailJS
function sendEmailNotification(email) {
    const templateParams = {
        user_email: email,
        timestamp: new Date().toISOString(),
        source: 'PrismaTech Website Waitlist',
        reply_to: email
    };

    console.log('Sending email with params:', templateParams); // Debug log

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            // Save to localStorage as backup
            saveToLocalStorage(email);
            // Save to Google Sheets if enabled
            if (GOOGLE_SHEETS_CONFIG.ENABLED) {
                saveToGoogleSheets(email);
            }
            // Show success message
            const form = document.getElementById('waitlistForm');
            showSuccessMessage(form);
        })
        .catch(function(error) {
            console.error('EmailJS error:', error);
            // Fallback to localStorage
            saveToLocalStorage(email);
            // Try Google Sheets even if email fails
            if (GOOGLE_SHEETS_CONFIG.ENABLED) {
                saveToGoogleSheets(email);
            }
            const form = document.getElementById('waitlistForm');
            showSuccessMessage(form);
        });
}

// Save email to localStorage as backup
function saveToLocalStorage(email) {
    try {
        const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        const emailExists = existingEmails.some(entry => entry.email === email);
        
        if (!emailExists) {
            existingEmails.push({
                email: email,
                timestamp: new Date().toISOString(),
                source: 'PrismaTech Website'
            });
            localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails));
        }
        
        console.log('Waitlist signup saved to localStorage:', {
            email: email,
            timestamp: new Date().toISOString(),
            source: 'PrismaTech Website'
        });
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Save email to Google Sheets
function saveToGoogleSheets(email) {
    if (!GOOGLE_SHEETS_CONFIG.SCRIPT_URL || GOOGLE_SHEETS_CONFIG.SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        console.log('Google Sheets not configured');
        return;
    }

    const data = {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'PrismaTech Website',
        status: 'Active'
    };

    console.log('Attempting to save to Google Sheets:', data); // Debug log

    // Try JSON format first (more reliable)
    fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Google Sheets request sent (JSON format)');
        // Since we're using no-cors, we can't check the response
        // But the request was sent successfully
    })
    .catch(error => {
        console.error('Error sending to Google Sheets:', error);
        // Don't show error to user, just log it
    });
}

// Show success message and close modal
function showSuccessMessage(form) {
    form.style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    // Update counters
    updateWaitlistCounters();
    
    // Close modal after success
    setTimeout(() => {
        closeWaitlistModal();
        // Reset form for next use
        form.style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        form.reset();
    }, 2000);
}

// Update waitlist counters
function updateWaitlistCounters() {
    // Get current count from localStorage
    const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    const baseCount = 1247; // Starting count
    const newCount = baseCount + existingEmails.length;
    
    // Update hero counter
    const heroCounter = document.getElementById('heroWaitlist');
    if (heroCounter) {
        animateCounter(heroCounter, newCount);
    }
    
    // Update stats counter
    const statsCounter = document.getElementById('waitlistCount');
    if (statsCounter) {
        animateCounter(statsCounter, newCount);
    }
    
    // Update today's signups counter
    updateTodaysSignups();
    
    console.log('Updated waitlist count to:', newCount, '(base:', baseCount, '+ new signups:', existingEmails.length, ')');
}

// Update today's signups counter
function updateTodaysSignups() {
    const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    const today = new Date().toDateString(); // Get today's date as string
    
    // Count signups from today
    const todaysSignups = existingEmails.filter(email => {
        const signupDate = new Date(email.timestamp).toDateString();
        return signupDate === today;
    }).length;
    
    // Find the today's signups element (look for "+X today" text)
    const statIndicators = document.querySelectorAll('.stat-indicator');
    statIndicators.forEach(indicator => {
        const text = indicator.textContent;
        if (text.includes('today')) {
            // Update the number before "today"
            const newText = text.replace(/\+?\d+\s+today/, `+${todaysSignups} today`);
            indicator.innerHTML = `<i class="fas fa-arrow-up"></i><span>${newText}</span>`;
        }
    });
    
    console.log('Updated today\'s signups to:', todaysSignups);
}

// Animate counter to new value
function animateCounter(element, targetValue) {
    const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const increment = (targetValue - currentValue) / 20; // 20 steps
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            element.textContent = targetValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 50);
}

// Function to view collected emails (for testing - remove in production)
function viewCollectedEmails() {
    const emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    console.log('Collected emails:', emails);
    return emails;
}

// Function to export emails as CSV (for testing - remove in production)
function exportEmailsAsCSV() {
    const emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    if (emails.length === 0) {
        console.log('No emails collected yet');
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Email,Timestamp,Source\n"
        + emails.map(entry => `${entry.email},${entry.timestamp},${entry.source}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "waitlist_emails.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make functions available globally for testing (remove in production)
window.viewCollectedEmails = viewCollectedEmails;
window.exportEmailsAsCSV = exportEmailsAsCSV;

// Intersection Observer for counter animation when scrolling
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scale(1.05)';
      setTimeout(() => {
        entry.target.style.transform = 'scale(1)';
      }, 300);
    }
  });
}, observerOptions);

// Observe all stat elements
document.querySelectorAll('.stat').forEach((stat) => {
  observer.observe(stat);
});

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add floating animation to hero background
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;

    hero.style.background = `linear-gradient(135deg, \
            hsl(${200 + mouseX / 5}, 70%, ${50 + mouseY / 10}%) 0%, \
            var(--dark-blue) 100%)`;
  });
}

