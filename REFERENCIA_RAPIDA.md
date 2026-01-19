# 📚 REFERENCIA RÁPIDA - Módulos y Funciones

## 🏗️ Módulos Principales

### 1️⃣ firebase.js - Configuración

**Ubicación**: `js/config/firebase.js`
**Función**: Inicializar y exportar instancias de Firebase

**Exports**:

- `firebase` - Instancia de Firebase
- `auth` - Firebase Authentication
- `db` - Firestore Database

**Uso**:

```javascript
// Ya está disponible globalmente
db.collection("clientas").get();
auth.signInWithEmailAndPassword(email, password);
```

---

### 2️⃣ auth.js - Autenticación

**Ubicación**: `js/services/auth.js`
**Función**: Gestionar login, registro y logout

**Métodos Principales**:

```javascript
// Registrar nuevo usuario
AuthService.signup(email, password, adminCode);
// Parámetros: email (string), password (string), adminCode (string)
// Retorna: User object de Firebase
// Lanza: Error si credenciales inválidas

// Iniciar sesión
AuthService.login(email, password);
// Parámetros: email (string), password (string)
// Retorna: User object
// Lanza: Error si credenciales incorrectas

// Cerrar sesión
AuthService.logout();
// Retorna: Promise<void>
// Lanza: Error si falla

// Obtener usuario actual
AuthService.getCurrentUser();
// Retorna: User object o null

// Obtener datos del usuario
AuthService.getUserData(uid);
// Parámetros: uid (string)
// Retorna: Promise<Object> con datos de Firestore

// Escuchar cambios de autenticación
AuthService.onAuthStateChanged(callback);
// Parámetros: callback (function)
// Retorna: unsubscribe function
```

**Ejemplo de uso**:

```javascript
try {
  const user = await AuthService.login("admin@spa.com", "password123");
  console.log("Usuario autenticado:", user.email);
} catch (error) {
  console.error("Error:", error.message);
}
```

---

### 3️⃣ database.js - CRUD

**Ubicación**: `js/services/database.js`
**Función**: Realizar operaciones CRUD en Firestore

#### 👩 CLIENTAS

```javascript
// Crear clienta
await DatabaseService.crearClienta({
  nombre: "María",
  telefono: "5551234567",
  email: "maria@email.com",
  tipoServicio: "Masaje",
  observaciones: "Cliente VIP",
});
// Retorna: string (ID del documento)

// Obtener todas las clientas
const clientas = await DatabaseService.obtenerClientas();
// Retorna: Array<{id, ...datos}>

// Obtener una clienta
const clienta = await DatabaseService.obtenerClienta("clienta123");
// Retorna: Object {id, ...datos}

// Actualizar clienta
await DatabaseService.actualizarClienta("clienta123", {
  telefono: "5559876543",
});

// Eliminar clienta
await DatabaseService.eliminarClienta("clienta123");
// Nota: Soft delete (marca como inactiva)
```

#### 💄 EMPLEADAS

```javascript
// Crear empleada
await DatabaseService.crearEmpleada({
  nombre: "Lupita López",
  puesto: "Masajista",
  email: "lupita@spa.com",
  telefono: "5559876543",
  porcentajePorServicio: {
    servicio1: 40,
    servicio2: 35,
    servicio3: 50,
  },
});

// Obtener todas
const empleadas = await DatabaseService.obtenerEmpleadas();

// Obtener una
const empleada = await DatabaseService.obtenerEmpleada("empleada123");

// Actualizar
await DatabaseService.actualizarEmpleada("empleada123", {
  porcentajePorServicio: { servicio1: 45 },
});

// Eliminar
await DatabaseService.eliminarEmpleada("empleada123");
```

#### ✨ SERVICIOS

```javascript
// Crear servicio
await DatabaseService.crearServicio({
  nombre: "Masaje Relajante",
  categoria: "Masajes",
  precio: 500,
  duracion: 60,
  descripcion: "Masaje de cuerpo completo",
});

// Obtener todos
const servicios = await DatabaseService.obtenerServicios();

// Obtener uno
const servicio = await DatabaseService.obtenerServicio("servicio123");

// Actualizar
await DatabaseService.actualizarServicio("servicio123", {
  precio: 550,
});

// Eliminar
await DatabaseService.eliminarServicio("servicio123");
```

#### 📋 ATENCIONES

```javascript
// Crear atención
await DatabaseService.crearAtencion({
  idClienta: "clienta123",
  idEmpleada: "empleada123",
  nombreClienta: "María",
  nombreEmpleada: "Lupita",
  fecha: new Date(),
  servicios: [{ id: "servicio1", nombre: "Masaje", precio: 500 }],
  total: 500,
  observaciones: "Cliente satisfecha",
});

// Obtener todas
const atenciones = await DatabaseService.obtenerAtenciones();

// Con filtros
const atenciones = await DatabaseService.obtenerAtenciones({
  fecha: new Date("2025-01-18"),
  idEmpleada: "empleada123",
});

// Obtener por rango de fechas
const atenciones = await DatabaseService.obtenerAtencionesPorRango(
  new Date("2025-01-01"),
  new Date("2025-01-31"),
);

// Actualizar
await DatabaseService.actualizarAtencion("atencion123", {
  observaciones: "Observación actualizada",
});

// Eliminar
await DatabaseService.eliminarAtencion("atencion123");
```

