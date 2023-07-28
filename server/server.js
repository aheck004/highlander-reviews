const express = require('express');
const session = require('express-session');
const cors = require('cors');
const records = require('./routes/reviewRoute.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { getGoogleOAuthTokens, getGoogleUser } = require('./services/googleservices.js');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.ATLAS_URI).catch((err)=>{
  console.error(err)
});

app.use("/", require("./routes/reviewRoute.js"));
app.use("/record", records);

app.get("/oauth2callback", async(req, res) => {
  const code = req.query.code;
  const {id_token, access_token} = await getGoogleOAuthTokens(code);
  const googleUser = await getGoogleUser(id_token, access_token);
  //jwt.decode(id_token);
  res.cookie("googleUser", googleUser, { maxAge: 30 * 60 * 1000 })
  res.redirect("http://localhost:3000");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});