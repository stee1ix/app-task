import { createContext, useState } from 'react';
import {
	getAuth,
	onAuthStateChanged,
	signInWithCredential,
} from 'firebase/auth';
import * as firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	return (
		<AuthContext.Provider>
			value=
			{{
				user,
				setUser,
				login: async (email, password) => {
					try {
						await firebase
							.auth()
							.signInWithEmailAndPassword(email, password);
					} catch (e) {
						console.log(e);
					}
				},
				register: async (email, password) => {
					try {
						await firebase
							.auth()
							.createUserWithEmailAndPassword(email, password);
					} catch (e) {
						console.log(e);
					}
				},
			}}
		</AuthContext.Provider>
	);
};
