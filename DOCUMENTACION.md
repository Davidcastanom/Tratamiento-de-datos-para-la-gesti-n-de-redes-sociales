# Manual de personalización — Formulario de consentimiento

Este documento explica paso a paso cómo modificar este proyecto para adaptarlo a
cualquier tipo de autorización, consentimiento o contrato digital.

---

## Índice

1. [Estructura del proyecto](#1-estructura-del-proyecto)
2. [Cambiar el tipo de consentimiento](#2-cambiar-el-tipo-de-consentimiento)
3. [Cambiar la marca o el prestador del servicio](#3-cambiar-la-marca-o-el-prestador-del-servicio)
4. [Cambiar colores y aspecto visual](#4-cambiar-colores-y-aspecto-visual)
5. [Agregar o quitar campos del formulario](#5-agregar-o-quitar-campos-del-formulario)
6. [Agregar o quitar ítems de autorización (checkboxes)](#6-agregar-o-quitar-ítems-de-autorización-checkboxes)
7. [Modificar el PDF que se descarga](#7-modificar-el-pdf-que-se-descarga)
8. [Configurar el correo que recibe las copias](#8-configurar-el-correo-que-recibe-las-copias)
9. [Probar localmente](#9-probar-localmente)
10. [Publicar en GitHub Pages](#10-publicar-en-github-pages)
11. [Ejemplos de personalización](#11-ejemplos-de-personalización)

---

## 1. Estructura del proyecto

```
consentimiento-redes/
├── index.html            → Formulario y estructura HTML
├── assets/
│   ├── style.css         → Diseño visual (colores, fuentes, responsive)
│   └── script.js         → Lógica: genera PDF, envía correo, validación
├── DOCUMENTACION.md      ← este manual
├── README.md             → Documentación rápida para usuarios finales
└── .gitignore
```

Solo hay que modificar estos 3 archivos. No se necesita backend, base de datos ni
registrarse en ningún servicio.

---

## 2. Cambiar el tipo de consentimiento

Cada vez que quieras reutilizar el proyecto para una actividad distinta
(ej: uso de imagen, tratamiento de datos general, afiliación, etc.),
tenés que actualizar los textos en **index.html** y **script.js**.

### 2.1. Título y descripción — `index.html`

Ubicación: líneas 22-27

```html
<span class="eyebrow">Autorización · Manejo de redes sociales</span>
<h1>Consentimiento para la gestión de tus redes</h1>
<p class="lede">
  Antes de recuperar el acceso y actualizar tus cuentas, necesito tu autorización.
  Lee cada punto, marca lo que aceptas y firma al final. Toma menos de dos minutos.
</p>
```

**Cambiar por:**

```html
<span class="eyebrow">Autorización · Uso de imagen</span>
<h1>Consentimiento para el uso de tu imagen</h1>
<p class="lede">
  Antes de publicar fotografías y videos del evento, necesito tu autorización.
  Lee cada punto, marca lo que aceptas y firma al final.
</p>
```

### 2.2. Las autorizaciones (checkboxes) — `index.html`

Ubicación: líneas 70-101

Cada ítem es un `<li>` dentro de `<ol class="consent-list">`. Se pueden
agregar, quitar o editar libremente:

```html
<li>
  <label class="check">
    <input type="checkbox" required>
    <span class="mark"></span>
    <span class="text">Texto de la autorización aquí.</span>
  </label>
</li>
```

> El atributo `required` fuerza a que el checkbox esté marcado. Si algún ítem
> debe ser opcional, simplemente sacá `required`.

### 2.3. El texto legal del PDF — `script.js`

Ubicación: líneas 125-131

```js
const texto =
  "El cliente arriba identificado autoriza a Flujo Base (David Castaño) " +
  "la recuperación, actualización y gestión de sus cuentas de Facebook " +
  "e Instagram, incluyendo el manejo confidencial de sus credenciales " +
  "y la conservación de contactos y seguidores existentes.";
```

### 2.4. El comprobante imprimible — `index.html`

Ubicación: líneas 135-149

```html
<section class="receipt" id="receipt">
  <h3>Comprobante de autorización — Flujo Base</h3>
  ...
  <p>El cliente arriba identificado autorizó a <strong>Flujo Base (David Castaño)</strong> ...</p>
  ...
</section>
```

### 2.5. Mensaje de confirmación — `index.html`

Ubicación: líneas 129-130

```html
<h2>Consentimiento registrado</h2>
<p class="lede">Gracias, <span id="doneNombre"></span>. Tu comprobante PDF ...</p>
```

---

## 3. Cambiar la marca o el prestador del servicio

### 3.1. Proveedor en HTML — `index.html`

Ubicación: líneas 16-21 (barra del proveedor)

```html
<div class="provider">
  <span class="provider__badge">FLUJO BASE</span>
  <span class="provider__by">por David Castaño</span>
  <a class="provider__link" href="https://github.com/Davidcastanom" target="_blank" rel="noopener">github.com/Davidcastanom</a>
</div>
```

### 3.2. Tarjeta del prestador en "Partes" — `index.html`

Ubicación: líneas 35-39

```html
<div class="party">
  <span class="party__tag">PRESTADOR</span>
  <strong class="party__name">Flujo Base</strong>
  <span class="party__detail">David Castaño</span>
  <span class="party__detail">github.com/Davidcastanom</span>
</div>
```

### 3.3. Constantes en JavaScript — `script.js`

Ubicación: líneas 23-24

```js
const PRESTADOR = "Flujo Base — David Castaño";
const GITHUB_URL = "github.com/Davidcastanom";
```

La variable `PRESTADOR` se usa en el PDF. La variable `GITHUB_URL` se usa en el
footer del PDF. Se pueden reemplazar por cualquier texto (ej: sitio web, correo,
nombre comercial).

### 3.4. Texto del comprobante imprimible — `index.html`

Ubicación: líneas 137, 145, 148

```html
<p><strong>Prestador:</strong> Flujo Base — David Castaño</p>
...
<p>El cliente arriba identificado autorizó a <strong>Flujo Base (David Castaño)</strong> ...</p>
...
<p style="font-size:11px;color:#888">Generado desde github.com/Davidcastanom</p>
```

---

## 4. Cambiar colores y aspecto visual

Todos los colores están definidos como variables CSS al inicio de
`assets/style.css` (líneas 1-14):

```css
:root {
  --bg: #eef3ec;            /* fondo de la página */
  --surface: #fffefb;       /* fondo de la tarjeta */
  --ink: #17261f;           /* color del texto principal */
  --ink-soft: #4a584f;      /* color del texto secundario */
  --primary: #0f4c43;       /* color principal (botones, bordes) */
  --primary-dark: #0b342e;  /* hover del color principal */
  --accent: #b5482e;        /* color de acento (eyebrow, tags) */
  --gold: #c99a3e;          /* borde de focus en checkboxes */
  --line: #d8e0d8;          /* color de bordes y líneas divisorias */
}
```

**Ejemplo para cambiar a una paleta azul corporativa:**

```css
:root {
  --bg: #eef3fc;
  --surface: #ffffff;
  --ink: #1a2332;
  --ink-soft: #4a5568;
  --primary: #1a56db;
  --primary-dark: #0f3b9e;
  --accent: #d97706;
  --gold: #f59e0b;
  --line: #d1d9e6;
}
```

### 4.1. Las fuentes

Se cargan desde Google Fonts en `index.html` (línea 9):

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Fraunces** → Serif, para títulos y el eyebrow
- **Work Sans** → Sans-serif, para el cuerpo

Se puede cambiar por cualquier otra fuente de Google Fonts o una local.

### 4.2. La animación del sello

El sello de "AUTORIZADO" usa `@keyframes stampIn` en `style.css` (líneas 387-391).

---

## 5. Agregar o quitar campos del formulario

### 5.1. Agregar un campo en HTML — `index.html`

Ubicación: dentro de `<section class="block">` (líneas 48-68)

Cada campo sigue esta estructura:

```html
<label class="field">
  <span>Nombre del campo</span>
  <input type="text" name="nombre_interno" required>
</label>
```

- `type` puede ser `text`, `tel`, `email`, `date`, `number`, etc.
- `name` es el identificador que se usa en JavaScript. **Debe ser único.**
- `required` hace que el campo sea obligatorio. Se puede omitir si es opcional.

### 5.2. Agregar el campo en el PDF — `script.js`

Ubicación: líneas 98-104

```js
const campos = [
  ["Emprendimiento", r.emprendimiento],
  ["Nombre completo", r.nombre],
  ["Cédula", r.cedula],
  ["Teléfono", r.telefono],
  ["Fecha", r.fecha],
];
```

Agregar una nueva línea con el formato `["Etiqueta", r.nombre_variable]`.

### 5.3. Agregar el campo en la función de submit — `script.js`

Ubicación: líneas 215-221

```js
const nombre = data.get("nombre").trim();
const cedula = data.get("cedula").trim();
// ... agregar acá:
const nuevaVariable = data.get("nombre_del_input").trim();
```

Y en la línea 222, agregarlo al objeto:

```js
ultimoRegistro = { nombre, cedula, emprendimiento, telefono, firma, fecha: fechaLarga, nuevaVariable };
```

### 5.4. Agregar el campo en el envío de correo — `script.js`

Ubicación: líneas 172-180

```js
body: JSON.stringify({
  _subject: "Nuevo consentimiento - " + registro.emprendimiento,
  nombre: registro.nombre,
  ... // agregar acá:
  nuevaVariable: registro.nuevaVariable,
}),
```

### 5.5. Agregar el campo en el comprobante imprimible — `index.html`

Ubicación: entre las líneas 136-147. Ejemplo:

```html
<p><strong>Nuevo campo:</strong> <span id="rNuevoCampo"></span></p>
```

Y en `mostrarConfirmacion()` en `script.js` (alrededor de la línea 198):

```js
document.getElementById("rNuevoCampo").textContent = registro.nuevaVariable;
```

### 5.6. Agregar el campo en la sección "Partes" (opcional)

Se puede agregar una línea en la tarjeta del cliente en `index.html` (líneas 41-44):

```html
<div class="party">
  <span class="party__tag">CLIENTE</span>
  <strong class="party__name" id="partyCliente">(completa tus datos)</strong>
  <span class="party__detail" id="partyDetalle">...</span>
</div>
```

---

## 6. Agregar o quitar ítems de autorización (checkboxes)

Cada checkbox está dentro de un `<li>` en `index.html` (líneas 72-101).

**Para agregar uno nuevo**, copiar esta estructura y pegarla dentro del `<ol>`:

```html
<li>
  <label class="check">
    <input type="checkbox" required>
    <span class="mark"></span>
    <span class="text">Texto de la nueva autorización.</span>
  </label>
</li>
```

**Para hacer un checkbox opcional**, simplemente sacar `required`:

```html
<input type="checkbox">   <!-- sin required -->
```

**Para quitar uno**, eliminar el bloque `<li>...</li>` completo.

> No se necesita modificar JavaScript ni CSS al agregar o quitar checkboxes.
> Solo se modifica el HTML y, si se desea, el texto legal del PDF y del
> comprobante imprimible.

---

## 7. Modificar el PDF que se descarga

El PDF se genera en la función `generarPDF(r)` dentro de `assets/script.js`
(líneas 29-153). Usa la librería [jsPDF](https://github.com/parallax/jsPDF).

### 7.1. Estructura del PDF

```
┌──────────────────────────────────────┐
│ FLUJO BASE                  Título   │  → Encabezado (líneas 38-53)
│ por David Castaño                    │
│ github.com/Davidcastanom             │
├──────────────────────────────────────┤
│ PARTES                               │  → Sección partes (líneas 60-83)
│ PRESTADOR  Flujo Base — David C.     │
│ CLIENTE    (nombre del cliente)      │
├──────────────────────────────────────┤
│ Datos del cliente                    │  → Campos (líneas 86-114)
│ Emprendimiento:  ...                 │
│ Nombre:          ...                 │
│ ...                                  │
├──────────────────────────────────────┤
│ (texto legal de la autorización)     │  → Cuerpo legal (líneas 116-131)
├──────────────────────────────────────┤
│ Firma digital:  (firma)              │  → Firma (líneas 133-144)
├──────────────────────────────────────┤
│ Generado desde github.com/...        │  → Footer (líneas 146-150)
└──────────────────────────────────────┘
```

### 7.2. Posiciones (coordenadas)

jsPDF usa coordenadas en milímetros desde la esquina superior izquierda:

- `margin = 20` (margen izquierdo)
- `col1 = 20` (columna izquierda para etiquetas)
- `col2 = 75` (columna derecha para valores)
- `colW = 170` (ancho del texto legal)

La variable `y` controla la posición vertical. Avanza con `y += N`.

### 7.3. Cambiar colores en el PDF

```js
doc.setTextColor(15, 76, 67);    // RGB: verde oscuro
doc.setDrawColor(200, 200, 200); // RGB: gris claro para líneas
```

### 7.4. Agregar/logos/imágenes

jsPDF permite agregar imágenes con `doc.addImage()`. Ideal para logos:

```js
doc.addImage(logoDataUrl, "PNG", 20, 15, 30, 10);
```

> El logo debe estar en formato base64 o URL. Se puede cargar desde el HTML
> usando `canvas` o pasando el base64 directamente.

---

## 8. Configurar el correo que recibe las copias

Único paso: abrir `assets/script.js` y cambiar la línea 5:

```js
const MI_CORREO = "esteban7005808@gmail.com"; // <-- PONER TU CORREO ACÁ
```

El envío usa [FormSubmit](https://formsubmit.co/) que es gratuito y no requiere
registro. Solo necesita un correo real.

### Confirmar el correo (paso obligatorio)

En el **primer envío** con un correo nuevo, FormSubmit envía un email de
verificación a esa dirección. **Hay que hacer clic en el enlace de
confirmación** para activar el envío. Sin ese paso los correos no se entregan.

> ✅ Revisá la bandeja de entrada y la carpeta de **spam/promociones**.
> Si no aparece, probá enviando el formulario una vez desde el sitio en vivo
> (no desde `file://`) para que FormSubmit genere el email de confirmación.

### Parámetros opcionales

Se pueden agregar al `body` del JSON en `enviarCorreo()`:

```js
_captcha: "false",          // desactiva el captcha
_template: "table",         // formato de tabla en el correo
_subject: "Nuevo consentimiento - " + registro.emprendimiento,  // asunto
```

### Solución de problemas

| Problema | Causa posible | Solución |
|---|---|---|
| No llega el correo | Email no confirmado en FormSubmit | Revisar spam, buscar el email de verificación de FormSubmit y hacer clic en el enlace |
| No llega el correo | Prueba desde `file://` (doble clic al HTML) | Abrir con un servidor local (`npx serve .`) o probar desde GitHub Pages |
| Error `Unexpected token <` | FormSubmit devolvió HTML en vez de JSON | Falta el header `Accept: application/json` o el email es inválido |
| El captcha bloquea | FormSubmit activa reCAPTCHA por defecto | Agregar `_captcha: "false"` al body del JSON |

---

## 9. Probar localmente

No se necesita servidor. Cualquier navegador puede abrir `index.html` directo:

```
Doble clic en index.html  →  Se abre en el navegador
```

El PDF se genera en el cliente (con jsPDF), así que funciona sin conexión a
Internet. El envío del correo sí requiere conexión.

Para probar cambios en vivo, se puede usar Live Server de VS Code o cualquier
servidor HTTP estático:

```bash
# Con Python (si está instalado):
python -m http.server 8000

# Con Node (si está instalado):
npx serve .
```

---

## 10. Publicar en GitHub Pages

### 10.1. Crear el repositorio

```bash
git init
git add -A
git commit -m "Primer commit"
```

### 10.2. Conectar con GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 10.3. Activar GitHub Pages

1. Ir a **Settings > Pages** del repositorio en GitHub.
2. En **Source**, seleccionar **Deploy from a branch**.
3. Branch: `main`, carpeta: `/ (root)`.
4. Guardar.

El sitio queda publicado en:
`https://TU_USUARIO.github.io/TU_REPOSITORIO/`

### 10.4. Actualizar

```bash
git add -A
git commit -m "Descripción del cambio"
git push
```

GitHub Pages se actualiza automáticamente en 1-2 minutos.

---

## 11. Ejemplos de personalización

### Ejemplo A: Consentimiento para uso de imagen

**index.html** — Título:
```html
<h1>Consentimiento para uso de imagen</h1>
```

**index.html** — Checkboxes:
```html
<li>
  <label class="check">
    <input type="checkbox" required>
    <span class="mark"></span>
    <span class="text">Autorizo la captura y publicación de fotografías y videos donde aparezco.</span>
  </label>
</li>
<li>
  <label class="check">
    <input type="checkbox" required>
    <span class="mark"></span>
    <span class="text">Entiendo que el material se usará únicamente para fines promocionales del evento.</span>
  </label>
</li>
<li>
  <label class="check">
    <input type="checkbox" optional>
    <span class="mark"></span>
    <span class="text">Acepto que mi nombre pueda ser mencionado junto al material publicado.</span>
  </label>
</li>
```

**script.js** — Texto legal del PDF:
```js
const texto =
  "El cliente arriba identificado autoriza a [Tu Marca] la captura, " +
  "uso y publicación de su imagen y voz en fotografías y videos con " +
  "fines promocionales, sin límite de tiempo ni territorio.";
```

### Ejemplo B: Afiliación a programa de membresía

**index.html** — Sección de datos adicionales:
```html
<label class="field">
  <span>Correo electrónico</span>
  <input type="email" name="correo" required>
</label>
<label class="field">
  <span>Plan seleccionado</span>
  <select name="plan" required>
    <option value="">Seleccioná un plan</option>
    <option value="basico">Básico</option>
    <option value="premium">Premium</option>
    <option value="vitalicio">Vitalicio</option>
  </select>
</label>
```

> Nota: los `<select>` también funcionan con el sistema de estilos actual.
> Solo hay que agregar los estilos correspondientes en CSS si se desea.

### Ejemplo C: Autorización de tratamiento de datos general

Se puede cambiar la sección "Partes" para que refleje dos empresas:

```html
<div class="party">
  <span class="party__tag">RESPONSABLE DEL TRATAMIENTO</span>
  <strong class="party__name">Empresa SAS</strong>
  <span class="party__detail">NIT 123.456.789-0</span>
  <span class="party__detail">contacto@empresa.com</span>
</div>
```

---

## Resumen rápido

| Qué querés hacer | Archivo | Líneas |
|---|---|---|
| Cambiar título y descripción | `index.html` | 22-27 |
| Cambiar los checkboxes | `index.html` | 72-101 |
| Cambiar la marca/prestador | `index.html` | 17-21, 35-39 |
| Cambiar colores | `assets/style.css` | 1-14 |
| Cambiar el texto del PDF | `assets/script.js` | 125-131 |
| Agregar un campo nuevo | `index.html` + `script.js` | varias |
| Cambiar el correo destino | `assets/script.js` | 5 |
| Cambiar el nombre del PDF | `assets/script.js` | 229 |
| Publicar cambios | `git push` | — |

---

*Documentación generada para el proyecto Flujo Base — David Castaño*
