# Consentimiento para gestión de redes sociales

Formulario web simple (HTML + CSS + JS, sin backend) para que tu clienta autorice, desde su celular, la recuperación y gestión de sus cuentas de Facebook e Instagram. Al confirmar, se descarga automáticamente un comprobante en PDF y te llega una copia por correo electrónico vía EmailJS.

**Sitio en vivo:** https://davidcastanom.github.io/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales/

## Estructura

```
consentimiento-redes/
├── index.html           # el formulario
├── assets/
│   ├── style.css        # estilos (con diseño responsive)
│   └── script.js        # lógica: valida, genera PDF y envía copia por EmailJS
├── .gitignore
└── README.md
```

## 1. Configurar EmailJS (para recibir copias por correo)

1. Regístrate gratis en [emailjs.com](https://www.emailjs.com/) (200 correos/mes gratis).
2. Ve a **Email Services** → conectá tu correo (Gmail, Outlook, etc.).
3. Ve a **Email Templates** → creá una plantilla con estas variables: `{{nombre}}`, `{{cedula}}`, `{{emprendimiento}}`, `{{telefono}}`, `{{fecha}}`, `{{firma}}`.
4. Ve a **Account → API Keys** → copiá tu **Public Key**.
5. Abrí `assets/script.js` y reemplazá las 3 constantes de la línea 9-11:

```js
const EMAILJS_PUBLIC_KEY  = "TU_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";
```

## 2. Pruébalo localmente

No necesitas servidor: abre `index.html` con doble clic en cualquier navegador.

## Cómo funciona el flujo

1. La clienta abre el enlace desde su celular o computador.
2. Llena sus datos (nombre, cédula, emprendimiento, teléfono).
3. Marca las 4 casillas de autorización.
4. Escribe su nombre como firma digital.
5. Al presionar **"Confirmar y descargar PDF"**:
   - Se genera automáticamente un **PDF** con el comprobante de autorización (vía `jsPDF`).
   - El PDF se **descarga automáticamente** en el dispositivo de la clienta.
   - Se envía un **correo electrónico** con los datos a tu bandeja de entrada (vía EmailJS).
   - En pantalla aparece una confirmación con un sello de "Autorizado".
6. **Tú recibes** el correo con los datos del consentimiento.
7. La clienta puede volver a descargar el PDF desde el botón "Descargar comprobante".

## Funcionalidades incluidas

| Funcionalidad | Detalle |
|---|---|
| **Diseño responsive** | Mobile-first con `clamp()`, grid fluido, breakpoints para todo tamaño |
| **PDF automático** | Se genera con `jsPDF` con todos los datos del formulario |
| **Descarga automática** | El PDF se descarga solo al confirmar, sin servicios externos |
| **Copia por correo** | EmailJS envía los datos a tu bandeja de entrada |
| **Sin API de pago** | No requiere WhatsApp API ni servicios de pago |
| **Sin backend** | Todo corre en el navegador, no necesita servidor ni base de datos |

## Tecnologías

- HTML5 + CSS3 (vanilla, mobile-first)
- JavaScript (ES6+, vanilla)
- [jsPDF](https://github.com/parallax/jsPDF) (generación de PDF)
- [EmailJS](https://www.emailjs.com/) (envío de correos)
- GitHub Pages (hosting)

## Repositorio

```bash
git clone https://github.com/Davidcastanom/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales.git
```
