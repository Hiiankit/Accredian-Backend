const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/submit", async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;

  if (!referrerName ||!referrerEmail ||!refereeName ||!refereeEmail ||!course) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Data received successfully:", req.body);
    res.status(201).json({ message: "Referral data saved successfully" });
  } catch (err) {
    console.error("Error executing Prisma query:", err);
    res.status(500).json({ error: "Failed to save referral data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});