function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = "Invalid email address.";
      valid = false;
    }
    if (userData && email === userData.email && password === userData.password) {
      alert("Login successful!");
      window.location.href = "exam.html"; // Go to exam page
    } else {
      document.getElementById('loginError').textContent = "Invalid email or password.";
    }
  }