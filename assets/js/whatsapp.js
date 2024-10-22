function sendWhatsAppMessage(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const name = document.getElementById('name1').value;
    const email = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    // Construire le message WhatsApp
    const message = `Nom et prénom: ${name}\nEmail: ${email}\nNuméro de téléphone: ${phone}\nDate: ${date}\nCatégorie: ${category}`;
    
    // Remplacez <NUMERO_WHATSAPP> par votre numéro de téléphone WhatsApp
    const phoneNumber = "212684829849";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Ouvrir le lien WhatsApp dans un nouvel onglet
    window.open(url, '_blank');
}