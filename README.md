# 🧖‍♀️ SPA Manager - Sistema de Gestión de Spa

Aplicación web moderna, responsiva y elegante para la gestión completa de un Spa. Permite administrar clientas, empleadas, servicios, registrar atenciones y generar reportes detallados de ingresos y comisiones.

## ✨ Características Principales

### 🔐 Autenticación

- Login seguro con Firebase Authentication
- Registro de nuevas administradoras (requiere código de administrador)
- Protección de rutas
- Cierre de sesión

### 👥 Gestión de Clientas

- Crear, leer, actualizar y eliminar clientas
- Registro de datos personales: nombre, teléfono, email
- Preferencias de servicio
- Observaciones personales

### 💄 Gestión de Empleadas

- CRUD completo de empleadas
- Asignación de porcentajes de comisión por servicio (variable)
- Registro de datos personales
- Cálculo automático de ganancias según porcentajes

### ✨ Gestión de Servicios

- CRUD de servicios disponibles
- Definición de precio por servicio
- Categorías y duración
- Descripción de cada servicio

### 📋 Registro de Atenciones

- Crear atenciones con clientas y empleadas
- Asignar uno o múltiples servicios por atención
- Cálculo automático del total
- Registro de fecha y hora
- Observaciones

### 📊 Dashboard

- KPIs principales (ingresos del día, mes, empleadas activas, atenciones)
- Gráficos de ingresos mensuales
- Gráficos de ganancias por empleada
- Tabla de atenciones recientes

### 📈 Reportes Avanzados

- **Reporte Diario**: Ingresos, atenciones y análisis por hora
- **Reporte Mensual**: Ingresos totales, comisiones por empleada
- **Reporte por Empleada**: Ganancias y detalle de atenciones
- Gráficos visuales con Chart.js
- Filtros por fecha, mes y año

### 🎨 Diseño UI/UX

- Interfaz elegante y femenina
- Colores suaves: rosa, lavanda, beige
- Completamente responsivo (PC, tablet, móvil)
- Animaciones suaves
- Notificaciones con SweetAlert2

## 🛠️ Tecnologías Utilizadas

### Frontend

- **HTML5**: Estructura semántica
- **JavaScript Vanilla**: Modular y orientado a objetos
- **TailwindCSS**: Diseño responsivo y moderno
- **Chart.js**: Visualización de gráficos

### Backend/Base de Datos

- **Firebase Authentication**: Autenticación segura
- **Firestore**: Base de datos NoSQL en tiempo real

### Librerías Adicionales

- **SweetAlert2**: Notificaciones elegantes
- **Heroicons**: Iconos de calidad
- **Moment.js** (opcional): Manipulación de fechas

## 📁 Estructura del Proyecto

```
AppSPA/
├── index.html                 # Página principal
├── css/
│   └── style.css             # Estilos personalizados
├── js/
│   ├── app.js                # Aplicación principal
│   ├── config/
│   │   └── firebase.js       # Configuración Firebase
│   ├── services/
│   │   ├── auth.js           # Servicios de autenticación
│   │   ├── database.js       # Servicios CRUD
│   │   └── calculations.js   # Cálculos de ingresos/comisiones
│   ├── utils/
│   │   └── helpers.js        # Funciones auxiliares
│   └── pages/
│       ├── login.js          # Página de login
│       ├── signup.js         # Página de registro
│       ├── dashboard.js      # Dashboard principal
│       ├── clientas.js       # Gestión de clientas
│       ├── empleadas.js      # Gestión de empleadas
│       ├── servicios.js      # Gestión de servicios
│       ├── atenciones.js     # Registro de atenciones
│       └── reportes.js       # Generación de reportes
└── README.md                 # Este archivo
```

## 🗂️ Estructura de Base de Datos (Firestore)

### Colección: usuarios

```json
{
  "uid": "user123",
  "email": "admin@spa.com",
  "rol": "admin",
  "fechaCreacion": "2025-01-18",
  "activo": true
}
```

### Colección: clientas

```json
{
  "id": "clienta123",
  "nombre": "María García",
  "telefono": "5551234567",
  "email": "maria@email.com",
  "tipoServicio": "Masaje",
  "observaciones": "Alérgica a aceites",
  "fechaCreacion": "2025-01-18",
  "activa": true
}
```

### Colección: empleadas

```json
{
  "id": "empleada123",
  "nombre": "Lupita López",
  "puesto": "Masajista",
  "telefono": "5559876543",
  "email": "lupita@spa.com",
  "porcentajePorServicio": {
    "servicio1": 40,
    "servicio2": 35,
    "servicio3": 50
  },
  "fechaCreacion": "2025-01-18",
  "activa": true
}
```

