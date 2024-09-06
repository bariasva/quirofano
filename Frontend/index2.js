
document.getElementById("formPag2").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombrePaciente = document.getElementById("validationIDPag2").value;

    if (nombrePaciente.length < 3 || nombrePaciente.length > 50) {
        event.preventDefault();
        alert("El nombre del paciente debe tener entre 3 y 50 caracteres.");
        return;
    }

    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(nombrePaciente)) {
        event.preventDefault();
        alert("El nombre no debe contener números.");
        return;
    }
});