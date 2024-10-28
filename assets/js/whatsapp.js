// Fonction de validation de date
function isValidDate(dateStr) {
    // Vérification du format
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(dateStr)) {
        return "Veuillez entrer une date au format DD-MM-YYYY.";
    }

    // Extraction du jour, mois et année
    const [day, month, year] = dateStr.split('-').map(Number);

    // Vérification des valeurs du mois et du jour
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return "Date Invalide !";
    }

    // Vérification du nombre de jours dans le mois
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
        return "Date Invalide !";
    }

    // Vérification de la date elle-même
    const dateObj = new Date(year, month - 1, day);
    if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
        return "Date Invalide !";
    }

    // Vérification que la date n'est pas dans le passé
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (dateObj < today) {
        return "Date Invalid !";
    }
    const limitDate = new Date(2025, 5, 31); // 31 mai 2025
        if (dateObj > limitDate) {
            document.getElementById('dateError').innerText = "La date ne doit pas dépasser le 31 mai 2025 !";
            return;
        }
    return null; // Pas d'erreur
}

// Exemple d'utilisation dans la fonction principale
function sendWhatsAppMessage(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value;
    const category = document.getElementById('category').value;

    // Réinitialiser les messages d'erreur
    document.getElementById('nameError').innerText = '';
    document.getElementById('prenomError').innerText = '';
    document.getElementById('dateError').innerText = '';
    document.getElementById('messageError').innerText = '';

    // Validation du nom : au moins 4 caractères alphabétiques sans chiffres
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;
    if (!nameRegex.test(name)) {
        document.getElementById('nameError').innerText = "Le nom doit contenir seulement des lettres et avoir au moins 4 caractères.";
        return;
    }

    // Validation du prénom : au moins 4 caractères alphabétiques sans chiffres
    if (!nameRegex.test(prenom)) {
        document.getElementById('prenomError').innerText = "Le prénom doit contenir seulement des lettres et avoir au moins 4 caractères.";
        return;
    }

    // Validation de la date
    const dateError = isValidDate(date);
    if (dateError) {
        document.getElementById('dateError').innerText = dateError;
        return;
    }

    // Validation du message : doit avoir au moins 20 caractères
    if (message.trim().length < 20) {
        document.getElementById('messageError').innerText = "Le message doit contenir au moins 20 caractères.";
        return;
    }

    // Créer le message pour WhatsApp
    const msg = `Nom : ${name}\nPrénom : ${prenom}\nDate : ${date}\nMessage : ${message}\nCatégorie : ${category}`;
  
    // Ouvrir WhatsApp avec le message
    const phoneNumber = "212684829849";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// Événement d'envoi du formulaire
document.querySelector(".atf-salon-form-box").onsubmit = sendWhatsAppMessage;
