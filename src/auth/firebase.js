
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { getFavourites } from "../store/favouritesSlice";
const { VITE_FIREBASE_API } = import.meta.env;



const firebaseConfig = {
    apiKey: VITE_FIREBASE_API,
    authDomain: "countries-6cd83.firebaseapp.com",
    projectId: "countries-6cd83",
    storageBucket: "countries-6cd83.appspot.com",
    messagingSenderId: "343811801075",
    appId: "1:343811801075:web:4dc2c7502354acdac01c86"
};


export const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
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

export const deleteFavouriteFromFirebase = async (uid, name) => {
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

export const deleteFavouritesFromFirebase = async (uid) => {
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

export const getFavouritesFromFirebase = () => async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
        const favourites = q.docs.map((doc) => doc.data().name);
        dispatch(getFavourites(favourites));
    }
}


export { auth, db, registerWithEmailAndPassword } 