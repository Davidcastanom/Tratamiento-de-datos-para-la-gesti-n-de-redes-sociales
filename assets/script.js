/* ============================================================
   CONFIGURA AQUÍ
   Reemplaza con tu número de WhatsApp completo, con código de
   país y sin espacios, signos ni el símbolo "+".
   Ejemplo Colombia: 57 más el número -> "573001234567"
   ============================================================ */
const NUMERO_WHATSAPP = "573113231038";

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

// ─── Subir PDF a file.io ──────────────────────────────
async function subirPDF(blob) {
  const fd = new FormData();
  fd.append("file", blob, "consentimiento-redes.pdf");

  const res = await fetch("https://file.io", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error("file.io no aceptó el archivo");
  return data.link;
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

  // Abrir ventana (se abre vacía para esquivar el bloqueo de popup)
  const popup = window.open("", "_blank");

  generarBtn.disabled = true;
  generarBtn.textContent = "Generando PDF…";

  // Función para lanzar WhatsApp (con o sin link)
  const abrirWhatsApp = (url) => {
    if (popup && !popup.closed) {
      popup.location.href = url;
    } else {
      window.location.href = url;
    }
  };

  const msgBase = (link) => {
    const cuerpo =
`*Autorización de gestión de redes sociales*

Yo, ${nombre} (C.C. ${cedula}), en representación de "${emprendimiento}", autorizo a recuperar, actualizar y gestionar mis cuentas de Facebook e Instagram, incluyendo el manejo confidencial de mis credenciales, conservando mis contactos y seguidores actuales.

Teléfono de contacto: ${telefono}
Fecha: ${fechaLarga}
Firma digital: ${firma}`;
    return link ? `${cuerpo}\n\n📄 Copia digital: ${link}` : cuerpo;
  };

  try {
    const pdfBlob = generarPDF(ultimoRegistro);
    const pdfUrl = await subirPDF(pdfBlob);
    abrirWhatsApp(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msgBase(pdfUrl))}`);
  } catch {
    abrirWhatsApp(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msgBase(null))}`);
  } finally {
    generarBtn.disabled = false;
    generarBtn.textContent = "Confirmar y enviar por WhatsApp";
    mostrarConfirmacion(ultimoRegistro);
  }
});

function mostrarConfirmacion(registro) {
  document.getElementById("rEmprendimiento").textContent = registro.emprendimiento;
  document.getElementById("rNombre").textContent = registro.nombre;
  document.getElementById("rCedula").textContent = registro.cedula;
  document.getElementById("rTelefono").textContent = registro.telefono;
  document.getElementById("rFecha").textContent = registro.fecha;
  document.getElementById("rFirma").textContent = registro.firma;

  doneNombre.textContent = registro.nombre;
  stampFecha.textContent = registro.fecha;

  formView.hidden = true;
  doneView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

volverBtn.addEventListener("click", () => {
  doneView.hidden = true;
  formView.hidden = false;
  form.reset();
  fechaHoy.textContent = fechaLarga;
});

descargarBtn.addEventListener("click", () => {
  window.print();
});
