const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const UserModel = require('./models/user.model');
const userRouter = require('./routes/user')

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);

app.listen(PORT, function check(error) {
  if (error) {
    console.log("Errorr ..!!"); 
  } else {
    console.log("Started ..!!");
  }
});