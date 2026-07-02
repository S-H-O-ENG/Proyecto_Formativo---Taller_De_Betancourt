const tabla = document.querySelector("tbody");
const tarjetas = document.querySelectorAll(".resumen-card h2");

const modal = document.getElementById("modalFactura");
const btnAbrir = document.getElementById("abrirModal");
const btnCerrar = document.getElementById("cerrar");
const form = document.getElementById("formFactura");

// Manejo del Menú Hamburguesa Lateral
document.addEventListener("DOMContentLoaded", () => {
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const sidebar = document.getElementById("sidebar");
    
    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }
});

btnAbrir.addEventListener("click", () => {
    modal.style.display = "block";
});

btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// ... El resto de tus funciones de cálculo de facturas se mantiene intacto ...
function actualizarResumen() {
    let porPagar = 0;
    let pagadas = 0;
    let totalFacturas = 0;

    const filas = tabla.querySelectorAll("tr");
    filas.forEach(fila => {
        totalFacturas++;
        let monto = fila.cells[4].textContent
            .replace("$", "").replace(/\./g, "").replace(/,/g, "").trim();
        monto = Number(monto);
        const estadoPago = fila.cells[5] ? fila.cells[5].textContent.trim() : "";

        if (estadoPago === "Pagada") {
            pagadas += monto;
        } else {
            porPagar += monto;
        }
    });

    if(tarjetas.length >= 3) {
        tarjetas[0].textContent = "$" + porPagar.toLocaleString();
        tarjetas[1].textContent = "$" + pagadas.toLocaleString();
        tarjetas[2].textContent = totalFacturas;
    }
}

actualizarResumen();

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const numero = document.getElementById("numero").value;
    const proveedor = document.getElementById("proveedor").value;
    const orden = document.getElementById("orden").value;
    const fecha = document.getElementById("fecha").value;
    const monto = document.getElementById("monto").value;

    agregarFactura(numero, proveedor, orden, fecha, monto);
    form.reset();
    modal.style.display = "none";
});

function agregarFactura(numero, proveedor, orden, fecha, monto) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${numero}</td>
        <td>${proveedor}</td>
        <td>${orden}</td>
        <td>${fecha}</td>
        <td>$${Number(monto).toLocaleString()}</td>
        <td class="estado-pago">
            <span class="badge amarillo">Pendiente</span>
        </td>
        <td>
            <button class="btn btn-pagar" style="padding: 6px 12px; font-size:13px;">
                Marcar pagada
            </button>
        </td>
    `;
    tabla.appendChild(fila);

    const btnPagar = fila.querySelector(".btn-pagar");
    const celdaPago = fila.querySelector(".estado-pago");

    btnPagar.addEventListener("click", () => {
        celdaPago.innerHTML = `<span class="badge verde">Pagada</span>`;
        btnPagar.disabled = true;
        btnPagar.textContent = "Pagada";
        actualizarResumen();
    });

    actualizarResumen();
}