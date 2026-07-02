let filaEditando = null;

document.addEventListener("DOMContentLoaded", () => {
    actualizarPromedios();

    document.getElementById("guardarEvaluacion")
        .addEventListener("click", guardarEvaluacion);

    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const sidebar = document.getElementById("sidebar");
    
    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }
});

function guardarEvaluacion() {
    const proveedor = document.getElementById("proveedor").value.trim();
    const tiempo = parseFloat(document.getElementById("tiempo").value);
    const calidad = parseFloat(document.getElementById("calidad").value);
    const cumplimiento = parseFloat(document.getElementById("cumplimiento").value);
    const precio = parseFloat(document.getElementById("precio").value);

    if (proveedor === "" || isNaN(tiempo) || isNaN(calidad) || isNaN(cumplimiento) || isNaN(precio)) {
        alert("Complete todos los campos");
        return;
    }

    const total = ((tiempo + calidad + cumplimiento + precio) / 4).toFixed(1);

    if (filaEditando) {
        filaEditando.innerHTML = crearFila(proveedor, tiempo, calidad, cumplimiento, precio, total);
        filaEditando = null;
    } else {
        const tbody = document.querySelector("#tablaEvaluaciones tbody");
        const fila = document.createElement("tr");
        fila.innerHTML = crearFila(proveedor, tiempo, calidad, cumplimiento, precio, total);
        tbody.appendChild(fila);
    }

    actualizarPromedios();

    document.getElementById("proveedor").value = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("calidad").value = "";
    document.getElementById("cumplimiento").value = "";
    document.getElementById("precio").value = "";

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEvaluacion"));
    if (modal) { modal.hide(); }
}

function crearFila(proveedor, tiempo, calidad, cumplimiento, precio, total) {
    return `
        <td>${proveedor}</td>
        <td>
            <div class="progress"><div class="progress-bar" style="width:${tiempo * 10}%"></div></div>
            ${tiempo}
        </td>
        <td>
            <div class="progress"><div class="progress-bar" style="width:${calidad * 10}%"></div></div>
            ${calidad}
        </td>
        <td>
            <div class="progress"><div class="progress-bar" style="width:${cumplimiento * 10}%"></div></div>
            ${cumplimiento}
        </td>
        <td>
            <div class="progress"><div class="progress-bar" style="width:${precio * 10}%"></div></div>
            ${precio}
        </td>
        <td>${total}</td>
        <td>
            <button class="btn btn-warning btn-sm btnEditar"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger btn-sm btnEliminar"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
}

function actualizarPromedios() {
    const filas = document.querySelectorAll("#tablaEvaluaciones tbody tr");
    if (filas.length === 0) {
        document.getElementById("promTiempo").textContent = "0 /10";
        document.getElementById("promCalidad").textContent = "0 /10";
        document.getElementById("promCumplimiento").textContent = "0 /10";
        return;
    }

    let sumaTiempo = 0, sumaCalidad = 0, sumaCumplimiento = 0;
    filas.forEach(fila => {
        sumaTiempo += Number(fila.cells[1].textContent.trim());
        sumaCalidad += Number(fila.cells[2].textContent.trim());
        sumaCumplimiento += Number(fila.cells[3].textContent.trim());
    });

    document.getElementById("promTiempo").textContent = (sumaTiempo / filas.length).toFixed(1) + " /10";
    document.getElementById("promCalidad").textContent = (sumaCalidad / filas.length).toFixed(1) + " /10";
    document.getElementById("promCumplimiento").textContent = (sumaCumplimiento / filas.length).toFixed(1) + " /10";
}

document.addEventListener("click", function (e) {
    if (e.target.closest(".btnEliminar")) {
        if (confirm("¿Desea eliminar esta evaluación?")) {
            e.target.closest("tr").remove();
            actualizarPromedios();
        }
    }

    if (e.target.closest(".btnEditar")) {
        filaEditando = e.target.closest("tr");
        document.getElementById("proveedor").value = filaEditando.cells[0].textContent.trim();
        document.getElementById("tiempo").value = parseFloat(filaEditando.cells[1].textContent);
        document.getElementById("calidad").value = parseFloat(filaEditando.cells[2].textContent);
        document.getElementById("cumplimiento").value = parseFloat(filaEditando.cells[3].textContent);
        document.getElementById("precio").value = parseFloat(filaEditando.cells[4].textContent);

        const modal = new bootstrap.Modal(document.getElementById("modalEvaluacion"));
        modal.show();
    }
});