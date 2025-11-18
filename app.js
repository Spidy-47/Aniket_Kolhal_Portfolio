document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const user_subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('status');

    status.className = "";

    // Validation
    if (!name || !email || !phone || !user_subject || !message) {
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

    if (user_subject.length < 5) {
        status.textContent = 'Subject must be at least 5 characters long.';
        status.className = 'error show';
        return;
    }

    if (message.length < 10) {
        status.textContent = 'Message must be at least 10 characters long.';
        status.className = 'error show';
        return;
    }

    const params = {
        name: name,
        email: email,
        phone: phone,
        user_subject: user_subject,
        message: message
    };

    // ⭐ YOUR CORRECT SERVICE + TEMPLATE ID HERE ⭐
    emailjs.send("service_yf0xx49", "template_84l72rc", params)
        .then(() => {
            status.textContent = 'Message sent successfully!';
            status.className = 'success show';
            document.getElementById("contactForm").reset();
        })
        .catch(() => {
            status.textContent = 'Failed to send message. Please try again.';
            status.className = 'error show';
        });

    setTimeout(() => {
        status.className = "";
        status.textContent = "";
    }, 4000);
});
