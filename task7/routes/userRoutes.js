const express = require("express");
const userModel = require("../models/users.js");
const app = express();

app.get('/users', async (req, res)=>{
    const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/users', async (req, res)=>{
    const users = new userModel(req.body)
    console.log(req.body)

    try {
        await users.save();
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.patch("/users/:id", async (req, res)=>{
    try {
        await userModel.findByIdAndUpdate(req.params.id, req.body);
        await userModel.save();
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.delete('/users/:id', async (req, res) =>{
    try {
        const users = await userModel.findByIdAndDelete(req.params.id);
    
        if (!users) res.status(404).send("No item found");
        res.status(200).send();
      } catch (error) {
        res.status(500).send(error);
      }
})

module.exports = app;