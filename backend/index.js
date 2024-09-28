const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
const dbURI = process.env.MONGODBURI;

mongoose.connect(dbURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err.message))

app.get("/", (req, res) => {
    res.json({data: 'Backend is working fine'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});