// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
const { VITE_FIREBASE_API } = import.meta.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_FIREBASE_API,
    authDomain: "countries-6cd83.firebaseapp.com",
    projectId: "countries-6cd83",
    storageBucket: "countries-6cd83.appspot.com",
    messagingSenderId: "343811801075",
    appId: "1:343811801075:web:4dc2c7502354acdac01c86"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//here we get access to the project authentification and database
const auth = getAuth(app);
const db = getFirestore(app);

//it takes time to gets to the external server, so we export it as a promise. We need async
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password) //it is a google function
        const user = res.user;
        //in the collection of users create a new document with the user id, name, email and authProvider
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log("Error")
        alert(error.message)
    }
}
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }
}
export const logout = () => {
    auth.signOut()

}

export { auth, db, registerWithEmailAndPassword } //we export the function to use it in the component