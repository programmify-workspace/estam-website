const passwordShow = document.querySelector('.password-show');
const confirmPasswordShow = document.querySelector('#confirm-password-show');
const confirmPassword = document.querySelector('#confirm_password');
const pw = document.querySelector('#password');

passwordShow.addEventListener('click', () => {
    if (pw.type === 'password') {
        pw.type = "text";
    } else {
        pw.type = "password";
    }
})

confirmPasswordShow.addEventListener('click', () => {
    if (confirmPassword.type === 'password') {
        confirmPassword.type = "text";
    } else {
        confirmPassword.type = "password";
    }
})



