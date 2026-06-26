function guardarEvaluacion() {

    const proveedor = document.getElementById("proveedor").value.trim();
    const tiempo = parseFloat(document.getElementById("tiempo").value);
    const calidad = parseFloat(document.getElementById("calidad").value);
    const cumplimiento = parseFloat(document.getElementById("cumplimiento").value);
    const precio = parseFloat(document.getElementById("precio").value);

    if (
        proveedor === "" ||
        isNaN(tiempo) ||
        isNaN(calidad) ||
        isNaN(cumplimiento) ||
        isNaN(precio)
    ) {
        alert("Complete todos los campos");
        return;
    }

    const total = (
        tiempo +
        calidad +
        cumplimiento +
        precio
    ) / 4;

    if (filaEditando) {

        filaEditando.innerHTML = `
            <td>${proveedor}</td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${tiempo * 10}%"></div>
                </div>
                ${tiempo}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${calidad * 10}%"></div>
                </div>
                ${calidad}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${cumplimiento * 10}%"></div>
                </div>
                ${cumplimiento}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${precio * 10}%"></div>
                </div>
                ${precio}
            </td>

            <td>${total.toFixed(1)}</td>

            <td>
                <button class="btn btn-warning btn-sm btnEditar">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="btn btn-danger btn-sm btnEliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        filaEditando = null;

    } else {

        const tbody = document.querySelector("#tablaEvaluaciones tbody");

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${proveedor}</td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${tiempo * 10}%"></div>
                </div>
                ${tiempo}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${calidad * 10}%"></div>
                </div>
                ${calidad}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${cumplimiento * 10}%"></div>
                </div>
                ${cumplimiento}
            </td>

            <td>
                <div class="progress">
                    <div class="progress-bar" style="width:${precio * 10}%"></div>
                </div>
                ${precio}
            </td>

            <td>${total.toFixed(1)}</td>

            <td>
                <button class="btn btn-warning btn-sm btnEditar">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="btn btn-danger btn-sm btnEliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(fila);
    }

    actualizarPromedios();

    document.getElementById("proveedor").value = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("calidad").value = "";
    document.getElementById("cumplimiento").value = "";
    document.getElementById("precio").value = "";

    bootstrap.Modal.getInstance(
        document.getElementById("modalEvaluacion")
    ).hide();
}

document.addEventListener("click", (e) => {

    if (e.target.closest(".btnEliminar")) {

        if (confirm("¿Eliminar evaluación?")) {

            e.target.closest("tr").remove();

            actualizarPromedios();
        }
    }

    if (e.target.closest(".btnEditar")) {

        filaEditando = e.target.closest("tr");

        document.getElementById("proveedor").value =
            filaEditando.cells[0].textContent.trim();

        document.getElementById("tiempo").value =
            parseFloat(filaEditando.cells[1].textContent);

        document.getElementById("calidad").value =
            parseFloat(filaEditando.cells[2].textContent);

        document.getElementById("cumplimiento").value =
            parseFloat(filaEditando.cells[3].textContent);

        document.getElementById("precio").value =
            parseFloat(filaEditando.cells[4].textContent);

        new bootstrap.Modal(
            document.getElementById("modalEvaluacion")
        ).show();
    }

});

let filaEditando = null;

document.addEventListener("DOMContentLoaded", () => {

    actualizarPromedios();

    document
        .getElementById("guardarEvaluacion")
        .addEventListener("click", guardarEvaluacion);

});