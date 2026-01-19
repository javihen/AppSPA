/**
 * PÁGINA DE REPORTES
 * Generar reportes diarios, mensuales y por empleada
 */

class ReportesPage {
    
    static async render() {
        return `
            <div class="flex h-screen bg-gray-100">
                ${Dashboard.renderSidebar()}
                <div class="flex-1 flex flex-col overflow-hidden">
                    ${Dashboard.renderHeader()}
                    <main class="flex-1 overflow-y-auto p-6">
                        <div class="space-y-6">
                            <!-- Header -->
                            <h2 class="text-3xl font-bold text-gray-800">📈 Reportes y Análisis</h2>

                            <!-- Filtros -->
                            <div class="card p-6">
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label class="form-label">Tipo de Reporte</label>
                                        <select id="tipoReporte" class="form-input" onchange="ReportesPage.updateReporte()">
                                            <option value="diario">Reporte Diario</option>
                                            <option value="mensual">Reporte Mensual</option>
                                            <option value="empleada">Por Empleada</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="form-label">Fecha</label>
                                        <input type="date" id="filtroFecha" class="form-input" onchange="ReportesPage.updateReporte()">
                                    </div>
                                    <div>
                                        <label class="form-label">Mes</label>
                                        <select id="filtroMes" class="form-input" onchange="ReportesPage.updateReporte()">
                                            <option value="">Selecciona mes</option>
                                            <option value="1">Enero</option>
                                            <option value="2">Febrero</option>
                                            <option value="3">Marzo</option>
                                            <option value="4">Abril</option>
                                            <option value="5">Mayo</option>
                                            <option value="6">Junio</option>
                                            <option value="7">Julio</option>
                                            <option value="8">Agosto</option>
                                            <option value="9">Septiembre</option>
                                            <option value="10">Octubre</option>
                                            <option value="11">Noviembre</option>
                                            <option value="12">Diciembre</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="form-label">Año</label>
                                        <select id="filtroAno" class="form-input" onchange="ReportesPage.updateReporte()">
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Contenido del Reporte -->
                            <div id="reporteContainer">
                                ${await this.renderReporteDiario()}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        `;
    }

    /**
     * Renderizar reporte diario
     */
    static async renderReporteDiario() {
        try {
            const fecha = new Date(document.getElementById('filtroFecha')?.value || new Date());
            const atenciones = await DatabaseService.obtenerAtenciones({ fecha });
            
            const ingresos = atenciones.reduce((sum, a) => sum + (a.total || 0), 0);

            let html = `
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Resumen -->
                    <div class="card p-6">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">
                            📅 Reporte del ${HelpersFunctions.formatearSoloFecha(fecha)}
                        </h3>
                        <div class="space-y-4">
                            <div class="border-b pb-3">
                                <p class="text-gray-600">Total de Ingresos</p>
                                <p class="text-4xl font-bold text-pink-600">${HelpersFunctions.formatearMoneda(ingresos)}</p>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-gray-600">Total de Atenciones</p>
                                <p class="text-3xl font-bold text-purple-600">${atenciones.length}</p>
                            </div>
                            <div>
                                <p class="text-gray-600">Ticket Promedio</p>
                                <p class="text-3xl font-bold text-blue-600">
                                    ${HelpersFunctions.formatearMoneda(atenciones.length > 0 ? ingresos / atenciones.length : 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Gráfico -->
                    <div class="card p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Ingresos por Hora</h3>
                        <canvas id="chartDiario" height="150"></canvas>
                    </div>
                </div>

                <!-- Tabla de Atenciones del Día -->
                <div class="card p-6 mt-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Detalle de Atenciones</h3>
                    ${await this.renderTablaAtenciones(atenciones)}
                </div>
            `;

            setTimeout(() => this.initChartDiario(atenciones), 300);
            return html;

        } catch (error) {
            console.error('Error rendering reporte diario:', error);
            return '<p class="text-red-600">Error cargando reporte</p>';
        }
    }

