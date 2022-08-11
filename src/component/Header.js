import {Navbar,Nav,Container,NavDropdown} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Form,FormControl,Button} from "react-bootstrap"
import {useSelector,useDispatch} from "react-redux"
import {userlogout} from "../slices/userSlice"
import {adminlogout} from "../slices/adminSlice"
import { useState, useEffect } from "react"
import axios from "axios"
import { FiHome } from "react-icons/fi"
import {IoIosCreate} from "react-icons/io"
import {FiLogIn} from "react-icons/fi"
import {MdOutlineDeliveryDining,MdLogout} from "react-icons/md"
import {BsCart} from "react-icons/bs"
import {FaUserCircle} from "react-icons/fa"
import {ImProfile} from "react-icons/im"
import {GoDashboard} from "react-icons/go"
function Header(){

  let {isuserlogin,obj}=useSelector(state=>state.users)
  let {cartobj} =useSelector(state=>state.cart)
  let {isadminlogin}=useSelector(state=>state.admin)
  let {removeobj}=useSelector(state=>state.remove)
  let {deleteobj}=useSelector(state=>state.delete)
  let [cartsize,setcartsize]=useState(0)
  let dispatch=useDispatch()

  
  
  useEffect(async()=>{
    if(obj!=null){
    let response=await axios.get(`http://localhost:5000/user/cartdish/${obj.email}`)
    let data=response.data
    if(data.message=="Cart dishes"){
    setcartsize(data.payload.cart.length)
    }
    }
    
    
      },[cartobj,obj,removeobj,deleteobj])



    return(<div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar" fixed="top">
<Container>
  <Navbar.Brand className="text-dark logo shadow bg-light"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhaxnPSsCia_K_scCizFvxmf-FUBliiKP3g&usqp=CAU" width="60px" height="45px"/>
      FoodZone</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ms-auto ms-5">
    <LinkContainer to="/" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><FiHome className="me-1" size={28}/>Home </Nav.Link>
      </LinkContainer>
      { isadminlogin &&
        <LinkContainer to="/admindashboard" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
        <Nav.Link className="px-4" activeStyle={{color: "red",textDecoration:"none"}}><GoDashboard className="me-1" size={28}/>Dashboard</Nav.Link>
        </LinkContainer>
      }

{isuserlogin || !isadminlogin &&
      <LinkContainer to="/signup" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><IoIosCreate className="me-1" size={28}/>Signup </Nav.Link>
      </LinkContainer>
}

{isuserlogin &&
      <LinkContainer to="/cart" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><BsCart className="me-1" size={28}/>Cart({cartsize})</Nav.Link>
      </LinkContainer>
      }
{ 
isuserlogin &&
      <LinkContainer to="/delivery" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><MdOutlineDeliveryDining className="me-1" size={28}/>Delivery Status</Nav.Link>
      </LinkContainer>
}

{ 
isadminlogin &&
      <LinkContainer to="/delivery" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><MdOutlineDeliveryDining className="me-1" size={28}/>Update Status</Nav.Link>
      </LinkContainer>
}

      {isuserlogin || isadminlogin ?
       isuserlogin &&
       <NavDropdown title={<span><FaUserCircle className="me-1" size={28}/>{obj.name}</span>} id="collasible-nav-dropdown" className="px-4">
      <LinkContainer to="/viewprofile" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
       <NavDropdown.Item><ImProfile className="me-1"/>View Profile</NavDropdown.Item>
       </LinkContainer>
       <NavDropdown.Divider />
       <LinkContainer to="/login" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
        <NavDropdown.Item onClick={()=>dispatch(userlogout())}><MdLogout className="me-1"/>logout</NavDropdown.Item>
        </LinkContainer>
     </NavDropdown> ||
     isadminlogin &&
      <LinkContainer to="/login" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4" onClick={()=>dispatch(adminlogout())}><MdLogout className="me-1" size={28}/>logout</Nav.Link>
      </LinkContainer> 
      :
      <LinkContainer to="/login" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
      <Nav.Link className="px-4"><FiLogIn className="me-1" size={28}/>Login</Nav.Link>
      </LinkContainer>}
     

      
    </Nav>

  </Navbar.Collapse>
  </Container>
</Navbar>
    </div>)
}

export default Header