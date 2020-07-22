import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyAQfroDFhH0HcfCQAh33cHh6bA2ADXMRsE",
    authDomain: "app-react-quiz.firebaseapp.com",
    databaseURL: "https://app-react-quiz.firebaseio.com",
    projectId: "app-react-quiz",
    storageBucket: "app-react-quiz.appspot.com",
    messagingSenderId: "551902356240",
    appId: "1:551902356240:web:9e8ed2759b0bf07fbefb95"
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