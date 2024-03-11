const express = require("express");
const teacherModel = require("../models/teachers.js");
const app = express();

app.get('/teachers', async (req, res)=>{
    const teachers = await teacherModel.find({});

  try {
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/teachers', async (req, res)=>{
    const teachers = new teacherModel(req.body)
    console.log(req.body)

    try {
        await teachers.save();
        res.send(teachers);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.patch("/teachers/:id", async (req, res)=>{
    try {
        await teacherModel.findByIdAndUpdate(req.params.id, req.body);
        await teacherModel.save();
        res.send(teachers);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.delete('/teachers/:id', async (req, res) =>{
    try {
        const teachers = await teacherModel.findByIdAndDelete(req.params.id);
    
        if (!teachers) res.status(404).send("No item found");
        res.status(200).send();
      } catch (error) {
        res.status(500).send(error);
      }
})

module.exports = app;