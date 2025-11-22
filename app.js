document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('status');

    status.className = "";

    // ---------- VALIDATION ----------
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

    // ---------- EMAILJS SEND ----------
    emailjs.send("service_684y3bt", "template_h88ijip", {
        from_name: name,
        from_email: email,
        phone: phone,
        subject: subject,
        message: message
    })
    .then(() => {
        status.textContent = '✅ Message sent successfully!';
        status.className = 'success show';
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        status.textContent = '❌ Failed to send message. Try again.';
        status.className = 'error show';
        console.error("EmailJS Error:", error);
    });

    // Auto clear message
    setTimeout(() => {
        status.className = "";
        status.textContent = "";
    }, 2000);
});