    /**
     * Renderizar reporte mensual
     */
    static async renderReporteMensual() {
        try {
            const mes = parseInt(document.getElementById('filtroMes').value) || new Date().getMonth() + 1;
            const año = parseInt(document.getElementById('filtroAno').value) || new Date().getFullYear();
            
            const reporte = await CalculationService.obtenerReporteMensual(año, mes);
            const empleadas = await DatabaseService.obtenerEmpleadas();

            const ingresosTotales = reporte.ingresosTotales;
            const totalEmpleadas = empleadas.length;

            let html = `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- KPIs -->
                    <div class="stat-card">
                        <p class="stat-label">Ingresos ${HelpersFunctions.obtenerNombreMes(mes)}</p>
                        <p class="stat-number">${HelpersFunctions.formatearMoneda(ingresosTotales)}</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Total de Atenciones</p>
                        <p class="stat-number">${reporte.totalAtenciones}</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Ticket Promedio</p>
                        <p class="stat-number">
                            ${HelpersFunctions.formatearMoneda(reporte.totalAtenciones > 0 ? ingresosTotales / reporte.totalAtenciones : 0)}
                        </p>
                    </div>
                </div>

                <!-- Gráficos -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div class="card p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Ganancias por Empleada</h3>
                        <canvas id="chartGananciasMensual" height="150"></canvas>
                    </div>
                    <div class="card p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Ingresos por Día</h3>
                        <canvas id="chartIngresosDiarios" height="150"></canvas>
                    </div>
                </div>

                <!-- Tabla de Ganancias por Empleada -->
                <div class="card p-6 mt-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Comisiones por Empleada</h3>
                    ${await this.renderTablaGananciasPorEmpleada(reporte, empleadas)}
                </div>
            `;

            setTimeout(async () => {
                await this.initChartGananciasMensual(reporte, empleadas);
                await this.initChartIngresosDiarios(año, mes);
            }, 300);

            return html;

        } catch (error) {
            console.error('Error rendering reporte mensual:', error);
            return '<p class="text-red-600">Error cargando reporte</p>';
        }
    }

    /**
     * Renderizar reporte por empleada
     */
    static async renderReportePorEmpleada() {
        try {
            const fecha = new Date(document.getElementById('filtroFecha')?.value || new Date());
            const empleadas = await DatabaseService.obtenerEmpleadas();

            let html = `<div class="space-y-6">`;

            for (const empleada of empleadas) {
                const ganancias = await CalculationService.calcularGananciasPorEmpleada(empleada.id, fecha);
                const atenciones = await DatabaseService.obtenerAtenciones({ idEmpleada: empleada.id, fecha });

                html += `
                    <div class="card p-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${empleada.nombre}</h3>
                                <p class="text-sm text-gray-600">${empleada.puesto || 'N/A'}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-gray-600">Ganancias</p>
                                <p class="text-3xl font-bold text-pink-600">${HelpersFunctions.formatearMoneda(ganancias)}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-gray-600">Atenciones</p>
                                <p class="text-3xl font-bold text-purple-600">${atenciones.length}</p>
                            </div>
                        </div>
                        ${await this.renderTablaAtencionesEmpleada(atenciones)}
                    </div>
                `;
            }

            html += '</div>';
            return html;

        } catch (error) {
            console.error('Error rendering reporte por empleada:', error);
            return '<p class="text-red-600">Error cargando reporte</p>';
        }
    }

    /**
     * Renderizar tabla de atenciones
     */
    static async renderTablaAtenciones(atenciones) {
        if (atenciones.length === 0) {
            return '<p class="text-center text-gray-500 py-4">Sin atenciones en esta fecha</p>';
        }

        const filas = atenciones.map(a => `
            <tr>
                <td>${HelpersFunctions.formatearFecha(a.fecha)}</td>
                <td>${a.nombreClienta || 'N/A'}</td>
                <td>${a.nombreEmpleada || 'N/A'}</td>
                <td>${a.servicios?.length || 0}</td>
                <td>${HelpersFunctions.formatearMoneda(a.total || 0)}</td>
            </tr>
        `).join('');

        return `
            <div class="table-responsive">
                <table class="table-custom">
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Clienta</th>
                            <th>Empleada</th>
                            <th>Servicios</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>
        `;
    }

