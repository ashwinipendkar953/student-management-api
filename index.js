const express = require("express");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

const { initializeDatabase } = require("./db/db.connection");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
