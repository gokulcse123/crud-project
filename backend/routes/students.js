// routes/student.js
const express = require('express');
const router = express.Router();
const conn = require('../db');

// GET all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// 👉 Add student
router.post('/add', (req, res) => {
    const { name, age, email, phone, address, department, gender, dob } = req.body;
    const sql = `INSERT INTO students (name, age, email, phone, address, department, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conn.query(sql, [name, age, email, phone, address, department, gender, dob], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Student added successfully' });
    });
});

// 👉 Update student
router.put('/update/:id', (req, res) => {
    const { name, age, email, phone, address, department, gender, dob } = req.body;
    const { id } = req.params;
    const sql = `UPDATE students SET name=?, age=?, email=?, phone=?, address=?, department=?, gender=?, dob=? WHERE id=?`;
    conn.query(sql, [name, age, email, phone, address, department, gender, dob, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Student updated successfully' });
    });
});

// 👉 Delete student
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    conn.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Student deleted successfully' });
    });
});

module.exports = router;
