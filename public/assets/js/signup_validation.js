const signupForm = document.getElementById('signupForm');
const signupBtn = document.querySelector('#signupBtn');

signupForm.addEventListener('submit', handleSignupSubmit);

async function handleSignupSubmit(event) {
  event.preventDefault();

  signupBtn.disabled = true;
  signupBtn.innerHTML = 'Signing up...';

  const fullname = document.querySelector('#fullname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  const isValid = [fullname, email, password, confirm_password].every((field) => field.trim() !== '');
  const passwordsMatch = password === confirm_password;
  const isPasswordValid = validatePassword(password);

  if (isValid && passwordsMatch && isPasswordValid) {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          confirm_password,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Signed up successfully!');
        signupForm.reset();
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
    } else if (!passwordsMatch) {
      showErrorAlert('Password and confirm password do not match!');
    } else if (!isPasswordValid) {
      showErrorAlert('Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and be at least 8 characters long!');
    }
  }

  resetSignupForm();
}

function validatePassword(password) {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{}[\]|;:'",.<>/?]).{8,}/.test(password);
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

function resetSignupForm() {
  signupBtn.disabled = false;
  signupBtn.innerHTML = 'Create Account <i class="icon-4"></i>';
}
