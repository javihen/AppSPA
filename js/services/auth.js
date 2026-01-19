/**
 * SERVICIOS DE AUTENTICACIÓN
 * Maneja login, registro y cierre de sesión
 * Funciona tanto con Firebase como con localStorage (modo demo)
 */

class AuthService {
    
    static isLocalMode = false;
    static currentUser = null;
    static listeners = [];

    static init() {
        try {
            // Determinar si usar modo local
            const hasNoFirebase = typeof firebase === 'undefined' || !firebase.apps || firebase.apps.length === 0;
            const isFileProtocol = window.location.protocol === 'file:';
            const noFirebaseConfig = typeof firebaseConfig === 'undefined' || !firebaseConfig.projectId;
            
            this.isLocalMode = isFileProtocol || hasNoFirebase || noFirebaseConfig;
            
            if (this.isLocalMode) {
                console.log('📱 Autenticación: Modo LOCAL');
                this.loadLocalUser();
            } else {
                console.log('🔥 Autenticación: Firebase');
            }
        } catch (error) {
            console.error('Error inicializando AuthService:', error);
            this.isLocalMode = true;
            this.loadLocalUser();
        }
    }

    /**
     * Registrar nuevo usuario administrador
     */
    static async signup(email, password, adminCode = '12345') {
        try {
            // Validar código de administrador
            if (adminCode !== '12345') {
                throw new Error('Código de administrador inválido');
            }

            if (this.isLocalMode) {
                // Modo local: guardar en localStorage
                const users = JSON.parse(localStorage.getItem('spa_users') || '{}');
                
                if (users[email]) {
                    throw new Error('El email ya está registrado');
                }
                
                const uid = `user_${Date.now()}`;
                const user = {
                    uid,
                    email,
                    password: this.hashPassword(password),
                    rol: 'admin',
                    fechaCreacion: new Date().toISOString(),
                    activo: true
                };
                
                users[email] = user;
                localStorage.setItem('spa_users', JSON.stringify(users));
                localStorage.setItem('spa_currentUser', JSON.stringify({ uid, email, rol: 'admin' }));
                
                this.currentUser = { uid, email, rol: 'admin' };
                this.notifyListeners(this.currentUser);
                
                return user;
            } else {
                // Modo Firebase
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                await db.collection('usuarios').doc(user.uid).set({
                    uid: user.uid,
                    email: email,
                    rol: 'admin',
                    fechaCreacion: new Date(),
                    activo: true
                });

                return user;
            }
        } catch (error) {
            throw new Error(`Error en registro: ${error.message}`);
        }
    }

    /**
     * Iniciar sesión con email y contraseña
     */
    static async login(email, password) {
        try {
            if (this.isLocalMode) {
                // Modo local: verificar en localStorage
                const users = JSON.parse(localStorage.getItem('spa_users') || '{}');
                const user = users[email];
                
                if (!user) {
                    throw new Error('Email no encontrado');
                }
                
                if (user.password !== this.hashPassword(password)) {
                    throw new Error('Contraseña incorrecta');
                }
                
                const userData = { uid: user.uid, email: user.email, rol: user.rol };
                localStorage.setItem('spa_currentUser', JSON.stringify(userData));
                
                this.currentUser = userData;
                this.notifyListeners(this.currentUser);
                
                return userData;
            } else {
                // Modo Firebase
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                return userCredential.user;
            }
        } catch (error) {
            throw new Error(`Error en login: ${error.message}`);
        }
    }

    /**
     * Cerrar sesión
     */
    static async logout() {
        try {
            if (this.isLocalMode) {
                localStorage.removeItem('spa_currentUser');
                this.currentUser = null;
                this.notifyListeners(null);
            } else {
                await auth.signOut();
            }
        } catch (error) {
            throw new Error(`Error al cerrar sesión: ${error.message}`);
        }
    }

    /**
     * Obtener usuario actual
     */
    static getCurrentUser() {
        if (this.isLocalMode) {
            return this.currentUser;
        }
        return auth.currentUser;
    }

    /**
     * Obtener datos del usuario
     */
    static async getUserData(uid) {
        try {
            if (this.isLocalMode) {
                const currentUser = JSON.parse(localStorage.getItem('spa_currentUser') || '{}');
                return currentUser.uid ? currentUser : null;
            } else {
                return await DatabaseService.obtenerUsuario(uid);
            }
        } catch (error) {
            console.error('Error obteniendo datos del usuario:', error);
            return null;
        }
    }

    /**
     * Escuchar cambios en autenticación
     */
    static onAuthStateChanged(callback) {
        if (this.isLocalMode) {
            // Modo local: invocar callback inmediatamente
            callback(this.currentUser);
            // Guardar listener para cambios posteriores
            this.listeners.push(callback);
            // Retornar función para dejar de escuchar
            return () => {
                this.listeners = this.listeners.filter(l => l !== callback);
            };
        } else {
            // Modo Firebase
            return auth.onAuthStateChanged(callback);
        }
    }

    /**
     * Notificar a todos los listeners de cambios de autenticación
     */
    static notifyListeners(user) {
        this.listeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error('Error en listener de autenticación:', error);
            }
        });
    }

    /**
     * Hash simple para contraseñas (NO usar en producción)
     * Solo para modo demo local
     */
    static hashPassword(password) {
        // Hash simple basado en la suma de códigos de caracteres
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a entero de 32 bits
        }
        return 'hash_' + Math.abs(hash);
    }

    /**
     * Cargar usuario local si existe sesión previa
     */
    static loadLocalUser() {
        const stored = localStorage.getItem('spa_currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            this.notifyListeners(this.currentUser);
        }
    }

    /**
     * Crear usuario demo para pruebas rápidas
     */
    static createDemoUser() {
        if (this.isLocalMode) {
            const email = 'demo@spa.com';
            const password = '123456';
            const users = JSON.parse(localStorage.getItem('spa_users') || '{}');
            
            if (!users[email]) {
                const uid = 'demo_user_123';
                users[email] = {
                    uid,
                    email,
                    password: this.hashPassword(password),
                    rol: 'admin',
                    fechaCreacion: new Date().toISOString(),
                    activo: true
                };
                localStorage.setItem('spa_users', JSON.stringify(users));
                console.log('✅ Usuario demo creado: demo@spa.com / 123456');
            }
        }
    }
}

// Inicializar autenticación
window.addEventListener('load', () => {
    AuthService.init();
    AuthService.createDemoUser(); // Crear usuario de prueba
});

// Exportar servicio
window.AuthService = AuthService;
