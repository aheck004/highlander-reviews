const express = require('express');
const cors = require('cors');
const records = require('./routes/record.js');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.ATLAS_URI);

app.use("/", require("../routes/reviewRoute.js"));
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});