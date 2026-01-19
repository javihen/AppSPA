/**
 * SERVICIOS DE AUTENTICACIÓN
 * Maneja login, registro y cierre de sesión
 */

class AuthService {
    /**
     * Registrar nuevo usuario administrador
     */
    static async signup(email, password, adminCode = '12345') {
        try {
            // Validar código de administrador
            if (adminCode !== '12345') {
                throw new Error('Código de administrador inválido');
            }

            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Guardar datos del usuario en Firestore
            await db.collection('usuarios').doc(user.uid).set({
                uid: user.uid,
                email: email,
                rol: 'admin',
                fechaCreacion: new Date(),
                activo: true
            });

            return user;
        } catch (error) {
            throw new Error(`Error en registro: ${error.message}`);
        }
    }

    /**
     * Iniciar sesión con email y contraseña
     */
    static async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(`Error en login: ${error.message}`);
        }
    }

    /**
     * Cerrar sesión
     */
    static async logout() {
        try {
            await auth.signOut();
        } catch (error) {
            throw new Error(`Error al cerrar sesión: ${error.message}`);
        }
    }

    /**
     * Obtener usuario actual
     */
    static getCurrentUser() {
        return auth.currentUser;
    }

    /**
     * Obtener datos del usuario desde Firestore
     */
    static async getUserData(uid) {
        try {
            const doc = await db.collection('usuarios').doc(uid).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('Error obteniendo datos del usuario:', error);
            return null;
        }
    }

    /**
     * Escuchar cambios en autenticación
     */
    static onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(callback);
    }
}

// Exportar servicio
window.AuthService = AuthService;
