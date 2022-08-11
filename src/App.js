import {Routes,Route} from "react-router-dom"
import Login from "./component/Login";
import Signup from "./component/Signup"
import Header from "./component/Header";
import Home from "./component/Home";
import Cart from "./component/Cart"
import Deliverystatus from "./component/Deliverystatus";
import Admindashboard from "./component/Admindashboard";
import Additems from "./component/Additems"
import Viewitems from "./component/Viewitems"
import Viewprofile from "./component/Viewprofile"
import Payment from "./component/Payment"



function App() {
  return (<div>
    <div className="main" >
<Header/>
</div>
<Routes>
        <Route path="" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="viewprofile" element={<Viewprofile/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="admindashboard" element={<Admindashboard/>}>
          <Route path="additems" element={<Additems/>}/>
          <Route path="viewitems" element={<Viewitems/>}/>
          </Route>
        <Route path="cart" element={<Cart/>}/>
        <Route path="payment" element={<Payment/>}/>
        <Route path="delivery" element={<Deliverystatus/>}/>
      </Routes>
    </div>
  );
}

export default App;
