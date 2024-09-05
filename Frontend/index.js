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