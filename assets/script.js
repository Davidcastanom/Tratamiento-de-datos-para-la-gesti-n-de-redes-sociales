/* ============================================================
   CONFIGURACIÓN
   1. Registrate gratis en https://web3forms.com
   2. Copiá tu Access Key (la recibís por email)
   3. Pegala abajo
   ============================================================ */
const ACCESS_KEY = "82b98f57-2405-42e4-961f-806433a2f1fb"; // <-- WEB3FORMS ACCESS KEY

const form = document.getElementById("consentForm");
const formView = document.getElementById("formView");
const doneView = document.getElementById("doneView");
const fechaHoy = document.getElementById("fechaHoy");
const stampFecha = document.getElementById("stampFecha");
const doneNombre = document.getElementById("doneNombre");
const volverBtn = document.getElementById("volverBtn");
const descargarBtn = document.getElementById("descargarBtn");
const generarBtn = document.querySelector(".submit-btn");

const hoy = new Date();
const fechaLarga = hoy.toLocaleDateString("es-CO", {
  day: "numeric", month: "long", year: "numeric",
});
fechaHoy.textContent = fechaLarga;

const PRESTADOR = "Flujo Base — David Castaño";
const GITHUB_URL = "github.com/Davidcastanom";

let ultimoRegistro = null;

// ─── Generar PDF con jsPDF ────────────────────────────
function generarPDF(r) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageW = 210;
  const margin = 20;
  const col1 = margin;
  const col2 = 75;
  const colW = 170;

  // ── Encabezado ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 76, 67);
  doc.text("FLUJO BASE", col1, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("por David Castaño", col1, 26);
  doc.text("github.com/Davidcastanom", col1, 31);

  // ── Título ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(23, 38, 31);
  doc.text("Comprobante de autorización", pageW / 2, 26, { align: "center" });

  // ── Línea ──
  doc.setDrawColor(15, 76, 67);
  doc.setLineWidth(0.5);
  doc.line(margin, 36, pageW - margin, 36);

  // ── Partes del contrato ──
  let y = 46;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(181, 72, 46);
  doc.text("PARTES", margin, y);
  y += 6;

  // Prestador
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 76, 67);
  doc.text("PRESTADOR", col1, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(23, 38, 31);
  doc.text("Flujo Base — David Castaño", col1 + 28, y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 76, 67);
  doc.text("CLIENTE", col1, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(23, 38, 31);
  doc.text(r.nombre, col1 + 28, y);

  y += 12;

  // ── Datos del cliente ──
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 76, 67);
  doc.text("Datos del cliente", margin, y);
  y += 7;

  doc.setFontSize(9.5);
  const campos = [
    ["Emprendimiento", r.emprendimiento],
    ["Nombre completo", r.nombre],
    ["Cédula", r.cedula],
    ["Teléfono", r.telefono],
    ["Fecha", r.fecha],
  ];

  campos.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100);
    doc.text(`${label}:`, col1, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(23, 38, 31);
    doc.text(value, col2, y);
    y += 7;
  });

  // ── Cuerpo legal ──
  y += 6;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(74, 88, 79);
  const texto =
    "El cliente arriba identificado autoriza a Flujo Base (David Castaño) " +
    "la recuperación, actualización y gestión de sus cuentas de Facebook " +
    "e Instagram, incluyendo el manejo confidencial de sus credenciales " +
    "y la conservación de contactos y seguidores existentes.";
  const lines = doc.splitTextToSize(texto, colW);
  doc.text(lines, margin, y);

  // ── Firma ──
  y += lines.length * 5 + 10;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(100);
  doc.text("Firma digital:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(23, 38, 31);
  doc.text(r.firma, 55, y);

  // ── Footer ──
  y += 12;
  doc.setFontSize(8);
  doc.setTextColor(180);
  doc.text("Generado desde " + GITHUB_URL, margin, y);

  return doc.output("blob");
}

// ─── Descargar PDF automáticamente ────────────────────
function descargarPDF(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─── Enviar copia por Web3Forms (gratis, 250/mes) ──────
async function enviarCorreo(registro) {
  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: "Nuevo consentimiento - " + registro.emprendimiento,
      from_name: registro.nombre,
      nombre: registro.nombre,
      cedula: registro.cedula,
      emprendimiento: registro.emprendimiento,
      telefono: registro.telefono,
      fecha: registro.fecha,
      firma: registro.firma,
    }),
  });
  const data = await resp.json();
  if (!data.success) {
    throw new Error(data.message || "Error al enviar el correo");
  }
}

// ─── Mostrar/ocultar vistas ───────────────────────────
function mostrarFormulario() {
  doneView.style.display = "none";
  formView.style.display = "";
  formView.hidden = false;
  doneView.hidden = true;
}

function mostrarConfirmacion(registro, correoExitoso) {
  formView.style.display = "none";
  doneView.style.display = "";
  formView.hidden = true;
  doneView.hidden = false;

  document.getElementById("rEmprendimiento").textContent = registro.emprendimiento;
  document.getElementById("rNombre").textContent = registro.nombre;
  document.getElementById("rCedula").textContent = registro.cedula;
  document.getElementById("rTelefono").textContent = registro.telefono;
  document.getElementById("rFecha").textContent = registro.fecha;
  document.getElementById("rFirma").textContent = registro.firma;

  doneNombre.textContent = registro.nombre;
  stampFecha.textContent = registro.fecha;

  const statusCorreo = document.getElementById("correoStatus");
  if (statusCorreo) {
    if (correoExitoso) {
      statusCorreo.textContent = "Te llegará una copia a tu correo electrónico.";
      statusCorreo.style.color = "var(--ink-soft)";
    } else {
      statusCorreo.textContent = "⚠ No se pudo enviar la copia por correo. El PDF se descargó igual.";
      statusCorreo.style.color = "var(--accent)";
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Submit ───────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const nombre = data.get("nombre").trim();
  const cedula = data.get("cedula").trim();
  const emprendimiento = data.get("emprendimiento").trim();
  const telefono = data.get("telefono").trim();
  const firma = data.get("firma").trim();

  ultimoRegistro = { nombre, cedula, emprendimiento, telefono, firma, fecha: fechaLarga };

  generarBtn.disabled = true;
  generarBtn.textContent = "Procesando…";

  let correoOk = false;
  try {
    const pdfBlob = generarPDF(ultimoRegistro);
    descargarPDF(pdfBlob, `consentimiento-${nombre.replace(/\s+/g, "-")}.pdf`);
    await enviarCorreo(ultimoRegistro);
    correoOk = true;
  } catch (err) {
    console.warn("FormSubmit:", err.message || err);
  } finally {
    generarBtn.disabled = false;
    generarBtn.textContent = "Confirmar y descargar";
    mostrarConfirmacion(ultimoRegistro, correoOk);
  }
});

volverBtn.addEventListener("click", () => {
  mostrarFormulario();
  form.reset();
  fechaHoy.textContent = fechaLarga;
  document.getElementById("partyCliente").textContent = "(completa tus datos)";
});

// ─── Actualizar el nombre del cliente en "Partes" en vivo ──
document.querySelector('input[name="nombre"]').addEventListener("input", function () {
  document.getElementById("partyCliente").textContent = this.value.trim() || "(completa tus datos)";
});

descargarBtn.addEventListener("click", () => {
  if (ultimoRegistro) {
    const blob = generarPDF(ultimoRegistro);
    descargarPDF(blob, `consentimiento-${ultimoRegistro.nombre.replace(/\s+/g, "-")}.pdf`);
  }
});
