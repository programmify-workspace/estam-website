const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', handleLoginSubmit);

async function handleLoginSubmit(event) {
  event.preventDefault();

  loginBtn.disabled = true;
  loginBtn.innerHTML = 'Signing in...';

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;


  const isValid = [email, password].every((field) => field.trim() !== '');
  const isPasswordValid = validatePassword(password);
  const isValidEmail = validateEmail(email);

  if (isValid && isValidEmail && isPasswordValid) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Login successfully!');
      } else {
        response.json().then((data) => {
          showErrorAlert(data.error);
        });
      }
    } catch (error) {
      console.error('An error occurred while trying to sign up:', error);
    }
  } else {
    if (!isValid) {
      showErrorAlert('All fields are required!');
    } else if (!isValidEmail) {
      showErrorAlert('Please enter a correct email address');
    } else if (!isPasswordValid) {
      showErrorAlert('Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and be at least 8 characters long!');
    }
  }

  resetLoginForm();
}

function validatePassword(password) {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{}[\]|;:'",.<>/?]).{8,}/.test(password);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showErrorAlert(errorMessage) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: errorMessage,
    confirmButtonText: 'OK',
  });
}

function showSuccessAlert(successMessage) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: successMessage,
    confirmButtonText: 'OK',
  });
}

function resetLoginForm() {
  loginBtn.disabled = false;
  loginBtn.innerHTML = 'Sign in <i class="icon-4"></i>';
}
