/**
 * BASE DE DATOS LOCAL - localStorage
 * Simula Firestore con almacenamiento local para permitir abrir con doble click
 * Compatible con GitHub Pages
 */

class LocalStorageDB {
    
    static COLLECTIONS = {
        clientas: 'spa_clientas',
        empleadas: 'spa_empleadas',
        servicios: 'spa_servicios',
        atenciones: 'spa_atenciones',
        usuarios: 'spa_usuarios'
    };

    // ==================== UTILIDADES ====================

    static generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    static getCollection(name) {
        const data = localStorage.getItem(this.COLLECTIONS[name]);
        return data ? JSON.parse(data) : {};
    }

    static saveCollection(name, data) {
        localStorage.setItem(this.COLLECTIONS[name], JSON.stringify(data));
    }

    // ==================== CLIENTAS ====================

    static async crearClienta(datos) {
        const id = this.generateId();
        const clientas = this.getCollection('clientas');
        clientas[id] = {
            id,
            ...datos,
            fechaCreacion: new Date().toISOString(),
            activa: true
        };
        this.saveCollection('clientas', clientas);
        return id;
    }

    static async obtenerClientas() {
        const clientas = this.getCollection('clientas');
        return Object.values(clientas).filter(c => c.activa);
    }

    static async obtenerClienta(id) {
        const clientas = this.getCollection('clientas');
        return clientas[id] || null;
    }

    static async actualizarClienta(id, datos) {
        const clientas = this.getCollection('clientas');
        if (clientas[id]) {
            clientas[id] = { ...clientas[id], ...datos };
            this.saveCollection('clientas', clientas);
        }
    }

    static async eliminarClienta(id) {
        const clientas = this.getCollection('clientas');
        if (clientas[id]) {
            clientas[id].activa = false;
            this.saveCollection('clientas', clientas);
        }
    }

    // ==================== EMPLEADAS ====================

    static async crearEmpleada(datos) {
        const id = this.generateId();
        const empleadas = this.getCollection('empleadas');
        empleadas[id] = {
            id,
            ...datos,
            fechaCreacion: new Date().toISOString(),
            activa: true
        };
        this.saveCollection('empleadas', empleadas);
        return id;
    }

    static async obtenerEmpleadas() {
        const empleadas = this.getCollection('empleadas');
        return Object.values(empleadas).filter(e => e.activa);
    }

    static async obtenerEmpleada(id) {
        const empleadas = this.getCollection('empleadas');
        return empleadas[id] || null;
    }

    static async actualizarEmpleada(id, datos) {
        const empleadas = this.getCollection('empleadas');
        if (empleadas[id]) {
            empleadas[id] = { ...empleadas[id], ...datos };
            this.saveCollection('empleadas', empleadas);
        }
    }

    static async eliminarEmpleada(id) {
        const empleadas = this.getCollection('empleadas');
        if (empleadas[id]) {
            empleadas[id].activa = false;
            this.saveCollection('empleadas', empleadas);
        }
    }

    // ==================== SERVICIOS ====================

    static async crearServicio(datos) {
        const id = this.generateId();
        const servicios = this.getCollection('servicios');
        servicios[id] = {
            id,
            ...datos,
            fechaCreacion: new Date().toISOString(),
            activo: true
        };
        this.saveCollection('servicios', servicios);
        return id;
    }

    static async obtenerServicios() {
        const servicios = this.getCollection('servicios');
        return Object.values(servicios).filter(s => s.activo);
    }

    static async obtenerServicio(id) {
        const servicios = this.getCollection('servicios');
        return servicios[id] || null;
    }

    static async actualizarServicio(id, datos) {
        const servicios = this.getCollection('servicios');
        if (servicios[id]) {
            servicios[id] = { ...servicios[id], ...datos };
            this.saveCollection('servicios', servicios);
        }
    }

    static async eliminarServicio(id) {
        const servicios = this.getCollection('servicios');
        if (servicios[id]) {
            servicios[id].activo = false;
            this.saveCollection('servicios', servicios);
        }
    }

