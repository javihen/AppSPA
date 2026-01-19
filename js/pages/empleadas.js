/**
 * COMPONENTE CRUD EMPLEADAS
 * Gestionar empleadas del SPA con porcentajes de comisión por servicio
 */

class EmpleadasPage {
    
    static async render() {
        return `
            <div class="flex h-screen bg-gray-100">
                ${Dashboard.renderSidebar()}
                <div class="flex-1 flex flex-col overflow-hidden">
                    ${Dashboard.renderHeader()}
                    <main class="flex-1 overflow-y-auto p-6">
                        <div class="space-y-6">
                            <!-- Header -->
                            <div class="flex justify-between items-center">
                                <h2 class="text-3xl font-bold text-gray-800">💄 Gestión de Empleadas</h2>
                                <button 
                                    onclick="EmpleadasPage.openModal()"
                                    class="btn-primary"
                                >
                                    ➕ Agregar Empleada
                                </button>
                            </div>

                            <!-- Tabla de Empleadas -->
                            <div class="card p-6">
                                <div id="empleadasTableContainer">
                                    ${await this.renderTable()}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <!-- Modal -->
            ${this.renderModal()}
        `;
    }

    /**
     * Render tabla de empleadas
     */
    static async renderTable() {
        try {
            const empleadas = await DatabaseService.obtenerEmpleadas();
            
            if (empleadas.length === 0) {
                return '<p class="text-center text-gray-500 py-8">No hay empleadas registradas</p>';
            }

            const filas = empleadas.map(e => `
                <tr>
                    <td>${e.nombre}</td>
                    <td>${e.telefono || 'N/A'}</td>
                    <td>${e.email || 'N/A'}</td>
                    <td>${e.puesto || 'N/A'}</td>
                    <td class="flex gap-2">
                        <button onclick="EmpleadasPage.editEmpleada('${e.id}')" class="btn-secondary btn-small">
                            ✏️ Editar
                        </button>
                        <button onclick="EmpleadasPage.deleteEmpleada('${e.id}')" class="btn-danger btn-small">
                            🗑️ Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');

            return `
                <div class="table-responsive">
                    <table class="table-custom">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Puesto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filas}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering empleadas table:', error);
            return '<p class="text-red-600">Error cargando empleadas</p>';
        }
    }

