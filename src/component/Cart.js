import {useSelector} from "react-redux"
import {Row,Col,Button,Card, Container,Accordion,Form, FloatingLabel} from "react-bootstrap"
import {useEffect,useState} from "react"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import axios from "axios"
import {useNavigate} from "react-router"
import moment from "moment"
import {removelist} from "../slices/removeSlice"
import {deletelist} from "../slices/deleteSlice"
import {FcPlus} from "react-icons/fc"
function Cart(){
  
    let {obj}=useSelector(state=>state.users)
let [cartdish,setcartdish]=useState([])
let [itemdelete,setitemdelete]=useState(false)
let [totalamount,settotalamount]=useState(0)
let {register,handleSubmit,formState:{errors}}=useForm()
let [cartfetch,setcartfetch]=useState(false)
let [deliverytype,setdeliverytype]=useState("")
let [address,setaddress]=useState("")
let [data,setdata]=useState()
let navigate=useNavigate()
let dispatch=useDispatch()


  useEffect(async()=>{
let response=await axios.get(`http://localhost:5000/user/cartdish/${obj.email}`)
let data=response.data
if(data.message=="Cart dishes"){
setcartdish(data.payload.cart)
setitemdelete(false)
}
setcartfetch(false)
let res=await axios.get(`http://localhost:5000/user/totalamount/${obj.email}`)
settotalamount(res.data.payload)
  },[itemdelete,cartfetch])

  function updatecart(dishid,method){
      let editobj={id:dishid,operation:method}
      axios.put(`http://localhost:5000/user/cartupdate/${obj.email}`,editobj)

  }

  const handledecrement = (dishid)=>{
    
    setcartdish(cartdish =>
        cartdish.map((obj)=>
        dishid === obj._id ? {...obj,quantity:obj.quantity - (obj.quantity > 1 ? 1:0) }: obj
        )
    )
    updatecart(dishid,"DEC")
    setcartfetch(true)
  }

  const handleincrement = (dishid)=>{
      
    setcartdish(cartdish =>
        cartdish.map((obj)=>
        dishid === obj._id ? {...obj,quantity:obj.quantity + (obj.quantity < 10 ? 1:0) }: obj
        )
    )
    updatecart(dishid,"INC")
    setcartfetch(true)
}


const deleteitem=async(dishid)=>{
  let dishobj={dishid:dishid,email:obj.email}
    dispatch(removelist(dishobj))
    setitemdelete(true)
}

const onformsubmit=(deliverytypeobj)=>{
    setdeliverytype(deliverytypeobj.deliverytype)
    setdata(deliverytypeobj.description)
}

const onaddresssubmit=(addressobj)=>{
    setaddress(addressobj)
}

const paymentmethod=async()=>{
  if(deliverytype=="Take Away")
  {
    let takeawayobj={email:obj.email,cart:cartdish,deliverytype:deliverytype,description:data,date:moment().utcOffset('+05:30').format("MM-DD-YYYY hh:mm:ss a")}
    
   
   let response=await axios.post("http://localhost:5000/user/reducequantity",takeawayobj)
   if(response.data.message=="quantity is updated"){
    let deleteobj={email:obj.email}
    dispatch(deletelist(deleteobj))
    let res=await axios.post("http://localhost:5000/user/takeaway",takeawayobj)
    navigate("/payment")
   }else{
     alert(`only ${response.data.payload.quantity} quantity is left in ${response.data.payload.dishname}`)
   }
  }else{
    let homedeliveryobj={email:obj.email,cart:cartdish,deliverydetails:address,date:moment().utcOffset('+05:30').format("MM-DD-YYYY hh:mm:ss a")}
    let response=await axios.post("http://localhost:5000/user/reducequantity",homedeliveryobj)
    if(response.data.message=="quantity is updated"){
      let deleteobj={email:obj.email}
      dispatch(deletelist(deleteobj))
      let res=await axios.post("http://localhost:5000/user/homedelivery",homedeliveryobj)
      navigate("/payment")
     }else{
       alert(`only ${response.data.payload.quantity} quantity is left in ${response.data.payload.dishname}`)
     }
  }
  
 
}

console.log(data)

    return(<div>
        <Container>
        <Accordion defaultActiveKey="0" flush className="mt-4">
  <Accordion.Item eventKey="0">
    <Accordion.Header><h3>Cart Items</h3></Accordion.Header>
    <Accordion.Body>
{
cartdish.length == 0 &&
<h2 className="mt-5 text-danger text-center">No Dish In Cart. So, pls Add Some Dishes</h2> 
}
{
    cartdish.length != 0 &&
    cartdish.map((obj,index)=><Card className="mt-3">
        <Row>
        <Col lg={3}>
        <Card.Img  src={obj.dishimage} />
        </Col>
        <Col lg={9}>
    
  <Card.Body>
      <Card.Title>
      <h5 className="text-center">{obj.dishname}</h5>
      </Card.Title>
      <Card.Text>
   <hr/>
   <h6 className="mt-3">Description: {obj.description}</h6>
   <Row className="mt-3">
       <Col>
   <h6>Quantity</h6>
   </Col>
   <Col>
   <Button variant="light" type="submit" onClick={()=>handledecrement(obj._id)} className="me-2">-</Button>
{obj.quantity}
   <Button variant="light" type="submit" onClick={()=>handleincrement(obj._id)} className="ms-2">+</Button>
   </Col>
   </Row>
<h6>Price: ₹{obj.price}/-</h6>
<Button variant="danger" className="mt-2" type="submit" onClick={()=>deleteitem(obj._id)}>Remove</Button>
</Card.Text>
  </Card.Body>
   
    </Col>
    


    </Row>
    </Card>)
    
}
<hr/>
<div className="mt-3 bg-light">
    <h4 className="text-success">Total Amount: ₹{totalamount}/-</h4>
</div>
</Accordion.Body>
  </Accordion.Item>
 { cartdish.length!=0 && <Accordion.Item eventKey="1">
    <Accordion.Header><h3>Additional Details</h3></Accordion.Header>
    <Accordion.Body>
        
        <Form className="mt-3" onSubmit={handleSubmit(onformsubmit)}>
        <h3 className="text-warning text-center">Additional Information</h3>
        <div className="mb-3 mt-3">
<Form.Check inline label="Take Away" type="radio" value="Take Away" {...register("deliverytype")} />
<Form.Check inline label="Home Delivery" type="radio" value="Home Delivery" {...register("deliverytype")} />
</div>
<div className="mb-3">
        <FloatingLabel controlId="floatingTextarea2" label="Any Description">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
      {...register("description")}
    />
  </FloatingLabel>
  </div>
  <Button variant="primary" type="submit" className="d-block ms-auto">
    Confirm
  </Button>
  </Form>
</Accordion.Body>
  </Accordion.Item>
  }
  { deliverytype == "Home Delivery" &&
    <Accordion.Item eventKey="2">
    <Accordion.Header><h3>Add Address</h3></Accordion.Header>
    <Accordion.Body>
    <h3 className="text-info text-center">Add Address To Delivery</h3>
    <Form className="mt-4" onSubmit={handleSubmit(onaddresssubmit)}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridfirstname">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" placeholder="Enter First Name" {...register("firstname")}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridlastname">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Last Name" {...register("lastname")} />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="1234 Main St"{...register("address1")} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control type="text" placeholder="Apartment, studio, or floor" {...register("address2")}/>
  </Form.Group>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control type="text" {...register("city")}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control type="text" {...register("state")}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control type="number" {...register("zip")} />
    </Form.Group>
  </Row>

  <Button variant="primary" type="submit" className="d-block ms-auto">
    Submit
  </Button>
</Form>
        </Accordion.Body>
</Accordion.Item>
  }{ deliverytype == "Take Away"  &&
  <Accordion.Item  eventKey="2">
    <Accordion.Header><h3>Order Summary</h3></Accordion.Header>
    <Accordion.Body>
    <Card>
 
  <Card.Body>
    <Card.Title className="text-center"><h5>Total Payable Amount</h5></Card.Title>
    <Card.Text>
        <Row>
            <Col lg={4}>
            <h5>Item Summary:</h5>
            </Col>
            <Col lg={4} className="text-center"><h5><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></h5></Col>
        <Col lg={4} className="text-center"><h5>Total Price</h5></Col>
        </Row>
       
        {
          cartdish.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
      { address.deliverytype =="Home Delivery" &&
      <Row>
          <Col lg={8}>
              Delivery Charge
          </Col>
          <Col lg={4} className="text-center">
          ₹40/-
          </Col>
      </Row>
}
      <hr/>
      <div >
<h4>Total Amount To Pay: ₹{ address.deliverytype =="Home Delivery" ? totalamount+40 : totalamount
    }/-</h4>
      </div>
    </Card.Text>
    <Button variant="primary" type="submit" className="d-block ms-auto" onClick={()=>paymentmethod()}>Pay Now</Button>
  </Card.Body>
</Card>
    </Accordion.Body>
    </Accordion.Item>
}
{ address.deliverytype == "Home Delivery" &&
    <Accordion.Item  eventKey="3">
    <Accordion.Header><h3>Order Summary</h3></Accordion.Header>
    <Accordion.Body>
    <Card>
 
  <Card.Body>
    <Card.Title className="text-center"><h5>Total Payable Amount</h5></Card.Title>
    <Card.Text>
        <Row>
            <Col lg={4}>
            <h5>Item Summary:</h5>
            </Col>
            <Col lg={4} className="text-center"><h5><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></h5></Col>
        <Col lg={4} className="text-center"><h5>Total Price</h5></Col>
        </Row>
       
      {
          cartdish.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
      { address.deliverytype =="Home Delivery" &&
      <Row>
          <Col lg={8}>
              Delivery Charge
          </Col>
          <Col lg={4} className="text-center">
          ₹40/-
          </Col>
      </Row>
}
      <hr/>
      <div >
<h4>Total Amount To Pay: ₹{ address.deliverytype =="Home Delivery" ? totalamount+40 : totalamount
    }/-</h4>
      </div>
    </Card.Text>
    <Button variant="primary" type="submit" className="d-block ms-auto" onClick={()=>paymentmethod()}>Pay Now</Button>
  </Card.Body>
</Card>
    </Accordion.Body>
    </Accordion.Item>
}
</Accordion>
</Container>
    </div>)
}

export default Cart