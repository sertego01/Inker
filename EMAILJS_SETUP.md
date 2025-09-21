# Configuración de EmailJS para Reset de Contraseña

## 📧 Crear Template en EmailJS

### 1. Acceder a EmailJS Dashboard
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Inicia sesión en tu cuenta
3. Ve a la sección "Email Templates"

### 2. Crear Nuevo Template
1. Haz clic en "Create New Template"
2. Selecciona el servicio de email que estás usando (Gmail, Outlook, etc.)

### 3. Configurar Template
**Template ID:** `template_reset_password`

**Subject:** `Reset Your Password - {{app_name}}`

**Content HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover {
            background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{app_name}}</h1>
        <h2>Reset Your Password</h2>
    </div>
    
    <div class="content">
        <p>Hello {{user_name}},</p>
        
        <p>We received a request to reset your password for your {{app_name}} account. If you made this request, click the button below to set a new password:</p>
        
        <div style="text-align: center;">
            <a href="{{reset_link}}" class="button">Reset My Password</a>
        </div>
        
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 5px; font-family: monospace;">{{reset_link}}</p>
        
        <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
                <li>This link will expire in {{expiration_time}}</li>
                <li>If you didn't request this password reset, please ignore this email</li>
                <li>For security reasons, this link can only be used once</li>
            </ul>
        </div>
        
        <p>If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
        
        <p>Best regards,<br>The {{app_name}} Team</p>
    </div>
    
    <div class="footer">
        <p>This email was sent to {{to_email}}</p>
        <p>If you have any questions, contact us at {{support_email}}</p>
        <p>&copy; 2024 {{app_name}}. All rights reserved.</p>
    </div>
</body>
</html>
```

### 4. Variables del Template
Asegúrate de que estas variables estén configuradas en el template:
- `{{app_name}}` - Nombre de la aplicación (Inker)
- `{{user_name}}` - Nombre del usuario
- `{{user_email}}` - Email del usuario
- `{{reset_link}}` - Enlace de restablecimiento
- `{{expiration_time}}` - Tiempo de expiración (24 hours)
- `{{support_email}}` - Email de soporte

### 5. Configurar Variables en EmailJS
1. Ve a "Template Settings"
2. Añade las variables personalizadas:
   - `app_name`: Inker
   - `support_email`: sergioteja15@gmail.com

### 6. Probar el Template
1. Ve a "Test" en el template
2. Usa estos datos de prueba:
   ```json
   {
     "app_name": "Inker",
     "user_name": "Test User",
     "user_email": "test@example.com",
     "reset_link": "https://yourdomain.com/pages/reset-password-confirm.html?email=test@example.com&code=test123",
     "expiration_time": "24 hours",
     "support_email": "sergioteja15@gmail.com"
   }
   ```

### 7. Activar Template
1. Guarda el template
2. Asegúrate de que esté activo
3. Copia el Template ID: `template_reset_password`

## 🔧 Configuración en el Código

El template ID ya está configurado en `js/email-config.js`:
```javascript
resetPasswordTemplateId: 'template_reset_password'
```

## ✅ Verificación

Para verificar que todo funciona:
1. Ve a `pages/reset-password.html`
2. Ingresa un email válido
3. Haz clic en "Send Reset Link"
4. Revisa tu email para el enlace de restablecimiento

## 🚨 Notas Importantes

- **Seguridad**: El enlace de reset expira en 24 horas
- **Uso único**: Cada enlace solo puede usarse una vez
- **Validación**: El código se valida tanto en el frontend como en el backend
- **Fallback**: Si EmailJS falla, se usa Firebase Auth como respaldo
