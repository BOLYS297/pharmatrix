// 🟢 Classe représentant un utilisateur
class User {
  constructor(first_name, name, email,phone, localisation,password) {
    this.first_name = first_name;
    this.name = name;
    this.email = email;
    this.localisation = localisation;
    this.phone = phone;
    this.password = password;
  }
  createField(titre, valeur, classname) {
    let b= document.createElement('b');
    let span= document.createElement('span');
    span.textContent= valeur;
    let div= document.createElement('div');
    div.appendChild(b);
    div.appendChild(span);
    div.classList.add(classname);
    return div;
  }

  convertToHTML(id) {
  let prenom = this.createField('PRENOM', this.first_name, 'prenom');
  let nom = this.createField('NOM', this.name, 'nom');
  let email = this.createField('EMAIL', this.email, 'email');
  let localisation = this.createField('LOCALISATION', this.localisation, 'localisation');
  let phone = this.createField('TELEPHONE', this.phone, 'telephone');
  let password = this.createField('MOT DE PASSE', this.password, 'password');

  let elt = document.createElement('div');
  elt.appendChild(prenom);
  elt.appendChild(nom);
  elt.appendChild(email);
  elt.appendChild(phone);
  elt.appendChild(localisation);
  elt.appendChild(password);
  elt.id = 'user_' + id;
  // 🔘 Ajout des boutons
  const btnDelete = document.createElement('button');
  btnDelete.textContent = "Supprimer";
  btnDelete.style.marginRight = '10px';
  btnDelete.onclick = () => {
    userDB.deleteUser(id).then(() => userDB.printUsers());
  };
  // Ajoute les boutons à l'élément
  elt.appendChild(btnDelete);
  return elt; // ✔️ retour final ici
}
}
// 🟢 Classe pour gérer la base IndexedDB
class UserDB {
  constructor(){
    this.dbName = "DBpharmatrix"; // Nom de la base
    this.storeName = "users"; //Nom du "store" (équivalent d'une table)
    this.db = null; // Instance de la base de données
  }
  // 🟢 Méthode pour ouvrir la base
  async openDB() {
    // ✅ Si la base est déjà ouverte, on la retourne directement
    if (this.db) {
      return this.db;
    }
    const request = indexedDB.open(this.dbName, 1);        // 1 c'est la version de la base   ;     indexedDB .open() ouvre ou crée la base de donnée
    // ✅ Retourner une promesse pour attendre l'ouverture
    return new Promise((resolve, reject) => {
      request.onupgradeneeded = (event) => {        // onupgradeneeded est un evenement declenche lors de la création initiale de la base
        const db = event.target.result; // On récupère la base
        if (!db.objectStoreNames.contains(this.storeName)) {       // objectStoreName est une propriété  de l'object IDBDatabase qui renvoie un tableau de chaines de caracteres qui contient les noms de tous les magasins d'objets dans la base de données
          db.createObjectStore(this.storeName, {         // cerateObjectStore est une methode de l'objet IDBDatabase dans IndexedDB qui permet de créer un magasin d'objets dans une base de donnée
            keyPath: "id", // Clé primaire
            autoIncrement: true, // ✅ Ajouté pour que l'id soit généré automatiquement
          });
        }
      };
      // ✅ Gestion du succès de l'ouverture
      request.onsuccess = (event) => {         //  onsuccess est un evenement declenche quand la connexion a la base de donnée est etablie avec success
        this.db = event.target.result; // On stocke la base
        resolve(this.db); // On résout la promesse avec la base ouverte
      };
      request.onerror = (event) => {
        reject(event.target.error); // On rejette proprement la promesse avec l'erreur
      };
    });
  }
  // 🟢 Méthode pour ajouter un utilisateur
  async addUser(user) {
    // On attend que la base soit prête
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction.    transaction est un objet qui permet d'effectuer des opérations sur la base de donnée de maniere securisée et controlée
      const store = tx.objectStore(this.storeName); // Accès au store     objectStore est un magasin d'objets qui stocke des donnée sous forme de paires clé valeur 
      const request = store.add(user); // Insertion de l'utilisateur
      request.onsuccess = () => resolve(user);
      request.onerror = (e) => reject(e.target.error);
    });
  }
  // 🟢 Méthode pour modifier un utilisateur
  async updateUser(user) {
    // On attend que la base soit prête
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.put(user);
      request.onsuccess = () => resolve(user);
      request.onerror = (e) => reject(e.target.error);
    });
  }
  // 🟢 Méthode pour lire un utilisateur
  async readUser(id) {
    // On attend que la base soit prête
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.get(id);
      request.onsuccess = (e) => {
        const user= e.target.result;
        if(user) {
          resolve(user)
        }
        else {
          reject(new Error("Utilisateur non trouvé"));
        }
      };
      request.onerror = (e) => reject(e.target.error);
    });
  }
  // 🟢 Méthode pour supprimer un utilisateur
  async deleteUser(id) {
    // On attend que la base soit prête
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.delete(id);
      request.onsuccess = () => resolve('Utilisateur supprimé avec succès');
      request.onerror = (e) => reject(e.target.error);
    });
  }
  // 🟢 Récupérer tous les utilisateurs
  async readAllUser() {
    // On attend que la base soit prête
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.getAll();
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }
printUsers(){
  document.querySelector("#users").innerHTML = '';
// Affichage
const users= this.readAllUser();
if(users != null) {
  users.then((result) => {
    if(result.length > 0) {
      for(let i= 0; i < result.length; i++) {
        user= new User(
          result[i].first_name,
          result[i].name,
          result[i].email,
          result[i].phone,
          result[i].localisation,
          result[i].password
        );
        document.querySelector('#users').appendChild(user.convertToHTML(result[i].id));
      }
    }
  });
}
}
}
// Déclaration des objets
const userDB = new UserDB();
let user= null;
userDB.printUsers();
//Gérer le formulaire
document.addEventListener("DOMContentLoaded", () => {
  //selectionner les inputs
  const inputs=document.querySelectorAll(".papa8");
  const btn=document.querySelector(".papa11");
  btn.addEventListener('click', async(e)=>
    {
      e.preventDefault(); //empecher le button de recharger la page
      const [prenom,nom,email,tel,localisation,password]=Array.from(inputs).map(input=>input.value);
      if (!prenom || !nom || !email || !tel || !localisation || !password) 
      {
        alert("Veuillez Remplir tous les champs.")
        return;
      }
      const user = new User( prenom,nom,email,tel,localisation,password);
      await userDB.addUser(user);
      inputs.forEach(input=>input.value="");
      alert("Utilisateur ajouter avec success")
      userDB.printUsers();

  })
});
