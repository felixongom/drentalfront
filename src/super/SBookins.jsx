import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";


import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import { BASE_URL, Sadmin } from "../assets/js";
import Bookings from "../components/Bookings";
import { useEffect, useState } from "react";
import axios from "axios";


function SBookings() {
    const [bookings, setBooking] = useState([])
  // the side bar
    const { showSideBar , headers} = useStateContext();
    useEffect(()=>{
        axios.get(`${BASE_URL}/api/booking`, {headers})
        .then(res=>setBooking(res.data) )
      },[headers])

    return (
      <div className="content">
        {showSideBar && <SideBar admin={Sadmin}/>}
  
        <div className="dashboard_body">
          <Navbar navHeader={'Users'}/>
          <Bookings bookings={bookings}/>
        </div>
      </div>
    );
  }
  
  export default SBookings;