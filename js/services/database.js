/**
 * SERVICIOS DE BASE DE DATOS
 * Maneja todas las operaciones CRUD con Firestore
 */

class DatabaseService {
    
    // ==================== CLIENTAS ====================
    
    /**
     * Crear nueva clienta
     */
    static async crearClienta(datos) {
        try {
            const docRef = await db.collection('clientas').add({
                ...datos,
                fechaCreacion: new Date(),
                activa: true
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error creando clienta: ${error.message}`);
        }
    }

    /**
     * Obtener todas las clientas
     */
    static async obtenerClientas() {
        try {
            const snapshot = await db.collection('clientas')
                .where('activa', '==', true)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error obteniendo clientas: ${error.message}`);
        }
    }

    /**
     * Obtener clienta por ID
     */
    static async obtenerClienta(id) {
        try {
            const doc = await db.collection('clientas').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo clienta: ${error.message}`);
        }
    }

    /**
     * Actualizar clienta
     */
    static async actualizarClienta(id, datos) {
        try {
            await db.collection('clientas').doc(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando clienta: ${error.message}`);
        }
    }

    /**
     * Eliminar clienta (soft delete)
     */
    static async eliminarClienta(id) {
        try {
            await db.collection('clientas').doc(id).update({ activa: false });
        } catch (error) {
            throw new Error(`Error eliminando clienta: ${error.message}`);
        }
    }

    // ==================== EMPLEADAS ====================

    /**
     * Crear nueva empleada
     */
    static async crearEmpleada(datos) {
        try {
            const docRef = await db.collection('empleadas').add({
                ...datos,
                fechaCreacion: new Date(),
                activa: true
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error creando empleada: ${error.message}`);
        }
    }

    /**
     * Obtener todas las empleadas
     */
    static async obtenerEmpleadas() {
        try {
            const snapshot = await db.collection('empleadas')
                .where('activa', '==', true)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error obteniendo empleadas: ${error.message}`);
        }
    }

    /**
     * Obtener empleada por ID
     */
    static async obtenerEmpleada(id) {
        try {
            const doc = await db.collection('empleadas').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo empleada: ${error.message}`);
        }
    }

    /**
     * Actualizar empleada
     */
    static async actualizarEmpleada(id, datos) {
        try {
            await db.collection('empleadas').doc(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando empleada: ${error.message}`);
        }
    }

    /**
     * Eliminar empleada (soft delete)
     */
    static async eliminarEmpleada(id) {
        try {
            await db.collection('empleadas').doc(id).update({ activa: false });
        } catch (error) {
            throw new Error(`Error eliminando empleada: ${error.message}`);
        }
    }

    // ==================== SERVICIOS ====================

    /**
     * Crear nuevo servicio
     */
    static async crearServicio(datos) {
        try {
            const docRef = await db.collection('servicios').add({
                ...datos,
                fechaCreacion: new Date(),
                activo: true
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error creando servicio: ${error.message}`);
        }
    }

    /**
     * Obtener todos los servicios
     */
    static async obtenerServicios() {
        try {
            const snapshot = await db.collection('servicios')
                .where('activo', '==', true)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error obteniendo servicios: ${error.message}`);
        }
    }

    /**
     * Obtener servicio por ID
     */
    static async obtenerServicio(id) {
        try {
            const doc = await db.collection('servicios').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo servicio: ${error.message}`);
        }
    }

    /**
     * Actualizar servicio
     */
    static async actualizarServicio(id, datos) {
        try {
            await db.collection('servicios').doc(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando servicio: ${error.message}`);
        }
    }

    /**
     * Eliminar servicio (soft delete)
     */
    static async eliminarServicio(id) {
        try {
            await db.collection('servicios').doc(id).update({ activo: false });
        } catch (error) {
            throw new Error(`Error eliminando servicio: ${error.message}`);
        }
    }

    // ==================== ATENCIONES ====================

    /**
     * Crear nueva atención/servicio realizado
     */
    static async crearAtencion(datos) {
        try {
            const docRef = await db.collection('atenciones').add({
                ...datos,
                fecha: new Date(),
                completada: true
            });
            return docRef.id;
        } catch (error) {
            throw new Error(`Error creando atención: ${error.message}`);
        }
    }

    /**
     * Obtener todas las atenciones
     */
    static async obtenerAtenciones(filtros = {}) {
        try {
            let query = db.collection('atenciones');

            if (filtros.fecha) {
                const fechaInicio = new Date(filtros.fecha);
                const fechaFin = new Date(fechaInicio);
                fechaFin.setDate(fechaFin.getDate() + 1);
                query = query.where('fecha', '>=', fechaInicio).where('fecha', '<', fechaFin);
            }

            if (filtros.idEmpleada) {
                query = query.where('idEmpleada', '==', filtros.idEmpleada);
            }

            if (filtros.idClienta) {
                query = query.where('idClienta', '==', filtros.idClienta);
            }

            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error obteniendo atenciones: ${error.message}`);
        }
    }

    /**
     * Obtener atención por ID
     */
    static async obtenerAtencion(id) {
        try {
            const doc = await db.collection('atenciones').doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            throw new Error(`Error obteniendo atención: ${error.message}`);
        }
    }

    /**
     * Actualizar atención
     */
    static async actualizarAtencion(id, datos) {
        try {
            await db.collection('atenciones').doc(id).update(datos);
        } catch (error) {
            throw new Error(`Error actualizando atención: ${error.message}`);
        }
    }

    /**
     * Eliminar atención
     */
    static async eliminarAtencion(id) {
        try {
            await db.collection('atenciones').doc(id).delete();
        } catch (error) {
            throw new Error(`Error eliminando atención: ${error.message}`);
        }
    }

    /**
     * Obtener atenciones por rango de fechas
     */
    static async obtenerAtencionesPorRango(fechaInicio, fechaFin) {
        try {
            const fin = new Date(fechaFin);
            fin.setDate(fin.getDate() + 1);

            const snapshot = await db.collection('atenciones')
                .where('fecha', '>=', new Date(fechaInicio))
                .where('fecha', '<', fin)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error obteniendo atenciones por rango: ${error.message}`);
        }
    }
}

// Exportar servicio
window.DatabaseService = DatabaseService;
