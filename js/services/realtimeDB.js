/**
 * SERVICIO DE FIREBASE REALTIME DATABASE
 * Maneja todas las operaciones CRUD con Realtime Database
 */

class RealtimeDatabaseService {
    
    // Referencias de base de datos
    static ref = null;

    static init() {
        if (typeof db !== 'undefined' && db) {
            this.ref = firebase.database().ref();
            console.log('✅ Realtime Database inicializado');
        } else {
            console.error('❌ Firebase no está disponible');
        }
    }

    // ==================== CLIENTAS ====================

    static async crearClienta(datos) {
        try {
            const id = this.generateId();
            const clientaRef = this.ref.child('clientas').child(id);
            
            await clientaRef.set({
                id,
                ...datos,
                fechaCreacion: firebase.database.ServerValue.TIMESTAMP,
                activa: true
            });
            
            return id;
        } catch (error) {
            throw new Error(`Error creando clienta: ${error.message}`);
        }
    }

    static async obtenerClientas() {
        try {
            const snapshot = await this.ref.child('clientas').orderByChild('activa').equalTo(true).get();
            
            const clientas = [];
            snapshot.forEach(childSnapshot => {
                clientas.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            return clientas;
        } catch (error) {
            throw new Error(`Error obteniendo clientas: ${error.message}`);
        }
    }

    static async obtenerClienta(id) {
        try {
            const snapshot = await this.ref.child('clientas').child(id).get();
            return snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo clienta: ${error.message}`);
        }
    }

    static async actualizarClienta(id, datos) {
        try {
            await this.ref.child('clientas').child(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando clienta: ${error.message}`);
        }
    }

    static async eliminarClienta(id) {
        try {
            await this.ref.child('clientas').child(id).update({ activa: false });
        } catch (error) {
            throw new Error(`Error eliminando clienta: ${error.message}`);
        }
    }

    // ==================== EMPLEADAS ====================

    static async crearEmpleada(datos) {
        try {
            const id = this.generateId();
            const empleadaRef = this.ref.child('empleadas').child(id);
            
            await empleadaRef.set({
                id,
                ...datos,
                fechaCreacion: firebase.database.ServerValue.TIMESTAMP,
                activa: true
            });
            
            return id;
        } catch (error) {
            throw new Error(`Error creando empleada: ${error.message}`);
        }
    }

    static async obtenerEmpleadas() {
        try {
            const snapshot = await this.ref.child('empleadas').get();
            
            const empleadas = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activa) {
                    empleadas.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            
            return empleadas;
        } catch (error) {
            throw new Error(`Error obteniendo empleadas: ${error.message}`);
        }
    }

    static async obtenerEmpleada(id) {
        try {
            const snapshot = await this.ref.child('empleadas').child(id).get();
            return snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo empleada: ${error.message}`);
        }
    }

    static async actualizarEmpleada(id, datos) {
        try {
            await this.ref.child('empleadas').child(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando empleada: ${error.message}`);
        }
    }

    static async eliminarEmpleada(id) {
        try {
            await this.ref.child('empleadas').child(id).update({ activa: false });
        } catch (error) {
            throw new Error(`Error eliminando empleada: ${error.message}`);
        }
    }

    // ==================== SERVICIOS ====================

    static async crearServicio(datos) {
        try {
            const id = this.generateId();
            const servicioRef = this.ref.child('servicios').child(id);
            
            await servicioRef.set({
                id,
                ...datos,
                fechaCreacion: firebase.database.ServerValue.TIMESTAMP,
                activo: true
            });
            
            return id;
        } catch (error) {
            throw new Error(`Error creando servicio: ${error.message}`);
        }
    }

    static async obtenerServicios() {
        try {
            const snapshot = await this.ref.child('servicios').get();
            
            const servicios = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activo) {
                    servicios.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            
            return servicios;
        } catch (error) {
            throw new Error(`Error obteniendo servicios: ${error.message}`);
        }
    }

