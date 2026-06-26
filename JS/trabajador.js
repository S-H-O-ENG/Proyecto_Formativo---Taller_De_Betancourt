const nombre = document.querySelector(".datos h1");

const hora = new Date().getHours();

let saludo = "";

if (hora < 12) {
    saludo = "¡Buenos días!";
} else if (hora < 18) {
    saludo = "¡Buenas tardes!";
} else {
    saludo = "¡Buenas noches!";
}

console.log(`${saludo} Bienvenido al perfil de ${nombre.textContent}.`);
const estado = document.querySelector(".activo");

estado.addEventListener("click", () => {

    if (estado.textContent.includes("Activo")) {

        estado.textContent = "● En descanso";
        estado.style.backgroundColor = "#d97706";

    } else {

        estado.textContent = "● Activo";
        estado.style.backgroundColor = "#1d8b38";

    }

});


const fecha = new Date();

console.log("Fecha:", fecha.toLocaleDateString());
console.log("Hora:", fecha.toLocaleTimeString());