const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const routes = require("./index");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://saad:12345@cluster0.da2p9nd.mongodb.net/task8");
app.use(routes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`listening at http://localhost:3000`));
