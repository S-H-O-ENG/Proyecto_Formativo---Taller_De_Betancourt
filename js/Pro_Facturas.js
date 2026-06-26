const tabla = document.querySelector("tbody");
const tarjetas = document.querySelectorAll(".resumen-card h2");

const modal = document.getElementById("modalFactura");
const btnAbrir = document.getElementById("abrirModal");
const btnCerrar = document.getElementById("cerrar");
const form = document.getElementById("formFactura");


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

function actualizarResumen() {

    let porPagar = 0;
    let pagadas = 0;
    let totalFacturas = 0;

    const filas = tabla.querySelectorAll("tr");

    filas.forEach(fila => {

        totalFacturas++;

        let monto = fila.cells[4].textContent
            .replace("$", "")
            .replace(/\./g, "")
            .replace(/,/g, "")
            .trim();

        monto = Number(monto);

        const estadoPago = fila.cells[6].textContent.trim();

        if (estadoPago === "Pagada") {
            pagadas += monto;
        } else {
            porPagar += monto;
        }
    });

    tarjetas[0].textContent = "$" + porPagar.toLocaleString();
    tarjetas[1].textContent = "$" + pagadas.toLocaleString();
    tarjetas[2].textContent = totalFacturas;
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
            <span class="badge bg-warning text-dark">Pendiente</span>
        </td>

        <td>
            <button class="btn btn-success btn-sm btn-pagar">
                Marcar pagada
            </button>
        </td>
    `;

    tabla.appendChild(fila);

    const btnPagar = fila.querySelector(".btn-pagar");
    const celdaPago = fila.querySelector(".estado-pago");

    btnPagar.addEventListener("click", () => {

        celdaPago.innerHTML = `<span class="badge bg-success">Pagada</span>`;
        btnPagar.disabled = true;
        btnPagar.textContent = "Pagada";

        actualizarResumen();
    });

    actualizarResumen();
}

function filtrarFacturas(tipo) {

    const filas = tabla.querySelectorAll("tr");

    filas.forEach(fila => {

        const estado = fila.cells[6].textContent.trim();

        if (tipo === "todas") {
            fila.style.display = "";
        }

        else if (tipo === "pagadas") {
            fila.style.display = (estado === "Pagada") ? "" : "none";
        }

        else if (tipo === "pendientes") {
            fila.style.display = (estado !== "Pagada") ? "" : "none";
        }
    });
}