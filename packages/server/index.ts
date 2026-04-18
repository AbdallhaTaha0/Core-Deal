const express = require("express");
const mongoose = require("mongoose");

const app = express();

const URI = "mongodb://abdallahtaha:12345@ac-bwrkssg-shard-00-00.gcf5fcy.mongodb.net:27017,ac-bwrkssg-shard-00-01.gcf5fcy.mongodb.net:27017,ac-bwrkssg-shard-00-02.gcf5fcy.mongodb.net:27017/?ssl=true&replicaSet=atlas-b0eruk-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(URI).then(() => {
  app.listen(5000);
  console.log("Server is now listening to port:5000");
});
