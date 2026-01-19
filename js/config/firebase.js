/**
 * CONFIGURACIÓN FIREBASE
 * Reemplaza con tus credenciales de Firebase Console
 */

const firebaseConfig = {
    apiKey: "AIzaSyD04Rshct4LNMV1PBJRoPEwVupo5xie1Pc",
    authDomain: "appspa-cf14d.firebaseapp.com",
    projectId: "appspa-cf14d",
    storageBucket: "appspa-cf14d.firebasestorage.app",
    messagingSenderId: "828208343990",
    appId: "1:828208343990:web:2336177f5cc7595b0a6f17"
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
