document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const successMessage = document.getElementById('formSuccessMessage');

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        let isValid = true;

        // --- Reset previous states ---
        // Clear error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        // Hide success message
        successMessage.style.display = 'none';
        // Remove error classes from inputs
        nameInput.classList.remove('input-error');
        emailInput.classList.remove('input-error');
        messageInput.classList.remove('input-error');

        // --- Validate Name ---
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameInput.classList.add('input-error');
            isValid = false;
        }

        // --- Validate Email ---
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required.';
            emailInput.classList.add('input-error');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('input-error');
            isValid = false;
        }

        // --- Validate Message ---
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            messageInput.classList.add('input-error');
            isValid = false;
        }

        // --- If Form is Valid ---
        if (isValid) {
            console.log('Form is valid. Submitting data (simulated)...');
            console.log('Name:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
            console.log('Subject:', document.getElementById('subject').value.trim()); // Get subject value too
            console.log('Message:', messageInput.value.trim());

            // Show success message
            successMessage.style.display = 'block';

            // Optionally clear the form
            form.reset();

            // In a real application, you would send the data to a server here
            // using fetch() or XMLHttpRequest
            // Example:
            // fetch('/submit-form', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name: nameInput.value.trim(), ... })
            // })
            // .then(response => response.json())
            // .then(data => console.log('Success:', data))
            // .catch((error) => console.error('Error:', error));

        } else {
            console.log('Form validation failed.');
        }
    });

    // --- Optional: Real-time feedback (remove error when user types) ---
    function clearErrorOnChange(inputElement, errorElement) {
        inputElement.addEventListener('input', function() {
            if (inputElement.value.trim() !== '') {
                errorElement.textContent = '';
                inputElement.classList.remove('input-error');
                 // Re-validate email format instantly if desired
                 if (inputElement.type === 'email' && emailRegex.test(inputElement.value.trim())) {
                     errorElement.textContent = '';
                     inputElement.classList.remove('input-error');
                 } else if (inputElement.type === 'email' && inputElement.value.trim() !== '') {
                     // Optional: Show invalid format error immediately while typing if format is wrong
                     // errorElement.textContent = 'Invalid email format.';
                     // inputElement.classList.add('input-error');
                 }
            }
        });
    }

    clearErrorOnChange(nameInput, nameError);
    clearErrorOnChange(emailInput, emailError);
    clearErrorOnChange(messageInput, messageError);

});