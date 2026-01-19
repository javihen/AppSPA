# 📋 DOCUMENTACIÓN TÉCNICA - SPA Manager

## 🏗️ Arquitectura de la Aplicación

### Flujo de Datos

```
Usuario (Interfaz)
        ↓
  App.js (Router)
        ↓
  Pages (Dashboard, CRUD, Reportes)
        ↓
  Services (Auth, Database, Calculations)
        ↓
  Firebase (Auth + Firestore)
        ↓
  Base de Datos
```

### Patrones de Diseño Utilizados

1. **MVC (Model-View-Controller)**
   - Services = Model
   - Pages = View
   - App = Controller

2. **Service Locator**
   - DatabaseService
   - AuthService
   - CalculationService

3. **Singleton**
   - Auth instance
   - Firestore instance
   - App instance

## 📚 Clases Principales

### AuthService

Gestión de autenticación y usuarios.

**Métodos principales:**

- `signup(email, password, adminCode)` - Registrar usuario
- `login(email, password)` - Iniciar sesión
- `logout()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual
- `getUserData(uid)` - Obtener datos del usuario desde Firestore
- `onAuthStateChanged(callback)` - Escuchar cambios

```javascript
// Ejemplo
const user = await AuthService.login("admin@spa.com", "password123");
```

### DatabaseService

Gestión CRUD de todas las entidades.

**Métodos para Clientas:**

- `crearClienta(datos)`
- `obtenerClientas()`
- `obtenerClienta(id)`
- `actualizarClienta(id, datos)`
- `eliminarClienta(id)`

**Métodos para Empleadas:**

- `crearEmpleada(datos)`
- `obtenerEmpleadas()`
- `obtenerEmpleada(id)`
- `actualizarEmpleada(id, datos)`
- `eliminarEmpleada(id)`

**Métodos para Servicios:**

- `crearServicio(datos)`
- `obtenerServicios()`
- `obtenerServicio(id)`
- `actualizarServicio(id, datos)`
- `eliminarServicio(id)`

**Métodos para Atenciones:**

- `crearAtencion(datos)`
- `obtenerAtenciones(filtros)`
- `obtenerAtencion(id)`
- `actualizarAtencion(id, datos)`
- `eliminarAtencion(id)`
- `obtenerAtencionesPorRango(fechaInicio, fechaFin)`

```javascript
// Ejemplo CRUD Clientas
const clientas = await DatabaseService.obtenerClientas();
const clientaId = await DatabaseService.crearClienta({
  nombre: "María",
  telefono: "5551234567",
  email: "maria@email.com",
});
await DatabaseService.actualizarClienta(clientaId, { telefono: "5559876543" });
await DatabaseService.eliminarClienta(clientaId);
```

### CalculationService

Cálculos de ingresos, comisiones y reportes.

**Métodos principales:**

- `calcularIngresosPorDia(fecha)` - Total de ingresos de un día
- `calcularIngresosPorMes(año, mes)` - Total de ingresos de un mes
- `calcularGananciasPorEmpleada(idEmpleada, fecha)` - Ganancias de empleada
- `calcularComision(precioPorServicio, porcentajeEmpleada)` - Cálculo de comisión
- `obtenerResumenMesActual()` - Resumen del mes actual
- `obtenerDatosGraficoIngresosMensuales(año)` - Datos para gráfico
- `obtenerDatosGraficoEmpleadas(fecha)` - Datos ganancias por empleada
- `obtenerReporteMensual(año, mes)` - Reporte completo del mes

```javascript
// Ejemplo de cálculos
const ingresosHoy = await CalculationService.calcularIngresosPorDia(new Date());
const ingresosMes = await CalculationService.calcularIngresosPorMes(2025, 1);
const gananciaEmpleada = await CalculationService.calcularGananciasPorEmpleada(
  "empleada123",
  new Date(),
);
const reporte = await CalculationService.obtenerReporteMensual(2025, 1);
```

### HelpersFunctions

Funciones utilitarias y formateo.

**Notificaciones:**

- `showSuccess(message, title)`
- `showError(message, title)`
- `showWarning(message, title)`
- `confirmDelete(message)`

**Formateo:**

- `formatearFecha(fecha)`
- `formatearMoneda(valor)`
- `formatearSoloFecha(fecha)`

**Validación:**

- `validarEmail(email)`
- `validarCampoVacio(valor, nombreCampo)`
- `validarNumeroPositivo(valor, nombreCampo)`

**UI:**

- `mostrarLoader()`
- `ocultarLoader()`

```javascript
// Ejemplo de helpers
HelpersFunctions.showSuccess("Registro exitoso");
const moneda = HelpersFunctions.formatearMoneda(1500); // $1,500.00
const fecha = HelpersFunctions.formatearFecha(new Date()); // 18/01/2025 14:30
HelpersFunctions.mostrarLoader();
```

## 🎨 Componentes de Interfaz

### Modales

Componentes reutilizables para formularios.

**Estructura:**

```html
<div id="modal" class="hidden modal-overlay">
  <div class="modal-content">
    <div class="modal-header">Título</div>
    <div class="modal-body">Contenido</div>
    <div class="modal-footer">Botones</div>
  </div>
</div>
```

### Tarjetas (Cards)

Para mostrar información resumida.

```html
<div class="card p-6">
  <div class="stat-card">
    <p class="stat-label">Ingresos Hoy</p>
    <p class="stat-number">$1,500</p>
  </div>