---

### 4️⃣ calculations.js - Cálculos

**Ubicación**: `js/services/calculations.js`
**Función**: Realizar cálculos de ingresos y comisiones

```javascript
// Ingresos de un día
const ingresos = await CalculationService.calcularIngresosPorDia(
  new Date("2025-01-18"),
);
// Retorna: number (total de ingresos)

// Ingresos de un mes
const ingresos = await CalculationService.calcularIngresosPorMes(2025, 1);
// Parámetros: año (number), mes (number: 1-12)
// Retorna: number

// Ganancias de una empleada
const ganancias = await CalculationService.calcularGananciasPorEmpleada(
  "empleada123",
  new Date("2025-01-18"),
);
// Retorna: number

// Calcular comisión directa
const comision = CalculationService.calcularComision(500, 40);
// Parámetros: precioServicio (number), porcentajeEmpleada (number)
// Retorna: number (500 * 40 / 100 = 200)

// Resumen del mes actual
const resumen = await CalculationService.obtenerResumenMesActual();
// Retorna: {ingresosMes, ingresosHoy, año, mes, fecha}

// Datos para gráfico de ingresos mensuales
const datos =
  await CalculationService.obtenerDatosGraficoIngresosMensuales(2025);
// Retorna: Array<{mes: "Ene", ingresos: 5000}>

// Datos para gráfico de empleadas
const datos = await CalculationService.obtenerDatosGraficoEmpleadas(
  new Date("2025-01-18"),
);
// Retorna: Array<{nombre: "Lupita", ganancias: 4850}>

// Reporte mensual completo
const reporte = await CalculationService.obtenerReporteMensual(2025, 1);
// Retorna: {
//     año, mes, ingresosTotales, totalAtenciones,
//     gananciasPorEmpleada: {empleada1: 4850, ...},
//     atenciones: [...]
// }

// Promedio de servicios
const promedio = await CalculationService.calcularPromedioPorServicio();
// Retorna: number (precio promedio)
```

---

### 5️⃣ helpers.js - Utilidades

**Ubicación**: `js/utils/helpers.js`
**Función**: Funciones auxiliares y formateo

#### Notificaciones

```javascript
HelpersFunctions.showSuccess("Registro exitoso", "Éxito");
// Notificación verde

HelpersFunctions.showError("Error al guardar", "Error");
// Notificación roja

HelpersFunctions.showWarning("Confirmación necesaria", "Advertencia");
// Notificación amarilla

const result = await HelpersFunctions.confirmDelete("¿Eliminar?");
// Retorna: {isConfirmed: boolean}
```

#### Formateo

```javascript
const fechaFormato = HelpersFunctions.formatearFecha(new Date());
// Retorna: "18/01/2025 14:30"

const moneda = HelpersFunctions.formatearMoneda(1500);
// Retorna: "$1,500.00"

const fecha = HelpersFunctions.formatearSoloFecha(new Date());
// Retorna: "18/01/2025"

const mes = HelpersFunctions.obtenerNombreMes(1);
// Retorna: "Enero"
```

#### Validación

```javascript
const esValido = HelpersFunctions.validarEmail("user@spa.com");
// Retorna: boolean

HelpersFunctions.validarCampoVacio("nombre", "Nombre");
// Lanza: Error si está vacío

HelpersFunctions.validarNumeroPositivo(500, "Precio");
// Lanza: Error si no es número positivo
```

#### UI

```javascript
HelpersFunctions.mostrarLoader();
// Muestra spinner

HelpersFunctions.ocultarLoader();
// Oculta spinner

const id = HelpersFunctions.generarId();
// Retorna: "1234567890-abc123xyz"

const igual = HelpersFunctions.mismaFecha(fecha1, fecha2);
// Retorna: boolean
```

---

## 📄 Módulos de Páginas

### Dashboard

**Ubicación**: `js/pages/dashboard.js`

**Métodos Principales**:

```javascript
Dashboard.render(); // Renderiza el dashboard
Dashboard.init(); // Inicializa gráficos
Dashboard.renderSidebar(); // Renderiza menú lateral
Dashboard.renderHeader(); // Renderiza encabezado
Dashboard.renderStats(); // Renderiza tarjetas de KPI
Dashboard.renderCharts(); // Renderiza gráficos
```

### ClientasPage

**Ubicación**: `js/pages/clientas.js`

**Métodos Principales**:

```javascript
ClientasPage.render(); // Renderiza página
ClientasPage.renderTable(); // Renderiza tabla
ClientasPage.openModal(); // Abre modal de formulario
ClientasPage.closeModal(); // Cierra modal
ClientasPage.saveClienta(); // Guarda clienta
ClientasPage.editClienta(id); // Edita clienta
ClientasPage.deleteClienta(id); // Elimina clienta
```

