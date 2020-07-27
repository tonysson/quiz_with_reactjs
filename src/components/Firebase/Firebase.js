import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_key,
    authDomain: process.env.REACT_APP_FIREBASE_API_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_API_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_MESSENGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_API_APPID
};

class Firebase {

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore()
    }


    /**
     * @description methode firebase permet de signup un user
     * Inscription
     */
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password) ;


    /**
     * @description methode firebase permet de connecter un user
     * Connexion
     */
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  /**
  * @description methode firebase permet de deconnecter un user
  * deconnexion
  */
    signoutUser = () => this.auth.signOut();

    /**
     * @description To get our forgotten passsword via email sender
     * 
     */
    passwordResset = (email) => this.auth.sendPasswordResetEmail(email);

    /**
     * @description
     * save the user in database: firestore
     */
    user = uid => this.db.doc(`users/${uid}`)

}

export default Firebase