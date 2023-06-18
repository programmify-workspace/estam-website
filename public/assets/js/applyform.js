// Handle Career Services Form submission
const applyButton = document.querySelector(".submit-btn");
const applyForm = document.getElementById('apply-form');

applyForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    // Disable the button and display "Loading" message
    applyButton.disabled = true;
    applyButton.innerHTML = 'Loading...';

    let timerInterval
    Swal.fire({
        title: 'Submitting Application',
        html: 'Loading: <b></b> milliseconds left.',
        timer: 40000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })

    // Get all the form elements
    const firstNameInput = document.getElementById('first_name');
    //const middleNameInput = document.getElementById('middle_name');
    const lastNameInput = document.getElementById('last_name');
    const genderSelect = document.getElementById('gender');
    const dobInput = document.getElementById('dob');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phone');
    const nationalitySelect = document.getElementById('nationality');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const countrySelect = document.getElementById('countrySelect');
    const stateSelect = document.getElementById('stateSelect');
    const nokNameInput = document.getElementById('nok_name');
    const nokAddressInput = document.getElementById('nok_address');
    const nokCityInput = document.getElementById('nok_city');
    const nokCountrySelect = document.getElementById('nok_country');
    const nokStateSelect = document.getElementById('nok_state');
    const nokEmailInput = document.getElementById('nok_email');
    const nokRelationshipInput = document.getElementById('nok_relationship');
    const primaryNameInput = document.getElementById('primary_name');
    const secondaryNameInput = document.getElementById('secondary_name');
    //const additionalSchoolInput = document.getElementById('additional_school');
    const courseSelect = document.getElementById('course');
    const startDateInput = document.getElementById('start_date');
    const applicationTypeSelect = document.getElementById('application_type');
    const transferLevelSelect = document.getElementById('transfer_level');
    const ssceCertificateInput = document.getElementById('ssce_certificate');
    const birthCertificateInput = document.getElementById('birth_certificate');
    const photoIdInput = document.getElementById('photo_passport');
    const passportInput = document.getElementById('passport');
    const hobbiesInterestTextarea = document.getElementById('hobbies_interest');
    const referrerSelect = document.getElementById('referrer');


    const requiredfieldsSelect = [
        genderSelect,
        nationalitySelect,
        countrySelect,
        stateSelect,
        nokCountrySelect,
        nokStateSelect,
        applicationTypeSelect,
        transferLevelSelect,
        courseSelect,
        referrerSelect
    ];

    // Validate required selection fields
    let isValid = true;

    requiredfieldsSelect.map((fields) => {
        if (fields.selectedIndex === -1 || fields.value === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select an option from the drop-down menu!',
                confirmButtonText: 'OK'
            });
            console.log("Please select an option from the drop-down menu!");
            isValid = false;
        }
    });

    const requiredfieldsFile = [
        ssceCertificateInput,
        birthCertificateInput,
        photoIdInput,
        passportInput
    ];

    // Validate required file fields
    requiredfieldsFile.map((fields) => {
        if (fields.files.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please upload all the required files correctly!',
                confirmButtonText: 'OK'
            });
            console.log("Please upload all the required files correctly!");
            isValid = false;
        }
    });

    // Validate required input fields
    const requiredFields = [
        firstNameInput,
        lastNameInput,
        dobInput,
        emailInput,
        phoneNumberInput,
        addressInput,
        cityInput,
        nokNameInput,
        nokAddressInput,
        nokCityInput,
        nokEmailInput,
        nokRelationshipInput,
        primaryNameInput,
        secondaryNameInput,
        startDateInput,
        hobbiesInterestTextarea
    ];

    requiredFields.map((fields) => {
        if (fields.value.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all the required fields correctly!',
                confirmButtonText: 'OK'
            });
            console.log("Please fill in all the required fields correctly!");
            isValid = false;
        }
    });

    if (isValid) {
        // Make the backend submission
        const formData = new FormData(applyForm);
        try {
            const response = await fetch('/submit-apply', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Application submitted successfully.');
                // Show success message to the user
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Application submitted successfully!',
                    confirmButtonText: 'OK'
                });
                applyForm.reset();
            } else {
                console.log('An error occurred while submitting the form.');
                // Show error message to the user
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while submitting the form.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
            // Show error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while submitting the form.',
                confirmButtonText: 'OK'
            });
        }
    }

    // Re-enable the button and reset the message
    applyButton.disabled = false;
    applyButton.innerHTML = 'Submit';
});