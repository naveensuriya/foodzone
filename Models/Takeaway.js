
const mongoose=require("mongoose")
//const moment=require("react-moment")
const takeawayschema= new mongoose.Schema({
    email: {type:String,required:true},
    
    cart: [{
        category: {type:String,required:true},
        dishimage:String,
       dishname:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
    }],
    deliverytype:{type:String,required:true},
    description:{type:String,default:"none"},
    status:{type:Boolean,default:false},
    message:{type:String,default:"Order Pending"},
    date:{type:String} 
})

const takeawaymodel=mongoose.model('takeaway',takeawayschema)

module.exports=takeawaymodel