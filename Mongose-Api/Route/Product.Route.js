const express = require('express')
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.send("getting a list of all product");
})

router.post('/',(req,res,next)=>{
    res.send('product set successfully');
})

router.get('/:id',(req,res,next)=>{
    res.send('get by id '+req.params.id)
})

router.delete('/:id',(req,res,next)=>{
    res.send('dta delete');
})

router.patch('/:id',(req,res,next)=>{
    res.send('product update')
})


module.exports = router;
