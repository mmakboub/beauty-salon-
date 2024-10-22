$(function() {
    // Get the form.
    var form = $('#contact-form');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Get form data
        const name = $('#Nom').val();
        const email = $('#Prenom').val();
        const subject = $('#Date').val();
        const message = $('#Message').val();

        // Construct the WhatsApp message
        const whatsappMessage = `*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;

        // WhatsApp number (replace with your actual number in international format)
        const whatsappNumber = '212684829849';

        // WhatsApp API URL
        const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

        // Open WhatsApp in a new tab with the pre-filled message
        window.open(whatsappURL, '_blank');

        // Optionally, clear the form
        $('#contact-form input, #contact-form textarea').val('');
    });
});
