import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Additems(){
    let [file,setfile]=useState(null)
    let { register, handleSubmit, formState: { errors } } = useForm()
    let navigate = useNavigate()

    const onselectimage=(event)=>{
        setfile(event.target.files[0])
      }

    const onformsubmit = async(itemsobj) => {
console.log(itemsobj)
//create formdata object
let formdata=new FormData()
formdata.append("dishimage",file)
        //append itemsobj
        formdata.append("itemsobj",JSON.stringify(itemsobj))
        let res = await axios.post("http://localhost:5000/admin/additems", formdata)
        alert(res.data.message)
        navigate("/admindashboard/viewitems")
    }
    return(<div>
        <Form className="w-50 mx-auto mt-4" onSubmit={handleSubmit(onformsubmit)}>
        <h2 className="mb-3 text-center text-success">Add Items</h2>
        <Form.Group className="mb-3" controlId="formBasiccategory">
        <Form.Label>Select Category</Form.Label>
        <Form.Select aria-label="Default select example" {...register("category")}>
  <option>Select the Dish</option>
  <option value="briyani">Briyani</option>
  <option value="juice">Juice</option>
  <option value="sweet">Sweet</option>
  <option value="icecream">Ice Cream</option>
  <option value="friedrice">Fried Rice and Noodles</option>
  <option value="starters">Starters</option>
  <option value="cakes">Cakes</option>
  <option value="tiffen">Tiffen</option>
</Form.Select>
</Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoto">
    <Form.Label>Dish Image</Form.Label>
    <Form.Control type="file" placeholder="photo" {...register("dishimage")} onChange={onselectimage}/>
  </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicdishname">
                    <Form.Label>Dish Name</Form.Label>
                    <Form.Control type="text" {...register("dishname")} />
                    {
                        errors.dishname?.type == "required" && <p className='text-danger'>*dishname is required</p>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicdescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"  {...register("description")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicquantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" {...register("quantity")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicprice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" {...register("price")} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Items
                </Button>
            </Form>
        </div>)
}

export default Additems