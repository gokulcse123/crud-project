const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to DB ✅");
});

// Route to insert student data
app.post("/students", (req, res) => {
  const { name, age, email, phone, address, department, gender, dob } = req.body;
  const sql = "INSERT INTO students (name, age, email, phone, address, department, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, age, email, phone, address, department, gender, dob], (err, result) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).send("Error saving student");
    }
    res.send("Student saved successfully");
  });
});

// Route to fetch all student data
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch failed:", err);
      return res.status(500).send("Error fetching students");
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
