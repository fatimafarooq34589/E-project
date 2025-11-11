// contact.js — with regex validation + alert messages

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    // ✅ Regular Expressions
    const nameRegex = /^[A-Za-z\s]{3,30}$/;         // only letters/spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // simple email pattern
    const phoneRegex = /^[0-9]{10}$/;                // exactly 10 digits

    // ✅ Validation
    if (!nameRegex.test(name)) {
      alert("⚠️ Please enter a valid full name (only letters, 3–30 characters).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(number)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    if (message.length < 5) {
      alert("⚠️ Message must be at least 5 characters long.");
      return;
    }

    // ✅ Save to Local Storage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userNumber", number);
    localStorage.setItem("userMessage", message);

    // ✅ Save to Session Storage
    sessionStorage.setItem(
      "sessionUser",
      JSON.stringify({ name, email, number, message })
    );

    // ✅ Success Alert
    alert("✅ Data saved successfully in Local & Session Storage!");

    // Reset form
    form.reset();
  });

  // ✅ Load saved data when page loads
  window.addEventListener("load", function () {
    document.getElementById("name").value = localStorage.getItem("userName") || "";
    document.getElementById("email").value = localStorage.getItem("userEmail") || "";
    document.getElementById("number").value = localStorage.getItem("userNumber") || "";
    document.getElementById("message").value = localStorage.getItem("userMessage") || "";
  });
});
