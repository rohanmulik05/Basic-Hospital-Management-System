const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// Get all doctors
app.get('/doctors', (req, res) => {
    db.all('SELECT * FROM doctors', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a doctor
app.post('/doctors', (req, res) => {
    const { name, specialty } = req.body;
    db.run('INSERT INTO doctors (name, specialty) VALUES (?, ?)', [name, specialty], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, specialty }); // Return the new ID
    });
});


// Get all patients
app.get('/patients', (req, res) => {
    db.all('SELECT * FROM patients', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a patient
app.post('/patients', (req, res) => {
    const { name, age, doctor_id } = req.body;
    db.run('INSERT INTO patients (name, age, doctor_id) VALUES (?, ?, ?)', [name, age, doctor_id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, age, doctor_id }); // Return the new ID
    });
});

// Get all appointments
app.get('/appointments', (req, res) => {
    db.all('SELECT * FROM appointments', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Schedule an appointment
app.post('/appointments', (req, res) => {
    const { patient_id, doctor_id, appointment_date } = req.body;
    db.run('INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)', [patient_id, doctor_id, appointment_date], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});
// Delete a doctor
app.delete('/doctors/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM doctors WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

// Delete a patient
app.delete('/patients/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM patients WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

// Delete an appointment
app.delete('/appointments/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM appointments WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
