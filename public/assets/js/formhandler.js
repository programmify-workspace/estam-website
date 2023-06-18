
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
                    const stateOptions = states.map(state => `<option value="${state.id}">${state.name}</option>`).join('');
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
                    const stateOptions = states.map(state => `<option value="${state.id}">${state.name}</option>`).join('');
                    nokStateSelect.innerHTML = stateOptions;
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        });
    });




    // const submitBtn = document.querySelector(".submit-btn");
    // const form = document.getElementById('apply-form');

    // function submitForm(e) {
    //     e.preventDefault()

    //     // Get all the form elements
    //     const firstNameInput = document.getElementById('first_name');
    //     //const middleNameInput = document.getElementById('middle_name');
    //     const lastNameInput = document.getElementById('last_name');
    //     const genderSelect = document.getElementById('gender');
    //     const dobInput = document.getElementById('dob');
    //     const emailInput = document.getElementById('email');
    //     const phoneNumberInput = document.getElementById('phone');
    //     const nationalitySelect = document.getElementById('nationality');
    //     const addressInput = document.getElementById('address');
    //     const cityInput = document.getElementById('city');
    //     const countrySelect = document.getElementById('countrySelect');
    //     const stateSelect = document.getElementById('stateSelect');
    //     const nokNameInput = document.getElementById('nok_name');
    //     const nokAddressInput = document.getElementById('nok_address');
    //     const nokCityInput = document.getElementById('nok_city');
    //     const nokCountrySelect = document.getElementById('nok_country');
    //     const nokStateSelect = document.getElementById('nok_state');
    //     const nokEmailInput = document.getElementById('nok_email');
    //     const nokRelationshipInput = document.getElementById('nok_relationship');
    //     const primaryNameInput = document.getElementById('primary_name');
    //     const secondaryNameInput = document.getElementById('secondary_name');
    //     //const additionalSchoolInput = document.getElementById('additional_school');
    //     const courseSelect = document.getElementById('course');
    //     const startDateInput = document.getElementById('start_date');
    //     const applicationTypeSelect = document.getElementById('application_type');
    //     const transferLevelSelect = document.getElementById('transfer_level');
    //     const ssceCertificateInput = document.getElementById('ssce_certificate');
    //     const birthCertificateInput = document.getElementById('birth_certificate');
    //     const photoIdInput = document.getElementById('photo_passport');
    //     const passportInput = document.getElementById('passport');
    //     const hobbiesInterestTextarea = document.getElementById('hobbies_interest');
    //     const referrerSelect = document.getElementById('referrer');

    //     // Validate required fields
    //     const requiredFields = [
    //         firstNameInput,
    //         lastNameInput,
    //         genderSelect,
    //         dobInput,
    //         emailInput,
    //         phoneNumberInput,
    //         nationalitySelect,
    //         addressInput,
    //         cityInput,
    //         countrySelect,
    //         stateSelect,
    //         nokNameInput,
    //         nokAddressInput,
    //         nokCityInput,
    //         nokCountrySelect,
    //         nokStateSelect,
    //         nokEmailInput,
    //         nokRelationshipInput,
    //         primaryNameInput,
    //         secondaryNameInput,
    //         courseSelect,
    //         startDateInput,
    //         applicationTypeSelect,
    //         transferLevelSelect,
    //         ssceCertificateInput,
    //         birthCertificateInput,
    //         photoIdInput,
    //         passportInput,
    //         hobbiesInterestTextarea,
    //         referrerSelect
    //     ];

    //       // Disable the button and change the text to "Loading"
    //       submitBtn.disabled = true;
    //       submitBtn.innerHTML = 'Loading...';

    //     let isValid = true;

    //     for (const field of requiredFields) {
    //         if (!field.value) {
    //             isValid = false;
    //             field.classList.add('error');
    //             submitBtn.disabled = false;
    //             submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';

    //         } else {
    //             //field.classList.remove('error');
    //             submitBtn.disabled = false;
    //             submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //         }
    //     }

    //     // Validate email format
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(emailInput.value)) {
    //         isValid = false;
    //         //emailInput.classList.add('error');

    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Almost there...',
    //             text: 'Invalid Email Address',
    //             confirmButtonText: 'OK'
    //         });

    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';

    //     } else {
    //         //emailInput.classList.remove('error');
    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //     }

    //     // Validate phone number format
    //     const phoneNumberRegex = /^\+?\d{8,15}$/;
    //     if (!phoneNumberRegex.test(phoneNumberInput.value)) {
    //         isValid = false;
    //         //phoneNumberInput.classList.add('error');

    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Almost there...',
    //             text: 'Invalid Phone Number',
    //             confirmButtonText: 'OK'
    //         });

    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //     } else {
    //         //phoneNumberInput.classList.remove('error');
    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //     }

    //     if (isValid) {
    //         // Reset all fields to empty after form submission
    //         const formElements = document.querySelectorAll('input, select, textarea');
    //         formElements.forEach((element) => {
    //             element.value = '';
    //         });

    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Form Submitted',
    //             text: 'Your Application Has Been Submitted Successfully!',
    //             confirmButtonText: 'OK'
    //         });

    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //         return;

    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'Please fill in all required fields correctly!',
    //             confirmButtonText: 'OK'
    //         });

    //         submitBtn.disabled = false;
    //         submitBtn.innerHTML = 'Submit <i class="icon-4"></i>';
    //     }
    // }

    // form.addEventListener("submit", submitForm);