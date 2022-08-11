import axios from "axios"
import {useState,useEffect} from "react"
import {useSelector} from "react-redux"
import {Row,Col,Card,Button,Spinner} from "react-bootstrap"
import Editstatus from "./Editstatus"
function Deliverystatus(){
let [homeorder,sethomeorder]=useState([])
let [takeawayorder,settakeawayorder]=useState([])
let [adminhome,setadminhome]=useState([])
let [admintake,setadmintake]=useState([])
let [modelshow,setmodelshow]=useState(false)
let [datafetch,setdatafetch]=useState(false)
let [editstatusobj,seteditstatusobj]=useState(null)

let {obj,isuserlogin}=useSelector(state=>state.users)
let {adminobj,isadminlogin}=useSelector(state=>state.admin)

    useEffect(async()=>{
      if(obj!=null){
let response=await axios.get(`http://localhost:5000/user/homeorder/${obj.email}`)
let res=await axios.get(`http://localhost:5000/user/takeawayorder/${obj.email}`)
if(res.data.message=="Take Away Orders"){
  settakeawayorder(res.data.payload)
  }
if(response.data.message=="Home Delivery Orders"){
  sethomeorder(response.data.payload)
}
      }
      
       
   
let adminresponse=await axios.get("http://localhost:5000/admin/homeorder")
let adminres=await axios.get("http://localhost:5000/admin/takeawayorder")

if(adminresponse.data.message=="Home Delivery Orders"){
  setadminhome(adminresponse.data.payload)
}
if(adminres.data.message=="Take Away Orders"){
setadmintake(adminres.data.payload)
}

setdatafetch(false)
    },[obj,adminobj,datafetch])

 
  


  const orderupdate=(itemobj)=>{
    setmodelshow(true)
    seteditstatusobj({...editstatusobj,...itemobj })
}


const afteredit=async(editedobj)=>{
  setmodelshow(false)
  seteditstatusobj(null)
  editedobj._id=editstatusobj._id
  console.log(editedobj)
  let response=await axios.put("http://localhost:5000/admin/updatestatus",editedobj)
  setdatafetch(true)
  
}

const cancelorder = async(cancelobj)=>{
let response=await axios.patch("http://localhost:5000/user/cancelorder",cancelobj)
setdatafetch(true)
}

const removehistory = async(removeobj)=>{
  let response=await axios.delete(`http://localhost:5000/user/removehistory/${removeobj._id}`)
setdatafetch(true)
}

    return(<div style={{backgroundColor:"#EAFBFF"}}>
{
    isadminlogin && 
    <div>
        <div>
        <h2 className="text-center">Update Home Delivery Orders</h2>
        <hr/>
        {
adminhome.length == 0 && 
<h3 className="text-center text-danger mt-3">No Order Items Exist to Update</h3>
        }
        <Row>
        {
adminhome.length !=0 && 

    adminhome.map((obj,index)=><>
    {obj.status != true &&
    <Col md={6} >
      
      <Card key={index} className="mt-3">
    <Card.Body>
      <Card.Title><h4 className="text-center">Order ID : {obj._id}</h4></Card.Title>
      
      <Card.Text>
      <hr/>
      <p className="h6 text-center">Date and Time: {obj.date}</p>
      <br/>
        <Row  className="h6">
        <Col md={6}>Order Mail ID : {obj.email}</Col>
          <Col md={6}>Deliver To : {obj.deliverydetails.address1}{obj.deliverydetails.address2},{obj.deliverydetails.city}</Col>
        </Row>
        <br/>
      <Row className="h4">
            <Col lg={4}>
            <p>Item</p>
            </Col>
            <Col lg={4} className="text-center"><p><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></p></Col>
        <Col lg={4} className="text-center"><p>Total Price</p></Col>
        </Row>
       
      {
          obj.cart.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
      <br/>
      <Row  className="h6">{obj.deliverydetails.description!="" &&
        <Col>Description: {obj.deliverydetails.description}</Col>}
        <Col>Status: {obj.message=="Accept Order" || obj.message=="Order Pending" || obj.message=="Order Preparing" || obj.message=="Order Packing" || obj.message=="On The Way"  ?  <span className="neutral me-2"></span>: <span className="me-2"></span>}
        {obj.message=="Delivered" && <span className="success me-2"></span>}
        {obj.message=="Cancel Order" && <span className="failure me-2"></span>}
        {obj.message}</Col>
      </Row>
      </Card.Text>
      
      <Button variant="warning" onClick={()=>orderupdate(obj)}>Update Order</Button>
    </Card.Body>
  </Card> 

  </Col>
    }
  </> )
}
</Row>
     {/* Edit modal */}
     {editstatusobj !== null &&
                        <Editstatus
                            show={modelshow}
                            statusobj={editstatusobj}
                            onHide={(editedstatusobj) => afteredit(editedstatusobj)}
                        />
                    }
        
        </div>

        <div>
        <h2 className="text-center mt-4">update Take Away Orders</h2>
        <hr/>
        {
admintake.length == 0 && 
<h3 className="text-center text-danger mt-3">No Take Away Items Exist to Update</h3>
        }
        <Row>
        {
admintake.length !=0 && 

    admintake.map((obj,index)=><>
     {obj.status != true &&
  <Col md={6} >
     
      <Card key={index} className="mt-3">
    <Card.Body>
      <Card.Title><h4 className="text-center">Order ID : {obj._id}</h4></Card.Title>
      <Card.Text>
        <hr/>
        <p className="h6 text-center">Date and Time: {obj.date}</p>
        <br/>
        <Row  className="h6"><Col md={12}>Order Mail ID : {obj.email}</Col></Row>
        <br/>
      <Row className="h4">
            <Col lg={4}>
            <p>Item</p>
            </Col>
            <Col lg={4} className="text-center"><p><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></p></Col>
        <Col lg={4} className="text-center"><p>Total Price</p></Col>
        </Row>
       
      { 
          obj.cart.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
      <br/>
      <Row  className="h6">{obj.description!="" &&
        <Col>Description: {obj.description}</Col>}
        <Col>Status: {obj.message=="Accept Order" || obj.message=="Order Pending" || obj.message=="Order Preparing" || obj.message=="Order Packing" || obj.message=="On The Way"  ?  <span className="neutral me-2"></span>: <span className="me-2"></span>}
        {obj.message=="Delivered" && <span className="success me-2"></span>}
        {obj.message=="Cancel Order" && <span className="failure me-2"></span>}
        {obj.message}</Col>
      </Row>
      </Card.Text>
      <Button variant="warning" onClick={()=>orderupdate(obj)}>Update Order</Button>
     
    </Card.Body>
  </Card>

  </Col>
}
</>
    )
}
</Row>
          {/* Edit modal */}
     {editstatusobj !== null &&
                        <Editstatus
                            show={modelshow}
                            statusobj={editstatusobj}
                            onHide={(editedstatusobj) => afteredit(editedstatusobj)}
                        />
                    }
        </div>
        </div>
}





        { isuserlogin &&
        <div>
        <div>
        <h2 className="text-center">Home Delivery Orders</h2>
        <hr/>
        {
homeorder.length == 0 && 
<h3 className="text-center text-danger mt-3">No Order Items Exist</h3>
        }
        <Row>
        {
homeorder.length !=0 && 

    homeorder.map((obj,index)=><Col md={6} ><Card key={index} className="mt-3">
    <Card.Body>
      <Card.Title><h4 className="text-center">Order ID : {obj._id}</h4></Card.Title>
      <Card.Text>
        <hr/>
        <p className="h6 text-center">Date and Time: {obj.date}</p>
        <br/>
        <Row className="h6">
          <Col md={8}>Deliver To : {obj.deliverydetails.address1}{obj.deliverydetails.address2},{obj.deliverydetails.city}</Col>
          <Col md={4}>Deliver Time : 45 MIN</Col>
        </Row>
        <br/>
      <Row className="h4">
            <Col lg={4}>
            <p>Item</p>
            </Col>
            <Col lg={4} className="text-center"><p><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></p></Col>
        <Col lg={4} className="text-center"><p>Total Price</p></Col>
        </Row>
       
      {
          obj.cart.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
     
      <br/>
      <Row className="h6"><Col>Status: {obj.message=="Accept Order" || obj.message=="Order Preparing" || obj.message=="Order Packing" || obj.message=="On The Way" || obj.message=="Order Pending" ?  <span className="neutral me-2"></span>: <span className="me-2"></span>}
        {obj.message=="Delivered" && <span className="success me-2"></span>}
        {obj.message=="Cancel Order" && <span className="failure me-2"></span>}
        {obj.message}</Col></Row>
     
      </Card.Text>
      {obj.message=="Order Pending" || obj.message=="Accept Order" ?
      <Button variant="danger" onClick={()=>cancelorder(obj)}>Cancel Order</Button> : ""    
}
{
        obj.status == true && <Button variant="danger" className="d-block ms-auto" onClick={()=>removehistory(obj)}>Remove History</Button>
      }
    </Card.Body>
  </Card>
  </Col>
    )
}
</Row>
        
        </div>

        <div>
        <h2 className="text-center mt-4">Take Away Orders</h2>
        <hr/>
        {
takeawayorder.length == 0 && 
<h3 className="text-center text-danger mt-3">No Take Away Items Exist</h3>
        }
        <Row>
        {
takeawayorder.length !=0 && 

    takeawayorder.map((obj,index)=><Col md={6} ><Card key={index} className="mt-3">
    <Card.Body>
      <Card.Title><h4 className="text-center">Order ID : {obj._id}</h4></Card.Title>
      <Card.Text>
        <hr/>
        <p className="h6 text-center">Date and Time: {obj.date}</p>
        <br/>
      <Row className="h4">
            <Col lg={4}>
            <p>Item</p>
            </Col>
            <Col lg={4} className="text-center"><p><Row><Col>Item Price</Col><Col></Col><Col>Item Qty</Col></Row></p></Col>
        <Col lg={4} className="text-center"><p>Total Price</p></Col>
        </Row>
       
      {
          obj.cart.map((obj,index)=><Row>
              <Col>{obj.dishname}</Col>
              <Col className="text-center"><Row><Col>₹{obj.price}</Col><Col>*</Col><Col>{obj.quantity}qty</Col></Row></Col>
              <Col className="text-center">₹{obj.price*obj.quantity}/-</Col>
          </Row>
          
          )
      }
      <br/>
      <Row className="h6"><Col>Status: {obj.message=="Accept Order" || obj.message=="Order Pending" || obj.message=="Order Preparing" || obj.message=="Order Packing" || obj.message=="On The Way"  ?  <span className="neutral me-2"></span>: <span className="me-2"></span>}
      {obj.message=="Delivered" && <span className="success me-2"></span>}
      {obj.message=="Cancel Order" && <span className="failure me-2"></span>}
      {obj.message}</Col></Row>
      </Card.Text>
      {obj.message=="Order Pending" || obj.message=="Accept Order" ?
      <Button variant="danger" onClick={()=>cancelorder(obj)}>Cancel Order</Button> : ""
}
{
        obj.status == true && <Button variant="danger" className="d-block ms-auto" onClick={()=>removehistory(obj)}>Remove History</Button>
      }
    </Card.Body>
  </Card>
  </Col>
    )
}
</Row>
        
        </div>
        </div>

}
    </div>)
}

export default Deliverystatus