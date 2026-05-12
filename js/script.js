document.addEventListener('DOMContentLoaded', () => {
  // --- Dark/Light Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if(themeIcon) themeIcon.className = 'fas fa-sun';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if(themeIcon) themeIcon.className = 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      
      if (targetTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
      } else {
        themeIcon.className = 'fas fa-moon';
      }
    });
  }

  // --- Typing Animation ---
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = ['Web Developer', 'Designer', 'Student'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    function type() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of typing
        typingDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next role
        isDeleting = false;
        roleIndex++;
        if (roleIndex >= roles.length) {
          roleIndex = 0;
        }
        typingDelay = 500;
      }

      setTimeout(type, typingDelay);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
  }

  // --- Initialize AOS (Animate on Scroll) ---
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
});
