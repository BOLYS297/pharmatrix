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
}

class UserDB {
  constructor() {//l' absence de declaration des variables dans le contructeur est due au fait que les variables de userDB sont crees par le systeme.
    this.dbName = "DBpharmatrix"; // Nom de la base
    this.storeName = "users"; //Nom du "store" (équivalent d'une table)
    this.db = null; // Si déjà ouverte, on la retourne
  }

  // 🟢 Méthode pour ouvrir la base
  async openDB() {
    // ✅ Si la base est déjà ouverte, on la retourne directement
    if (this.db) {
      return this.db;
    const request = indexedDB.open(this.dbName, 1);
    // ✅ Retourner une promesse pour attendre l'ouverture
    return new Promise((resolve, reject) => {
      request.onupgradeneeded = (event) => {
        const db = event.target.result; // On récupère la base
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "id", // Clé primaire
            autoIncrement: true, // ✅ Ajouté pour que l'id soit généré automatiquement
          });
        }
      };
      // ✅ Gestion du succès de l'ouverture
      request.onsuccess = (event) => {
        this.db = event.target.result; // On stocke la base
        resolve(this.db); // On résout la promesse avec la base ouverte
      };
      request.onerror = (event) => {
        reject(event.target.error); // On rejette proprement la promesse avec l'erreur
      };
    });
  }
}
  // 🟢 Méthode pour ajouter un utilisateur
  async addUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.add(user); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);
      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }
   // 🟢 Méthode pour modifier un utilisateur
  async updateUser(user) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.put(user);
      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);
      request.onerror = (e) => reject(e.target.error);
    });
  }
   // 🟢 Méthode pour afficher un utilisateur
  async readUser(id) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.get(id);
      request.onsuccess = (e) => {
        const user= e.target.result;
        if(user){
          resolve(user);
        }else{
          reject(new Error("utilisateiur non trouve"));
        }
      }
      request.onerror = (e) => reject(e.target.error);
    });
  }
   // 🟢 Méthode pour supprimer un utilisateur
  async deleteUser(id) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve(user);
      request.onerror = (e) => reject(e.target.error);
    });
  }
   // 🟢 Méthode pour recuperer tous les utilisateurs
  async readUser() {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }
}
//gerer le formulaire
const userDB = new UserDB();
document.addEventListener("DOMContentLoaded", () => {
  //selectionner les inputs
  const inputs=document.querySelectorAll(".papa8");
  const btn=document.querySelector(".papa11");
  //empecher le button de recharger la page
  btn.addEventListener('click', async(e)=>
    {
      e.preventDefault();
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
  })
});