    /**
     * Renderizar tabla de ganancias por empleada
     */
    static async renderTablaGananciasPorEmpleada(reporte, empleadas) {
        const filas = empleadas.map(e => {
            const ganancias = reporte.gananciasPorEmpleada[e.id] || 0;
            return `
                <tr>
                    <td>${e.nombre}</td>
                    <td>${e.puesto || 'N/A'}</td>
                    <td>${HelpersFunctions.formatearMoneda(ganancias)}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="table-responsive">
                <table class="table-custom">
                    <thead>
                        <tr>
                            <th>Empleada</th>
                            <th>Puesto</th>
                            <th>Ganancias</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>
        `;
    }

    /**
     * Renderizar tabla de atenciones de empleada
     */
    static async renderTablaAtencionesEmpleada(atenciones) {
        if (atenciones.length === 0) {
            return '<p class="text-sm text-gray-500 py-2">Sin atenciones</p>';
        }

        const filas = atenciones.map(a => `
            <tr>
                <td>${HelpersFunctions.formatearFecha(a.fecha)}</td>
                <td>${a.nombreClienta || 'N/A'}</td>
                <td>${a.servicios?.map(s => s.nombre || '').join(', ') || 'N/A'}</td>
                <td>${HelpersFunctions.formatearMoneda(a.total || 0)}</td>
            </tr>
        `).join('');

        return `
            <div class="table-responsive">
                <table class="table-custom text-sm">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Clienta</th>
                            <th>Servicios</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>
        `;
    }

    /**
     * Actualizar reporte
     */
    static async updateReporte() {
        const tipoReporte = document.getElementById('tipoReporte').value;
        const container = document.getElementById('reporteContainer');
        
        let html = '';
        
        if (tipoReporte === 'diario') {
            html = await this.renderReporteDiario();
        } else if (tipoReporte === 'mensual') {
            html = await this.renderReporteMensual();
        } else if (tipoReporte === 'empleada') {
            html = await this.renderReportePorEmpleada();
        }
        
        container.innerHTML = html;
    }

    /**
     * Inicializar gráfico diario
     */
    static initChartDiario(atenciones) {
        // Agrupar por hora
        const porHora = {};
        atenciones.forEach(a => {
            const fecha = new Date(a.fecha.seconds * 1000);
            const hora = fecha.getHours();
            porHora[hora] = (porHora[hora] || 0) + (a.total || 0);
        });

        const ctxDiario = document.getElementById('chartDiario');
        if (ctxDiario) {
            new Chart(ctxDiario, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                    datasets: [{
                        label: 'Ingresos (MXN)',
                        data: Array.from({ length: 24 }, (_, i) => porHora[i] || 0),
                        borderColor: 'rgb(236, 72, 153)',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    }

    /**
     * Inicializar gráfico ganancias mensual
     */
    static async initChartGananciasMensual(reporte, empleadas) {
        const datosEmpleadas = empleadas.map(e => ({
            nombre: e.nombre,
            ganancias: reporte.gananciasPorEmpleada[e.id] || 0
        }));

        const ctxGanancias = document.getElementById('chartGananciasMensual');
        if (ctxGanancias) {
            new Chart(ctxGanancias, {
                type: 'bar',
                data: {
                    labels: datosEmpleadas.map(d => d.nombre),
                    datasets: [{
                        label: 'Ganancias (MXN)',
                        data: datosEmpleadas.map(d => d.ganancias),
                        backgroundColor: 'rgba(244, 114, 182, 0.7)',
                        borderColor: 'rgb(244, 114, 182)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    }

    /**
     * Inicializar gráfico ingresos diarios
     */
    static async initChartIngresosDiarios(año, mes) {
        const fechaInicio = new Date(año, mes - 1, 1);
        const fechaFin = new Date(año, mes, 0);
        const atenciones = await DatabaseService.obtenerAtencionesPorRango(fechaInicio, fechaFin);

        // Agrupar por día
        const porDia = {};
        atenciones.forEach(a => {
            const fecha = new Date(a.fecha.seconds * 1000);
            const dia = fecha.getDate();
            porDia[dia] = (porDia[dia] || 0) + (a.total || 0);
        });

        const dias = Array.from({ length: new Date(año, mes, 0).getDate() }, (_, i) => i + 1);
        const datos = dias.map(d => porDia[d] || 0);

        const ctxIngresos = document.getElementById('chartIngresosDiarios');
        if (ctxIngresos) {
            new Chart(ctxIngresos, {
                type: 'bar',
                data: {
                    labels: dias,
                    datasets: [{
                        label: 'Ingresos (MXN)',
                        data: datos,
                        backgroundColor: 'rgba(167, 139, 250, 0.7)',
                        borderColor: 'rgb(167, 139, 250)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    }

    /**
     * Inicializar página
     */
    static async init() {
        // Establecer fecha actual por defecto
        const hoy = new Date().toISOString().split('T')[0];
        document.getElementById('filtroFecha').value = hoy;
        document.getElementById('filtroMes').value = new Date().getMonth() + 1;
        document.getElementById('filtroAno').value = new Date().getFullYear();
    }
}

// Exportar
window.ReportesPage = ReportesPage;
