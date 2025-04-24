function register() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    // Clear errors
    document.getElementById('nameError').textContent = "";
    document.getElementById('emailError').textContent = "";
    document.getElementById('passwordError').textContent = "";

    // Validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (!nameRegex.test(fullName)) {
      document.getElementById('nameError').textContent = "Name must be alphabetical.";
      valid = false;
    }

    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = "Invalid email address.";
      valid = false;
    }

    if (password.length < 8 || password !== rePassword) {
      document.getElementById('passwordError').textContent = "Passwords must match and be at least 8 characters.";
      valid = false;
    }

    if (valid) {
      // Save data in localStorage
      const user = {
        name: fullName,
        email: email,
        password: password
      };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful!");
      window.location.href = "page2.html"; // Go to sign in page
    }
  }
