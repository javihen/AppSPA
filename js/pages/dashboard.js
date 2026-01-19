/**
 * COMPONENTE DASHBOARD
 * Página principal con KPIs y estadísticas
 */

class Dashboard {
    
    static async render() {
        return `
            <div class="flex h-screen bg-gray-100">
                ${this.renderSidebar()}
                <div class="flex-1 flex flex-col overflow-hidden">
                    ${this.renderHeader()}
                    <main class="flex-1 overflow-y-auto p-6">
                        <div id="dashboard-content" class="space-y-6">
                            ${await this.renderStats()}
                            ${await this.renderCharts()}
                            ${await this.renderRecentAtenciones()}
                        </div>
                    </main>
                </div>
            </div>
        `;
    }

    /**
     * Render sidebar
     */
    static renderSidebar() {
        return `
            <aside class="w-64 bg-white shadow-lg flex flex-col">
                <!-- Logo -->
                <div class="p-6 border-b border-gray-200">
                    <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        SPA Manager
                    </h1>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 overflow-y-auto p-4 space-y-2">
                    <div class="sidebar-item active" onclick="App.changePage('dashboard')">
                        📊 Dashboard
                    </div>
                    <div class="sidebar-item" onclick="App.changePage('clientas')">
                        👩 Clientas
                    </div>
                    <div class="sidebar-item" onclick="App.changePage('empleadas')">
                        💄 Empleadas
                    </div>
                    <div class="sidebar-item" onclick="App.changePage('servicios')">
                        ✨ Servicios
                    </div>
                    <div class="sidebar-item" onclick="App.changePage('atenciones')">
                        📋 Atenciones
                    </div>
                    <div class="sidebar-item" onclick="App.changePage('reportes')">
                        📈 Reportes
                    </div>
                </nav>

                <!-- Logout -->
                <div class="p-4 border-t border-gray-200">
                    <button 
                        onclick="App.logout()"
                        class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                    >
                        🚪 Cerrar Sesión
                    </button>
                </div>
            </aside>
        `;
    }

    /**
     * Render header
     */
    static renderHeader() {
        const usuario = window.currentUser?.email || 'Admin';
        return `
            <header class="header px-6 py-4 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
                <div class="flex items-center gap-4">
                    <span class="text-gray-700">👤 ${usuario}</span>
                </div>
            </header>
        `;
    }

    /**
     * Render tarjetas de estadísticas
     */
    static async renderStats() {
        try {
            const resumen = await CalculationService.obtenerResumenMesActual();
            const empleadas = await DatabaseService.obtenerEmpleadas();
            const atenciones = await DatabaseService.obtenerAtenciones();

            return `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Total Ingresos Hoy -->
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="stat-label">Ingresos Hoy</p>
                                <p class="stat-number">${HelpersFunctions.formatearMoneda(resumen.ingresosHoy)}</p>
                            </div>
                            <span class="text-4xl">💰</span>
                        </div>
                    </div>

                    <!-- Total Ingresos Mes -->
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="stat-label">Ingresos ${HelpersFunctions.obtenerNombreMes(resumen.mes)}</p>
                                <p class="stat-number">${HelpersFunctions.formatearMoneda(resumen.ingresosMes)}</p>
                            </div>
                            <span class="text-4xl">📊</span>
                        </div>
                    </div>

                    <!-- Total Empleadas -->
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="stat-label">Empleadas Activas</p>
                                <p class="stat-number">${empleadas.length}</p>
                            </div>
                            <span class="text-4xl">💄</span>
                        </div>
                    </div>

                    <!-- Total Atenciones -->
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="stat-label">Atenciones Este Mes</p>
                                <p class="stat-number">${atenciones.length}</p>
                            </div>
                            <span class="text-4xl">📋</span>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering stats:', error);
            return '<p class="text-red-600">Error cargando estadísticas</p>';
        }
    }

    /**
     * Render gráficos
     */
    static async renderCharts() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Gráfico Ingresos Mensuales -->
                <div class="card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Ingresos por Mes (${new Date().getFullYear()})</h3>
                    <canvas id="chartIngresosMensuales" height="100"></canvas>
                </div>

                <!-- Gráfico Empleadas -->
                <div class="card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Ganancias por Empleada</h3>
                    <canvas id="chartEmpleadas" height="100"></canvas>
                </div>
            </div>
        `;
    }

    /**
     * Render atenciones recientes
     */
    static async renderRecentAtenciones() {
        try {
            const atenciones = await DatabaseService.obtenerAtenciones();
            const recientes = atenciones.slice(0, 5);

            let filas = recientes.map(a => `
                <tr>
                    <td class="px-4 py-3">${HelpersFunctions.formatearSoloFecha(a.fecha)}</td>
                    <td class="px-4 py-3">${a.nombreClienta || 'N/A'}</td>
                    <td class="px-4 py-3">${a.nombreEmpleada || 'N/A'}</td>
                    <td class="px-4 py-3">${HelpersFunctions.formatearMoneda(a.total || 0)}</td>
                </tr>
            `).join('');

            return `
                <div class="card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Atenciones Recientes</h3>
                    <div class="table-responsive">
                        <table class="table-custom">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Clienta</th>
                                    <th>Empleada</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filas || '<tr><td colspan="4" class="text-center py-4 text-gray-500">Sin atenciones registradas</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering atenciones:', error);
            return '<p class="text-red-600">Error cargando atenciones</p>';
        }
    }

    /**
     * Inicializar dashboard
     */
    static async init() {
        // Cargar datos y renderizar gráficos
        setTimeout(async () => {
            await this.initCharts();
        }, 500);
    }

    /**
     * Inicializar gráficos con Chart.js
     */
    static async initCharts() {
        try {
            // Gráfico ingresos mensuales
            const datosIngresos = await CalculationService.obtenerDatosGraficoIngresosMensuales(new Date().getFullYear());
            
            const ctxIngresos = document.getElementById('chartIngresosMensuales');
            if (ctxIngresos) {
                new Chart(ctxIngresos, {
                    type: 'bar',
                    data: {
                        labels: datosIngresos.map(d => d.mes),
                        datasets: [{
                            label: 'Ingresos (MXN)',
                            data: datosIngresos.map(d => d.ingresos),
                            backgroundColor: 'rgba(236, 72, 153, 0.5)',
                            borderColor: 'rgb(236, 72, 153)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: { font: { size: 12 } }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { callback: (v) => `$${v}` }
                            }
                        }
                    }
                });
            }

            // Gráfico empleadas
            const datosEmpleadas = await CalculationService.obtenerDatosGraficoEmpleadas(new Date());
            
            const ctxEmpleadas = document.getElementById('chartEmpleadas');
            if (ctxEmpleadas && datosEmpleadas.length > 0) {
                new Chart(ctxEmpleadas, {
                    type: 'doughnut',
                    data: {
                        labels: datosEmpleadas.map(d => d.nombre),
                        datasets: [{
                            data: datosEmpleadas.map(d => d.ganancias),
                            backgroundColor: [
                                'rgba(236, 72, 153, 0.7)',
                                'rgba(244, 114, 182, 0.7)',
                                'rgba(167, 139, 250, 0.7)',
                                'rgba(168, 85, 247, 0.7)'
                            ],
                            borderColor: ['rgb(236, 72, 153)', 'rgb(244, 114, 182)', 'rgb(167, 139, 250)', 'rgb(168, 85, 247)'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }
}

// Exportar
window.Dashboard = Dashboard;