    static async obtenerServicio(id) {
        try {
            const snapshot = await this.ref.child('servicios').child(id).get();
            return snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo servicio: ${error.message}`);
        }
    }

    static async actualizarServicio(id, datos) {
        try {
            await this.ref.child('servicios').child(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando servicio: ${error.message}`);
        }
    }

    static async eliminarServicio(id) {
        try {
            await this.ref.child('servicios').child(id).update({ activo: false });
        } catch (error) {
            throw new Error(`Error eliminando servicio: ${error.message}`);
        }
    }

    // ==================== ATENCIONES ====================

    static async crearAtencion(datos) {
        try {
            const id = this.generateId();
            const atencionRef = this.ref.child('atenciones').child(id);
            
            await atencionRef.set({
                id,
                ...datos,
                fechaCreacion: firebase.database.ServerValue.TIMESTAMP,
                activa: true
            });
            
            return id;
        } catch (error) {
            throw new Error(`Error creando atención: ${error.message}`);
        }
    }

    static async obtenerAtenciones() {
        try {
            const snapshot = await this.ref.child('atenciones').get();
            
            const atenciones = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activa) {
                    atenciones.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            
            return atenciones;
        } catch (error) {
            throw new Error(`Error obteniendo atenciones: ${error.message}`);
        }
    }

    static async obtenerAtencion(id) {
        try {
            const snapshot = await this.ref.child('atenciones').child(id).get();
            return snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo atención: ${error.message}`);
        }
    }

    static async obtenerAtencionesPorRango(startDate, endDate) {
        try {
            const snapshot = await this.ref.child('atenciones').get();
            
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            
            const atenciones = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                
                if (!data.activa) return;
                
                const atencionDate = new Date(data.fecha).getTime();
                if (atencionDate >= start && atencionDate <= end) {
                    atenciones.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            
            return atenciones;
        } catch (error) {
            throw new Error(`Error obteniendo atenciones por rango: ${error.message}`);
        }
    }

    static async actualizarAtencion(id, datos) {
        try {
            await this.ref.child('atenciones').child(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando atención: ${error.message}`);
        }
    }

    static async eliminarAtencion(id) {
        try {
            await this.ref.child('atenciones').child(id).update({ activa: false });
        } catch (error) {
            throw new Error(`Error eliminando atención: ${error.message}`);
        }
    }

    // ==================== USUARIOS ====================

    static async crearUsuario(uid, datos) {
        try {
            await this.ref.child('usuarios').child(uid).set({
                uid,
                ...datos,
                fechaCreacion: firebase.database.ServerValue.TIMESTAMP,
                activo: true
            });
        } catch (error) {
            throw new Error(`Error creando usuario: ${error.message}`);
        }
    }

    static async obtenerUsuario(uid) {
        try {
            const snapshot = await this.ref.child('usuarios').child(uid).get();
            return snapshot.exists() ? { uid: snapshot.key, ...snapshot.val() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo usuario: ${error.message}`);
        }
    }

    // ==================== ESCUCHADORES (Real-time) ====================

    static onClientasChange(callback) {
        return this.ref.child('clientas').on('value', snapshot => {
            const clientas = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activa) {
                    clientas.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            callback(clientas);
        });
    }

    static onEmpleadasChange(callback) {
        return this.ref.child('empleadas').on('value', snapshot => {
            const empleadas = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activa) {
                    empleadas.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            callback(empleadas);
        });
    }

    static onServiciosChange(callback) {
        return this.ref.child('servicios').on('value', snapshot => {
            const servicios = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activo) {
                    servicios.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            callback(servicios);
        });
    }

    static onAtencioneChange(callback) {
        return this.ref.child('atenciones').on('value', snapshot => {
            const atenciones = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (data.activa) {
                    atenciones.push({
                        id: childSnapshot.key,
                        ...data
                    });
                }
            });
            callback(atenciones);
        });
    }

    static removeListener(path) {
        this.ref.child(path).off();
    }

    // ==================== UTILIDADES ====================

    static generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // ==================== DATOS DE DEMOSTRACIÓN ====================

    static async initializeDemoData() {
        try {
            // Verificar si ya hay datos
            const snapshot = await this.ref.child('servicios').get();
            if (snapshot.exists()) {
                console.log('✅ Los datos ya existen');
                return;
            }

            console.log('📥 Inicializando datos de demostración...');

            // Crear servicios
            const servicios = [
                {
                    nombre: 'Masaje Relajante',
                    precio: 500,
                    categoria: 'masajes',
                    duracion: 60,
                    descripcion: 'Masaje completo de relajación'
                },
                {
                    nombre: 'Masaje Terapéutico',
                    precio: 600,
                    categoria: 'masajes',
                    duracion: 60,
                    descripcion: 'Masaje terapéutico y descontracturante'
                },
                {
                    nombre: 'Facial Básico',
                    precio: 350,
                    categoria: 'faciales',
                    duracion: 45,
                    descripcion: 'Limpieza e hidratación facial'
                },
                {
                    nombre: 'Pedicura Completa',
                    precio: 400,
                    categoria: 'pedicura',
                    duracion: 60,
                    descripcion: 'Pedicura completa con diseño'
                }
            ];

            const servicioIds = {};
            for (const servicio of servicios) {
                const id = this.generateId();
                servicioIds[id] = id;
                await this.crearServicio(servicio);
            }

            // Crear empleadas con comisiones
            const empleadaIds = [];
            const empleadas = [
                {
                    nombre: 'María García',
                    puesto: 'Masajista',
                    telefono: '555-0001',
                    email: 'maria@spa.com',
                    porcentajePorServicio: {
                        [Object.keys(servicioIds)[0]]: 35,
                        [Object.keys(servicioIds)[1]]: 40,
                        [Object.keys(servicioIds)[2]]: 30,
                        [Object.keys(servicioIds)[3]]: 35
                    }
                },
                {
                    nombre: 'Andrea López',
                    puesto: 'Esteticien',
                    telefono: '555-0002',
                    email: 'andrea@spa.com',
                    porcentajePorServicio: {
                        [Object.keys(servicioIds)[0]]: 30,
                        [Object.keys(servicioIds)[1]]: 35,
                        [Object.keys(servicioIds)[2]]: 40,
                        [Object.keys(servicioIds)[3]]: 40
                    }
                },
                {
                    nombre: 'Carolina Martínez',
                    puesto: 'Masajista',
                    telefono: '555-0003',
                    email: 'carolina@spa.com',
                    porcentajePorServicio: {
                        [Object.keys(servicioIds)[0]]: 38,
                        [Object.keys(servicioIds)[1]]: 42,
                        [Object.keys(servicioIds)[2]]: 28,
                        [Object.keys(servicioIds)[3]]: 38
                    }
                }
            ];

            for (const empleada of empleadas) {
                const id = await this.crearEmpleada(empleada);
                empleadaIds.push(id);
            }

            // Crear clientas
            const clientaIds = [];
            const clientas = [
                {
                    nombre: 'Laura Sánchez',
                    telefono: '555-1001',
                    email: 'laura@mail.com',
                    tipoServicio: 'Masajes'
                },
                {
                    nombre: 'Gabriela Ruiz',
                    telefono: '555-1002',
                    email: 'gabriela@mail.com',
                    tipoServicio: 'Faciales'
                },
                {
                    nombre: 'Sofia Mendoza',
                    telefono: '555-1003',
                    email: 'sofia@mail.com',
                    tipoServicio: 'Pedicura'
                }
            ];

            for (const clienta of clientas) {
                const id = await this.crearClienta(clienta);
                clientaIds.push(id);
            }

            // Crear atenciones de demostración
            const servicioIdArray = Object.keys(servicioIds);
            const demoServicios = await this.obtenerServicios();

            for (let i = 0; i < 15; i++) {
                const daysAgo = Math.floor(Math.random() * 7);
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - daysAgo);
                fecha.setHours(Math.floor(Math.random() * 8) + 9, 0, 0, 0);

                const serviciosAtencion = [];
                const numServicios = Math.floor(Math.random() * 2) + 1;
                let total = 0;

                for (let j = 0; j < numServicios; j++) {
                    const servicio = demoServicios[Math.floor(Math.random() * demoServicios.length)];
                    serviciosAtencion.push({
                        id: servicio.id,
                        nombre: servicio.nombre,
                        precio: servicio.precio
                    });
                    total += servicio.precio;
                }

                await this.crearAtencion({
                    idClienta: clientaIds[Math.floor(Math.random() * clientaIds.length)],
                    idEmpleada: empleadaIds[Math.floor(Math.random() * empleadaIds.length)],
                    servicios: serviciosAtencion,
                    total: total,
                    fecha: fecha.toISOString(),
                    notas: 'Atención de demostración'
                });
            }

            console.log('✅ Datos de demostración inicializados correctamente');
        } catch (error) {
            console.error('❌ Error inicializando datos de demostración:', error);
        }
    }
}

// Inicializar cuando Firebase esté listo
window.addEventListener('load', () => {
    setTimeout(() => {
        RealtimeDatabaseService.init();
        if (DatabaseService.isLocalStorage === false) {
            RealtimeDatabaseService.initializeDemoData();
        }
    }, 1000);
});

window.RealtimeDatabaseService = RealtimeDatabaseService;
