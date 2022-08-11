const exp = require('express');

const userapp = exp.Router();
const bcryptjs = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
userapp.use(exp.json())
const User = require("../Models/User")
const Cart = require("../Models/Cart")
const Dish = require("../Models/Dish")
const Takeaway=require("../Models/Takeaway")
const Homedelivery=require("../Models/Homedelivery")

const errorhandling = require("express-async-handler")
const verifytoken = require("./middleware/verifyToken")

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
            folder: "naveen",
            pubilc_id: file.fieldname + '-' + Date.now()
        }
    }
  });

  //configure multer (middleware)
  const upload=multer({storage: clstorage})

  

// post userdata
userapp.post('/createuser',errorhandling(async (req, res) => {
   
   


    let userobjfromclient = req.body
    
    let usercheck = await User.findOne({ email: userobjfromclient.email }).exec()

    if (usercheck != null) {
        res.send({ message: "already user exists in this email" })
    } else {
        
        let newuser = new User({ ...userobjfromclient })
        if (newuser.password == "") {
            res.send({ message: "password should not empty" })
        } else {
            let hashedpassword = await bcryptjs.hash(newuser.password, 5)
            newuser.password = hashedpassword
            let user = await newuser.save()
            res.status(201).send({ message: "user created", payload: user })
        }
    }
}))



 


// login by userdata
userapp.post('/login', errorhandling(async (req, res) => {
    let usercredobj = req.body
    let userfromdb = await User.findOne({ email: usercredobj.email }).exec()
    if (userfromdb == null) {
        res.send({ message: "invalid user" })
    } 
    else {
        let status = await bcryptjs.compare(usercredobj.password, userfromdb.password)
        if (status == false) {
            res.send({ message: "invalid password" })
        } else {
            let signedtoken = jwt.sign({ name: userfromdb.name }, process.env.SECURITY_KEY, { expiresIn: 300 })
            res.status(200).send({ message: "login successfully", token: signedtoken, user: userfromdb })
        }
    }
}))



//edit task
userapp.put('/save-editedprofile', verifytoken, errorhandling(async (req, res) => {
    let editedobj = req.body
    let email=editedobj.email
    delete editedobj.username

    let userprofileobj=await User.findOne({email:email})


    userprofileobj.name=editedobj.name
    userprofileobj.phoneno=editedobj.phoneno
    userprofileobj.location=editedobj.location

let profile=await userprofileobj.save()
    res.status(200).send({ message: "profile edited", payload:profile })
}))


userapp.get("/viewprofile/:email", verifytoken, errorhandling(async (req, res) => {

    emailfromclient = req.params.email

    let userfoundfromdb = await User.findOne({ email: emailfromclient }).exec()

    if (userfoundfromdb == null) {
        res.send({ message: "no user data found" })
    } else {
        res.status(200).send({ message: "userdata", payload: userfoundfromdb })
    }
    
}))


userapp.post("/cart", errorhandling(async (req, res) => {
    
    let itemobjfromclient = req.body
 


    let usercheck = await Cart.findOne({ email: itemobjfromclient.email }).exec()
   
    if (usercheck == null) {
        let newcart = new Cart({ ...itemobjfromclient })
            let cart = await newcart.save()
            res.status(201).send({ message: "item added to cart", payload: cart })
        
    } else {

            usercheck.cart.push(itemobjfromclient.cart[0])
            let cart = await usercheck.save()
            res.status(201).send({ message: "item added to exist", payload: cart })
        
    }
}))


//get cart dishes
userapp.get("/cartdish/:email",errorhandling(async(req,res)=>{
    let email=req.params.email
 let cartdatafromdb=await Cart.findOne({email:email}).exec()

 res.send({message:"Cart dishes",payload:cartdatafromdb})
}))


// cart update

userapp.put("/cartupdate/:email",errorhandling(async(req,res)=>{
    let email=req.params.email
    let editobj=req.body
 let cartdatafromdb=await Cart.findOne({email:email}).exec()

 let dishobjindex=cartdatafromdb.cart.findIndex(dishobj=>dishobj._id == editobj.id)

 if(editobj.operation=="INC"){
     cartdatafromdb.cart[dishobjindex].quantity+= (cartdatafromdb.cart[dishobjindex].quantity < 10 ? 1 : 0 )
 }
 else if(editobj.operation=="DEC"){
    cartdatafromdb.cart[dishobjindex].quantity-= (cartdatafromdb.cart[dishobjindex].quantity > 1 ? 1 : 0 )
}
cartdatafromdb.save()
 res.send({message:"Cart updated"})
}))


