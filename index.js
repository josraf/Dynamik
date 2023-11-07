require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;

const routes = require("./routes/routes");

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.error("Database connection error:", error);
});

database.once("open", () => {
  console.log("Database Connected");
});

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
