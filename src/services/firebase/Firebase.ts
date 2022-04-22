import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getFirestore, getDoc, updateDoc } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}


export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)

if (window.location.hostname === 'localhost' || process.env.NODE_ENV === 'test') {
	// firestore.settings({
	// 	host: 'localhost:8081',
	// 	ssl: false,
	// })
} 
