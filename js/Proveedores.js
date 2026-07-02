let tabla;
let contador = 1;
let filaEditar = null;

$(document).ready(function () {

    tabla = $("#tablaProveedores").DataTable({
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay proveedores registrados",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });

    agregarProveedor(
        "Distribuciones Andina SAS",
        "3104567890",
        "contacto@andina.com",
        "Bogotá",
        "Activo"
    );

    agregarProveedor(
        "Comercial ABC",
        "3204561234",
        "ventas@abc.com",
        "Medellín",
        "Pendiente"
    );

    actualizarContadores();
});

function crearBadge(estado){

    if(estado==="Activo"){

        return '<span class="badge bg-success">Activo</span>';

    }

    if(estado==="Pendiente"){

        return '<span class="badge bg-warning text-dark">Pendiente</span>';

    }

    return '<span class="badge bg-danger">Inactivo</span>';

}

function botonesAcciones(){

    return `
        <button class="btn btn-warning btn-sm btn-editar me-1">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="btn btn-danger btn-sm btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

}

function agregarProveedor(nombre,telefono,correo,ciudad,estado){

    tabla.row.add([

        String(contador).padStart(3,"0"),

        nombre,

        telefono,

        correo,

        ciudad,

        crearBadge(estado),

        botonesAcciones()

    ]).draw(false);

    contador++;

}

function actualizarContadores(){

    let total = tabla.rows().count();

    let activos = 0;

    let pendientes = 0;

    tabla.rows().every(function(){

        let datos = this.data();

        let estado = $("<div>"+datos[5]+"</div>").text().trim();

        if(estado==="Activo") activos++;

        if(estado==="Pendiente") pendientes++;

    });

    $("#total").text(total);

    $("#activos").text(activos);

    $("#pendientes").text(pendientes);

}

$("#tablaProveedores tbody").on("click",".btn-eliminar",function(){

    if(confirm("¿Desea eliminar este proveedor?")){

        tabla.row($(this).parents("tr")).remove().draw();

        actualizarContadores();

    }

});

$("#tablaProveedores tbody").on("click",".btn-editar",function(){

    filaEditar = tabla.row($(this).parents("tr"));

    let datos = filaEditar.data();

    $("#proveedor").val(datos[1]);

    $("#telefono").val(datos[2]);

    $("#correo").val(datos[3]);

    $("#ciudad").val(datos[4]);

    $("#estado").val($("<div>"+datos[5]+"</div>").text());

    new bootstrap.Modal(
        document.getElementById("modalProveedor")
    ).show();

});

$("#guardarProveedor").on("click",function(){

    let proveedor = $("#proveedor").val().trim();

    let telefono = $("#telefono").val().trim();

    let correo = $("#correo").val().trim();

    let ciudad = $("#ciudad").val().trim();

    let estado = $("#estado").val();

    if(

        proveedor===""

        || telefono===""

        || correo===""

        || ciudad===""

    ){

        alert("Complete todos los campos.");

        return;

    }

    let fila=[

        filaEditar
        ? filaEditar.data()[0]
        : String(contador).padStart(3,"0"),

        proveedor,

        telefono,

        correo,

        ciudad,

        crearBadge(estado),

        botonesAcciones()

    ];

    if(filaEditar){

        filaEditar.data(fila).draw(false);

        filaEditar=null;

    }else{

        tabla.row.add(fila).draw(false);

        contador++;

    }

    actualizarContadores();

    document.getElementById("proveedor").value="";

    document.getElementById("telefono").value="";

    document.getElementById("correo").value="";

    document.getElementById("ciudad").value="";

    document.getElementById("estado").value="Activo";

    bootstrap.Modal.getInstance(
        document.getElementById("modalProveedor")
    ).hide();

});