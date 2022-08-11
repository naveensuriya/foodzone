const mongoose=require("mongoose")
//const moment=require("react-moment")
const dishschema= new mongoose.Schema({
    category: {type:String,required:true},
    dishimage:String,
    dishname:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
    
})

const dishmodel=mongoose.model('dish',dishschema)

module.exports=dishmodel