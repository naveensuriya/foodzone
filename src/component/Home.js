import axios from "axios"
import { useEffect, useState } from "react"
import {Row,Col,Button,Card, Container,Spinner} from "react-bootstrap"
import {useNavigate} from "react-router"
import {useDispatch,useSelector} from 'react-redux'
import { cartlist } from "../slices/cartSlice"
import Homedish from "./Homedish"
import {FiFilter} from "react-icons/fi"
import {Carousel} from "react-bootstrap"
import Footer from "./Footer"

function Home(){
    let [items, setitems] = useState([])
    let [filter,setfilter]=useState("no filter")
    const [search, setsearch] = useState("")
    let {obj}=useSelector(state=>state.users)
    let {cartobj}=useSelector(state=>state.cart)
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let [quantity,setquantity]=useState(1)
    let [searchitem,setsearchitem]=useState([])

    
       

    useEffect(async () => {
        
        let res = await axios.get("http://localhost:5000/admin/viewitems")
        let data = res.data
        if(data.message=="item list"){
            setitems(data.payload)    
        }
        let response=await axios.get(`http://localhost:5000/user/dish?dishname=${search}`)
      if(response.data.message=="data searched successfully"){
        setsearchitem(response.data.payload)
      }
      
    }, [search])

    let briyani=items.filter(v => v.category == 'briyani')
    let juice=items.filter(v => v.category == 'juice')
    let sweet=items.filter(v => v.category == 'sweet')
    let icecream=items.filter(v => v.category == 'icecream')
    let friedrice=items.filter(v => v.category == 'friedrice')
    let starters=items.filter(v => v.category == 'starters')
    let cakes=items.filter(v => v.category == 'cakes')
    let tiffen=items.filter(v => v.category == 'tiffen')

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
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.madrascurrycup.com/images/grab-now/Offer-ad.jpg"
      alt="First slide"
      height="420px"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.madrascurrycup.com/images/grab-now/25%20off%20(1).jpg"
      alt="Second slide"
      height="420px"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.madrascurrycup.com/images/grab-now/Com%20as%208%20pay%20for%207.jpg"
      alt="Third slide"
      height="420px"
    />
  </Carousel.Item>
</Carousel>
         <div>
        <input 
        
                    type="text" 
                    placeholder="Search by Dish Name"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className="form-control w-50 mx-auto mt-3"/>
                     <div className="dropdown d-block float-end me-5">

<button className="btn btn-secondary dropdown-toggle  mb-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

    Filter <FiFilter className="ms-1" />

</button>
<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className="dropdown-item" onClick={()=>setfilter("no filter")}>No Filter</li>
    <li className="dropdown-item" onClick={()=>setfilter("briyani")}>Briyani</li>
    <li className="dropdown-item" onClick={()=>setfilter("juice")}>Juice</li>
    <li className="dropdown-item" onClick={()=>setfilter("sweet")}>Sweet</li>
    <li className="dropdown-item" onClick={()=>setfilter("icecream")}>Ice Cream</li>
    <li className="dropdown-item" onClick={()=>setfilter("friedrice")}>Fried Rice</li>
    <li className="dropdown-item" onClick={()=>setfilter("starters")}>Starters</li>
    <li className="dropdown-item" onClick={()=>setfilter("cakes")}>Cakes</li>
    <li className="dropdown-item" onClick={()=>setfilter("tiffen")}>Tiffen</li>
</ul>

</div>
        </div>
       <Container>
    
        {
            items.length==0 && <Spinner animation="border" className="d-block mx-auto"/>
        }

        { items.length!=0 && <>
           
{ search=="" &&
<>
{ filter=="no filter" || filter=="briyani" ?
<Homedish dish={briyani}>
    <h1>Briyani</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="juice" ?
<Homedish dish={juice}>
    <h1>Juice</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="sweet" ?
<Homedish dish={sweet}>
    <h1>Sweet</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="icecream" ?
<Homedish dish={icecream}>
    <h1>Ice Cream</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="friedrice" ?
<Homedish dish={friedrice}>
    <h1>Fried Rice and Noodles</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="starters" ?
<Homedish dish={starters}>
    <h1>Starters</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="cakes" ?
<Homedish dish={cakes}>
    <h1>Cakes</h1>
</Homedish>:""
}
{ filter=="no filter" || filter=="tiffen" ?
<Homedish dish={tiffen}>
    <h1>Tiffen</h1>
</Homedish>:""
}
</>
}
{
    search !="" &&
    <>
    <Row>
        {
            searchitem.length==0 && <h2 className="text-danger mt-5 text-center">No Items found in this Name</h2>
        }

        { searchitem.length!=0 &&
            searchitem.map((obj, index) =><Col sm={12} md={6} lg={4} >
            <Card style={{ width: '18rem' }} className="mt-3">
               
                
           <Card.Img variant="top" className="img" src={obj.dishimage} />
           {obj.quantity==0 &&
           <p className="overlay h4">Out Of Stock</p>
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
             <Button variant="success"  onClick={()=>additem(obj,quantity)}>Add to Cart</Button>
        }
        {obj.quantity==0 &&
             <Button variant="success" disabled onClick={()=>additem(obj,quantity)}>Add to Cart</Button>
        }
           </Card.Body>
         </Card>
         </Col>)
        }
        </Row>

    </>
}
</>
        }

        </Container> 
        <div>
        <Footer/>
      </div>

    </div>)
}

export default Home