# Consentimiento para gestión de redes sociales

Formulario web simple (HTML + CSS + JS, sin backend) para que tu cliente
autorice desde su celular la recuperación y gestión de sus cuentas de
Facebook e Instagram. Diseñado como **contrato bilateral** entre el
prestador del servicio y el cliente.

**Sitio en vivo:** https://davidcastanom.github.io/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales/

## Funcionalidades

| Funcionalidad | Detalle |
|---|---|
| **Contrato bilateral** | Muestra ambas partes (prestador + cliente) en pantalla y en el PDF |
| **Branding del prestador** | Barra con nombre, autor y enlace a GitHub |
| **Vista previa en vivo** | El nombre del cliente se actualiza al escribir en "Partes" |
<<<<<<< HEAD
| **PDF profesional** | Comprobante con logo, partes, datos, texto legal y firma escrita |
| **Firma digital** | Pad de dibujo táctil + mouse, se incrusta como imagen en el PDF |
=======
| **PDF profesional** | Comprobante con logo, partes, datos, texto legal y firma digital |
| **Firma digital** | Campo de texto, se envía como dato textual al correo y al PDF |
>>>>>>> ea7b2e7 (docs: update README signature description to text)
| **Auto-descarga + botón manual** | El PDF se descarga solo a los 2 segundos, con botón de respaldo |
| **Copia por correo** | Llega un email al prestador con todos los datos vía Web3Forms |
| **Responsive mobile-first** | Funciona en celulares, tablets y escritorio |
| **Comprobante imprimible** | Oculto en pantalla, visible al imprimir (Ctrl+P) |
| **Sin backend** | Todo corre en el navegador, no necesita servidor ni base de datos |
| **Sin registros de pago** | Web3Forms es gratis (250 envíos/mes), jsPDF funciona offline |

## Uso rápido

1. Registrate gratis en **[web3forms.com](https://web3forms.com)** y copiá tu Access Key.
2. Abrí `assets/script.js`, línea 7, y pegá la Access Key.
3. Abrí `index.html` en el navegador para probar.
4. Subí a GitHub Pages para tenerlo en línea.

## Personalización

▶ **[DOCUMENTACION.md](./DOCUMENTACION.md)** — manual paso a paso para
adaptar el formulario a cualquier tipo de autorización (uso de imagen,
afiliación, tratamiento de datos general, etc.).

## Estructura

```
consentimiento-redes/
├── index.html            →  Formulario y estructura
├── assets/
│   ├── style.css         →  Estilos responsive (mobile-first)
│   └── script.js         →  Lógica: PDF, correo, validación
├── DOCUMENTACION.md      →  Manual de personalización
└── README.md
```

## Tecnologías

- HTML5 + CSS3 (vanilla, mobile-first)
- JavaScript (vanilla)
- [jsPDF](https://github.com/parallax/jsPDF) — PDF en el navegador
- [Web3Forms](https://web3forms.com) — envío de correos (gratis, 250/mes)
- GitHub Pages — hosting

## Repositorio

```bash
git clone https://github.com/Davidcastanom/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales.git
```
