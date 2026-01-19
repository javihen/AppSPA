/**
 * SERVICIOS DE CÁLCULOS
 * Maneja cálculos de ingresos, comisiones y reportes
 */

class CalculationService {
    
    /**
     * Calcular total de atenciones por día
     */
    static async calcularIngresosPorDia(fecha) {
        try {
            const atenciones = await DatabaseService.obtenerAtenciones({ fecha });
            const total = atenciones.reduce((sum, atencion) => sum + (atencion.total || 0), 0);
            return total;
        } catch (error) {
            console.error('Error calculando ingresos por día:', error);
            return 0;
        }
    }

    /**
     * Calcular total de atenciones por mes
     */
    static async calcularIngresosPorMes(año, mes) {
        try {
            const fechaInicio = new Date(año, mes - 1, 1);
            const fechaFin = new Date(año, mes, 0);
            
            const atenciones = await DatabaseService.obtenerAtencionesPorRango(fechaInicio, fechaFin);
            const total = atenciones.reduce((sum, atencion) => sum + (atencion.total || 0), 0);
            return total;
        } catch (error) {
            console.error('Error calculando ingresos por mes:', error);
            return 0;
        }
    }

    /**
     * Calcular ganancias totales por empleada en un período
     */
    static async calcularGananciasPorEmpleada(idEmpleada, fecha) {
        try {
            const atenciones = await DatabaseService.obtenerAtenciones({ 
                idEmpleada,
                fecha 
            });
            
            let gananciasTotal = 0;
            
            for (const atencion of atenciones) {
                // Obtener empleada para saber sus porcentajes
                const empleada = await DatabaseService.obtenerEmpleada(idEmpleada);
                
                if (empleada && empleada.porcentajePorServicio) {
                    // Calcular comisión por cada servicio
                    for (const servicio of (atencion.servicios || [])) {
                        const porcentaje = empleada.porcentajePorServicio[servicio.id] || 0;
                        gananciasTotal += (servicio.precio * porcentaje / 100);
                    }
                }
            }
            
            return gananciasTotal;
        } catch (error) {
            console.error('Error calculando ganancias por empleada:', error);
            return 0;
        }
    }

    /**
     * Calcular comisión de una empleada por un servicio
     */
    static calcularComision(precioPorServicio, porcentajeEmpleada) {
        return (precioPorServicio * porcentajeEmpleada) / 100;
    }

    /**
     * Obtener resumen de ingresos del mes actual
     */
    static async obtenerResumenMesActual() {
        try {
            const hoy = new Date();
            const año = hoy.getFullYear();
            const mes = hoy.getMonth() + 1;
            
            const ingresosMes = await this.calcularIngresosPorMes(año, mes);
            const ingresosHoy = await this.calcularIngresosPorDia(new Date());
            
            return {
                ingresosMes,
                ingresosHoy,
                año,
                mes,
                fecha: hoy
            };
        } catch (error) {
            console.error('Error obteniendo resumen del mes:', error);
            return {
                ingresosMes: 0,
                ingresosHoy: 0,
                año: new Date().getFullYear(),
                mes: new Date().getMonth() + 1,
                fecha: new Date()
            };
        }
    }

    /**
     * Obtener datos para gráfico de ingresos mensuales
     */
    static async obtenerDatosGraficoIngresosMensuales(año) {
        try {
            const datos = [];
            const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            
            for (let mes = 1; mes <= 12; mes++) {
                const ingresos = await this.calcularIngresosPorMes(año, mes);
                datos.push({
                    mes: meses[mes - 1],
                    ingresos
                });
            }
            
            return datos;
        } catch (error) {
            console.error('Error obteniendo datos gráfico:', error);
            return [];
        }
    }

    /**
     * Obtener datos para gráfico de empleadas (ganancias por empleada)
     */
    static async obtenerDatosGraficoEmpleadas(fecha) {
        try {
            const empleadas = await DatabaseService.obtenerEmpleadas();
            const datos = [];
            
            for (const empleada of empleadas) {
                const ganancias = await this.calcularGananciasPorEmpleada(empleada.id, fecha);
                datos.push({
                    nombre: empleada.nombre,
                    ganancias
                });
            }
            
            return datos;
        } catch (error) {
            console.error('Error obteniendo datos gráfico empleadas:', error);
            return [];
        }
    }

    /**
     * Obtener reporte completo del mes
     */
    static async obtenerReporteMensual(año, mes) {
        try {
            const fechaInicio = new Date(año, mes - 1, 1);
            const fechaFin = new Date(año, mes, 0);
            
            const atenciones = await DatabaseService.obtenerAtencionesPorRango(fechaInicio, fechaFin);
            const empleadas = await DatabaseService.obtenerEmpleadas();
            
            const ingresosTotales = atenciones.reduce((sum, a) => sum + (a.total || 0), 0);
            
            // Calcular ganancias por empleada
            const gananciasPorEmpleada = {};
            for (const empleada of empleadas) {
                gananciasPorEmpleada[empleada.id] = await this.calcularGananciasPorEmpleada(
                    empleada.id, 
                    new Date(año, mes - 1, 1)
                );
            }
            
            return {
                año,
                mes,
                ingresosTotales,
                totalAtenciones: atenciones.length,
                gananciasPorEmpleada,
                atenciones
            };
        } catch (error) {
            console.error('Error obteniendo reporte mensual:', error);
            return {
                año,
                mes,
                ingresosTotales: 0,
                totalAtenciones: 0,
                gananciasPorEmpleada: {},
                atenciones: []
            };
        }
    }

    /**
     * Calcular promedio de precio por servicio
     */
    static async calcularPromedioPorServicio() {
        try {
            const servicios = await DatabaseService.obtenerServicios();
            const total = servicios.reduce((sum, s) => sum + (s.precio || 0), 0);
            return servicios.length > 0 ? total / servicios.length : 0;
        } catch (error) {
            console.error('Error calculando promedio:', error);
            return 0;
        }
    }
}

// Exportar servicio
window.CalculationService = CalculationService;