    /**
     * Render modal
     */
    static renderModal() {
        return `
            <div id="empleadasModal" class="hidden modal-overlay" onclick="if(event.target.id === 'empleadasModal') EmpleadasPage.closeModal()">
                <div class="modal-content max-w-3xl">
                    <div class="modal-header">
                        <h3 class="text-xl font-bold">Agregar/Editar Empleada</h3>
                        <button onclick="EmpleadasPage.closeModal()" class="text-2xl">✕</button>
                    </div>
                    <form id="empleadasForm" class="modal-body space-y-4">
                        <input type="hidden" id="empleadaId">
                        
                        <!-- Datos Personales -->
                        <div class="border-b pb-4">
                            <h4 class="font-bold text-gray-800 mb-3">Datos Personales</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="form-label">Nombre Completo</label>
                                    <input type="text" id="nombreEmpleada" class="form-input" required>
                                </div>
                                <div>
                                    <label class="form-label">Puesto</label>
                                    <input type="text" id="puestoEmpleada" class="form-input" placeholder="Ej: Masajista, Esteticien">
                                </div>
                                <div>
                                    <label class="form-label">Teléfono</label>
                                    <input type="tel" id="telefonoEmpleada" class="form-input">
                                </div>
                                <div>
                                    <label class="form-label">Email</label>
                                    <input type="email" id="emailEmpleada" class="form-input">
                                </div>
                            </div>
                        </div>

                        <!-- Porcentajes de Comisión -->
                        <div>
                            <h4 class="font-bold text-gray-800 mb-3">Porcentajes de Comisión por Servicio</h4>
                            <div id="porcentajesContainer" class="space-y-3">
                                <p class="text-sm text-gray-600">Cargando servicios disponibles...</p>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">Ingresa el porcentaje que gana cada empleada por cada servicio (0-100%)</p>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button onclick="EmpleadasPage.closeModal()" class="btn-secondary">Cancelar</button>
                        <button onclick="EmpleadasPage.saveEmpleada()" class="btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Abrir modal
     */
    static async openModal(empleadaId = null) {
        const modal = document.getElementById('empleadasModal');
        const form = document.getElementById('empleadasForm');
        
        if (empleadaId) {
            await this.loadEmpleadaData(empleadaId);
        } else {
            form.reset();
            document.getElementById('empleadaId').value = '';
        }
        
        // Cargar servicios
        await this.loadServicios();
        
        modal.classList.remove('hidden');
    }

    /**
     * Cerrar modal
     */
    static closeModal() {
        const modal = document.getElementById('empleadasModal');
        modal.classList.add('hidden');
    }

    /**
     * Cargar servicios disponibles
     */
    static async loadServicios() {
        try {
            const servicios = await DatabaseService.obtenerServicios();
            const container = document.getElementById('porcentajesContainer');
            
            let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
            
            for (const servicio of servicios) {
                const porcentajeActual = document.getElementById(`porcentaje_${servicio.id}`)?.value || '0';
                html += `
                    <div class="border border-pink-200 rounded-lg p-3">
                        <label class="form-label text-sm">${servicio.nombre}</label>
                        <div class="flex items-center gap-2">
                            <input 
                                type="number" 
                                id="porcentaje_${servicio.id}"
                                class="form-input flex-1"
                                min="0" 
                                max="100" 
                                value="${porcentajeActual}"
                                placeholder="0"
                            >
                            <span class="text-gray-600">%</span>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${HelpersFunctions.formatearMoneda(servicio.precio)}</p>
                    </div>
                `;
            }
            
            html += '</div>';
            container.innerHTML = html;
        } catch (error) {
            console.error('Error loading servicios:', error);
        }
    }

    /**
     * Cargar datos de empleada
     */
    static async loadEmpleadaData(empleadaId) {
        try {
            const empleada = await DatabaseService.obtenerEmpleada(empleadaId);
            if (empleada) {
                document.getElementById('empleadaId').value = empleada.id;
                document.getElementById('nombreEmpleada').value = empleada.nombre || '';
                document.getElementById('puestoEmpleada').value = empleada.puesto || '';
                document.getElementById('telefonoEmpleada').value = empleada.telefono || '';
                document.getElementById('emailEmpleada').value = empleada.email || '';
                
                // Cargar porcentajes después de que se carguen los servicios
                setTimeout(() => {
                    if (empleada.porcentajePorServicio) {
                        for (const [servicioId, porcentaje] of Object.entries(empleada.porcentajePorServicio)) {
                            const input = document.getElementById(`porcentaje_${servicioId}`);
                            if (input) {
                                input.value = porcentaje;
                            }
                        }
                    }
                }, 300);
            }
        } catch (error) {
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Guardar empleada
     */
    static async saveEmpleada() {
        try {
            const empleadaId = document.getElementById('empleadaId').value;
            const nombre = document.getElementById('nombreEmpleada').value.trim();
            const puesto = document.getElementById('puestoEmpleada').value.trim();
            const telefono = document.getElementById('telefonoEmpleada').value.trim();
            const email = document.getElementById('emailEmpleada').value.trim();

            // Validaciones
            HelpersFunctions.validarCampoVacio(nombre, 'Nombre');

            // Obtener porcentajes
            const servicios = await DatabaseService.obtenerServicios();
            const porcentajePorServicio = {};
            
            for (const servicio of servicios) {
                const input = document.getElementById(`porcentaje_${servicio.id}`);
                if (input) {
                    porcentajePorServicio[servicio.id] = parseFloat(input.value) || 0;
                }
            }

            const datos = {
                nombre,
                puesto,
                telefono,
                email,
                porcentajePorServicio
            };

            HelpersFunctions.mostrarLoader();

            if (empleadaId) {
                await DatabaseService.actualizarEmpleada(empleadaId, datos);
                HelpersFunctions.showSuccess('Empleada actualizada correctamente');
            } else {
                await DatabaseService.crearEmpleada(datos);
                HelpersFunctions.showSuccess('Empleada creada correctamente');
            }

            HelpersFunctions.ocultarLoader();
            this.closeModal();
            
            // Recargar tabla
            const container = document.getElementById('empleadasTableContainer');
            container.innerHTML = await this.renderTable();

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Editar empleada
     */
    static async editEmpleada(empleadaId) {
        await this.openModal(empleadaId);
    }

    /**
     * Eliminar empleada
     */
    static async deleteEmpleada(empleadaId) {
        try {
            const result = await HelpersFunctions.confirmDelete('¿Eliminar esta empleada?');
            if (!result.isConfirmed) return;

            HelpersFunctions.mostrarLoader();
            await DatabaseService.eliminarEmpleada(empleadaId);
            HelpersFunctions.ocultarLoader();
            
            HelpersFunctions.showSuccess('Empleada eliminada correctamente');
            
            // Recargar tabla
            const container = document.getElementById('empleadasTableContainer');
            container.innerHTML = await this.renderTable();

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Inicializar página
     */
    static init() {
        const form = document.getElementById('empleadasForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEmpleada();
            });
        }
    }
}

// Exportar
window.EmpleadasPage = EmpleadasPage;
