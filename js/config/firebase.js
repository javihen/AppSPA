/**
 * CONFIGURACIÓN FIREBASE
 * Reemplaza con tus credenciales de Firebase Console
 */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencias
const auth = firebase.auth();
const db = firebase.firestore();

// Exportar para uso global
window.firebase = firebase;
window.auth = auth;
window.db = db;
