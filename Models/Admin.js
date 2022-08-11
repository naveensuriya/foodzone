const mongoose=require("mongoose")

const adminschema= new mongoose.Schema({
    email:{type:String,required:[true,"email is required"]},
    password:{type:String,required:[true,"password is required"],minlength:4}
},{collection:'admincollection'})

const adminmodel=mongoose.model('admin',adminschema)

module.exports=adminmodel