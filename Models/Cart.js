
const mongoose=require("mongoose")
//const moment=require("react-moment")
const cartschema= new mongoose.Schema({
    email: {type:String,required:true},
    cart: [{
        category: {type:String,required:true},
        dishimage:String,
       dishname:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
    }]
})

const cartmodel=mongoose.model('cart',cartschema)

module.exports=cartmodel