
document.addEventListener("DOMContentLoaded", function () {
    const formSections = document.querySelectorAll(".form-section");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const nextBtns = document.querySelectorAll(".next-btn");

    let currentSectionIndex = 0;

    function showSection(index) {
        formSections.forEach(function (section) {
            section.style.display = "none";
        });
        formSections[index].style.display = "block";
    }

    function validateSection(index) {
        return true;
    }

    function navigateToNextSection() {
        if (validateSection(currentSectionIndex)) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }
    }

    function navigateToPrevSection() {
        currentSectionIndex--;
        showSection(currentSectionIndex);
    }

     // Initialize form
     showSection(currentSectionIndex);

     // Attach event listeners to navigation buttons
     prevBtns.forEach(function (prevBtn) {
         prevBtn.addEventListener("click", navigateToPrevSection);
     });

     nextBtns.forEach(function (nextBtn) {
         nextBtn.addEventListener("click", navigateToNextSection);
     });

    // Get country name and id
    const countrySelect = document.getElementById('countrySelect');
    const stateSelect = document.getElementById('stateSelect');

    countrySelect.addEventListener('change', () => {
        // Get the selected option ID
         const selectedCountryId = countrySelect.options[countrySelect.selectedIndex].id;

        // Make an AJAX request
        $.ajax({
            type: 'GET',
            url: '/apply',
            data: { selectedCountryId: selectedCountryId },
            success: function (response) {
                const states = response.states || []; // Retrieve the states from the response
                const stateOptions = states.map(state => `<option value="${state.name}">${state.name}</option>`).join('');
                stateSelect.innerHTML = stateOptions;
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    // Get country name and id
    const nokCountrySelect = document.getElementById('nok_country');
    const nokStateSelect = document.getElementById('nok_state');

    nokCountrySelect.addEventListener('change', () => {
         // Get the selected option ID
         const selectedNokCountryId = nokCountrySelect.options[nokCountrySelect.selectedIndex].id;

        // Make an AJAX request
        $.ajax({
            type: 'GET',
            url: '/apply',
            data: { selectedNokCountryId: selectedNokCountryId },
            success: function (response) {
                const states = response.nok_states || []; // Retrieve the states from the response
                const stateOptions = states.map(state => `<option value="${state.name}">${state.name}</option>`).join('');
                nokStateSelect.innerHTML = stateOptions;
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});


// Handle Apply Form submission
const applyButton = document.querySelector(".submit-btn");
const applyForm = document.getElementById('apply-form');

applyForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    // Disable the button and display "Loading" message
    applyButton.disabled = true;
    applyButton.innerHTML = 'Loading...';

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
    // const passportInput = document.getElementById('passport');
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


            applyButton.disabled = false;
            applyButton.innerHTML = 'Submit';
            
            isValid = false;
        }
    });

    const requiredfieldsFile = [
        ssceCertificateInput,
        birthCertificateInput,
        photoIdInput,
        // passportInput
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

            applyButton.disabled = false;
            applyButton.innerHTML = 'Submit';

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

            applyButton.disabled = false;
            applyButton.innerHTML = 'Submit';

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
                // Show success message to the user
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Application submitted successfully!',
                    confirmButtonText: 'OK'
                });

                applyButton.disabled = false;
                applyButton.innerHTML = 'Submit';

                applyForm.reset();
            } else {
                // Show error message to the user
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while submitting the form.',
                    confirmButtonText: 'OK'
                });


                applyButton.disabled = false;
                applyButton.innerHTML = 'Submit';
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
});
