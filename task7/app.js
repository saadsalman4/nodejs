const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('./routes/userRoutes.js')
const teacherRoutes = require('./routes/teacherRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const mongoose = require('mongoose')
app.use(express.json());

mongoose.connect('mongodb+srv://saad:12345@cluster0.da2p9nd.mongodb.net/task6');

app.use(userRoutes);
app.use(teacherRoutes);
app.use(courseRoutes)

app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))