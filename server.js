const exp=require("express")
const app=exp()
const userapp=require("./Apis/userapi")
const adminapp=require("./Apis/adminapi")
require("dotenv").config()

const mongoose=require("mongoose")
const path=require("path")

// connect express server with react
app.use(exp.static(path.join(__dirname,"./build")))

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("database is connected successfully"))
.catch((err)=>console.log("err is",err))



app.use('/user',userapp)
app.use('/admin',adminapp)




if(process.env.NODE_ENV === 'production'){
    app.use(exp.static('build'));
}

const port=process.env.PORT
app.listen(port,()=>console.log(`server is running on port ${port}`))