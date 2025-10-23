# 🗺️ Integración de Google Maps - Guía Completa

## 📋 **Pasos para obtener tu API Key de Google Maps**

### **1. Crear cuenta en Google Cloud Console**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Crea un nuevo proyecto o selecciona uno existente

### **2. Habilitar las APIs necesarias**
1. Ve a "APIs y servicios" > "Biblioteca"
2. Busca y habilita estas APIs:
   - **Maps JavaScript API** (para mostrar el mapa)
   - **Geocoding API** (para convertir direcciones en coordenadas)
   - **Places API** (para buscar lugares)

### **3. Crear credenciales**
1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Clave de API"
3. Copia la API key generada

### **4. Configurar restricciones (recomendado)**
1. Haz clic en la API key creada
2. En "Restricciones de aplicación":
   - Selecciona "Sitios web HTTP"
   - Agrega tu dominio (ej: `localhost`, `tu-dominio.com`)
3. En "Restricciones de API":
   - Selecciona las APIs que habilitaste

## 🔧 **Configuración en tu proyecto**

### **Paso 1: Configurar la API Key**
1. Abre el archivo `js/google-maps-config.js`
2. Reemplaza `TU_API_KEY` con tu API key real:
```javascript
const GOOGLE_MAPS_CONFIG = {
    API_KEY: 'tu_api_key_aqui',
    // ... resto de la configuración
};
```

### **Paso 2: Verificar la configuración**
1. Abre `pages/map.html` en tu navegador
2. Si la API key está configurada correctamente, verás el mapa
3. Si no, verás un mensaje de error con instrucciones

## 🎯 **Funcionalidades implementadas**

### **✅ Características del mapa:**
- **Mapa interactivo** con Google Maps
- **Búsqueda de ubicaciones** usando Places API
- **Marcadores de artistas** con información detallada
- **Filtros por estilo** de tatuaje
- **Ventanas de información** al hacer clic en marcadores
- **Navegación a perfiles** de artistas

### **✅ Controles del mapa:**
- **Barra de búsqueda** para encontrar ubicaciones
- **Botones de filtro** por estilo de tatuaje
- **Zoom y navegación** estándar de Google Maps

### **✅ Integración con base de datos:**
- **Carga automática** de artistas desde Firestore
- **Marcadores dinámicos** basados en datos reales
- **Información actualizada** en tiempo real

## 🚨 **Solución de problemas**

### **Error: "API key not configured"**
- Verifica que hayas reemplazado `TU_API_KEY` en `js/google-maps-config.js`
- Asegúrate de que la API key sea válida

### **Error: "This page can't load Google Maps correctly"**
- Verifica que hayas habilitado las APIs necesarias
- Revisa las restricciones de tu API key
- Asegúrate de que tu dominio esté en la lista de sitios permitidos

### **Error: "Missing or insufficient permissions"**
- Verifica que hayas habilitado todas las APIs necesarias
- Revisa las restricciones de tu API key

### **El mapa no muestra artistas:**
- Verifica que los artistas en tu base de datos tengan campos `lat` y `lng`
- Revisa la consola del navegador para errores de JavaScript
- Asegúrate de que la función `getAllArtists()` esté funcionando

## 💰 **Costos de Google Maps**

### **Plan gratuito:**
- **$200 USD** de crédito mensual
- **28,000 cargas de mapa** por mes
- **40,000 solicitudes de geocodificación** por mes
- **40,000 solicitudes de Places** por mes

### **Después del límite gratuito:**
- **$7 USD** por cada 1,000 cargas de mapa adicionales
- **$5 USD** por cada 1,000 solicitudes de geocodificación adicionales
- **$17 USD** por cada 1,000 solicitudes de Places adicionales

## 🔒 **Seguridad**

### **Recomendaciones:**
1. **Nunca** expongas tu API key en repositorios públicos
2. **Configura restricciones** de dominio y API
3. **Monitorea el uso** en Google Cloud Console
4. **Usa variables de entorno** en producción

### **Para desarrollo local:**
- Agrega `localhost` a las restricciones de dominio
- Usa `127.0.0.1` si es necesario

## 📱 **Responsive Design**

El mapa está optimizado para:
- **Desktop** (pantallas grandes)
- **Tablet** (pantallas medianas)
- **Mobile** (pantallas pequeñas)

## 🎨 **Personalización**

### **Cambiar estilos del mapa:**
Edita `MAP_STYLES` en `js/google-maps-config.js`

### **Cambiar ubicación por defecto:**
Modifica `DEFAULT_LOCATION` en `js/google-maps-config.js`

### **Cambiar iconos de marcadores:**
Actualiza `MARKER_ICONS` en `js/google-maps-config.js`

## 🚀 **Próximos pasos**

1. **Configura tu API key** siguiendo los pasos anteriores
2. **Prueba la funcionalidad** en `pages/map.html`
3. **Personaliza** según tus necesidades
4. **Despliega** en tu servidor web

---

**¡Listo!** Tu mapa de Google Maps está configurado y listo para usar. 🎉
