const mongoose = require("mongoose")

const schema = mongoose.Schema

const ProductSchema = new schema({
    Name:{
        type:String,
        required : true
    },
    Price:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model('product' ,ProductSchema);
module.exports = Product;
