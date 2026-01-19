/**
 * COMPONENTE CRUD ATENCIONES
 * Registrar servicios realizados a clientas
 */

class AtencioneesPage {
    
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
                                <h2 class="text-3xl font-bold text-gray-800">📋 Gestión de Atenciones</h2>
                                <button 
                                    onclick="AtencioneesPage.openModal()"
                                    class="btn-primary"
                                >
                                    ➕ Nueva Atención
                                </button>
                            </div>

                            <!-- Tabla de Atenciones -->
                            <div class="card p-6">
                                <div id="atencionesTableContainer">
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
     * Render tabla de atenciones
     */
    static async renderTable() {
        try {
            const atenciones = await DatabaseService.obtenerAtenciones();
            
            if (atenciones.length === 0) {
                return '<p class="text-center text-gray-500 py-8">No hay atenciones registradas</p>';
            }

            const filas = atenciones.map(a => `
                <tr>
                    <td>${HelpersFunctions.formatearFecha(a.fecha)}</td>
                    <td>${a.nombreClienta || 'N/A'}</td>
                    <td>${a.nombreEmpleada || 'N/A'}</td>
                    <td>${a.servicios?.length || 0} servicio(s)</td>
                    <td>${HelpersFunctions.formatearMoneda(a.total || 0)}</td>
                    <td class="flex gap-2">
                        <button onclick="AtencioneesPage.editAtencion('${a.id}')" class="btn-secondary btn-small">
                            ✏️ Editar
                        </button>
                        <button onclick="AtencioneesPage.deleteAtencion('${a.id}')" class="btn-danger btn-small">
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
                                <th>Fecha</th>
                                <th>Clienta</th>
                                <th>Empleada</th>
                                <th>Servicios</th>
                                <th>Total</th>
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
            console.error('Error rendering atenciones table:', error);
            return '<p class="text-red-600">Error cargando atenciones</p>';
        }
    }

    /**
     * Render modal
     */
    static renderModal() {
        return `
            <div id="atencionesModal" class="hidden modal-overlay" onclick="if(event.target.id === 'atencionesModal') AtencioneesPage.closeModal()">
                <div class="modal-content max-w-3xl">
                    <div class="modal-header">
                        <h3 class="text-xl font-bold">Agregar/Editar Atención</h3>
                        <button onclick="AtencioneesPage.closeModal()" class="text-2xl">✕</button>
                    </div>
                    <form id="atencionesForm" class="modal-body space-y-4">
                        <input type="hidden" id="atencionId">
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Clienta</label>
                                <select id="idClienta" class="form-input" required>
                                    <option value="">Selecciona clienta</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Empleada</label>
                                <select id="idEmpleada" class="form-input" required>
                                    <option value="">Selecciona empleada</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="form-label">Fecha y Hora</label>
                            <input type="datetime-local" id="fechaAtencion" class="form-input" required>
                        </div>

                        <div>
                            <label class="form-label">Servicios Realizados</label>
                            <div id="serviciosContainer" class="space-y-2 border border-pink-200 rounded-lg p-4">
                                <p class="text-sm text-gray-600">Cargando servicios...</p>
                            </div>
                        </div>

                        <div>
                            <label class="form-label">Total (MXN)</label>
                            <input type="number" id="totalAtencion" class="form-input" min="0" step="10" required readonly>
                        </div>

                        <div>
                            <label class="form-label">Observaciones</label>
                            <textarea id="observacionesAtencion" class="form-input" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button onclick="AtencioneesPage.closeModal()" class="btn-secondary">Cancelar</button>
                        <button onclick="AtencioneesPage.saveAtencion()" class="btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Abrir modal
     */
    static async openModal(atencionId = null) {
        const modal = document.getElementById('atencionesModal');
        const form = document.getElementById('atencionesForm');
        
        if (atencionId) {
            await this.loadAtencionData(atencionId);
        } else {
            form.reset();
            document.getElementById('atencionId').value = '';
            document.getElementById('fechaAtencion').value = new Date().toISOString().slice(0, 16);
        }
        
        // Cargar datos
        await this.loadClientas();
        await this.loadEmpleadas();
        await this.loadServicios();
        
        modal.classList.remove('hidden');
    }

    /**
     * Cerrar modal
     */
    static closeModal() {
        const modal = document.getElementById('atencionesModal');
        modal.classList.add('hidden');
    }

    /**
     * Cargar clientas
     */
    static async loadClientas() {
        try {
            const clientas = await DatabaseService.obtenerClientas();
            const select = document.getElementById('idClienta');
            
            let html = '<option value="">Selecciona clienta</option>';
            for (const clienta of clientas) {
                html += `<option value="${clienta.id}">${clienta.nombre}</option>`;
            }
            
            select.innerHTML = html;
        } catch (error) {
            console.error('Error loading clientas:', error);
        }
    }

    /**
     * Cargar empleadas
     */
    static async loadEmpleadas() {
        try {
            const empleadas = await DatabaseService.obtenerEmpleadas();
            const select = document.getElementById('idEmpleada');
            
            let html = '<option value="">Selecciona empleada</option>';
            for (const empleada of empleadas) {
                html += `<option value="${empleada.id}">${empleada.nombre}</option>`;
            }
            
            select.innerHTML = html;
        } catch (error) {
            console.error('Error loading empleadas:', error);
        }
    }

    /**
     * Cargar servicios
     */
    static async loadServicios() {
        try {
            const servicios = await DatabaseService.obtenerServicios();
            const container = document.getElementById('serviciosContainer');
            
            let html = '<div class="space-y-2">';
            for (const servicio of servicios) {
                html += `
                    <label class="flex items-center gap-3 p-2 hover:bg-pink-50 rounded cursor-pointer">
                        <input 
                            type="checkbox" 
                            value="${servicio.id}"
                            data-precio="${servicio.precio}"
                            class="servicioCheckbox"
                            onchange="AtencioneesPage.calcularTotal()"
                        >
                        <span class="flex-1">${servicio.nombre}</span>
                        <span class="text-pink-600 font-semibold">${HelpersFunctions.formatearMoneda(servicio.precio)}</span>
                    </label>
                `;
            }
            html += '</div>';
            
            container.innerHTML = html;
        } catch (error) {
            console.error('Error loading servicios:', error);
        }
    }

    /**
     * Cargar datos de atención
     */
    static async loadAtencionData(atencionId) {
        try {
            const atencion = await DatabaseService.obtenerAtencion(atencionId);
            if (atencion) {
                document.getElementById('atencionId').value = atencion.id;
                document.getElementById('idClienta').value = atencion.idClienta || '';
                document.getElementById('idEmpleada').value = atencion.idEmpleada || '';
                document.getElementById('totalAtencion').value = atencion.total || '';
                document.getElementById('observacionesAtencion').value = atencion.observaciones || '';
                
                // Seleccionar servicios
                setTimeout(() => {
                    if (atencion.servicios) {
                        for (const servicio of atencion.servicios) {
                            const checkbox = document.querySelector(`.servicioCheckbox[value="${servicio.id}"]`);
                            if (checkbox) checkbox.checked = true;
                        }
                    }
                }, 300);
            }
        } catch (error) {
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Calcular total
     */
    static calcularTotal() {
        const checkboxes = document.querySelectorAll('.servicioCheckbox:checked');
        let total = 0;
        
        checkboxes.forEach(checkbox => {
            total += parseFloat(checkbox.dataset.precio) || 0;
        });
        
        document.getElementById('totalAtencion').value = total;
    }

    /**
     * Guardar atención
     */
    static async saveAtencion() {
        try {
            const atencionId = document.getElementById('atencionId').value;
            const idClienta = document.getElementById('idClienta').value;
            const idEmpleada = document.getElementById('idEmpleada').value;
            const fecha = new Date(document.getElementById('fechaAtencion').value);
            const total = parseFloat(document.getElementById('totalAtencion').value);
            const observaciones = document.getElementById('observacionesAtencion').value.trim();

            // Validaciones
            if (!idClienta || !idEmpleada) {
                throw new Error('Debes seleccionar clienta y empleada');
            }

            // Obtener servicios seleccionados
            const servicios = [];
            document.querySelectorAll('.servicioCheckbox:checked').forEach(checkbox => {
                servicios.push({
                    id: checkbox.value,
                    precio: parseFloat(checkbox.dataset.precio)
                });
            });

            if (servicios.length === 0) {
                throw new Error('Debes seleccionar al menos un servicio');
            }

            // Obtener nombres
            const clienta = await DatabaseService.obtenerClienta(idClienta);
            const empleada = await DatabaseService.obtenerEmpleada(idEmpleada);

            const datos = {
                idClienta,
                idEmpleada,
                nombreClienta: clienta?.nombre,
                nombreEmpleada: empleada?.nombre,
                fecha,
                servicios,
                total,
                observaciones,
                completada: true
            };

            HelpersFunctions.mostrarLoader();

            if (atencionId) {
                await DatabaseService.actualizarAtencion(atencionId, datos);
                HelpersFunctions.showSuccess('Atención actualizada correctamente');
            } else {
                await DatabaseService.crearAtencion(datos);
                HelpersFunctions.showSuccess('Atención creada correctamente');
            }

            HelpersFunctions.ocultarLoader();
            this.closeModal();
            
            // Recargar tabla
            const container = document.getElementById('atencionesTableContainer');
            container.innerHTML = await this.renderTable();

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Editar atención
     */
    static async editAtencion(atencionId) {
        await this.openModal(atencionId);
    }

    /**
     * Eliminar atención
     */
    static async deleteAtencion(atencionId) {
        try {
            const result = await HelpersFunctions.confirmDelete('¿Eliminar esta atención?');
            if (!result.isConfirmed) return;

            HelpersFunctions.mostrarLoader();
            await DatabaseService.eliminarAtencion(atencionId);
            HelpersFunctions.ocultarLoader();
            
            HelpersFunctions.showSuccess('Atención eliminada correctamente');
            
            // Recargar tabla
            const container = document.getElementById('atencionesTableContainer');
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
        const form = document.getElementById('atencionesForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAtencion();
            });
        }
    }
}

// Exportar
window.AtencioneesPage = AtencioneesPage;
