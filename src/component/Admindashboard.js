import {Nav} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Outlet} from "react-router-dom"
function Admindashboard(){
    return(<div style={{backgroundColor:"#FFFFFF"}}>
<Nav className="justify-content-around mt-5">
<LinkContainer to="viewitems" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
    <Nav.Link>Viewitems</Nav.Link>
    </LinkContainer>
    <LinkContainer to="additems" activeStyle={{color: "white",textDecoration:"none",background:"orange"}}>
    <Nav.Link>Additems</Nav.Link>
    </LinkContainer>
</Nav>
<div>
    <Outlet/>
</div>
</div>)
}

export default Admindashboard