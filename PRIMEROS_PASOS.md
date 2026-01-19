# 🚀 GUÍA DE PRIMEROS PASOS - SPA Manager

## 📌 Antes de Comenzar

Necesitas:

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet
- Una cuenta de Google (para Firebase)

## 1️⃣ Configurar Firebase (Paso Crítico)

### 1.1 Crear Proyecto en Firebase

1. Ir a https://console.firebase.google.com/
2. Hacer clic en **"Agregar proyecto"**
3. Nombre: `SPA-Manager` (o el que prefieras)
4. Aceptar términos y crear

### 1.2 Habilitar Autenticación

1. En el menú izquierdo: **Build → Authentication**
2. Hacer clic en **"Empezar"**
3. Seleccionar **"Email/Contraseña"**
4. Activar y guardar

### 1.3 Crear Base de Datos Firestore

1. En el menú: **Build → Firestore Database**
2. Hacer clic en **"Crear base de datos"**
3. Ubicación: Elegir la más cercana
4. Modo: **"Iniciar en modo de prueba"** (para desarrollo)
5. Crear

### 1.4 Obtener Credenciales

1. Ir a **Configuración del proyecto** (ícono de engranaje)
2. Hacer clic en **"Mi aplicación"**
3. Buscar la sección **"Tus aplicaciones"**
4. Hacer clic en **"Web"** (</>) si no hay
5. Se mostrará el `firebaseConfig`
6. **Copiar toda la configuración**

### 1.5 Actualizar el Código

En `js/config/firebase.js`, reemplazar:

```javascript
const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  projectId: "PEGA_AQUI_TU_PROJECT_ID",
  storageBucket: "PEGA_AQUI_TU_STORAGE_BUCKET",
  messagingSenderId: "PEGA_AQUI_TU_MESSAGING_SENDER_ID",
  appId: "PEGA_AQUI_TU_APP_ID",
};
```

## 2️⃣ Ejecutar la Aplicación

### Opción A: Con Visual Studio Code (Recomendado)

1. Abrir la carpeta `AppSPA` en VS Code
2. Instalar extensión **"Live Server"** (por Ritwick Dey)
3. Hacer clic derecho en `index.html`
4. Seleccionar **"Open with Live Server"**
5. Se abrirá en el navegador automáticamente

### Opción B: Con Python

```bash
cd AppSPA
python -m http.server 8000
```

Luego abrir: http://localhost:8000

### Opción C: Con Node.js

```bash
npm install -g http-server
cd AppSPA
http-server
```

## 3️⃣ Primer Inicio de Sesión

### Crear Usuario Administrador

1. En la pantalla de login, hacer clic en **"Crear Cuenta"**
2. Llenar el formulario:
   - **Email**: `admin@spa.com` (o el que prefieras)
   - **Contraseña**: `123456` (mínimo 6 caracteres)
   - **Confirmar Contraseña**: `123456`
   - **Código de Administrador**: `12345` (código por defecto)
3. Hacer clic en **"Crear Cuenta"**
4. Se confirmará exitosamente
5. Volver al login y entrar con las credenciales

## 4️⃣ Primer Uso - Crear Datos Base

### Paso 1: Crear Servicios

1. En el menú lateral, hacer clic en **"✨ Servicios"**
2. Hacer clic en **"➕ Agregar Servicio"**
3. Llenar formulario:
   - **Nombre**: Masaje Relajante
   - **Categoría**: Masajes
   - **Duración**: 60 minutos
   - **Precio**: 500 MXN
   - **Descripción**: Masaje relajante de cuerpo completo
4. Hacer clic en **"Guardar"**
5. Repetir para más servicios: Facial, Manicure, Pedicure, etc.

**Servicios recomendados para empezar:**

- Masaje Relajante: $500 (60 min)
- Facial: $400 (45 min)
- Manicure: $250 (30 min)
- Pedicure: $350 (45 min)
- Depilación: $300 (30 min)

### Paso 2: Crear Empleadas

1. En el menú, hacer clic en **"💄 Empleadas"**
2. Hacer clic en **"➕ Agregar Empleada"**
3. Llenar datos:
   - **Nombre**: Lupita López
   - **Puesto**: Masajista
   - **Email**: lupita@spa.com
   - **Teléfono**: 5551234567
4. **Importante**: Asignar porcentajes de comisión por servicio
   - Masaje Relajante: 40%
   - Facial: 35%
   - Manicure: 30%
   - Pedicure: 30%
   - Depilación: 25%
5. Hacer clic en **"Guardar"**

**Significado de porcentajes:**

- Si Lupita hace un Masaje de $500 con 40%, ella gana $200

### Paso 3: Crear Clientas

1. En el menú, hacer clic en **"👩 Clientas"**
2. Hacer clic en **"➕ Agregar Clienta"**
3. Llenar datos:
   - **Nombre**: María García
   - **Teléfono**: 5559876543
   - **Email**: maria@email.com
   - **Tipo de Servicio Favorito**: Masaje
   - **Observaciones**: Alérgica a aceites
4. Hacer clic en **"Guardar"**
5. Crear 2-3 clientas de prueba más

### Paso 4: Registrar Primera Atención

