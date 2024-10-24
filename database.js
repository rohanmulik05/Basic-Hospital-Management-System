const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hospital.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the hospital database.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS doctors (id INTEGER PRIMARY KEY, name TEXT, specialty TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, doctor_id INTEGER, FOREIGN KEY(doctor_id) REFERENCES doctors(id))');
    db.run('CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY, patient_id INTEGER, doctor_id INTEGER, appointment_date TEXT, FOREIGN KEY(patient_id) REFERENCES patients(id), FOREIGN KEY(doctor_id) REFERENCES doctors(id))');
});


module.exports = db;
