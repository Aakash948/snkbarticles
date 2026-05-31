const CONFIG = {
      signupUrl: 'https://dev328143.service-now.com/api/1019898/knowledgelist_retrieve/usersignup',
      username: 'integration_user',
      password: 'Hack@7017'
    };

    function showMessage(message, type = 'success') {
      const messageBox = document.getElementById('formMessage');
      messageBox.className = `message ${type}`;
      messageBox.textContent = message;
    }

    function handleCredentialResponse(response) {
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('userName', payload.name || '');
      localStorage.setItem('userEmail', payload.email || '');
      localStorage.setItem('userPicture', payload.picture || '');
      localStorage.setItem('isLoggedIn', 'true');

      alert(`Welcome, ${payload.name}! Redirecting to your dashboard...`);
      window.location.href = 'mainpage.html';
    }

    document.getElementById('signupForm').addEventListener('submit', async function(e) {
      e.preventDefault();

      const fullName = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const signupBtn = document.getElementById('signupBtn');

      if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
      }

      const requestBody = {
        user_id: fullName,
        password: password,
        email: email
      };

      try {
        signupBtn.disabled = true;
        signupBtn.textContent = 'Creating Account...';

        const response = await fetch(CONFIG.signupUrl, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${CONFIG.username}:${CONFIG.password}`),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || data.error );
        }

        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');

        showMessage('Account created successfully! Redirecting...', 'success');

        setTimeout(() => {
          window.location.href = 'mainpage.html';
        }, 1500);
      } catch (error) {
        console.error('Signup Error:', error);
        showMessage(error.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Create Account';
      }
    });
const signupForm = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const formMessage = document.getElementById('formMessage');

    function validatePasswords() {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
        formMessage.textContent = 'Passwords do not match.';
        formMessage.style.color = '#d93025';
        return false;
      }

      confirmPassword.setCustomValidity('');
      formMessage.textContent = '';
      return true;
    }

    confirmPassword.addEventListener('input', validatePasswords);
    password.addEventListener('input', validatePasswords);

    signupForm.addEventListener('submit', function (e) {
      if (!validatePasswords()) {
        e.preventDefault();
        confirmPassword.reportValidity();
      }
    });