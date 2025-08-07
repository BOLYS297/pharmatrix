
//Cree L'utilisateur
class User {
  constructor(first_name, name, email, localisation, phone, password) {
    this.first_name = first_name;
    this.name = name;
    this.email = email;
    this.localisation = localisation;
    this.phone = phone;
    this.password = password;
  }
}
//gerer la base de donnee avec indexedDB
class UserDB {
  constructor() {
    this.dbName = "DBpharmatrix";
    this.storeName = "users";
    this.db = null;
  }
  async openDB() {
    if (this.db) {
      return this.db;
    }

    //initialiser la base de donnee
    const request = indexedDB.open(this.dbName, 1);
    
    request.onupgradeneeded = (event) => {
      const bd = event.target.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        this.db.createObjectStore(this.storeName, { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
      resolve(this.db);
    };
    Request.onerror = (event) => PromiseRejectionEvent(event.target.error);

  }


  async addUser(user)
  {
    const db=await this.openDB();
    return new Promise ((resolve,reject)=>{
        const tx =db.transaction(this.storeName, "readwrite");
        const store =tx.objectStore(this.storeName);
        const request= store.add(user);
        request.onsuccess=()=>resolve(user);
        request.onerror=()=>reject(e.target.error);
    })
  }
}
