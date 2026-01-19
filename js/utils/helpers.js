/**
 * FUNCIONES AUXILIARES
 * Utilidades generales para la aplicación
 */

class HelpersFunctions {
    
    /**
     * Mostrar notificación de éxito
     */
    static showSuccess(message, title = 'Éxito') {
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            confirmButtonColor: '#ec4899',
            timer: 3000
        });
    }

    /**
     * Mostrar notificación de error
     */
    static showError(message, title = 'Error') {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            confirmButtonColor: '#ec4899'
        });
    }

    /**
     * Mostrar notificación de advertencia
     */
    static showWarning(message, title = 'Advertencia') {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            confirmButtonColor: '#ec4899'
        });
    }

    /**
     * Mostrar diálogo de confirmación
     */
    static async confirmDelete(message = '¿Deseas eliminar este elemento?') {
        return await Swal.fire({
            title: '¿Estás seguro?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    }

    /**
     * Formatear fecha a string legible
     */
    static formatearFecha(fecha) {
        if (!fecha) return '';
        
        if (fecha.toDate) {
            fecha = fecha.toDate();
        }
        
        const opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    /**
     * Formatear moneda
     */
    static formatearMoneda(valor) {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        }).format(valor);
    }

    /**
     * Formatear solo fecha (sin hora)
     */
    static formatearSoloFecha(fecha) {
        if (!fecha) return '';
        
        if (fecha.toDate) {
            fecha = fecha.toDate();
        }
        
        const opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    /**
     * Validar email
     */
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Validar que un campo no esté vacío
     */
    static validarCampoVacio(valor, nombreCampo) {
        if (!valor || valor.trim() === '') {
            throw new Error(`${nombreCampo} es requerido`);
        }
        return true;
    }

    /**
     * Validar que un número sea positivo
     */
    static validarNumeroPositivo(valor, nombreCampo) {
        const num = parseFloat(valor);
        if (isNaN(num) || num <= 0) {
            throw new Error(`${nombreCampo} debe ser un número positivo`);
        }
        return true;
    }

    /**
     * Generar ID único
     */
    static generarId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Obtener nombre de mes en español
     */
    static obtenerNombreMes(mes) {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return meses[mes - 1];
    }

    /**
     * Comparar dos fechas (solo fechas, sin hora)
     */
    static mismaFecha(fecha1, fecha2) {
        const f1 = new Date(fecha1);
        const f2 = new Date(fecha2);
        return f1.toDateString() === f2.toDateString();
    }

    /**
     * Mostrar loader/spinner
     */
    static mostrarLoader() {
        const loaderHTML = `
            <div id="loader" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loaderHTML);
    }

    /**
     * Ocultar loader
     */
    static ocultarLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.remove();
    }
}

// Exportar
window.HelpersFunctions = HelpersFunctions;
