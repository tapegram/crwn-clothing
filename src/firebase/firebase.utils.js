import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBdujXC7OA01QP2vboIEJ_-6ZhqdO5057c",
    authDomain: "crwn-db-1debd.firebaseapp.com",
    databaseURL: "https://crwn-db-1debd.firebaseio.com",
    projectId: "crwn-db-1debd",
    storageBucket: "crwn-db-1debd.appspot.com",
    messagingSenderId: "138388973094",
    appId: "1:138388973094:web:b29e5cd10b95d50d9228e7",
    measurementId: "G-N11MHNBDN9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
