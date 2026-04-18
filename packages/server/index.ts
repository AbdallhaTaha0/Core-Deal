const express = require("express");
const mongoose = require("mongoose");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(5000);
  console.log("Server is now listening to port:5000");
});
