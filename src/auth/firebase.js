// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, onSnapshot, doc, setDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { getFavourites } from "../store/favouritesSlice";
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

export const addFavouriteToFirebase = async (uid, name) => {
    try {
        await addDoc(collection(db, `users/${uid}/favourites`), {
            name
        });
        console.log("Favourite added to Firebase database");
    } catch (err) {
        console.error("Error adding document: ", err);
    }
};

export const removeFavouriteFromFirebase = async (uid, name) => {
    console.log("Name", name);
    try {
        if (!name) {
            console.error("Name is not defined. Error removing item");
            return;
        }
        const q = query(collection(db, `users/${uid}/favourites`),
            where("name", "==", name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Item removed");
        });
    } catch (err) {
        console.error("The item was not removed", err);
    }
};

export const closeFavouritesFromFirebase = async (uid) => {
    try {
        const q = query(collection(db, `users/${uid}/favourites`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("All items removed");
        });
    } catch (err) {
        console.error("The items were not removed", err)
    }
};
//Name of the user in real time


// const q = query(collection(db, "users"), where("name", "==", true));


export { auth, db, registerWithEmailAndPassword } //we export the function to use it in the component