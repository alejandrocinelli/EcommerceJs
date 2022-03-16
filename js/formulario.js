console.log("Hola FORM");
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const btnPay = document.getElementById("btnPay")

const expresiones = {
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,15}$/, // Letras y espacios, pueden llevar acentos.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,15}$/, // Letras y espacios, pueden llevar acentos.
    company: /^[a-zA-ZÀ-ÿ\s]{1,15}$/, // Letras y espacios, pueden llevar acentos.
    address: /^[a-zA-Z0-9\s\_\-]{1,25}$/, // Letras, numeros espacios
    apartment: /^[a-zA-Z0-9\s\_\-]{1,25}$/, // Letras, numeros espacios
    zipcode: /^.{4,6}$/, // 4 a 6 digitos.
    city: /^[a-zA-ZÀ-ÿ\s]{1,18}$/, // Letras y espacios, pueden llevar acentos.
    state: /^[a-zA-ZÀ-ÿ\s]{1,18}$/,
    country: /^[a-zA-ZÀ-ÿ\s]{1,18}$/, // Letras y espacios, pueden llevar acentos.
    phono: /^.{11,13}$/, // 11 a 14 numeros.

};

const campos = {

    lastName: false,
    mail: false,
    firstName: false,
    address: false,
    apartment: false,
    zipcode: false,
    city: false,
    state: false,
    country: false,
    phono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "mail":
            validarCampo(expresiones.mail, e.target, `mail`)
            break;
        case "firstName":
            validarCampo(expresiones.firstName, e.target, `firstName`)
            break;
        case "lastName":
            validarCampo(expresiones.firstName, e.target, 'lastName')
            break;
        case "address":
            validarCampo(expresiones.address, e.target, `address`)
            break;
        case "apartment":
            validarCampo(expresiones.apartment, e.target, 'apartment')
            break;
        case "zipcode":
            validarCampo(expresiones.zipcode, e.target, 'zipcode')
            break;
        case "city":
            validarCampo(expresiones.city, e.target, 'city')
            break;
        case "state":
            validarCampo(expresiones.state, e.target, 'state')
            break;
        case "country":
            validarCampo(expresiones.country, e.target, 'country')
            break;
        case "phono":
            validarCampo(expresiones.phono, e.target, 'phono')
            break;

    }
};

const validarCampo = (expresiones, input, campo) => {

    if (expresiones.test(input.value)) {
        document.getElementById(`${campo}_grupo`).classList.remove('bg-danger');
        document.getElementById(`${campo}_grupo`).classList.add("bg-success")
        campos[campo] = true
    } else {
        document.getElementById(`${campo}_grupo`).classList.add("bg-danger");
        campos[campo] = false
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario); // me sirve para cuando levantan una tecla de Form
    input.addEventListener("blur", validarFormulario); // me sirve para el click fuera del form
});

formulario.addEventListener("click", (e) => {
    e.preventDefault();

});

btnPay.addEventListener("click", () => {
    if (campos.mail && campos.firstName && campos.address && campos.apartment) {
        swal("Formulario", "enviado correctamente", "success");
        formulario.reset()
        let transactionFormData = new FormData (formulario)
        console.log(transactionFormData)

    } else swal("Verificar", "formulario mal cargado", "error");
})
