# 🎉 SPA Manager - ABRE AQUÍ

## ¿Cómo ejecutar la aplicación?

### Opción 1: **SUPER FÁCIL** ✅ (Recomendado)

1. **Haz doble click en `index.html`**
2. ¡Listo! La aplicación se abrirá en tu navegador
3. Inicia sesión con:
   - Email: `demo@spa.com`
   - Contraseña: `123456`

> **Nota:** En este modo, los datos se guardan en tu navegador (localStorage). No necesitas servidor ni Python.

---

### Opción 2: Con Firebase Realtime Database ☁️

Si quieres usar Firebase para sincronizar datos en tiempo real:

1. Abre [CONFIGURAR_FIREBASE.md](CONFIGURAR_FIREBASE.md) y sigue los pasos
2. Copia tus credenciales de Firebase Console
3. Edita `js/config/firebase.js` con tu configuración
4. La app detectará automáticamente que tienes Firebase
5. Recarga la página - ¡Estará conectada a Realtime Database!

**Ventajas:**

- 📊 Datos sincronizados en tiempo real
- 👥 Múltiples usuarios pueden usar la app simultáneamente
- ☁️ Los datos quedan en la nube (más seguro)
- 🔄 Automáticas actualizaciones entre dispositivos

**Prueba la conexión:**

- Abre `test-firebase.html` en tu navegador
- Haz click en "Ejecutar Pruebas"
- Verifica que todo esté correctamente configurado

---

## 🗄️ Opciones de Base de Datos

| Característica         | localStorage  | Firebase Realtime DB  |
| ---------------------- | ------------- | --------------------- |
| **Instalación**        | ✅ Automática | ⚙️ Requiere config    |
| **Datos**              | 📱 Local      | ☁️ Nube               |
| **Tiempo real**        | ❌ No         | ✅ Sí                 |
| **Usuarios múltiples** | ❌ No         | ✅ Sí                 |
| **Sincronización**     | ❌ Manual     | ✅ Automática         |
| **Costo**              | Gratis        | Gratis (hasta límite) |
| **Backup**             | ❌ No         | ✅ Automático         |

## ✨ Características

- ✅ Gestión de clientas
- ✅ Gestión de empleadas (con comisiones por porcentaje)
- ✅ Catálogo de servicios
- ✅ Registro de atenciones (servicios realizados)
- ✅ Cálculos automáticos de ingresos y comisiones
- ✅ Dashboard con KPIs y gráficos
- ✅ 3 tipos de reportes completos
- ✅ Diseño responsivo (funciona en móvil, tablet, PC)
- ✅ **Funciona sin servidor - ¡Solo abre en tu navegador!**

---

## 📱 Datos de Demostración

La aplicación viene precargada con:

**Servicios:**

- Masaje Relajante ($500)
- Masaje Terapéutico ($600)
- Facial Básico ($350)
- Pedicura Completa ($400)

**Empleadas:**

- María García (Masajista)
- Andrea López (Esteticien)
- Carolina Martínez (Masajista)

**Clientas:**

- Laura Sánchez
- Gabriela Ruiz
- Sofía Mendoza

**Atenciones de prueba:** 15 registros de los últimos 7 días

---

## 🚀 Subir a GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings → Pages → Source: Main Branch
4. ¡Tu aplicación estará en vivo en `https://tu-usuario.github.io/tu-repo`

---

## 🎓 Modo de Uso

### Login

- Prueba con: `demo@spa.com` / `123456`
- O crea tu propia cuenta (código admin: 12345)

### Dashboard

- Ve todos tus KPIs (ingresos, empleadas, atenciones)
- Visualiza gráficos de ingresos y distribución de comisiones

### Gestión

- **Clientas**: Crea, edita, elimina clientes
- **Empleadas**: Asigna porcentajes de comisión por cada servicio
- **Servicios**: Registra los servicios que ofreces
- **Atenciones**: Registra cada servicio realizado

### Reportes

- **Diario**: Ingresos y atenciones del día
- **Mensual**: Resumen del mes con comisiones por empleada
- **Por Empleada**: Detalle individual de ganancias

---

## ⚙️ Personalización

### Cambiar código de admin

Edita `js/services/auth.js` línea ~16:

```javascript
if (adminCode !== '12345') { // Cambia '12345' por tu código
```

### Cambiar colores

Edita `css/style.css`:

- `--color-primary`: Color rosa principal
- `--color-secondary`: Color secundario
- `--color-accent`: Color acento (lavanda)

---

## 📝 Notas Importantes

- **Datos locales**: En modo demo, los datos se guardan en el navegador (localStorage)
- **Privacidad**: No hay servidor, todo queda en tu máquina
- **Exportar datos**: Los datos se pueden ver en DevTools → Application → Local Storage
- **Limpiar datos**: Usa DevTools para borrar localStorage si quieres empezar de cero

---

## ❓ ¿Problemas?

### "Error de CORS"

- Si aparece error de CORS, usa Firefox o Chrome (algunos navegadores pueden tener restricciones)
- O abre a través de un servidor local: `python -m http.server 8000`

### "Los datos no se guardan"

- Verifica que localStorage esté habilitado en tu navegador
- Revisa DevTools → Console para ver si hay errores

### "Quiero usar Firebase real"

- Edita `js/config/firebase.js` con tus credenciales
- Firebase debería detectarse automáticamente

---

## 📖 Documentación Completa

Para más detalles técnicos, ver:

- [README.md](README.md) - Documentación completa
- [PRIMEROS_PASOS.md](PRIMEROS_PASOS.md) - Guía paso a paso
- [DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md) - Arquitectura y código

---

## 🎯 Resumen

|               | Local (Recomendado) | Firebase                   |
| ------------- | ------------------- | -------------------------- |
| Instalación   | ✅ Doble click      | ⚙️ Configurar credenciales |
| Datos         | 📱 Navegador        | ☁️ Nube                    |
| Internet      | ❌ No necesario     | ✅ Requerido               |
| Colaboradores | ❌ Solo local       | ✅ Múltiples usuarios      |
| Costo         | Gratis              | Gratis (hasta límite)      |

---

## 🎁 ¿Listo para empezar?

**¡Haz doble click en `index.html` y disfruta tu SPA Manager!**

Cualquier duda, revisa la documentación completa en README.md
