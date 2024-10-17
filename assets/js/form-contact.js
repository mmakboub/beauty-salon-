
$(function() {
    // Get the form.
    var form = $('#contact-form');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Get form data
        const name = $('#name').val();
        const email = $('#form_email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        // Construct the WhatsApp message
        const whatsappMessage = `*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;

        // Replace this with your WhatsApp number in international format (e.g., 15555555555 for USA)
        const whatsappNumber = '212684829849';

        // WhatsApp API URL
        const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

        // Open WhatsApp in a new tab with the pre-filled message
        window.open(whatsappURL, '_blank');

        // Optionally, clear the form
        $('#contact-form input, #contact-form textarea').val('');
    });
});
