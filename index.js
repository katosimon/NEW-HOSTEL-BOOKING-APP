//This is the start js file which specifies the different routes of our HOSTEL BOOKING APP

import express from 'express'
const app = express()
const PORT = 4000;

app.post('/login',(req,res)=>{
res.send(`Welcome,Please login !`);
});

app.get('/home',(req,res)=>{
res.send(`Welcome to Hostel booking!`);
});

app.get('/hostel',(req,res)=>{
res.send(`This Is the Hostel`);
});

app.post('/booking',(req,res)=>{
res.send(`Fill in the form below!`);
});

app.post('/register',(req,res)=>{
res.send(`Create account now`);
});

app.get('/userprofile',(req,res)=>{
res.send(`This is you and Us`);
});

app.get('/Admin',(req,res)=>{
res.send(`for the Admin !`);
});

app.listen(PORT,()=>{
    console.log(`Server is now running on https://localhost:${PORT}`);
});
