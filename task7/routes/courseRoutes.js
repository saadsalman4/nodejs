const express = require("express");
const courseModel = require("../models/courses.js");
const app = express();

app.get('/courses', async (req, res)=>{
    const courses = await courseModel.find({});

  try {
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/courses', async (req, res)=>{
    const courses = new courseModel(req.body)
    console.log(req.body)

    try {
        await courses.save();
        res.send(courses);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.patch("/courses/:id", async (req, res)=>{
    try {
        await courseModel.findByIdAndUpdate(req.params.id, req.body);
        await courseModel.save();
        res.send(courses);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.delete('/courses/:id', async (req, res) =>{
    try {
        const courses = await courseModel.findByIdAndDelete(req.params.id);
    
        if (!courses) res.status(404).send("No item found");
        res.status(200).send();
      } catch (error) {
        res.status(500).send(error);
      }
})

module.exports = app;