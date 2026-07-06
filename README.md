# Consentimiento para gestión de redes sociales

Formulario web simple (HTML + CSS + JS, sin backend) para que tu clienta autorice, desde su celular, la recuperación y gestión de sus cuentas de Facebook e Instagram. Al confirmar, se abre WhatsApp con el mensaje de autorización ya redactado y se genera un enlace al PDF del consentimiento para que te llegue una copia.

**Sitio en vivo:** https://davidcastanom.github.io/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales/

## Estructura

```
consentimiento-redes/
├── index.html           # el formulario
├── assets/
│   ├── style.css        # estilos (con diseño responsive)
│   └── script.js        # lógica: valida, genera PDF, sube a file.io y abre WhatsApp
├── .gitignore
└── README.md
```

## 1. Configura tu número de WhatsApp

Abre `assets/script.js` y edita la línea 7 con tu número, con indicativo de país, sin espacios ni el símbolo "+":

```js
const NUMERO_WHATSAPP = "573113231038"; // número por defecto
```

## 2. Pruébalo localmente

No necesitas servidor: abre `index.html` con doble clic en cualquier navegador.

## Cómo funciona el flujo

1. La clienta abre el enlace desde su celular o computador.
2. Llena sus datos (nombre, cédula, emprendimiento, teléfono).
3. Marca las 4 casillas de autorización.
4. Escribe su nombre como firma digital.
5. Al presionar **"Confirmar y enviar por WhatsApp"**:
   - Se genera automáticamente un **PDF** con el comprobante de autorización (vía `jsPDF`).
   - El PDF se **sube a file.io** (almacenamiento temporal gratuito).
   - Se abre WhatsApp con el mensaje de autorización + un enlace a la **copia digital del PDF**.
   - En pantalla aparece una confirmación con un sello de "Autorizado".
6. La clienta solo presiona **enviar** en WhatsApp.
7. **Tú recibes** el mensaje con el enlace al PDF; abres el enlace y descargas el comprobante.

## Funcionalidades incluidas

| Funcionalidad | Detalle |
|---|---|
| **Diseño responsive** | 3 breakpoints (≤700px, ≤600px, ≤380px) para que se vea bien en cualquier celular |
| **PDF automático** | Se genera con `jsPDF` con todos los datos del formulario y el texto de autorización |
| **Copia por WhatsApp** | El PDF se sube a file.io y el enlace se incluye en el mensaje de WhatsApp |
| **Comprobante descargable** | Botón "Descargar comprobante" que imprime el comprobante desde el navegador |
| **WhatsApp prefilled** | El mensaje se arma automáticamente con todos los datos |
| **Fallback** | Si file.io falla, el mensaje se envía igual sin el enlace |
| **Sin backend** | Todo corre en el navegador, no necesita servidor ni base de datos |

## Tecnologías

- HTML5 + CSS3 (vanilla)
- JavaScript (ES6+, vanilla)
- [jsPDF](https://github.com/parallax/jsPDF) (generación de PDF)
- [file.io](https://file.io) (almacenamiento temporal de archivos)
- GitHub Pages (hosting)

## Repositorio

```bash
git clone https://github.com/Davidcastanom/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales.git
```
