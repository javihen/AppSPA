/**
 * GESTOR DE BASE DE DATOS INTELIGENTE
 * Detecta automáticamente si usa Realtime Database, Firestore o localStorage
 * - Con Firebase configurado: usa Realtime Database
 * - En protocolo file:// o sin Firebase: usa localStorage
 */

class DatabaseService {
    
    static isLocalStorage = false;
    static isRealtimeDB = false;
    static isFirestore = false;
    static db = null;

    static init() {
        // Verificar si debe usar localStorage
        const isFileProtocol = window.location.protocol === 'file:';
        const hasFirebaseConfig = typeof firebaseConfig !== 'undefined' && firebaseConfig.projectId;
        
        this.isLocalStorage = isFileProtocol && !hasFirebaseConfig;
        this.isRealtimeDB = !this.isLocalStorage && hasFirebaseConfig && typeof db !== 'undefined';
        this.isFirestore = !this.isLocalStorage && !this.isRealtimeDB && hasFirebaseConfig;
        
        if (this.isLocalStorage) {
            this.db = LocalStorageDB;
            console.log('📱 Usando base de datos LOCAL (localStorage)');
        } else if (this.isRealtimeDB) {
            this.db = RealtimeDatabaseService;
            console.log('🔥 Usando Firebase Realtime Database');
        } else {
            this.db = RealtimeDatabaseService; // Fallback a Realtime Database
            console.log('⚙️ Usando Firebase (fallback)');
        }
    }

    // ==================== CLIENTAS ====================

    static async crearClienta(datos) {
        return await this.db.crearClienta(datos);
    }

    static async obtenerClientas() {
        return await this.db.obtenerClientas();
    }

    static async obtenerClienta(id) {
        return await this.db.obtenerClienta(id);
    }

    static async actualizarClienta(id, datos) {
        return await this.db.actualizarClienta(id, datos);
    }

    static async eliminarClienta(id) {
        return await this.db.eliminarClienta(id);
    }

    // ==================== EMPLEADAS ====================

    static async crearEmpleada(datos) {
        return await this.db.crearEmpleada(datos);
    }

    static async obtenerEmpleadas() {
        return await this.db.obtenerEmpleadas();
    }

    static async obtenerEmpleada(id) {
        return await this.db.obtenerEmpleada(id);
    }

    static async actualizarEmpleada(id, datos) {
        return await this.db.actualizarEmpleada(id, datos);
    }

    static async eliminarEmpleada(id) {
        return await this.db.eliminarEmpleada(id);
    }

    // ==================== SERVICIOS ====================

    static async crearServicio(datos) {
        return await this.db.crearServicio(datos);
    }

    static async obtenerServicios() {
        return await this.db.obtenerServicios();
    }

    static async obtenerServicio(id) {
        return await this.db.obtenerServicio(id);
    }

    static async actualizarServicio(id, datos) {
        return await this.db.actualizarServicio(id, datos);
    }

    static async eliminarServicio(id) {
        return await this.db.eliminarServicio(id);
    }

    // ==================== ATENCIONES ====================

    static async crearAtencion(datos) {
        return await this.db.crearAtencion(datos);
    }

    static async obtenerAtenciones() {
        return await this.db.obtenerAtenciones();
    }

    static async obtenerAtencion(id) {
        return await this.db.obtenerAtencion(id);
    }

    static async obtenerAtencionesPorRango(startDate, endDate) {
        return await this.db.obtenerAtencionesPorRango(startDate, endDate);
    }

    static async actualizarAtencion(id, datos) {
        return await this.db.actualizarAtencion(id, datos);
    }

    static async eliminarAtencion(id) {
        return await this.db.eliminarAtencion(id);
    }

    // ==================== USUARIOS ====================

    static async crearUsuario(uid, datos) {
        return await this.db.crearUsuario(uid, datos);
    }

    static async obtenerUsuario(uid) {
        return await this.db.obtenerUsuario(uid);
    }
}

// Inicializar en cuanto la página cargue
window.addEventListener('load', () => {
    DatabaseService.init();
});

// Exportar servicio
window.DatabaseService = DatabaseService;
