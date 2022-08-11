import {Form,Button} from "react-bootstrap"
import {useNavigate} from "react-router"
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from 'react-redux'
import { loginuser } from "../slices/userSlice"
import { loginadmin } from "../slices/adminSlice"
import {useEffect} from "react"
import axios from "axios"
import {FiLogIn} from "react-icons/fi"

function Login(){
    let navigate=useNavigate()
    let {register,handleSubmit,formState:{errors}}=useForm()
    let {obj, iserror, errmsg, ispending, isuserlogin}=useSelector(state=>state.users)
    let {adminobj, isadminlogin, iserr, errormsg}=useSelector(state=>state.admin)

    let dispatch=useDispatch()

    useEffect(()=>{
      if(isuserlogin==true){
          navigate("/")
      }
      if(isadminlogin==true){
        navigate("/admindashboard/additems")
      }
  
  },[obj,adminobj])

    const onformsubmit=async(userobj)=>{
      if(userobj.usertype=="User"){
        dispatch(loginuser(userobj))
      }
      else
      {
        dispatch(loginadmin(userobj)) 
      }
     
     
    }
            


    return(<div>
      
        {
         iserror && <p className='text-danger mt-3 display-5 text-center'>{errmsg}</p>
        }
        {
         iserr && <p className='text-danger mt-3 display-5 text-center'>{errormsg}</p>
        }
        

<Form className="w-50 mx-auto mt-4 p-5" onSubmit={handleSubmit(onformsubmit)} style={{backgroundColor:"#C3E0E5"}}>
<h2 className="mb-3 text-center">Login</h2>
<div className="mb-3">
<Form.Check inline label="User" type="radio" value="User" {...register("usertype")} />
<Form.Check inline label="Admin" type="radio" value="Admin" {...register("usertype")} />
</div>
<Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" {...register("email")}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" {...register("password")} />
  </Form.Group>
  <Button variant="success" type="submit" className="d-block mx-auto">
  <FiLogIn className="me-1" size={28}/>Login
  </Button>
  <div className="mt-3 text-center">
      New to FoodZone?<span className="text-danger ms-2 login" onClick={()=>navigate("/signup")}>Create Account</span>
  </div>
</Form>
    </div>)
}

export default Login