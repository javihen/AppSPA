/**
 * COMPONENTE CRUD SERVICIOS
 * Gestionar servicios disponibles en el SPA
 */

class ServiciosPage {
    
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
                                <h2 class="text-3xl font-bold text-gray-800">✨ Gestión de Servicios</h2>
                                <button 
                                    onclick="ServiciosPage.openModal()"
                                    class="btn-primary"
                                >
                                    ➕ Agregar Servicio
                                </button>
                            </div>

                            <!-- Tabla de Servicios -->
                            <div class="card p-6">
                                <div id="serviciosTableContainer">
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
     * Render tabla de servicios
     */
    static async renderTable() {
        try {
            const servicios = await DatabaseService.obtenerServicios();
            
            if (servicios.length === 0) {
                return '<p class="text-center text-gray-500 py-8">No hay servicios registrados</p>';
            }

            const filas = servicios.map(s => `
                <tr>
                    <td>${s.nombre}</td>
                    <td>${s.categoria || 'N/A'}</td>
                    <td>${HelpersFunctions.formatearMoneda(s.precio)}</td>
                    <td>${s.duracion || 'N/A'} min</td>
                    <td>${s.descripcion || 'N/A'}</td>
                    <td class="flex gap-2">
                        <button onclick="ServiciosPage.editServicio('${s.id}')" class="btn-secondary btn-small">
                            ✏️ Editar
                        </button>
                        <button onclick="ServiciosPage.deleteServicio('${s.id}')" class="btn-danger btn-small">
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
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Duración</th>
                                <th>Descripción</th>
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
            console.error('Error rendering servicios table:', error);
            return '<p class="text-red-600">Error cargando servicios</p>';
        }
    }

    /**
     * Render modal
     */
    static renderModal() {
        return `
            <div id="serviciosModal" class="hidden modal-overlay" onclick="if(event.target.id === 'serviciosModal') ServiciosPage.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="text-xl font-bold">Agregar/Editar Servicio</h3>
                        <button onclick="ServiciosPage.closeModal()" class="text-2xl">✕</button>
                    </div>
                    <form id="serviciosForm" class="modal-body space-y-4">
                        <input type="hidden" id="servicioId">
                        
                        <div>
                            <label class="form-label">Nombre del Servicio</label>
                            <input type="text" id="nombreServicio" class="form-input" placeholder="Ej: Masaje Relajante" required>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Categoría</label>
                                <select id="categoriaServicio" class="form-input">
                                    <option value="">Selecciona categoría</option>
                                    <option value="Masajes">Masajes</option>
                                    <option value="Faciales">Faciales</option>
                                    <option value="Manicure">Manicure</option>
                                    <option value="Pedicure">Pedicure</option>
                                    <option value="Depilación">Depilación</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Duración (minutos)</label>
                                <input type="number" id="duracionServicio" class="form-input" min="15" step="15" placeholder="60">
                            </div>
                        </div>

                        <div>
                            <label class="form-label">Precio (MXN)</label>
                            <input type="number" id="precioServicio" class="form-input" min="0" step="10" placeholder="500" required>
                        </div>

                        <div>
                            <label class="form-label">Descripción</label>
                            <textarea id="descripcionServicio" class="form-input" rows="3" placeholder="Detalles del servicio"></textarea>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button onclick="ServiciosPage.closeModal()" class="btn-secondary">Cancelar</button>
                        <button onclick="ServiciosPage.saveServicio()" class="btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Abrir modal
     */
    static openModal(servicioId = null) {
        const modal = document.getElementById('serviciosModal');
        const form = document.getElementById('serviciosForm');
        
        if (servicioId) {
            this.loadServicioData(servicioId);
        } else {
            form.reset();
            document.getElementById('servicioId').value = '';
        }
        
        // Mostrar modal con transición
        modal.classList.remove('hidden');
        // Force reflow para que la animación funcione
        void modal.offsetWidth;
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cerrar modal
     */
    static closeModal() {
        const modal = document.getElementById('serviciosModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    /**
     * Cargar datos de servicio
     */
    static async loadServicioData(servicioId) {
        try {
            const servicio = await DatabaseService.obtenerServicio(servicioId);
            if (servicio) {
                document.getElementById('servicioId').value = servicio.id;
                document.getElementById('nombreServicio').value = servicio.nombre || '';
                document.getElementById('categoriaServicio').value = servicio.categoria || '';
                document.getElementById('duracionServicio').value = servicio.duracion || '';
                document.getElementById('precioServicio').value = servicio.precio || '';
                document.getElementById('descripcionServicio').value = servicio.descripcion || '';
            }
        } catch (error) {
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Guardar servicio
     */
    static async saveServicio() {
        try {
            const servicioId = document.getElementById('servicioId').value;
            const nombre = document.getElementById('nombreServicio').value.trim();
            const categoria = document.getElementById('categoriaServicio').value;
            const duracion = parseInt(document.getElementById('duracionServicio').value) || 60;
            const precio = parseFloat(document.getElementById('precioServicio').value);
            const descripcion = document.getElementById('descripcionServicio').value.trim();

            // Validaciones
            HelpersFunctions.validarCampoVacio(nombre, 'Nombre');
            HelpersFunctions.validarNumeroPositivo(precio, 'Precio');

            const datos = {
                nombre,
                categoria,
                duracion,
                precio,
                descripcion
            };

            HelpersFunctions.mostrarLoader();

            if (servicioId) {
                await DatabaseService.actualizarServicio(servicioId, datos);
                HelpersFunctions.showSuccess('Servicio actualizado correctamente');
            } else {
                await DatabaseService.crearServicio(datos);
                HelpersFunctions.showSuccess('Servicio creado correctamente');
            }

            HelpersFunctions.ocultarLoader();
            this.closeModal();
            
            // Recargar tabla
            const container = document.getElementById('serviciosTableContainer');
            container.innerHTML = await this.renderTable();

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Editar servicio
     */
    static async editServicio(servicioId) {
        this.openModal(servicioId);
    }

    /**
     * Eliminar servicio
     */
    static async deleteServicio(servicioId) {
        try {
            const result = await HelpersFunctions.confirmDelete('¿Eliminar este servicio?');
            if (!result.isConfirmed) return;

            HelpersFunctions.mostrarLoader();
            await DatabaseService.eliminarServicio(servicioId);
            HelpersFunctions.ocultarLoader();
            
            HelpersFunctions.showSuccess('Servicio eliminado correctamente');
            
            // Recargar tabla
            const container = document.getElementById('serviciosTableContainer');
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
        const form = document.getElementById('serviciosForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveServicio();
            });
        }
    }
}

// Exportar
window.ServiciosPage = ServiciosPage;