### Colección: servicios

```json
{
  "id": "servicio123",
  "nombre": "Masaje Relajante",
  "categoria": "Masajes",
  "precio": 500,
  "duracion": 60,
  "descripcion": "Masaje relajante de cuerpo completo",
  "fechaCreacion": "2025-01-18",
  "activo": true
}
```

### Colección: atenciones

```json
{
  "id": "atencion123",
  "idClienta": "clienta123",
  "idEmpleada": "empleada123",
  "nombreClienta": "María García",
  "nombreEmpleada": "Lupita López",
  "fecha": "2025-01-18T14:30:00",
  "servicios": [
    {
      "id": "servicio1",
      "nombre": "Masaje Relajante",
      "precio": 500
    }
  ],
  "total": 500,
  "observaciones": "Cliente satisfecha",
  "completada": true
}
```

## 🚀 Instalación y Configuración

### 1. Clonar o descargar el proyecto

### 2. Configurar Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto
3. Habilitar Authentication (Email/Password)
4. Crear base de datos Firestore
5. Copiar credenciales

### 3. Actualizar configuración

En `js/config/firebase.js`, reemplazar:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Ejecutar la aplicación

Servir con un servidor local (live-server, http-server, etc.):

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Con Visual Studio Code
# Instalar Live Server extension y hacer clic en "Go Live"
```

Abrir en navegador: `http://localhost:8000`

### 5. Crear primer usuario

- Ir a Signup
- Ingresar credenciales
- Código de administrador por defecto: `12345`
- Cambiar en `js/services/auth.js`

## 💰 Ejemplos de Cálculos

### Cálculo de Ingreso Total

```javascript
// Suma de todos los servicios en una atención
Total = ∑(Precio Servicio i) para todas las atenciones del día/mes
```

### Cálculo de Comisión de Empleada

```javascript
// Por cada servicio realizado
Comisión = Precio Servicio × (Porcentaje Empleada / 100)

Ejemplo:
- Servicio: Masaje Relajante = $500
- Porcentaje de Lupita para Masajes: 40%
- Comisión de Lupita = 500 × (40/100) = $200
```

### Ingresos Neto del Spa

```javascript
Ingreso Neto = Total Ingresos - ∑(Comisiones de Empleadas)
```

## 📊 Ejemplos de Consultas Firestore

### Obtener clientas activas

```javascript
const snapshot = await db
  .collection("clientas")
  .where("activa", "==", true)
  .get();
```

### Obtener atenciones de una fecha específica

```javascript
const fecha = new Date("2025-01-18");
const fechaSiguiente = new Date(fecha);
fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

const snapshot = await db
  .collection("atenciones")
  .where("fecha", ">=", fecha)
  .where("fecha", "<", fechaSiguiente)
  .get();
```

### Obtener atenciones de una empleada en un mes

```javascript
const fechaInicio = new Date(2025, 0, 1); // Enero 2025
const fechaFin = new Date(2025, 1, 0); // Último día de enero

const snapshot = await db
  .collection("atenciones")
  .where("idEmpleada", "==", "empleada123")
  .where("fecha", ">=", fechaInicio)
  .where("fecha", "<", fechaFin)
  .get();
```

## 📈 Gráficos Disponibles

### Dashboard

1. **Ingresos Mensuales**: Gráfico de barras mostrando ingresos por mes
2. **Ganancias por Empleada**: Gráfico de dona con distribución de ganancias

### Reportes

1. **Ingresos por Hora**: Línea temporal del día
2. **Ganancias por Empleada**: Barras comparativas
3. **Ingresos Diarios**: Tendencia del mes

## 🎯 Funcionalidades por Rol

### Administrador

- Acceso completo a todas las funciones
- Creación y eliminación de empleadas
- Definición de servicios y precios
- Visualización de reportes
- Gestión de clientas

## 🔒 Seguridad

- Autenticación mediante Firebase (estándar de industria)
- Contraseñas cifradas
- Validación en cliente y servidor
- Soft delete para registros (no se eliminan, se marcan como inactivos)
- Control de acceso por rutas

## 📱 Responsividad

- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)
- ✅ Pantallas pequeñas

## 🌐 Navegadores Soportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Configuración de Reglas Firestore

Para producción, agregar estas reglas en Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Despliegue

### Firebase Hosting

1. Instalar Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Inicializar proyecto:

```bash
firebase init hosting
```

3. Desplegar:

```bash
firebase deploy
```

### Otras opciones

- Netlify
- Vercel
- GitHub Pages
- Heroku
- AWS S3 + CloudFront

## 📞 Soporte y Contacto

Para reportar bugs o sugerencias, contactar al desarrollador.

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Spa Manager**
Última actualización: Enero 2025
