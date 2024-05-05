const mongoose = require("mongoose")
const createError = require('http-errors')

const Product = require('../Model/Product.model')

module.exports = {
    getAllProduct:async (req,res,next)=>{
        try{
            const result = await Product.find({},{__v :0});
            res.send(result);
        }catch(err){
            console.log(error.message)
        }
    },
    getProductById: async (req,res,next)=>{
        const id = req.params.id
        try{
            const result = await Product.findById(id,{__v:0})
            if(!result){
                throw createError(404,"product dose not exist")
            }
            // const result = await Product.findOne({ _id : id},{__v:0})
            res.send(result)
        }catch(err){
            console.log(err.message)
            if(err instanceof mongoose.CastError){
                next(createError(400,"product id dose not exist"))
                return
            }
            next(err)
        }
    
    },
    addProduct:async (req,res,next)=>{
        try{
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result)
        }
        catch(error){
            console.log(error.message)
            if(error.name == "ValidationError"){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
        // const product = new Product({
        //     Name : req.body.Name,
        //     Price : req.body.Price
        // })
        // product.save()
        // .then(result =>{
        //     console.log(result);
        //     res.send(result)
        // })
        // .catch(err =>{
        //     console.log(err.message)
        // })
       
    },
    updateProduct: async (req,res,next)=>{
        const id = req.params.id;
        const updation = req.body
        const options = {new: true}
        try{
            const result = await Product.findByIdAndUpdate(id,updation,options)
            if(!result){
                throw createError(404,"product dose not exist")
            }
            res.send(result)
        }catch(err){
            console.log(err.message)
            if(err instanceof mongoose.CastError){
                next(createError(400,"product id dose not exist"))
                return
            }
            next(err)
        }
    },
    deleteProduct: async (req,res,next)=>{
        const id = req.params.id
        try{
            // const result =await Product.deleteOne({_id : id})
            const result = await Product.findByIdAndDelete(id)
            if(!result){
                throw createError(404,"product dose not exist")
            }
            res.status(200).send(result)
        }catch(err){
            console.log(err.message)
            if(err instanceof mongoose.CastError){
                next(createError(400,"product id dose not exist"))
                return
            }
            next(err)
        }
    }

}