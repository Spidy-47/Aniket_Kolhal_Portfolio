document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('status');

  
    status.className = "";

    if (!name || !email || !phone || !subject || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.className = 'error show';
        return;
    }

    if (name.length < 3) {
        status.textContent = 'Name must be at least 3 characters long.';
        status.className = 'error show';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Enter a valid email address.';
        status.className = 'error show';
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        status.textContent = 'Phone must be 10 digits.';
        status.className = 'error show';
        return;
    }

    if (subject.length < 5) {
        status.textContent = 'Subject must be at least 5 characters long.';
        status.className = 'error show';
        return;
    }

    if (message.length < 10) {
        status.textContent = 'Message must be at least 10 characters long.';
        status.className = 'error show';
        return;
    }

    // SUCCESS
    status.textContent = 'Thank you for reaching out! I will get back to you soon.';
    status.className = 'success show';

    // Send email via mailto
    event.target.submit();

    // Reset form fields
    event.target.reset();

    setTimeout(() => {
        status.className = "";
        status.textContent = "";
    }, 3000);
});
