function handleCredentialResponse(response) {
  const token = response.credential;
  const payload = JSON.parse(atob(token.split('.')[1]));

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userName', payload.name || '');
  localStorage.setItem('userEmail', payload.email || '');
  localStorage.setItem('userPicture', payload.picture || '');

  alert(`Welcome back, ${payload.name}!`);
  window.location.href = 'mainpage.html';
}

document.getElementById('signinForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = document.querySelector('.signin-btn');

  if (!email || !password) {
    alert('Please fill in all required fields.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing In...';

  try {
    const response = await fetch('https://dev328143.service-now.com/api/1019898/knowledgelist_retrieve/SignIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_name: email,
        user_password: password
      })
    });

    const responseText = await response.text();
    console.log('API Status:', response.status);
    console.log('Raw API Response:', responseText);

    let data = {};
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      console.error('JSON Parse Error:', error);
    }

    if (response.status === 201 || response.status === 200) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userData', JSON.stringify(data.result || data));

      alert('Login successful!');
      window.location.href = 'mainpage.html';
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userData');

      alert(data.error?.message || data.message || 'Invalid email or password.');
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    alert('Unable to sign in at the moment. Please try again later.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign In';
  }
});