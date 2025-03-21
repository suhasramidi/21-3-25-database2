const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose')
const userSchema=require('./schema')
require('dotenv').config();

const app = express();
const port = 5000;
app.use(express.json());

app.use(express.static('static'));

async function connectDataBase(){
  try{
    await mongoose.connect(process.env.MongoDB_URI)
    console.log(`Connected to database`)

  }catch(err){
    console.log('Error connecting to database')
  }
}
connectDataBase();

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users',async (req,res)=>{
  try{
  const schema = new userSchema(req.body);
  const savedUser = await schema.save();
  res.status(201).send({msg:'user created ',data:savedUser})
}catch(err){
  res.status(500).send({msg:'something went wrong',err})
}


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
