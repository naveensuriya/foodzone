import {useState} from 'react'
import {Form,Row,Col,Button} from "react-bootstrap"
import {useNavigate} from "react-router"
function Payment(){

    let [selectedradio,setselectedradio]=useState("")
    let navigate=useNavigate()
    const handleradioselect=(e)=>{
        if(e.target.value=="Debit Card/Credit Card"){
          setselectedradio("debit")
        }else if(e.target.value=="UPI"){
          setselectedradio("upi")
        }else {
          setselectedradio("cod")
        }
      }

const onformsubmit=()=>{
navigate("/delivery")
}

    return(<div>
       <Form className="w-50 mx-auto mt-5 p-5" style={{backgroundColor:"#FED43F"}}>
           <h2 className='mt-4 text-center'>Select Payment Method</h2>
           <div className='mt-5 mb-4'>
           <Form.Check 
        type="radio"
        name="payment"
        value="Cash On Delivery"
        label="Cash On Delivery"
        onChange={handleradioselect}
      />
     
           </div>
           <div className='mb-4'>
           <Form.Check 
        type="radio"
        name="payment"
        value="Debit Card/Credit Card"
        label="Debit Card/Credit Card"
        onChange={handleradioselect}
      />
      { selectedradio=="debit" &&
          <Form className="w-50 mx-auto mt-3">
              <Form.Group className="mb-3" controlId="formGridcardnumber">
            <Form.Label>Card Number (16 Digit Number)</Form.Label>
            <Form.Control type="number" placeholder="0000 0000 0000 0000" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridexpiry">
              <Form.Label>Expiry In</Form.Label>
              <Form.Control type="number" placeholder="MM/YY" />
            </Form.Group>
        
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="password" placeholder="CVV" />
            </Form.Group>
          </Row>
        
          
        
          <Form.Group className="mb-3" controlId="formGridcardname">
            <Form.Label>Name on the Card</Form.Label>
            <Form.Control type="text" placeholder="XXXXXXX" />
          </Form.Group>
        
          
         
        </Form>
      }
     
           </div>

           <div className='mb-4'>
           <Form.Check 
        type="radio"
        name="payment"
        value="UPI"
        label="UPI"
        onChange={handleradioselect}
      />
     { selectedradio=="upi" &&
       <Form className="w-50 mx-auto mt-3">
           <Form.Group className="mb-3" controlId="formGridupi">
            <Form.Label>Enter UPI ID</Form.Label>
            <Form.Control type="text" placeholder="xxxx@paytm" />
          </Form.Group>
       </Form>
     }
           </div>

           <Button variant="primary" type="submit" className="d-block mx-auto" onClick={()=>onformsubmit()}>
    Pay Now
  </Button>
           </Form>
    </div>)
}

export default Payment