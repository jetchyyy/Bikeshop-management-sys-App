import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA4Owdw8M-rdtB0VPN6E3GkoOsAN7HF6mE",
    authDomain: "bikeshop-management-system.firebaseapp.com",
    databaseURL: "https://bikeshop-management-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bikeshop-management-system",
    storageBucket: "bikeshop-management-system.firebasestorage.app",
    messagingSenderId: "161123081063",
    appId: "1:161123081063:web:b014b4d86ec4b0fa7f6dc2"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
