# 🔧 CONFIGURACIÓN FIREBASE REALTIME DATABASE

✅ LA APLICACIÓN YA ESTÁ CONFIGURADA PARA REALTIME DATABASE

Si quieres usar tu propio proyecto Firebase:

# PASO 1: Crear Proyecto Firebase

1. Ve a: https://firebase.google.com/
2. Haz click en "Console"
3. Crea un nuevo proyecto
4. Nombre: "SPA-Manager" (o lo que prefieras)
5. Desabilita Google Analytics (opcional)
6. Click "Crear proyecto"

# PASO 2: Habilitar Realtime Database

1. En la consola, ve a: Build > Realtime Database
2. Click en "Create Database"
3. Ubicación: Elige la más cercana a tu región
4. Modo: Comienza en modo de prueba (menos restrictivo)
5. Click "Enable"

# PASO 3: Habilitar Firebase Authentication

1. Ve a: Build > Authentication
2. Click "Get Started"
3. Selecciona: "Email/Password"
4. Habilita "Email/Password"
5. Guarda

# PASO 4: Copiar Configuración

1. Ve a Project Settings (engranaje en la esquina superior izquierda)
2. En la pestaña "General"
3. Bajo "Your apps", busca SDK setup and configuration
4. Selecciona: Web (</> )
5. Copia toda la sección:

   const firebaseConfig = {
   apiKey: "...",
   authDomain: "...",
   projectId: "...",
   storageBucket: "...",
   messagingSenderId: "...",
   appId: "...",
   databaseURL: "..." // IMPORTANTE: Incluye esto
   };

# PASO 5: Actualizar Configuración

1. Abre el archivo: js/config/firebase.js
2. Reemplaza el objeto firebaseConfig con el tuyo
3. Guarda el archivo

# PASO 6: Copiar Database URL

1. En tu consola de Firebase, ve a: Build > Realtime Database
2. Verás una URL como: https://tu-proyecto.firebaseio.com
3. Asegúrate de que esté en firebaseConfig como: databaseURL

# PASO 7: Configurar Reglas de Seguridad

1. En Realtime Database, ve a la pestaña: "Rules"
2. Reemplaza el contenido con estas reglas:

{
"rules": {
".read": "auth != null",
".write": "auth != null",
"usuarios": {
".read": "auth != null",
".write": "root.child('usuarios').child(auth.uid).exists()"
},
"clientas": {
".read": "auth != null",
".write": "auth != null"
},
"empleadas": {
".read": "auth != null",
".write": "auth != null"
},
"servicios": {
".read": "auth != null",
".write": "auth != null"
},
"atenciones": {
".read": "auth != null",
".write": "auth != null"
}
}
}

3. Click en "Publish"

# LISTO ✅

¡Ahora tu aplicación está conectada a Firebase Realtime Database!

Los datos se sincronizarán en tiempo real entre todos los usuarios.

# 🔐 CAMBIAR A MODO SEGURO (Producción)

Cuando ya tengas usuarios reales, cambia las reglas a:

{
"rules": {
".read": false,
".write": false,
"usuarios": {
".read": "auth != null",
".write": "auth.uid === $uid",
      "$uid": {
".validate": "newData.hasChildren(['uid', 'email', 'rol'])"
}
},
"clientas": {
".read": "auth != null",
".write": "auth != null"
},
"empleadas": {
".read": "auth != null",
".write": "auth != null"
},
"servicios": {
".read": "auth != null",
".write": "auth != null"
},
"atenciones": {
".read": "auth != null",
".write": "auth != null"
}
}
}

# ❌ ¿Problemas?

Si no funciona:

1. Verifica que Realtime Database esté habilitada
2. Verifica que Authentication esté habilitada
3. Revisa la consola del navegador (F12 > Console) para errores
4. Asegúrate de tener la URL correcta en databaseURL
5. Verifica que las reglas de seguridad permitan lectura/escritura

# 📚 Documentación Oficial

- Firebase Console: https://console.firebase.google.com/
- Realtime Database Docs: https://firebase.google.com/docs/database
- Authentication Docs: https://firebase.google.com/docs/auth