    // ==================== ATENCIONES ====================

    static async crearAtencion(datos) {
        const id = this.generateId();
        const atenciones = this.getCollection('atenciones');
        atenciones[id] = {
            id,
            ...datos,
            fechaCreacion: new Date().toISOString(),
            activa: true
        };
        this.saveCollection('atenciones', atenciones);
        return id;
    }

    static async obtenerAtenciones() {
        const atenciones = this.getCollection('atenciones');
        return Object.values(atenciones).filter(a => a.activa);
    }

    static async obtenerAtencion(id) {
        const atenciones = this.getCollection('atenciones');
        return atenciones[id] || null;
    }

    static async obtenerAtencionesPorRango(startDate, endDate) {
        const atenciones = this.getCollection('atenciones');
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        
        return Object.values(atenciones).filter(a => {
            if (!a.activa) return false;
            const atencionDate = new Date(a.fecha).getTime();
            return atencionDate >= start && atencionDate <= end;
        });
    }

    static async actualizarAtencion(id, datos) {
        const atenciones = this.getCollection('atenciones');
        if (atenciones[id]) {
            atenciones[id] = { ...atenciones[id], ...datos };
            this.saveCollection('atenciones', atenciones);
        }
    }

    static async eliminarAtencion(id) {
        const atenciones = this.getCollection('atenciones');
        if (atenciones[id]) {
            atenciones[id].activa = false;
            this.saveCollection('atenciones', atenciones);
        }
    }

    // ==================== USUARIOS ====================

    static async crearUsuario(uid, datos) {
        const usuarios = this.getCollection('usuarios');
        usuarios[uid] = {
            uid,
            ...datos,
            fechaCreacion: new Date().toISOString(),
            activo: true
        };
        this.saveCollection('usuarios', usuarios);
    }

    static async obtenerUsuario(uid) {
        const usuarios = this.getCollection('usuarios');
        return usuarios[uid] || null;
    }

    // ==================== DATOS DE DEMOSTRACIÓN ====================

