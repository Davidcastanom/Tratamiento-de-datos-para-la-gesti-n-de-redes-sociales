/* ============================================================
   CONFIGURA AQUÍ
   Reemplaza con tu número de WhatsApp completo, con código de
   país y sin espacios, signos ni el símbolo "+".
   Ejemplo Colombia: 57 más el número -> "573001234567"
   ============================================================ */
const NUMERO_WHATSAPP = "573001234567";

const form = document.getElementById("consentForm");
const formView = document.getElementById("formView");
const doneView = document.getElementById("doneView");
const fechaHoy = document.getElementById("fechaHoy");
const stampFecha = document.getElementById("stampFecha");
const doneNombre = document.getElementById("doneNombre");
const volverBtn = document.getElementById("volverBtn");
const descargarBtn = document.getElementById("descargarBtn");

const hoy = new Date();
const fechaLarga = hoy.toLocaleDateString("es-CO", {
  day: "numeric", month: "long", year: "numeric",
});
fechaHoy.textContent = fechaLarga;

let ultimoRegistro = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const nombre = data.get("nombre").trim();
  const cedula = data.get("cedula").trim();
  const emprendimiento = data.get("emprendimiento").trim();
  const telefono = data.get("telefono").trim();
  const firma = data.get("firma").trim();

  ultimoRegistro = { nombre, cedula, emprendimiento, telefono, firma, fecha: fechaLarga };

  const mensaje =
`*Autorización de gestión de redes sociales*

Yo, ${nombre} (C.C. ${cedula}), en representación de "${emprendimiento}", autorizo a recuperar, actualizar y gestionar mis cuentas de Facebook e Instagram, incluyendo el manejo confidencial de mis credenciales, conservando mis contactos y seguidores actuales.

Teléfono de contacto: ${telefono}
Fecha: ${fechaLarga}
Firma digital: ${firma}`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  mostrarConfirmacion(ultimoRegistro);
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
