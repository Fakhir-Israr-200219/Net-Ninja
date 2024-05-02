const express = require('express');
const { connectToDb , getDb} = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json())

let db;

connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>{
            console.log("app listing in port 3000")
        })
        db = getDb();
    }
})


app.get("/book",(req,res)=>{

    const page = req.query.p || 0;
    const perPage = 3;

    let book = [];

    db.collection('Test_Collection')
    .find()
    .sort()
    .skip(page * perPage)
    .limit(perPage)
    .forEach(element => book.push(element))
    .then(()=>{
        res.status(200).json(book)
    })
    .catch(()=>{
        res.status(500).json({error : "coutnot find"})
    });

});

app.get("/book/:id",(req,res)=>{

    if(ObjectId.isValid(req.params.id)){
        db.collection('Test_Collection')
        .findOne({_id : new ObjectId(req.params.id)})
        .then((doc) =>{
            res.status(200).json(doc)
        })
        .catch(err =>{
            res.status(500).json({massege : "could not find any collection"});
        })
    }else{
        res.status(500).json({error:"not a valid doc id"});
    }

});

app.post('/book', (req,res) => {
    const book = req.body;

    db.collection('Test_Collection')
        .insertOne(book)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err =>{
            res.status(500).json({err : "could not create the new doc"})
        })
});

app.delete('/book/:id', (req,res)=>{

    if(ObjectId.isValid(req.params.id)){
        db.collection('Test_Collection')
        .deleteOne({_id : new ObjectId(req.params.id)})
        .then((result) =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({massege : "could not delete the document"});
        })
    }else{
        res.status(500).json({error:"not a valid doc id"});
    }

})

app.patch('/book/:id' , (req,res) => {
    const Update = req.body

    if(ObjectId.isValid(req.params.id)){
        db.collection('Test_Collection')
        .updateOne({_id : new ObjectId(req.params.id)} , {$set : Update})
        .then((result) =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({massege : "could not update the document"});
        })
    }else{
        res.status(500).json({error:"not a valid doc id"});
    }

})


//create indexes
/**
 * 
 * db.book.find({rating : 8}).explain('executionStatus')
 * 
 * create insex
 * db.book.createIndex({rating : 8})
 * db.book.getIndexes()
 * db.book.dropIndex({rating : 8})
 * 
 * 
 * 
 */