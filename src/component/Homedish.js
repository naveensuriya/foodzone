import { Container, Row, Card,Col ,Button} from "react-bootstrap"
import {useNavigate} from "react-router"
import {useDispatch,useSelector} from 'react-redux'
import { cartlist } from "../slices/cartSlice"
import {useState} from "react"
import {BsCart} from "react-icons/bs"
function Homedish(props){
    let [quantity,setquantity]=useState(1)
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let {obj}=useSelector(state=>state.users)


    const additem=(cartitem,quantity)=>{
        cartitem.quantity=quantity
if(obj==null){
    alert("Login is required to add the product in cart")
    navigate("/login")
}else{
    let email=obj.email
    let cartcontain = { cart: [{ ...cartitem }], email: email }
    dispatch(cartlist(cartcontain))
    
}
    }



    return(<div>
        <Container>
<div className="mt-3">
    {props.children}
</div>
<Row>
{
    props.dish.map((obj,index)=><Col sm={12} md={6} lg={4} >
    <Card style={{ width: '18rem' }} className="mt-3">
       
        
   <Card.Img variant="top" className="img" src={obj.dishimage} />
   {obj.quantity==0 &&
   <p className="overlay h2">Out Of Stock</p>
        }
   <Card.Body>
     <Card.Title className="text-center">{obj.dishname}</Card.Title>
     <Card.Text>
      <p>{obj.description}</p>
      <Row>
          <Col>
         <h6> Price: ₹{obj.price}/-</h6>
          </Col>
          <Col>
          <h6>Quantity: <select  onChange={(e)=>setquantity(e.target.value)}>
              {
                  [...Array(6).keys()].map((v,i)=>(
                      <option value={i+1}>{i+1}</option>
                  ))
              }
              </select></h6>
          </Col>
      </Row>
     </Card.Text>
     {obj.quantity!=0 &&
     <Button variant="success"  onClick={()=>additem(obj,quantity)}><BsCart className="me-1"/> Add to Cart</Button>
}
{obj.quantity==0 &&
     <Button variant="success" disabled onClick={()=>additem(obj,quantity)}><BsCart className="me-1"/>Add to Cart</Button>
}
   </Card.Body>
 </Card>
 </Col>)
}
</Row>
</Container>
    </div>
        )
}

export default Homedish