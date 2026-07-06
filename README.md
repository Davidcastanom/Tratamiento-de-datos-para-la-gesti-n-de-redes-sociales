# Consentimiento para gestión de redes sociales

Formulario web simple (HTML + CSS + JS, sin backend) para que tu clienta autorice, desde su celular, la recuperación y gestión de sus cuentas de Facebook e Instagram. Al confirmar, se abre WhatsApp con el mensaje de autorización ya redactado y dirigido a tu número, para que quede como constancia en tu chat.

## Qué incluye

```
consentimiento-redes/
├── index.html          # el formulario
├── assets/
│   ├── style.css        # estilos
│   └── script.js        # lógica: valida, arma el mensaje y abre WhatsApp
└── README.md
```

## 1. Configura tu número de WhatsApp

Abre `assets/script.js` y edita esta línea con tu número, con indicativo de país, sin espacios ni el símbolo "+":

```js
const NUMERO_WHATSAPP = "573001234567"; // ejemplo Colombia
```

## 2. Pruébalo en tu computador

No necesitas servidor: solo abre `index.html` con doble clic en cualquier navegador y llena el formulario para probar el flujo.

## 3. Súbelo a GitHub

```bash
git init
git add .
git commit -m "Formulario de consentimiento"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

(Reemplaza `TU-USUARIO/TU-REPOSITORIO` por los datos de tu repositorio en GitHub.)

## 4. Publícalo con GitHub Pages (para tener un enlace público)

1. En tu repositorio de GitHub, ve a **Settings → Pages**.
2. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda. En un par de minutos tu formulario quedará disponible en:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
4. Ese es el enlace que le envías a tu clienta por WhatsApp.

## Cómo funciona el flujo

1. Tu clienta abre el enlace, ve sus datos y los 4 puntos de autorización con casillas.
2. Llena sus datos, marca las casillas y escribe su nombre como firma digital.
3. Al presionar **"Confirmar y enviar por WhatsApp"**, se arma automáticamente un mensaje con todos sus datos y se abre WhatsApp Web o la app, con tu número y el mensaje ya escrito — ella solo debe presionar enviar.
4. En pantalla le aparece una confirmación con un sello de "Autorizado", y puede además descargar/imprimir un comprobante en PDF desde el botón correspondiente (usa la función de imprimir del navegador).

## Notas

- Este formulario **no guarda datos en ningún servidor**; el respaldo real queda en el mensaje de WhatsApp que ella te envía. Guarda esa conversación como constancia.
- Si más adelante quieres que las respuestas también queden guardadas automáticamente en una base de datos (por ejemplo con Google Sheets o Airtable), se puede ampliar — este es el punto de partida simple y funcional.
- El texto de autorización dentro de `index.html` (sección "2. Qué autorizas") es un resumen en lenguaje sencillo del contrato de tratamiento de datos. Si cambias las cláusulas del contrato, actualiza también este texto para que ambos documentos digan lo mismo.