1. En el menú, hacer clic en **"📋 Atenciones"**
2. Hacer clic en **"➕ Nueva Atención"**
3. Seleccionar:
   - **Clienta**: María García
   - **Empleada**: Lupita López
   - **Servicios**: Masaje Relajante (se suma automáticamente)
   - **Total**: Se calcula automáticamente ($500)
4. Hacer clic en **"Guardar"**

### Paso 5: Ver Reportes

1. En el menú, hacer clic en **"📈 Reportes"**
2. Por defecto mostrará el reporte diario
3. Ver estadísticas:
   - Total de ingresos del día
   - Ticket promedio
   - Atenciones registradas
4. Cambiar a **"Reporte Mensual"** para ver gráficos
5. Cambiar a **"Por Empleada"** para ver ganancias individuales

## 5️⃣ Cambiar el Código de Administrador

**⚠️ IMPORTANTE PARA PRODUCCIÓN**

1. Abrir `js/services/auth.js`
2. Buscar línea:

```javascript
if (adminCode !== '12345') {
```

3. Reemplazar `'12345'` con un código seguro:

```javascript
if (adminCode !== 'MI_CODIGO_SEGURO_LARGO_Y_FUERTE') {
```

4. Guardar archivo

## 6️⃣ Configurar Reglas de Firestore (Producción)

Por seguridad, cambiar a modo restringido:

1. En Firebase Console, ir a **Firestore Database**
2. Hacer clic en **"Reglas"**
3. Reemplazar con:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Publicar

## 7️⃣ Desplegar a Internet (Firebase Hosting)

### Instalación

```bash
npm install -g firebase-tools
```

### Inicializar

```bash
firebase init hosting
```

Responder:

- Proyecto: Seleccionar el que creaste
- Directorio público: `.` (punto)
- SPA: `yes`

### Desplegar

```bash
firebase deploy
```

Se te dará una URL pública para acceder desde cualquier dispositivo.

## 📝 Flujo de Trabajo Típico Diario

### Para la Administradora

1. **Mañana**: Revisar dashboard
   - Ver ingresos del día anterior
   - Verificar empleadas activas

2. **Durante el día**: Registrar atenciones
   - Cuando termina una clienta, registrar la atención
   - Seleccionar servicios y empleada

3. **Tardes/Noches**: Revisar reportes
   - Ver cómo va el día
   - Analizar por empleada

4. **Final de mes**: Generar reportes mensuales
   - Calcular comisiones
   - Generar recibos

### Para las Empleadas (si acceden)

1. Ver sus ganancias del mes
2. Ver detalle de sus atenciones
3. Ver tendencias de servicios

## 🎨 Personalización

### Cambiar Colores

En `css/style.css`, buscar la sección de colores:

```css
:root {
  --color-primary: #ec4899; /* Cambiar este para color principal */
  --color-secondary: #f472b6; /* Color secundario */
  --color-accent: #a78bfa; /* Acentos */
}
```

Ejemplos de colores:

- Rosa fuerte: `#d946a6`
- Púrpura: `#8b5cf6`
- Turquesa: `#14b8a6`

### Cambiar Moneda

En `js/utils/helpers.js`, en `formatearMoneda()`:

```javascript
static formatearMoneda(valor) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',  // Cambiar aquí (USD, EUR, etc)
        minimumFractionDigits: 2
    }).format(valor);
}
```

## ⚠️ Errores Comunes

### Error: "Firebase is not defined"

**Solución**: Asegurar que el script de Firebase está en `index.html` antes de otros scripts.

### Error: "Usuario no puede escribir en Firestore"

**Solución**: Verificar reglas de Firestore. Cambiar a modo lectura/escritura:

```
allow read, write: if true;
```

(Solo para desarrollo)

### Datos no se guardan

**Solución**:

1. Abrir DevTools (F12)
2. Ir a Networks
3. Buscar requests a `firestore.googleapis.com`
4. Ver si hay errores 403/401

### No se ve el gráfico

**Solución**: Asegurar que Chart.js se cargó (ver Network en DevTools)

## 📱 Usar en Móvil

1. Desplegar a internet (Firebase Hosting u otro)
2. Escanear código QR desde móvil
3. O compartir link directo

Todo funciona igual en móvil porque es responsivo.

## 🆘 Obtener Ayuda

### Verificar Consola

1. Abrir F12 (DevTools)
2. Ir a tab "Console"
3. Ver mensajes de error en rojo
4. Copiar error completo

### Verificar Firebase

1. Firebase Console
2. Ir a la sección de Logs
3. Ver últimas operaciones
4. Buscar errores

## ✅ Checklist de Verificación

- [ ] Firebase configurado correctamente
- [ ] archivo `firebase.js` actualizado con credenciales
- [ ] Base de datos Firestore creada
- [ ] Autenticación habilitada
- [ ] Primer usuario creado exitosamente
- [ ] Servicios creados
- [ ] Empleadas creadas
- [ ] Clientas creadas
- [ ] Primera atención registrada
- [ ] Reportes visibles

## 🎉 ¡Listo!

Ya puedes:
✅ Gestionar clientas
✅ Gestionar empleadas
✅ Crear servicios
✅ Registrar atenciones
✅ Ver reportes
✅ Calcular comisiones automáticamente

¡Bienvenida a SPA Manager!

---

**¿Dudas?** Revisar la sección de troubleshooting o ver DOCUMENTACION_TECNICA.md
