const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const routes = require("./index");
app.use(express.json());

mongoose.connect("mongodb+srv://saad:12345@cluster0.da2p9nd.mongodb.net/task6");

app.use(routes);

app.listen(port, () => console.log(`listening at http://localhost:3000`));
