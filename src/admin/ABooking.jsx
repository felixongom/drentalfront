
import { useStateContext } from "../assets/js/Context";
import { BASE_URL } from "../assets/js";
import Bookings from "../components/Bookings";
import { useEffect, useState } from "react";
import axios from "axios";
import AddHouseBtn from "../components/AddHouseBtn";
import AdminNavbar from "../components/AdminNavbar";


function ABookings() {
    const [bookings, setBooking] = useState(null)
  // the side bar
    const {Aheaders} = useStateContext();
    useEffect(()=>{
        axios.get(`${BASE_URL}/api/booking`, {headers:Aheaders})
        .then(res=>setBooking(res.data) )
    },[Aheaders])    
 
    return (
    <div className="content">  
      <div className="dashboard_body">
          <AdminNavbar navHeader={'Bookings'} />  
          <AddHouseBtn/>
          <Bookings bookings={bookings}/>
        </div>
    </div>
    );
  }
  
  export default ABookings;