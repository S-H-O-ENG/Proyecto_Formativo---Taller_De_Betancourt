document.addEventListener("DOMContentLoaded", () => {
    const formProducto = document.getElementById("formProducto");
    const tablaProductos = document.getElementById("tablaProductos");

    formProducto.addEventListener("submit", (e) => {
        
        e.preventDefault();

        const id = document.getElementById("prodId").value;
        const nombre = document.getElementById("prodNombre").value;
        const cantidad = parseInt(document.getElementById("prodCantidad").value);

      
        let estado = "";
        let claseBadge = "";

        if (cantidad === 0) {
            estado = "Sin Stock";
            claseBadge = "bg-danger";
        } else if (cantidad <= 5) { 
            estado = "Bajo Stock";
            claseBadge = "bg-warning text-dark";
        } else {
            estado = "Activo";
            claseBadge = "bg-success";
        }

        
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td><span class="badge ${claseBadge}">${estado}</span></td>
            <td>
            <a href="/pages/pedidos.html" class="btn btn-sm btn-solicitar">
                    <i class="fa-solid fa-plus me-1"></i>Solicitar
            <a/>
            </td>
        `;

       
        let tbody = tablaProductos.querySelector("tbody");
        if (!tbody) {
            tbody = document.createElement("tbody");
            tablaProductos.appendChild(tbody);
        }
        tbody.appendChild(nuevaFila);

     
        formProducto.reset();

        
        const modalElement = document.getElementById("modalProducto");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    });
});