### EmpleadasPage

**Ubicación**: `js/pages/empleadas.js`

**Métodos Principales**:

```javascript
EmpleadasPage.render(); // Renderiza página
EmpleadasPage.openModal(); // Abre modal
EmpleadasPage.saveEmpleada(); // Guarda empleada
EmpleadasPage.loadServicios(); // Carga servicios
EmpleadasPage.editEmpleada(id); // Edita empleada
EmpleadasPage.deleteEmpleada(id); // Elimina empleada
```

### ServiciosPage

**Ubicación**: `js/pages/servicios.js`

**Métodos Principales**:

```javascript
ServiciosPage.render(); // Renderiza página
ServiciosPage.openModal(); // Abre modal
ServiciosPage.saveServicio(); // Guarda servicio
ServiciosPage.editServicio(id); // Edita servicio
ServiciosPage.deleteServicio(id); // Elimina servicio
```

### AtencionesPa ge

**Ubicación**: `js/pages/atenciones.js`

**Métodos Principales**:

```javascript
AtencionesPa ge.render()              // Renderiza página
AtencionesPa ge.openModal()           // Abre modal
AtencionesPa ge.saveAtencion()        // Guarda atención
AtencionesPa ge.loadClientas()        // Carga clientas
AtencionesPa ge.loadEmpleadas()       // Carga empleadas
AtencionesPa ge.loadServicios()       // Carga servicios
AtencionesPa ge.calcularTotal()       // Calcula total
AtencionesPa ge.editAtencion(id)      // Edita atención
AtencionesPa ge.deleteAtencion(id)    // Elimina atención
```

### ReportesPage

**Ubicación**: `js/pages/reportes.js`

**Métodos Principales**:

```javascript
ReportesPage.render(); // Renderiza página
ReportesPage.renderReporteDiario(); // Reporte del día
ReportesPage.renderReporteMensual(); // Reporte del mes
ReportesPage.renderReportePorEmpleada(); // Reporte por empleada
ReportesPage.updateReporte(); // Actualiza según filtros
ReportesPage.initChartDiario(); // Inicializa gráfico diario
ReportesPage.initChartGananciasMensual(); // Inicializa gráfico ganancias
ReportesPage.initChartIngresosDiarios(); // Inicializa gráfico ingresos
```

---

## 🎮 Aplicación Principal

### app.js

**Ubicación**: `js/app.js`

```javascript
App.init(); // Inicializa la aplicación
App.render(); // Renderiza página actual
App.changePage(page); // Cambia de página
App.logout(); // Cierra sesión

// Propiedades
App.currentPage; // Página actual
App.currentUser; // Usuario autenticado
```

---

## 🛠️ Cómo Usar Este Documento

### Buscar una función específica

1. Usar Ctrl+F para buscar por nombre
2. Ver la ubicación del archivo
3. Ver parámetros y retorno
4. Ver ejemplo de uso

### Agregar nueva funcionalidad

1. Ubicar el módulo más relevante
2. Agregar método en la clase
3. Exportar si es necesario
4. Usar en las páginas

### Debuggear un error

1. Identificar en qué página ocurre
2. Ver qué módulos usa esa página
3. Revisar el flujo de datos
4. Usar console.log en helpers.js

---

## 📊 Mapa de Dependencias

```
app.js
├── LoginPage → AuthService
├── SignupPage → AuthService
├── Dashboard → CalculationService
│   ├── DatabaseService
│   └── Chart.js
├── ClientasPage → DatabaseService
├── EmpleadasPage → DatabaseService
├── ServiciosPage → DatabaseService
├── AtencionesPa ge → DatabaseService
└── ReportesPage → CalculationService
    ├── DatabaseService
    └── Chart.js

DatabaseService
├── Firestore API
└── HelpersFunctions

AuthService
├── Firebase Auth API
└── HelpersFunctions

CalculationService
├── DatabaseService
└── HelpersFunctions
```

---

## 🔑 Variables Globales Exportadas

```javascript
window.firebase              // Instancia de Firebase
window.auth                  // Firebase Auth
window.db                    // Firestore Database
window.currentUser           // Usuario actual
window.currentPage           // Página actual

window.AuthService           // Clase de autenticación
window.DatabaseService       // Clase de BD
window.CalculationService    // Clase de cálculos
window.HelpersFunctions      // Clase de utilidades

window.App                   // Aplicación principal
window.Dashboard             // Página dashboard
window.ClientasPage          // Página clientas
window.EmpleadasPage         // Página empleadas
window.ServiciosPage         // Página servicios
window.AtencionesPa ge       // Página atenciones
window.ReportesPage          // Página reportes
window.LoginPage             // Página login
window.SignupPage            // Página signup
```

---

**Última actualización**: Enero 2025
**Versión**: 1.0.0
