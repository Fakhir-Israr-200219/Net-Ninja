const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const dotenv = require('dotenv').config()


const app = express();
app.use(express.json())

mongoose.connect(process.env.CS,).then(()=>{
    console.log("mongo db connected ...");
})

app.all('/oop',(req,res)=>{
    // res.send(req.query);
    // res.send(req.params)
    res.send(req.body)
})

const ProductRoute = require('./Route/Product.Route')
app.use('/Product',ProductRoute);

app.use((req,res,next)=>{
    // const err = new Error("Not Found");
    // err.status = 404;
    // next(err)
    next(createError(404,"not Found"))
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status : err.status || 500,
            message : err.message
        }
    })
})

const port = process.env.PORT || 300 
app.listen(port , () =>{
    console.log("app listen in port " + port+"...")
})