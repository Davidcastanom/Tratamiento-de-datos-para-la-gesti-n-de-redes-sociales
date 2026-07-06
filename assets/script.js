/* ============================================================
   CONFIGURACIÓN EMAILJS
   1. Regístrate gratis en https://www.emailjs.com/
   2. Conecta un servicio (Gmail, Outlook, etc.)
   3. Crea una plantilla con estas variables:
      {{nombre}}, {{cedula}}, {{emprendimiento}},
      {{telefono}}, {{fecha}}, {{firma}}
   4. Reemplaza las 3 constantes de abajo
   ============================================================ */
const EMAILJS_PUBLIC_KEY  = "MgfeW0bf3AGad7zir";   // User ID (en Settings → API Keys)
const EMAILJS_SERVICE_ID  = "service_2ge726w";   // Service ID (en Email Services)
const EMAILJS_TEMPLATE_ID = "service_2ge726w";  // Template ID (en Email Templates)

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

let ultimoRegistro = null;

// ─── Generar PDF con jsPDF ────────────────────────────
function generarPDF(r) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("Comprobante de autorización", 105, 20, { align: "center" });

  doc.setDrawColor(15, 76, 67);
  doc.setLineWidth(0.5);
  doc.line(20, 27, 190, 27);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const campos = [
    ["Emprendimiento", r.emprendimiento],
    ["Nombre completo", r.nombre],
    ["Cédula", r.cedula],
    ["Teléfono", r.telefono],
    ["Fecha", r.fecha],
    ["Firma digital", r.firma],
  ];

  let y = 38;
  campos.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 65, y);
    y += 8;
  });

  y += 6;
  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFontSize(9.5);
  const texto =
    "La persona arriba identificada autorizó la recuperación, " +
    "actualización y gestión de sus cuentas de Facebook e Instagram, " +
    "incluyendo el manejo confidencial de credenciales y la conservación " +
    "de contactos y seguidores existentes.";
  const lines = doc.splitTextToSize(texto, 170);
  doc.text(lines, 20, y);

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

// ─── Enviar copia por EmailJS ─────────────────────────
async function enviarCorreo(registro) {
  if (!window.emailjs) return;
  const datos = {
    nombre:       registro.nombre,
    cedula:       registro.cedula,
    emprendimiento: registro.emprendimiento,
    telefono:     registro.telefono,
    fecha:        registro.fecha,
    firma:        registro.firma,
  };
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, datos, EMAILJS_PUBLIC_KEY);
}

// ─── Mostrar/ocultar vistas ───────────────────────────
function mostrarFormulario() {
  doneView.style.display = "none";
  formView.style.display = "";
  formView.hidden = false;
  doneView.hidden = true;
}

function mostrarConfirmacion(registro) {
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

  try {
    const pdfBlob = generarPDF(ultimoRegistro);
    descargarPDF(pdfBlob, `consentimiento-${nombre.replace(/\s+/g, "-")}.pdf`);
    await enviarCorreo(ultimoRegistro);
  } catch {
    // Si el correo falla, el cliente igual descargó el PDF
  } finally {
    generarBtn.disabled = false;
    generarBtn.textContent = "Confirmar y descargar";
    mostrarConfirmacion(ultimoRegistro);
  }
});

volverBtn.addEventListener("click", () => {
  mostrarFormulario();
  form.reset();
  fechaHoy.textContent = fechaLarga;
});

descargarBtn.addEventListener("click", () => {
  if (ultimoRegistro) {
    const blob = generarPDF(ultimoRegistro);
    descargarPDF(blob, `consentimiento-${ultimoRegistro.nombre.replace(/\s+/g, "-")}.pdf`);
  }
});
