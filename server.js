const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());

// MySQL connection settings
const dbHost = "ANKIT";
const dbUser = "root";
const dbPassword = "1100";
const dbName = "ankitdb";

// Create a MySQL connection
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/api/submit", async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Insert data into the database
    const query = "INSERT INTO referral (referrerName, referrerEmail, refereeName, refereeEmail, course) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [referrerName, referrerEmail, refereeName, refereeEmail, course], (err, results) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).json({ error: "Failed to save referral data" });
      }
      console.log("Data inserted successfully:", results);
      res.status(201).json({ message: "Referral data saved successfully" });
    });
  } catch (err) {
    console.error("Error executing Prisma query:", err);
    res.status(500).json({ error: "Failed to save referral data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});