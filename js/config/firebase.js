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
    appId: "1:828208343990:web:2336177f5cc7595b0a6f17",
    databaseURL: "https://appspa-cf14d.firebaseio.com"
};

// Esperar a que Firebase esté disponible
function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.error('❌ Firebase SDK no está cargado');
            return;
        }

        // Inicializar Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Obtener referencias
        const auth = firebase.auth();
        const db = firebase.database(); // Realtime Database
        const firestore = firebase.firestore(); // Firestore (como alternativa)

        // Exportar para uso global
        window.firebase = firebase;
        window.auth = auth;
        window.db = db;
        window.firestore = firestore;

        console.log('✅ Firebase inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando Firebase:', error);
    }
}

// Ejecutar cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebase);
} else {
    initFirebase();
}