</div>
```

### Tablas

Para mostrar listados de datos.

```html
<div class="table-responsive">
  <table class="table-custom">
    <thead>
      <tr>
        <th>Columna 1</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dato 1</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 🌈 Sistema de Colores

```css
--color-primary: #ec4899; /* Rose Pink - Botones, enlaces */
--color-secondary: #f472b6; /* Light Pink - Hover */
--color-accent: #a78bfa; /* Lavender - Acentos */
--color-accent-light: #ddd6fe; /* Light Lavender - Fondos */
--color-success: #10b981; /* Green - Éxito */
--color-warning: #f59e0b; /* Amber - Advertencia */
--color-danger: #ef4444; /* Red - Error/Peligro */
```

## 📊 Ejemplos de Consultas Avanzadas

### Obtener ingresos por rango de fechas con empleada específica

```javascript
const fechaInicio = new Date(2025, 0, 1);
const fechaFin = new Date(2025, 0, 31);

const atenciones = await db
  .collection("atenciones")
  .where("fecha", ">=", fechaInicio)
  .where("fecha", "<", fechaFin)
  .where("idEmpleada", "==", "empleada123")
  .get();

const total = atenciones.docs.reduce((sum, doc) => {
  return sum + (doc.data().total || 0);
}, 0);
```

### Calcular comisiones complejas

```javascript
async function calcularComisionesCompletas(empleadaId, mes) {
  const empleada = await DatabaseService.obtenerEmpleada(empleadaId);
  const fechaInicio = new Date(2025, mes - 1, 1);
  const fechaFin = new Date(2025, mes, 0);

  const atenciones = await DatabaseService.obtenerAtencionesPorRango(
    fechaInicio,
    fechaFin,
  );

  let comisionTotal = 0;

  for (const atencion of atenciones) {
    if (atencion.idEmpleada !== empleadaId) continue;

    for (const servicio of atencion.servicios || []) {
      const porcentaje = empleada.porcentajePorServicio[servicio.id] || 0;
      comisionTotal += CalculationService.calcularComision(
        servicio.precio,
        porcentaje,
      );
    }
  }

  return comisionTotal;
}
```

### Top 5 clientas por ingresos

```javascript
async function obtenerTopClientas(mes) {
  const fechaInicio = new Date(2025, mes - 1, 1);
  const fechaFin = new Date(2025, mes, 0);

  const atenciones = await DatabaseService.obtenerAtencionesPorRango(
    fechaInicio,
    fechaFin,
  );

  const clientasGasto = {};
  atenciones.forEach((a) => {
    clientasGasto[a.idClienta] = (clientasGasto[a.idClienta] || 0) + a.total;
  });

  return Object.entries(clientasGasto)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
}
```

## 🔄 Flujo de una Atención

1. **Usuario selecciona Clienta y Empleada**
2. **Sistema carga servicios disponibles**
3. **Usuario selecciona servicios**
4. **Sistema calcula total automáticamente**
5. **Se registra fecha, hora y observaciones**
6. **Sistema guarda en Firestore**
7. **Se actualiza dashboard y reportes**

## 🎯 Flujo de Cálculo de Comisiones

```
Atención registrada
    ↓
Sistema obtiene servicios de la atención
    ↓
Para cada servicio:
  - Obtener porcentaje de empleada
  - Calcular: Precio × (Porcentaje / 100)
    ↓
Sumar todas las comisiones del período
    ↓
Mostrar en reportes
```

## 🔐 Control de Acceso

Todas las rutas protegidas validan:

```javascript
if (!window.currentUser) {
  this.currentPage = "login";
  this.render();
  return;
}
```

## 📦 Dependencias Externas

### CDN

- **TailwindCSS**: Estilos
- **Chart.js**: Gráficos
- **SweetAlert2**: Notificaciones
- **Firebase SDK**: Autenticación y BD
- **Heroicons**: Iconos

Todas se cargan en `index.html` mediante CDN.

## ⚡ Optimizaciones

1. **Lazy Loading**: Datos se cargan bajo demanda
2. **Caché**: Datos se reutilizan en sesión
3. **Soft Delete**: No se elimina, se marca inactivo
4. **Índices**: Firestore con índices para consultas rápidas
5. **Throttling**: Eventos limitados en búsquedas

## 🐛 Debugging

### Console Logs

```javascript
console.log("Usuario actual:", window.currentUser);
console.log("Página actual:", App.currentPage);
console.log("Datos obtenidos:", datos);
```

### Firebase Console

Acceder a: https://console.firebase.google.com/

- Firestore
- Authentication
- Logs

## 📞 Troubleshooting

### "Firebase no está definido"

- Verificar que firebase.js se carga antes de otros scripts

### "Credenciales inválidas"

- Revisar las credenciales en `js/config/firebase.js`

### "No hay acceso a Firestore"

- Revisar reglas de Firestore en consola

### Datos no se guardan

- Abrir DevTools → Network → verificar requests a Firebase
- Revisar Firestore Console

## 📊 Monitoreo en Producción

Usar Firebase Analytics y Crashlytics:

```javascript
// Analytics
firebase.analytics().logEvent("user_login", {
  email: user.email,
  timestamp: new Date(),
});
```

---

**Última actualización: Enero 2025**
