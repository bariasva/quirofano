document.getElementById("formPag1").addEventListener("submit", function(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointmentDate = new Date(document.getElementById("appointment-date").value);

    if (appointmentDate < today) {
        event.preventDefault();
        alert("La fecha de la cirugía tiene que ser mínimo un día después.");
        return;
    }

    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    if (startTime >= endTime) {
        event.preventDefault();
        alert("La hora de inicio debe ser menor que la hora de salida.");
        return;
    }
});

document.getElementById("formPag1").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Se mandó");
    const nombrePaciente = document.getElementById("validationIDPag1").value;

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

const express = require('express');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    // Process the form data here
    console.log(formData);
    res.send('Form data received successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
