$(document).ready(function() {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: { email, password },
      success: function(response) {
        window.location.href = '/';
      },
      error: function(err) {
        errorMessage.textContent = 'Invalid email or password. Please try again.';
      }
    });
  });
});
