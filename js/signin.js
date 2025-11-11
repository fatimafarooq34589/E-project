// signin.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Regular Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;

    // Basic Validation
    if (!email || !password) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("❌ Invalid password format.");
      return;
    }

    // Get all registered users from Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with matching email and password
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      alert("✅ Login successful!");
      console.log("Logged in user:", validUser);

      // Save active user in Session Storage
      setActiveUser(validUser);

      // Redirect to your home or dashboard page
      window.location.href = "index.html"; // Change this if needed
    } else {
      alert("❌ Invalid email or password!");
      console.log("Login failed. No matching user found.");
    }
  });
});

// Save active user in session
function setActiveUser(user) {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            // This line toggles the 'active' class on the navigation list
            navLinks.classList.toggle('active');
        });
        
        // OPTIONAL: Close menu when a link is clicked (useful for single-page sites or smooth UX)
        // const navLinksList = navLinks.querySelectorAll('a');
        // navLinksList.forEach(link => {
        //     link.addEventListener('click', () => {
        //         navLinks.classList.remove('active');
        //     });
        // });
    }
});


