// localStorage.js

function saveUserToLocal(name, email, password) {
    const user = {
      name: name,
      email: email,
      password: password,
    };
  
    // Check if users array already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Prevent duplicate email registration
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      alert("This email is already registered. Please sign in instead.");
      return;
    }
  
    // Add new user and save
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  
    console.log("Saved in Local Storage:", user);
  }
  