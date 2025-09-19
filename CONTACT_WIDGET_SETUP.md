# Contact Widget Setup Guide

## 📧 Widget de Contacto Flotante

Este widget aparece en todas las páginas de la aplicación como un botón flotante en la esquina inferior derecha.

## 🚀 Configuración Rápida

### 1. Configurar EmailJS (Recomendado)

1. Ve a [EmailJS.com](https://www.emailjs.com/) y crea una cuenta gratuita
2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Obtén tu Public Key

### 2. Actualizar Configuración

Edita el archivo `js/email-config.js` y reemplaza:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',           // Tu Service ID
    templateId: 'YOUR_TEMPLATE_ID',         // Tu Template ID  
    publicKey: 'YOUR_PUBLIC_KEY',           // Tu Public Key
    recipientEmail: 'your-email@example.com', // Tu email
};
```

### 3. Plantilla de Email

En EmailJS, crea una plantilla con estos campos:

```
Subject: [{{inquiry_type}}] {{subject}}

From: {{from_name}} ({{from_email}})
Inquiry Type: {{inquiry_type}}
Page: {{page_url}}
Timestamp: {{timestamp}}

Message:
{{message}}
```

## 🎨 Características del Widget

### ✨ Diseño
- **Botón flotante**: Círculo con gradiente púrpura-rosa
- **Posición fija**: Esquina inferior derecha
- **Animaciones**: Hover, click, y transiciones suaves
- **Responsive**: Se adapta a móviles y tablets

### 📝 Formulario
- **Campos**: Nombre, Email, Asunto, Tipo de consulta, Mensaje
- **Validación**: Campos requeridos y formato de email
- **Tipos de consulta**: General, Booking, Artist Application, Support, Feedback, Other

### 🔧 Funcionalidades
- **EmailJS**: Envío de emails automático
- **Fallback**: Mailto como respaldo
- **Mensajes**: Success/Error con animaciones
- **Cierre**: Escape, click fuera, botón X
- **Persistencia**: Datos del formulario se mantienen

## 📱 Responsive Design

- **Desktop**: Botón 60px, modal 500px de ancho
- **Tablet**: Botón 55px, modal 98% de ancho
- **Mobile**: Botón 50px, modal 98% de ancho

## 🎯 Páginas Incluidas

El widget aparece en todas las páginas:
- ✅ `index.html` - Página principal
- ✅ `pages/find-artists.html` - Buscar artistas
- ✅ `pages/find-styles.html` - Estilos
- ✅ `pages/artist-profile.html` - Perfil de artista
- ✅ `pages/login.html` - Iniciar sesión
- ✅ `pages/register.html` - Registrarse
- ✅ `pages/dashboard-user.html` - Dashboard usuario
- ✅ `pages/dashboard-artist.html` - Dashboard artista

## 🔧 Personalización

### Cambiar Icono
En `css/contact-widget.css`, línea 24:
```css
.contact-icon {
    content: '💬'; /* Cambia por tu emoji/icono */
}
```

### Cambiar Colores
En `css/contact-widget.css`:
```css
.contact-button {
    background: linear-gradient(135deg, #8b5cf6, #ec4899); /* Tus colores */
}
```

### Cambiar Posición
En `css/contact-widget.css`:
```css
.contact-widget {
    bottom: 30px;  /* Distancia del fondo */
    right: 30px;   /* Distancia de la derecha */
}
```

## 🐛 Solución de Problemas

### EmailJS no funciona
1. Verifica que las credenciales estén correctas
2. Asegúrate de que el servicio esté activo
3. Revisa la consola del navegador para errores

### Widget no aparece
1. Verifica que `contact-widget.css` esté incluido
2. Verifica que `contact-widget.js` esté incluido
3. Revisa la consola del navegador para errores

### Formulario no se envía
1. Verifica que todos los campos requeridos estén llenos
2. Verifica la conexión a internet
3. Revisa la configuración de EmailJS

## 📧 Configuración Alternativa (Mailto)

Si no quieres usar EmailJS, puedes usar solo mailto:

1. Comenta la línea de EmailJS en `contact-widget.js`
2. Descomenta la función `sendContactEmailFallback`
3. Cambia `your-email@example.com` por tu email real

## 🎉 ¡Listo!

Una vez configurado, el widget aparecerá automáticamente en todas las páginas y los usuarios podrán contactarte fácilmente.
