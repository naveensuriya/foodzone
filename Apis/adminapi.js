const exp = require('express');

const adminapp = exp.Router();
const Admin = require("../Models/Admin")
const Dish = require("../Models/Dish")
const Homedelivery=require("../Models/Homedelivery")
const Takeaway=require("../Models/Takeaway")
require("dotenv").config()
adminapp.use(exp.json())
const errorhandling = require("express-async-handler")

const multer=require("multer")
const cloudinary=require("cloudinary").v2
const {CloudinaryStorage} =require("multer-storage-cloudinary")


// configufre cloudinary
cloudinary.config({
    cloud_name: process.env.Cloud_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET 
})


//configure multer storage cloudinary
const clstorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "project",
            pubilc_id: file.fieldname + '-' + Date.now()
        }
    }
  });

  //configure multer (middleware)
  const upload=multer({storage: clstorage})


// login by admindata
adminapp.post('/login', errorhandling(async (req, res) => {
    let usercredobj = req.body
    let userfromdb = await Admin.findOne({ email: usercredobj.email }).exec()
    if (userfromdb == null) {
        res.send({ message: "invalid Admin data" })
    } 
    else {
        if (userfromdb.password != usercredobj.password) {
            res.send({ message: "invalid admin password" })
        } else {
            res.status(200).send({ message: "login successfully",admin:userfromdb})
        }
    }
}))

adminapp.post("/additems",upload.single('dishimage'), errorhandling(async (req, res) => {
    let imgcdn=req.file.path;
    let adminobj = JSON.parse(req.body.itemsobj);
    
    let dishcheck = await Dish.findOne({ dishname: adminobj.dishname }).exec()
 
    if (dishcheck == null) {
       
        adminobj.dishimage=imgcdn;

        let newitems = new Dish({ ...adminobj })
        if (newitems.category == "") {
            res.send({ message: "category should not empty" })
        } else if (newitems.dishimage == "") {
            res.send({ message: "dishimage should not empty" })
        }
       else if (newitems.dishname == "") {
            res.send({ message: "dishname should not empty" })
        }else if (newitems.description == "") {
            res.send({ message: "description should not empty" })
        }else if (newitems.quantity == "") {
            res.send({ message: "quantity should not empty" })
        }else if (newitems.price == "") {
            res.send({ message: "price should not empty" })
        }
        else {
        
            let item = await newitems.save()
            res.status(201).send({ message: "item added", payload: item })
        }
    } else {
            res.status(201).send({ message: "item already exist please check in view list"})
        }
    }
))

adminapp.get("/viewitems", errorhandling(async (req, res) => {
   
    let dishesfromdb = await Dish.find().exec()

    //send response
    if (dishesfromdb.length == 0) {
        res.send({ message: "no items found" })
    } else {
        res.status(200).send({ message: "item list", payload: dishesfromdb })
    }
  
}))

//edit task
adminapp.put('/save-editeditem', errorhandling(async (req, res) => {
    let editedobj = req.body
    let id=editedobj._id
   
//get user task obj
    let itemobj=await Dish.findOne({_id:id})


    itemobj.dishname=editedobj.dishname
    itemobj.price=editedobj.price
    itemobj.description=editedobj.description
    itemobj.quantity=editedobj.quantity

let item=await itemobj.save()
    res.status(200).send({ message: "item edited", payload:item })
}))




//delete item
adminapp.delete("/delete/:id",errorhandling(async(req,res)=>{
    let id=req.params.id
    await Dish.findOneAndRemove({_id:id}).exec()
    res.send({message:"item deleted successfully"})
}))


//get order status of user

adminapp.get("/homeorder",errorhandling(async(req,res)=>{
    
    
    let homedeliveryfromdb=await Homedelivery.find()
    if(homedeliveryfromdb!=null){
        res.send({message:"Home Delivery Orders",payload:homedeliveryfromdb})
    }else{
        res.send({message:"no order found"})
    }
    
    }))
    
    
    //get order status of user
    
adminapp.get("/takeawayorder",errorhandling(async(req,res)=>{
        
        
    
        let takeawayfromdb=await Takeaway.find()
        
        if(takeawayfromdb!=null){
            res.send({message:"Take Away Orders",payload:takeawayfromdb})
        }else{
            res.send({message:"no order found"})
        }
        }))
        
adminapp.put("/updatestatus",errorhandling(async(req,res)=>{
    let editedobj = req.body
    let id=editedobj._id
   
//get user task obj
    let homefromdb=await Homedelivery.findOne({_id:id})
    let takefromdb=await Takeaway.findOne({_id:id})

if(homefromdb!=null){
    homefromdb.message=editedobj.message
    if(editedobj.message=="Cancel Order" || editedobj.message=="Delivered"){
        homefromdb.status=true
    }
    let status=await homefromdb.save()
    res.status(200).send({ message: "item edited", payload:status })
}

if(takefromdb!=null){
    takefromdb.message=editedobj.message
    if(editedobj.message=="Cancel Order" || editedobj.message=="Delivered"){
        takefromdb.status=true
    }
    let status=await takefromdb.save()
    res.status(200).send({ message: "item edited", payload:status })
}



}))




  //error handling middleware(syntax error)
adminapp.use((err, req, res, next) => {
    res.send({ message: err.message })
})

module.exports = adminapp