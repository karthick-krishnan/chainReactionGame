import Firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_DB_URL } from './constants/index';



const config = {
    apiKey: FIREBASE_API_KEY,
    databaseURL: FIREBASE_DB_URL,
    projectId: FIREBASE_PROJECT_ID,
};
let app = Firebase.initializeApp(config);



export const db = app.database();