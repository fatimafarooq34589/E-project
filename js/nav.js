// Load navbar dynamically
fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    lucide.createIcons(); // Icons render karne ke liye

    // Dark/Light toggle
    const toggleBtn = document.getElementById('themeToggle');
    let isLight = false;
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      isLight = !isLight;
      toggleBtn.innerHTML = `<i data-lucide="${isLight ? 'moon' : 'sun'}"></i>`;
      lucide.createIcons();
      toggleBtn.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }],
        { duration: 500, fill: 'forwards' }
      );
    });
  });


  
document.addEventListener('DOMContentLoaded', () => {
        // IDs ko nav.html se liya gaya hai
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');
        // Theme toggle button bhi hai, agar aap use karna chahte hain
        const toggleBtn = document.getElementById('themeToggle'); 

        // 1. Hamburger Menu Logic
        if (hamburgerBtn && navLinks) {
            hamburgerBtn.addEventListener('click', function() {
                // 'open' class ko toggle karke menu dikhayein/chupayein
                navLinks.classList.toggle('open');
                
                // Icon ko 'menu' se 'x' (close) par badalna (Lucide icons use ho rahe hain)
                const icon = hamburgerBtn.querySelector('i');
                const isMenuOpen = navLinks.classList.contains('open');
                if (icon) {
                    icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
                    // Ensure lucide.createIcons() runs after changing the attribute
                    if (window.lucide && typeof lucide.createIcons === 'function') {
                        lucide.createIcons(); 
                    }
                }
            });
        }

        // 2. Theme Toggle Logic (optional, if you use it)
        if (toggleBtn) {
            // ... existing toggle logic from nav.html
            toggleBtn.addEventListener('click', function() {
                document.body.classList.toggle('light-mode');
                const icon = toggleBtn.querySelector('i');
                const isLightMode = document.body.classList.contains('light-mode');
                if (icon) {
                    icon.setAttribute('data-lucide', isLightMode ? 'moon' : 'sun');
                    if (window.lucide && typeof lucide.createIcons === 'function') {
                        lucide.createIcons();
                    }
                }
            });
        }
        
        // Saare icons ko shuru mein render karein
        if (window.lucide && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        }
    });

