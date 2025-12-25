// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  
  // Animate menu icon
  const spans = menuToggle.querySelectorAll('span');
  if (nav.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.padding = '0.5rem 0';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '1rem 0';
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
  };
  
  // Show success message
  alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
  
  // Reset form
  contactForm.reset();
  
  // In a real application, you would send this data to a server
  console.log('Form submitted:', formData);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  const isPercentage = element.textContent.includes('%');
  const hasPlus = element.textContent.includes('+');
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    let displayValue = Math.floor(current);
    if (isPercentage) {
      element.textContent = displayValue + '%';
    } else if (hasPlus) {
      element.textContent = displayValue + '+';
    } else {
      element.textContent = displayValue;
    }
  }, 16);
};

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const text = entry.target.textContent;
      const number = parseInt(text.replace(/[^0-9]/g, ''));
      animateCounter(entry.target, number);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
  statObserver.observe(stat);
});

// Add parallax effect to hero video
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && scrolled < window.innerHeight) {
    heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});


// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right');
  animatedElements.forEach(el => observer.observe(el));

  // Button click animation
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Simulate phone call action
      console.log('احجز موعدك الآن - تم النقر على الزر');
      alert('شكراً لاهتمامك! سيتم توجيهك لصفحة الحجز...');
    });
  }

  // Parallax effect for decorative circles
  document.addEventListener('mousemove', function(e) {
    const circles = document.querySelectorAll('.decoration-circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      circle.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add hover effect to feature items
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.color = '#00B6B0';
    });
    item.addEventListener('mouseleave', function() {
      this.style.color = '#333333';
    });
  });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
