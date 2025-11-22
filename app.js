const form = document.getElementById('contactForm');
const status = document.getElementById('status');
const messageBox = document.getElementById('message');

messageBox.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' && e.shiftKey) {
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        form.requestSubmit();
    }
});


form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = messageBox.value.trim();

    status.className = '';
    status.textContent = '';

    // --- VALIDATION ---
    if (!name || !email || !phone || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
    }

    if (name.length < 3) {
        showStatus('Name must be at least 3 characters long.', 'error');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Enter a valid email address.', 'error');
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showStatus('Phone must be 10 digits.', 'error');
        return;
    }

    if (subject.length < 5) {
        showStatus('Subject must be at least 5 characters long.', 'error');
        return;
    }

    if (message.length < 10) {
        showStatus('Message must be at least 10 characters long.', 'error');
        return;
    }

    // --- EMAILJS SEND ---
    emailjs.send("service_684y3bt", "template_h88ijip", {
        from_name: name,
        from_email: email,
        phone: phone,
        subject: subject,
        message: message
    })
    .then(() => {
        showStatus('✅ Message sent successfully!', 'success');
        form.reset();
    })
    .catch((error) => {
        showStatus('❌ Failed to send message. Try again.', 'error');
        console.error('EmailJS Error:', error);
    });
});


function showStatus(text, type) {
    status.textContent = text;
    status.className = `${type} show`;

    setTimeout(() => {
        status.className = '';
        status.textContent = '';
    }, 2000);
}
