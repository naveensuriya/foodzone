import axios from "axios"
import { useEffect, useState } from "react"
import {Row,Col,Button,Card, Container} from "react-bootstrap"
import Edititems from "./Edititems"

function Viewitems(){
    let [items, setitems] = useState([])
    let [modelshow,setmodelshow]=useState(false)
    let [edititemobj,setedititemobj]=useState(null)
    let [datafetch,setdatafetch]=useState(false)
    let [itemdelete,setitemdelete]=useState(false)
    

    useEffect(async () => {
        
        let res = await axios.get("http://localhost:5000/admin/viewitems")
        let data = res.data
        if(data.message=="item list"){
            setitems(data.payload)
            setdatafetch(false)
            setitemdelete(false)
            
        }
       
    }, [datafetch,itemdelete])

      //on edit is clicked 
      const seteditobj=(itemobj)=>{
        setmodelshow(true)
        setedititemobj({...edititemobj,...itemobj })
    }

    const deleteobj=async(obj)=>{
        let response=await axios.delete(`http://localhost:5000/admin/delete/${obj._id}`)
        setitemdelete(true)
        alert(response.data.message)
    
    }

    const afteredit=async(editedobj)=>{
        setmodelshow(false)
        setedititemobj(null)
        editedobj._id=edititemobj._id
        let response=await axios.put("http://localhost:5000/admin/save-editeditem",editedobj)
        setdatafetch(true)
        
    }


    return(<div>
        <Container>
        <Row>
        {
            items.length==0 && <h2 className="text-danger mt-5 text-center">No Items found</h2>
        }

        { items.length!=0 &&
            items.map((obj, index) =><Col sm={12} md={6} lg={4} >
             <Card style={{ width: '18rem' }} className="mt-3">
            <Card.Img variant="top" src={obj.dishimage} />
            <Card.Body>
              <Card.Title className="text-center">{obj.dishname}</Card.Title>
              <Card.Text>
               <p>{obj.description}</p>
               <Row>
                   <Col>
                  <h6> Price: ₹{obj.price}/-</h6>
                   </Col>
                   <Col>
                   <h6>Quantity: {obj.quantity}</h6>
                   </Col>
               </Row>
              </Card.Text>
              <Button variant="warning" onClick={()=>seteditobj(obj)}>Edit</Button>
              <Button variant="danger" className="ms-4" onClick={()=>deleteobj(obj)}>Remove</Button>
            </Card.Body>
          </Card>
          </Col>
            )
        }
        </Row>
        </Container>
         {/* Edit modal */}
         {edititemobj !== null &&
                        <Edititems
                            show={modelshow}
                            itemObj={edititemobj}
                            onHide={(editeditemobj) => afteredit(editeditemobj)}
                        />
                    }
        </div>)
}

export default Viewitems