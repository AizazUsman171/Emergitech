// Get the form element and inputs
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');
const submitButton = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzHGgi2kU2R1_PqQ26pGvHdSrURp6UNwHcnaUP1qjO8TGYJ_TcW4Dsi1wLL3nA6I67A/exec';

// Validation function for each input field
function validateInput(input) {
    const errorMessage = input.nextElementSibling;
    errorMessage.style.display = 'none';

    switch (input.id) {
        case 'name':
            if (input.value.length < 2 || input.value.length > 50) {
                errorMessage.textContent = 'Name must be between 2 and 50 characters.';
                errorMessage.style.display = 'block';
                return false;
            }
            break;

        case 'email':
            if (!input.validity.valid) {
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.style.display = 'block';
                return false;
            }
            break;

        case 'phone':
            const phonePattern = /^\+?[0-9\s()\-]{7,15}$/;
            if (!phonePattern.test(input.value)) {
                errorMessage.textContent = 'Please enter a valid phone number (7 to 15 digits).';
                errorMessage.style.display = 'block';
                return false;
            }
            break;

        case 'message':
            if (input.value.length < 10 || input.value.length > 500) {
                errorMessage.textContent = 'Message must be between 10 and 500 characters.';
                errorMessage.style.display = 'block';
                return false;
            }
            break;

        default:
            if (!input.checkValidity()) {
                errorMessage.textContent = input.validationMessage;
                errorMessage.style.display = 'block';
                return false;
            }
            break;
    }

    return true;
}

// Function to validate all inputs
function validateForm() {
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateForm()) {
        successMessage.style.display = 'block'; // Show success message
        setTimeout(() => {
            successMessage.classList.add('hide'); // Add hide class to fade out
        }, 3000); // 3-second delay before hiding the message

        setTimeout(() => {
            successMessage.style.display = 'none'; // Fully hide after animation
            successMessage.classList.remove('hide'); // Reset for next form submit
        }, 3500);

        // Send form data to Google Sheets
        const formData = new FormData(form);
        formData.append('purpose', 'Contact');

        fetch(googleScriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                form.reset(); // Reset the form after successful submission
            })
            .catch(error => console.error('Error:', error));
    }
});

// Add event listeners for real-time validation feedback
inputs.forEach((input) => {
    input.addEventListener('input', () => validateInput(input));
});