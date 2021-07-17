import firebase from "firebase";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.authDomain,
  projectId: "notes-universe",
  storageBucket: "notes-universe.appspot.com",
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const analytics = firebase.analytics();

export { storage, firebase as default };
export { analytics };
