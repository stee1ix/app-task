import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCye-BsnQSb3HNDJclBlLqAxoyQriYtDRo',
	authDomain: 'app-task-83a31.firebaseapp.com',
	projectId: 'app-task-83a31',
	storageBucket: 'app-task-83a31.appspot.com',
	messagingSenderId: '978958644449',
	appId: '1:978958644449:web:88f858f08505c06ac373a0',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;

		try {
			await userRef.set({
				displayName,
				email,
				...additionalData,
			});
		} catch (error) {
			console.log('Error Creating User', error.message);
		}
	}

	return userRef;
};

export const addDataToFirestore = async (key, dataObject) => {
	const collectionRef = firestore.collection(key);

	const batch = firestore.batch();
	dataObject.forEach(object => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, object);
	});

	return await batch.commit();
};

// if (firebase.app.length === 0) {
firebase.initializeApp(firebaseConfig);
// }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
