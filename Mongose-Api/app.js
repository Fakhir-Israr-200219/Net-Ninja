const express = require('express')

const app = express();
const ProductRoute = require('./Route/Product.Route')
app.use('/Product',ProductRoute);

app.use((req,res,next)=>{
    res.statusCode(404);
    res.send({
        error:"not found"
    })
})

app.listen(3000 , () =>{
    console.log("app listen in port 3000")
})