// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "countries-6cd83.firebaseapp.com",
    projectId: "countries-6cd83",
    storageBucket: "countries-6cd83.appspot.com",
    messagingSenderId: "343811801075",
    appId: "1:343811801075:web:4dc2c7502354acdac01c86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//here we get access to the project authentification and database
const auth = getAuth(app);
const db = getFirestore(app);

//it takes time to gets to the external server, so we export it as a promise. We need async
const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password) //it is a google function
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log("Error")
        alert(error.message)
    }
}

export { auth, db, registerWithEmailAndPassword } //we export the function to use it in the component