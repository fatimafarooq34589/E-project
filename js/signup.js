// signup.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Regular Expressions
    const nameRegex = /^[A-Za-z\s]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;

    // Validation Checks
    if (!nameRegex.test(name)) {
      alert("⚠️ Full name must be 3–20 letters and contain only alphabets.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "⚠️ Password must be at least 6 characters long and include letters and numbers."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    // Save user in local storage
    if (!saveUserToLocal(name, email, password)) return;

    alert("✅ Signup successful! Your account has been created.");
    form.reset();

    // Redirect to Sign In page
    window.location.href = "signin.html";
  });
});

// Function to save user data
function saveUserToLocal(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    alert("⚠️ This email is already registered! Please sign in.");
    return false;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
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

