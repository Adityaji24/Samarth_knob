      // Select the form element
      const form = document.getElementById("login-form");

      // Add an event listener to handle form submission
      form.addEventListener("submit", function (event) {
          // Prevent default form submission behavior
          event.preventDefault();

          // Get values from the input fields
          const email = document.getElementById("email").value.trim();
          const password = document.getElementById("password").value.trim();
          const deviceCode = document.getElementById("devicecode").value.trim();

          // Regular expression for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          // Validate email
          if (!emailRegex.test(email)) {
              alert("Please enter a valid email address.");
              return; // Stop further processing
          }

          // Validate password length
          if (password.length < 6) {
              alert("Password must be at least 6 characters long.");
              return; // Stop further processing
          }

          // Validate device code length
          if (deviceCode.length > 5) {
              alert("Device Code can only be up to 5 digits.");
              return; // Stop further processing
          }

          // If validation passes
          alert("Login successful!");
          window.location.href = "home.html"; // Redirect to the home page
      });