    static initializeDemoData() {
        // Verificar si ya hay datos
        if (localStorage.getItem(this.COLLECTIONS.servicios)) {
            return; // Ya existen datos
        }

        // Crear servicios de demostración
        const serviciosDemo = [
            {
                id: this.generateId(),
                nombre: 'Masaje Relajante',
                precio: 500,
                categoria: 'masajes',
                duracion: 60,
                descripcion: 'Masaje completo de relajación',
                fechaCreacion: new Date().toISOString(),
                activo: true
            },
            {
                id: this.generateId(),
                nombre: 'Masaje Terapéutico',
                precio: 600,
                categoria: 'masajes',
                duracion: 60,
                descripcion: 'Masaje terapéutico y descontracturante',
                fechaCreacion: new Date().toISOString(),
                activo: true
            },
            {
                id: this.generateId(),
                nombre: 'Facial Básico',
                precio: 350,
                categoria: 'faciales',
                duracion: 45,
                descripcion: 'Limpieza e hidratación facial',
                fechaCreacion: new Date().toISOString(),
                activo: true
            },
            {
                id: this.generateId(),
                nombre: 'Pedicura Completa',
                precio: 400,
                categoria: 'pedicura',
                duracion: 60,
                descripcion: 'Pedicura completa con diseño',
                fechaCreacion: new Date().toISOString(),
                activo: true
            }
        ];

        const serviciosObj = {};
        serviciosDemo.forEach(s => serviciosObj[s.id] = s);
        this.saveCollection('servicios', serviciosObj);

        // Crear empleadas de demostración
        const empleadasDemo = [
            {
                id: this.generateId(),
                nombre: 'María García',
                puesto: 'Masajista',
                telefono: '555-0001',
                email: 'maria@spa.com',
                porcentajePorServicio: {
                    [serviciosDemo[0].id]: 35,
                    [serviciosDemo[1].id]: 40,
                    [serviciosDemo[2].id]: 30,
                    [serviciosDemo[3].id]: 35
                },
                fechaCreacion: new Date().toISOString(),
                activa: true
            },
            {
                id: this.generateId(),
                nombre: 'Andrea López',
                puesto: 'Esteticien',
                telefono: '555-0002',
                email: 'andrea@spa.com',
                porcentajePorServicio: {
                    [serviciosDemo[0].id]: 30,
                    [serviciosDemo[1].id]: 35,
                    [serviciosDemo[2].id]: 40,
                    [serviciosDemo[3].id]: 40
                },
                fechaCreacion: new Date().toISOString(),
                activa: true
            },
            {
                id: this.generateId(),
                nombre: 'Carolina Martínez',
                puesto: 'Masajista',
                telefono: '555-0003',
                email: 'carolina@spa.com',
                porcentajePorServicio: {
                    [serviciosDemo[0].id]: 38,
                    [serviciosDemo[1].id]: 42,
                    [serviciosDemo[2].id]: 28,
                    [serviciosDemo[3].id]: 38
                },
                fechaCreacion: new Date().toISOString(),
                activa: true
            }
        ];

        const empleadasObj = {};
        empleadasDemo.forEach(e => empleadasObj[e.id] = e);
        this.saveCollection('empleadas', empleadasObj);

        // Crear clientas de demostración
        const clientasDemo = [
            {
                id: this.generateId(),
                nombre: 'Laura Sánchez',
                telefono: '555-1001',
                email: 'laura@mail.com',
                tipoServicio: 'Masajes',
                fechaCreacion: new Date().toISOString(),
                activa: true
            },
            {
                id: this.generateId(),
                nombre: 'Gabriela Ruiz',
                telefono: '555-1002',
                email: 'gabriela@mail.com',
                tipoServicio: 'Faciales',
                fechaCreacion: new Date().toISOString(),
                activa: true
            },
            {
                id: this.generateId(),
                nombre: 'Sofia Mendoza',
                telefono: '555-1003',
                email: 'sofia@mail.com',
                tipoServicio: 'Pedicura',
                fechaCreacion: new Date().toISOString(),
                activa: true
            }
        ];

        const clientasObj = {};
        clientasDemo.forEach(c => clientasObj[c.id] = c);
        this.saveCollection('clientas', clientasObj);

        // Crear atenciones de demostración (últimos 7 días)
        const atencionesList = [];
        for (let i = 0; i < 15; i++) {
            const daysAgo = Math.floor(Math.random() * 7);
            const fecha = new Date();
            fecha.setDate(fecha.getDate() - daysAgo);
            fecha.setHours(Math.floor(Math.random() * 8) + 9, 0, 0, 0);

            const serviciosAtencion = [];
            const numServicios = Math.floor(Math.random() * 2) + 1;
            let total = 0;
            
            for (let j = 0; j < numServicios; j++) {
                const servicio = serviciosDemo[Math.floor(Math.random() * serviciosDemo.length)];
                serviciosAtencion.push({
                    id: servicio.id,
                    nombre: servicio.nombre,
                    precio: servicio.precio
                });
                total += servicio.precio;
            }

            atencionesList.push({
                id: this.generateId(),
                idClienta: clientasDemo[Math.floor(Math.random() * clientasDemo.length)].id,
                idEmpleada: empleadasDemo[Math.floor(Math.random() * empleadasDemo.length)].id,
                servicios: serviciosAtencion,
                total: total,
                fecha: fecha.toISOString(),
                notas: 'Atención de demostración',
                fechaCreacion: new Date().toISOString(),
                activa: true
            });
        }

        const atencioneObj = {};
        atencionesList.forEach(a => atencioneObj[a.id] = a);
        this.saveCollection('atenciones', atencioneObj);

        console.log('✅ Datos de demostración inicializados');
    }

    // ==================== LIMPIAR DATOS ====================

    static clearAllData() {
        Object.values(this.COLLECTIONS).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('✅ Todos los datos fueron borrados');
    }
}

// Inicializar datos de demostración al cargar
document.addEventListener('DOMContentLoaded', () => {
    LocalStorageDB.initializeDemoData();
});
