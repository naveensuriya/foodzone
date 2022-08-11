const mongoose=require("mongoose")
//const moment=require("react-moment")
const homedeliveryschema= new mongoose.Schema({
    email: {type:String,required:true},
    cart: [{
        category: {type:String,required:true},
        dishimage:String,
       dishname:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
    }],
    deliverydetails:{
    deliverytype:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    address1:{type:String,required:true},
    address2:{type:String},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zip:{type:Number,required:true},
    description:{type:String}
    },
    status:{type:Boolean,default:false},
    message:{type:String,default:"Order Pending"},
    date:{type:String}  
})

const homedeliverymodel=mongoose.model('homedelivery',homedeliveryschema)

module.exports=homedeliverymodel