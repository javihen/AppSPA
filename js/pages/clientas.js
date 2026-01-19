/**
 * COMPONENTE CRUD CLIENTAS
 * Gestionar clientas del SPA
 */

class ClientasPage {
    
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
                                <h2 class="text-3xl font-bold text-gray-800">👩 Gestión de Clientas</h2>
                                <button 
                                    onclick="ClientasPage.openModal()"
                                    class="btn-primary"
                                >
                                    ➕ Agregar Clienta
                                </button>
                            </div>

                            <!-- Tabla de Clientas -->
                            <div class="card p-6">
                                <div id="clientasTableContainer">
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
     * Render tabla de clientas
     */
    static async renderTable() {
        try {
            const clientas = await DatabaseService.obtenerClientas();
            
            if (clientas.length === 0) {
                return '<p class="text-center text-gray-500 py-8">No hay clientas registradas</p>';
            }

            const filas = clientas.map(c => `
                <tr>
                    <td>${c.nombre}</td>
                    <td>${c.telefono || 'N/A'}</td>
                    <td>${c.email || 'N/A'}</td>
                    <td>${c.tipoServicio || 'N/A'}</td>
                    <td class="flex gap-2">
                        <button onclick="ClientasPage.editClienta('${c.id}')" class="btn-secondary btn-small">
                            ✏️ Editar
                        </button>
                        <button onclick="ClientasPage.deleteClienta('${c.id}')" class="btn-danger btn-small">
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
                                <th>Tipo de Servicio</th>
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
            console.error('Error rendering clientas table:', error);
            return '<p class="text-red-600">Error cargando clientas</p>';
        }
    }

    /**
     * Render modal
     */
    static renderModal() {
        return `
            <div id="clientasModal" class="hidden modal-overlay" onclick="if(event.target.id === 'clientasModal') ClientasPage.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="text-xl font-bold">Agregar/Editar Clienta</h3>
                        <button onclick="ClientasPage.closeModal()" class="text-2xl">✕</button>
                    </div>
                    <form id="clientasForm" class="modal-body space-y-4">
                        <input type="hidden" id="clientaId">
                        
                        <div>
                            <label class="form-label">Nombre Completo</label>
                            <input type="text" id="nombreClienta" class="form-input" required>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Teléfono</label>
                                <input type="tel" id="telefonoClienta" class="form-input">
                            </div>
                            <div>
                                <label class="form-label">Email</label>
                                <input type="email" id="emailClienta" class="form-input">
                            </div>
                        </div>

                        <div>
                            <label class="form-label">Tipo de Servicio Favorito</label>
                            <select id="tipoServicioClienta" class="form-input">
                                <option value="">Selecciona un servicio</option>
                                <option value="Masaje">Masaje</option>
                                <option value="Facial">Facial</option>
                                <option value="Manicure">Manicure</option>
                                <option value="Pedicure">Pedicure</option>
                                <option value="Depilación">Depilación</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label">Observaciones</label>
                            <textarea id="observacionesClienta" class="form-input" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button onclick="ClientasPage.closeModal()" class="btn-secondary">Cancelar</button>
                        <button onclick="ClientasPage.saveClienta()" class="btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Abrir modal
     */
    static openModal(clientaId = null) {
        const modal = document.getElementById('clientasModal');
        const form = document.getElementById('clientasForm');
        
        if (clientaId) {
            this.loadClientaData(clientaId);
        } else {
            form.reset();
            document.getElementById('clientaId').value = '';
        }
        
        modal.classList.remove('hidden');
    }

    /**
     * Cerrar modal
     */
    static closeModal() {
        const modal = document.getElementById('clientasModal');
        modal.classList.add('hidden');
    }

    /**
     * Cargar datos de clienta
     */
    static async loadClientaData(clientaId) {
        try {
            const clienta = await DatabaseService.obtenerClienta(clientaId);
            if (clienta) {
                document.getElementById('clientaId').value = clienta.id;
                document.getElementById('nombreClienta').value = clienta.nombre || '';
                document.getElementById('telefonoClienta').value = clienta.telefono || '';
                document.getElementById('emailClienta').value = clienta.email || '';
                document.getElementById('tipoServicioClienta').value = clienta.tipoServicio || '';
                document.getElementById('observacionesClienta').value = clienta.observaciones || '';
            }
        } catch (error) {
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Guardar clienta
     */
    static async saveClienta() {
        try {
            const clientaId = document.getElementById('clientaId').value;
            const nombre = document.getElementById('nombreClienta').value.trim();
            const telefono = document.getElementById('telefonoClienta').value.trim();
            const email = document.getElementById('emailClienta').value.trim();
            const tipoServicio = document.getElementById('tipoServicioClienta').value;
            const observaciones = document.getElementById('observacionesClienta').value.trim();

            // Validaciones
            HelpersFunctions.validarCampoVacio(nombre, 'Nombre');

            const datos = {
                nombre,
                telefono,
                email,
                tipoServicio,
                observaciones
            };

            HelpersFunctions.mostrarLoader();

            if (clientaId) {
                await DatabaseService.actualizarClienta(clientaId, datos);
                HelpersFunctions.showSuccess('Clienta actualizada correctamente');
            } else {
                await DatabaseService.crearClienta(datos);
                HelpersFunctions.showSuccess('Clienta creada correctamente');
            }

            HelpersFunctions.ocultarLoader();
            this.closeModal();
            
            // Recargar tabla
            const container = document.getElementById('clientasTableContainer');
            container.innerHTML = await this.renderTable();

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }

    /**
     * Editar clienta
     */
    static async editClienta(clientaId) {
        this.openModal(clientaId);
    }

    /**
     * Eliminar clienta
     */
    static async deleteClienta(clientaId) {
        try {
            const result = await HelpersFunctions.confirmDelete('¿Eliminar esta clienta?');
            if (!result.isConfirmed) return;

            HelpersFunctions.mostrarLoader();
            await DatabaseService.eliminarClienta(clientaId);
            HelpersFunctions.ocultarLoader();
            
            HelpersFunctions.showSuccess('Clienta eliminada correctamente');
            
            // Recargar tabla
            const container = document.getElementById('clientasTableContainer');
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
        const form = document.getElementById('clientasForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveClienta();
            });
        }
    }
}

// Exportar
window.ClientasPage = ClientasPage;
