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

    // Validation du nom : au moins 2 caractères alphabétiques
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    if (!nameRegex.test(name)) {
        document.getElementById('nameError').innerText = "Le nom doit contenir seulement des lettres et avoir au moins 3 caractères.";
        return;
    }

    // Validation du prénom : au moins 2 caractères alphabétiques
    if (!nameRegex.test(prenom)) {
        document.getElementById('prenomError').innerText = "Le prénom doit contenir seulement des lettres et avoir au moins 3 caractères.";
        return;
    }

  
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/; 
if (!dateRegex.test(date)) {
    document.getElementById('dateError').innerText = "Veuillez entrer une date au format DD-MM-YYYY.";
    return;
}


const [day, month, year] = date.split('-').map(Number);


if (month < 1 || month > 12 || day < 1 || day > 31) {
    document.getElementById('dateError').innerText = "Date Invalide !";
    return;
}

const daysInMonth = new Date(year, month, 0).getDate();
if (day > daysInMonth) {
    document.getElementById('dateError').innerText = "Date Invalide !";
    return;
}


const dateObj = new Date(year, month - 1, day); 
if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
    document.getElementById('dateError').innerText = "Date Invalide !";
    return;
}


const today = new Date();
today.setHours(0, 0, 0, 0); 
if (dateObj < today) {
    document.getElementById('dateError').innerText = "Date Invalid !";
    return;
}


    
    if (message.trim() === "") {
        document.getElementById('messageError').innerText = "Message Vide !";
        return;
    }

    
    const msg = `Nom : ${name}\nPrénom : ${prenom}\nDate : ${date}\nMessage : ${message}\nCatégorie : ${category}`;
  
   
    const phoneNumber = "212684829849";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;

    
    window.open(url, '_blank');
}


document.querySelector(".atf-salon-form-box").onsubmit = sendWhatsAppMessage;
