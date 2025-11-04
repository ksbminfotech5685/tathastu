// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Parallax effect for hero background
const heroBackground = document.getElementById('heroBackground');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Scroll animation for fade-in elements
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// Services tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover lift effect to cards
const cards = document.querySelectorAll('.benefit-card, .service-content, .session-card, .testimonial-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Stagger animation for benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger by 100ms
        }
    });
}, { threshold: 0.2 });

benefitCards.forEach(card => {
    benefitObserver.observe(card);
});

// Performance optimization: Throttle scroll events
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                navLinks.forEach(link => link.style.opacity = '0.7');
                navLink.style.opacity = '1';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Initialize on page load
window.addEventListener('load', () => {
    // Trigger initial animations
    highlightNavigation();
    
    // Smooth entrance for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// ========================================
// BOOKING NOTIFICATION SYSTEM
// ========================================

const notificationNames = [
    "Rahul Sharma", "Priya Singh", "Anjali Verma", "Arjun Patel", "Neha Gupta",
    "Vikas Kumar", "Pooja Reddy", "Karan Mehta", "Kavya Iyer", "Amit Joshi",
    "Ritu Bansal", "Rohan Desai", "Sneha Shah", "Aditya Kapoor", "Divya Nair",
    "Prateek Agarwal", "Swati Malhotra", "Sanjay Rao", "Nisha Pillai", "Manoj Khanna",
    "Megha Sethi", "Rajesh Bhatia", "Shruti Chawla", "Vikram Sinha", "Aarti Saxena",
    "Anuj Tiwari", "Simran Kaur", "Nikhil Jain", "Tanvi Pandey", "Akash Mishra",
    "Komal Dhawan", "Gaurav Oberoi", "Jyoti Bhatt", "Harsh Chopra", "Sapna Arora",
    "Suresh Varma", "Preeti Sood", "Deepak Ahuja", "Rani Dutta", "Ravi Menon",
    "Avni Bakshi", "Ishaan Gill", "Ananya Thakur", "Advait Rana", "Aarav Kohli",
    "Diya Bajaj", "Vihaan Singhal", "Myra Kulkarni", "Reyansh Das", "Saanvi Mittal"
];

const sessionTypes = [
    "Session Booked",
    "Kundli Reading Booked",
    "Consultation Scheduled",
    "Life Blueprint Booked",
    "Lal Kitab Session Booked",
    "Vastu Consultation Booked"
];

let notificationCount = 0;
const maxVisibleNotifications = 3;
let usedNames = [];

function getBookingDate() {
    const today = new Date();
    const random = Math.random();
    
    let bookingDate;
    if (random < 0.6) {
        // Today (60%)
        bookingDate = today;
    } else if (random < 0.9) {
        // Tomorrow (30%)
        bookingDate = new Date(today);
        bookingDate.setDate(today.getDate() + 1);
    } else {
        // Day after tomorrow (10%)
        bookingDate = new Date(today);
        bookingDate.setDate(today.getDate() + 2);
    }
    
    // Check if today/tomorrow for special label
    const diffDays = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    
    // Format date as "4 Nov 2025"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${bookingDate.getDate()} ${months[bookingDate.getMonth()]} ${bookingDate.getFullYear()}`;
}

function getRandomName() {
    // Reset used names if we've used most of them
    if (usedNames.length >= notificationNames.length - 5) {
        usedNames = [];
    }
    
    // Get available names
    const availableNames = notificationNames.filter(name => !usedNames.includes(name));
    
    // Pick random name from available
    const name = availableNames[Math.floor(Math.random() * availableNames.length)];
    usedNames.push(name);
    
    return name;
}

function createNotification() {
    const name = getRandomName();
    const sessionType = sessionTypes[Math.floor(Math.random() * sessionTypes.length)];
    const bookingDate = getBookingDate();
    const initial = name.charAt(0).toUpperCase();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
    notification.innerHTML = `
        <div class="notification-avatar">${initial}</div>
        <div class="notification-content">
            <div class="notification-name">${name}</div>
            <div class="notification-session">${sessionType}</div>
            <div class="notification-date">${bookingDate}</div>
        </div>
    `;
    
    // Add to container
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    container.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5.5 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 5500);
    
    // Manage max visible count
    notificationCount++;
    if (container.children.length > maxVisibleNotifications) {
        const oldestNotification = container.firstChild;
        if (oldestNotification) {
            oldestNotification.classList.add('hide');
            setTimeout(() => {
                if (oldestNotification.parentNode) {
                    oldestNotification.remove();
                }
            }, 500);
        }
    }
}

// Start showing notifications after page loads
window.addEventListener('load', () => {
    // First notification after 4 seconds
    setTimeout(() => {
        createNotification();
        
        // Then show new notification every 12 seconds (5 per minute)
        setInterval(() => {
            createNotification();
        }, 12000);
    }, 4000);
});