//remove from cart
userapp.delete("/cartdelete/:id/:email",errorhandling(async(req,res)=>{
    let id=req.params.id
    let email=req.params.email
   
    let cartdatafromdb=await Cart.findOne({email:email}).exec()
    
 let dishobjindex=cartdatafromdb.cart.findIndex(dishobj=>dishobj._id == id)
 
 cartdatafromdb.cart.splice(dishobjindex,1)
    cartdatafromdb.save()
    res.send({message:"dish removed from cart",payload:cartdatafromdb})
}))


//delete cart data

userapp.delete("/deletecart/:email",errorhandling(async(req,res)=>{

    let email=req.params.email
   
    let dishdelete=await Cart.findOne({email:email}).exec()
    dishdelete.cart=[]
    await dishdelete.save()
    res.send({message:"all dish removed from cart",payload:dishdelete})
}))



// total amount from cart
userapp.get("/totalamount/:email",errorhandling(async(req,res)=>{
    let totalamount=0
    let email=req.params.email
 let cartdatafromdb=await Cart.findOne({email:email}).exec()
for(let obj of cartdatafromdb.cart)
{
    totalamount+=obj.price*obj.quantity
}

 res.send({message:"Total Amount",payload:totalamount})
}))


//payment at cart
userapp.post("/takeaway",errorhandling(async(req,res)=>{
    let takeawayobj=req.body

    let newtakeaway = new Takeaway({ ...takeawayobj })
    await newtakeaway.save()
    res.send({message:"order details added"})

}))


userapp.post("/reducequantity",errorhandling(async(req,res)=>{
    let takeawayobj=req.body

    for(let obj of takeawayobj.cart){
        let datafromdb=await Dish.findOne({dishname:obj.dishname})
        if(datafromdb!=null){
            datafromdb.quantity=datafromdb.quantity-obj.quantity
        }
        if(datafromdb.quantity >= 0 ){
            await datafromdb.save()
            res.send({message:"quantity is updated"})
        }else{
 res.send({message:"you crossed the quantity limit",payload:{quantity:obj.quantity+datafromdb.quantity,dishname:obj.dishname}})
        }
        
    }   
}))


//homedelivery
userapp.post("/homedelivery",errorhandling(async(req,res)=>{
    let homedeliveryobj=req.body
  
    let newhomedelivery = new Homedelivery({ ...homedeliveryobj })
    await newhomedelivery.save()
    res.send({message:"order details added"})
    
}))


//get order status of user

userapp.get("/homeorder/:email",errorhandling(async(req,res)=>{
let email=req.params.email

let homedeliveryfromdb=await Homedelivery.find({email:email})
if(homedeliveryfromdb!=null){
    res.send({message:"Home Delivery Orders",payload:homedeliveryfromdb})
}else{
    res.send({message:"no order found"})
}

}))


//get order status of user

userapp.get("/takeawayorder/:email",errorhandling(async(req,res)=>{
    let email=req.params.email
    
    let takeawayfromdb=await Takeaway.find({email:email})
    
    if(takeawayfromdb!=null){
        res.send({message:"Take Away Orders",payload:takeawayfromdb})
    }else{
        res.send({message:"no order found"})
    }
    }))
    

//cancel order

userapp.patch("/cancelorder",errorhandling(async(req,res)=>{

    let id=req.body._id

    let homefromdb=await Homedelivery.findOne({_id:id})
    let takefromdb=await Takeaway.findOne({_id:id})

if(homefromdb!=null){
    homefromdb.message="Cancel Order"
    homefromdb.status=true
    
    let status=await homefromdb.save()
    res.status(200).send({ message: "item edited", payload:status })
}

if(takefromdb!=null){
    takefromdb.message="Cancel Order"
    takefromdb.status=true
    let status=await takefromdb.save()
    res.status(200).send({ message: "item edited", payload:status })
}
}))

userapp.delete("/removehistory/:id",errorhandling(async(req,res)=>{
    let id=req.params.id
    await Homedelivery.findOneAndDelete({_id:id}).exec()
    await Takeaway.findOneAndDelete({_id:id}).exec()

    res.send({message:"data deleted successfully"})
}))
    

userapp.get("/dish",errorhandling(async(req,res)=>{
    searchedfield=req.query.dishname
   let data= await Dish.find({dishname:{$regex:searchedfield,$options:'$i'}}).exec()

    res.send({message:"data searched successfully",payload:data})
}))
    


//error handling middleware(syntax error)
userapp.use((err, req, res, next) => {
    res.send({ message: err.message })
})

module.exports = userapp