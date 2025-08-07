//verification du champ "email" à chaque saisie
document.getElementById("email").addEventListener("input", function() {
    let email = this.value;
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsg3 = document.getElementById("email-error");
    if (!errorMsg3) {
        errorMsg3 = document.createElement("div");
        errorMsg3.id = "email-error";
        errorMsg3.style.color = "red";
        this.parentNode.appendChild(errorMsg3);
    }
    if (regex.test(email)) {
        errorMsg3.textContent = "";
    } else {
        errorMsg3.textContent = "L'email doit être au format valide.";
    }
});
// Vérification du champ "password" à chaque saisie
document.getElementById("password").addEventListener("input", function() {
    let password = this.value;
    let regex = /^(?=(?:[^A-Z]*[A-Z]){2,})(?=(?:[^0-9]*[0-9]){2,})[A-Za-z0-9]{6,8}$/;
    let errorMsg4 = document.getElementById("password-error");
    if (!errorMsg4) {
        errorMsg4 = document.createElement("div");
        errorMsg4.id = "password-error";
        errorMsg4.style.color = "red";
        this.parentNode.appendChild(errorMsg4);
    }
    if (regex.test(password)) {
        errorMsg4.textContent = "";
    } else {
        errorMsg4.textContent = "Le mot de passe doit contenir au moins 2 majuscules, au moins 2 chiffres, et être entre 6 et 8 caractères.";
    }
});
//verification du champ de l'envoi du formulaire 
document.getElementById("formulaire").addEventListener("submit", function(event) {
    let errorMsg5 = document.getElementById("form-error");
    if (!errorMsg5) {
        errorMsg5 = document.createElement("div");
        errorMsg5.id = "form-error";
        errorMsg5.style.color = "red";
        this.appendChild(errorMsg5);
    }
    if (
        document.getElementById("email-error").textContent ||
        document.getElementById("password-error").textContent ) {
        errorMsg5.textContent = "Veuillez corriger les erreurs avant de soumettre le formulaire.";
        event.preventDefault();
    } else {
        errorMsg5.textContent = "";
        alert("Formulaire soumis avec succès !");
    }
});