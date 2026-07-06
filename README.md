# Consentimiento para gestión de redes sociales

Formulario web simple (HTML + CSS + JS, sin backend) para que tu cliente
autorice, desde su celular, la recuperación y gestión de sus cuentas de
Facebook e Instagram. Al confirmar, se descarga un comprobante en PDF y
te llega una copia por correo electrónico.

**Sitio en vivo:** https://davidcastanom.github.io/Tratamiento-de-datos-para-la-gesti-n-de-redes-sociales/

## Uso rápido

1. Registrate gratis en **[web3forms.com](https://web3forms.com)** y copiá tu Access Key.
2. Abrí `assets/script.js` y pegá la Access Key en la línea 5.
3. Abrí `index.html` en el navegador para probar.
4. Subí a GitHub Pages para tenerlo en línea.

## Documentación completa

▶ **Para personalizar el formulario** (cambiar el tipo de consentimiento,
agregar campos, modificar colores, editar el PDF, etc.) leé:

➡ **[DOCUMENTACION.md](./DOCUMENTACION.md)** — manual paso a paso con
ejemplos y referencia línea por línea.

## Estructura

```
consentimiento-redes/
├── index.html            →  Formulario
├── assets/
│   ├── style.css         →  Estilos responsive
│   └── script.js         →  Lógica (PDF, correo, validación)
├── DOCUMENTACION.md      →  Manual de personalización
├── README.md
└── .gitignore
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
