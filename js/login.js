document.querySelector('.btn-ingresar').addEventListener('click', function(event){
event.preventDefault();
 
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();
 
 
if(email === "" || password ===""){
 
    Swal.fire({
        icon:"warning",
        title: "Campos Vacios",
        text: "Por favor complete los campos",
        confirmButtonColor:'#5f1ed7'
    }) ;
    return;
 
}
 
if(email === 'Jefe@tallerbetancourt.com' && password === '12345'){
    Swal.fire({
        icon:'success',
        title:'Inicio Exitoso',
        text: 'Bienvenido Jefe',
        confirmButtonColor: '#5f1ed7'
    }).then(() =>{
        window.location.href='../pages/proveedores.html';
    });
 
}else if(email==='mecanico@tallerbetancourt.com' && password === '123456'){
    Swal.fire({
        icon:'success',
        title:'Inicio Exitoso',
        text: 'Bienvenido Mecanico',
        confirmButtonColor: '#5f1ed7'
    }).then(() =>{
    window.location.href='../pages/inventario.html';})

    }else if(email==='asistente@tallerbetancourt.com' && password === '12345'){
    Swal.fire({
        icon:'success',
        title:'Inicio Exitoso',
        text: 'Bienvenido Asistente',
        confirmButtonColor: '#5f1ed7'
    }).then(() =>{
    window.location.href='../pages/clientes.html';})

    }else if(email==='auxiliar@tallerbetancourt.com' && password === '12345'){
    Swal.fire({
        icon:'success',
        title:'Inicio Exitoso',
        text: 'Bienvenido Auxiliar',
        confirmButtonColor: '#5f1ed7'
    }).then(() =>{
    window.location.href='../pages/pedidos.html';})

}else{
      Swal.fire({
        icon:"error",
        title: "Credenciales incorrectas",
        text: "Correo o contraseña invalidos",
        confirmButtonColor:'#5f1ed7'
      });
 
    }
 
});