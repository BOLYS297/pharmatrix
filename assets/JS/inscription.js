// Vérification du champ "firstname" à chaque saisie
document.getElementById("firstname").addEventListener("input", function() {
    let val = this.value;
    let regex = /^[A-Z][a-zA-Z]+$/;
    let errorMsg = document.getElementById("firstname-error");
    if (!errorMsg) {
        errorMsg = document.createElement("div");
        errorMsg.id = "firstname-error";
        errorMsg.style.color = "red";
        this.parentNode.appendChild(errorMsg);
    }
    if (regex.test(val)) {
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Le nom de famille doit commencer par une lettre majuscule et contenir uniquement des lettres.";
    }
});
// Vérification du champ "lastname" à chaque saisie
document.getElementById("lastname").addEventListener("input", function() {
    let contenu= this.value;
    let regex = /^[A-Z][a-zA-Z]+$/;
    let errorMsg2 = document.getElementById("lastname-error");
    if (!errorMsg2) {
        errorMsg2 = document.createElement("div");
        errorMsg2.id = "lastname-error";
        errorMsg2.style.color = "red";
        errorMsg2.style.marginLeft = "30px";
        this.parentNode.appendChild(errorMsg2);
    }
    if (regex.test(contenu)) {
        errorMsg2.textContent = "";
    } else {
        errorMsg2.textContent = "Le prenom doit commencer par une lettre majuscule et contenir uniquement des lettres.";
        document.getElementById()
    }
});
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
    if (document.getElementById("firstname-error").textContent ||
        document.getElementById("lastname-error").textContent ||
        document.getElementById("email-error").textContent ||
        document.getElementById("password-error").textContent ||
        document.getElementById("tel-error").textContent ||
        document.getElementById("localisation-error").textContent) {
        errorMsg5.textContent = "Veuillez corriger les erreurs avant de soumettre le formulaire.";
        event.preventDefault();
    } else {
        errorMsg5.textContent = "";
        alert("Formulaire soumis avec succès !");
    }
});
// Vérification du champ "tel" à chaque saisie
document.getElementById("tel").addEventListener("input", function() {
    let tel = this.value;
    let regex = /^6\d{8}$/;
    let errorMsg = document.getElementById("tel-error");
    if (!errorMsg) {
        errorMsg = document.createElement("div");
        errorMsg.id = "tel-error";
        errorMsg.style.color = "red";
        this.parentNode.appendChild(errorMsg);
    }
    if (regex.test(tel)) {
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Le numéro de téléphone doit commencer par 6 et contenir exactement 9 chiffres.";
    }
});
// Vérification du champ "localisation" à chaque saisie
document.getElementById("localisation").addEventListener("input", function() {
    let val = this.value;
    let regex = /^[a-zA-Z0-9.-]+$/;
    let errorMsg = document.getElementById("localisation-error");
    if (!errorMsg) {
        errorMsg = document.createElement("div");
        errorMsg.id = "localisation-error";
        errorMsg.style.color = "red";
        this.parentNode.appendChild(errorMsg);
    }
    if (regex.test(val)) {
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "La localisation doit contenir uniquement des lettres, des chiffres, des points ou des tirets.";
    }
});