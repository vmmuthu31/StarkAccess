const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
const dbURI = process.env.MONGODBURI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/Event");

app.use("/api/auth", authRoutes);
app.use("/api/Events", eventRoutes);

app.get("/", (req, res) => {
  const serverStatus = {
    status: "Server is running smoothly 🚀",
    uptime: process.uptime(),
    timestamp: new Date().toLocaleString(),
    message: "Welcome to the StarkNet Event Ticketing Platform API 🎉",
  };

  res.status(200).json(serverStatus);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
