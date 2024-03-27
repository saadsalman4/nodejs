const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const routes = require("./index");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes);
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://saad:12345@cluster0.da2p9nd.mongodb.net/task9");

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, () => console.log(`listening at http://localhost:3000`));
