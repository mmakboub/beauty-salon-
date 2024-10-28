$(function() {
    // Obtenir le formulaire
    var form = $('#contact-form');

    // Écouteur d'événement pour le formulaire de contact
    $(form).submit(function(e) {
        // Empêcher le navigateur de soumettre le formulaire
        e.preventDefault();

        // Récupérer les données du formulaire
        const nom = $('#Nom').val().trim();
        const prenom = $('#Prenom').val().trim();
        const date = $('#Date').val().trim();
        const message = $('#Message').val().trim();

        let valid = true;

        // Effacer les messages d'erreur précédents
        $('.error-message').text('');

        // Validation du Nom
        if (nom.length < 4  ||  /\d/.test(nom) ) {
            $('#error-nom').text("Le champ Nom doit contenir au moins 4 caractères.");
            valid = false;
        }

        // Validation du Prénom
        if (prenom.length < 4 ||  /\d/.test(prenom)) {
            $('#error-prenom').text("Le champ Prénom doit contenir au moins 4 caractères.");
            valid = false;
        }

        // Validation de la Date
        const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        const dateMatch = date.match(datePattern);
        if (!dateMatch) {
            $('#error-date').text("Veuillez entrer la date au format jj-mm-aaaa.");
            valid = false;
        } else {
            // Extraire les parties de la date
            const day = parseInt(dateMatch[1], 10);
            const month = parseInt(dateMatch[2], 10);
            const year = parseInt(dateMatch[3], 10);

            // Vérifier si le jour et le mois sont valides
            if (month < 1 || month > 12 || !isValidDay(day, month, year)) {
                $('#error-date').text("Veuillez entrer un jour et un mois valides.");
                valid = false;
            }

            // Créer une date à partir des valeurs
            const inputDate = new Date(year, month - 1, day);
            const today = new Date();
            const maxDate = new Date(2025, 4, 31);

            if (inputDate < today || inputDate > maxDate) {
                $('#error-date').text("Veuillez entrer une date valide (pas de date passée et avant le 31 mai 2025).");
                valid = false;
            }
        }

        // Validation du Message
        if (message.length < 20) {
            $('#error-message').text("Le message doit contenir au moins 20 caractères.");
            valid = false;
        }

        // Si le formulaire est valide, envoyer le message via WhatsApp
        if (valid) {
            const whatsappMessage = `*Nom:* ${nom}%0A*Prénom:* ${prenom}%0A*Date:* ${date}%0A*Message:* ${message}`;
            const whatsappNumber = '212684829849';
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

            // Ouvrir WhatsApp dans un nouvel onglet
            window.open(whatsappURL, '_blank');

            // Effacer le formulaire
            $('#contact-form input, #contact-form textarea').val('');
        }
    });

    function isValidDay(day, month, year) {
        const daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return day >= 1 && day <= daysInMonth[month - 1];
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
});
