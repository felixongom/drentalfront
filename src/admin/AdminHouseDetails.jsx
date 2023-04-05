import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../assets/js/Context";

import AdminNavbar from "../components/AdminNavbar";
import ShouseData from "../components/ShouseData";
import Shousephotos from "../components/ShousPhotes";
import LoadingIndicator from '../components/LoadingIndicator'

function AdminHouseDetails() {
  const {sinstance } = useStateContext();

  const [singleHouse, setsingleHouse] = useState(null) 
  
  
  const {Hid} = useParams()
  
  // fetch single house and fetch single user
  
  useEffect(()=>{
    sinstance.get(`/api/house/${Hid}`)
    .then(res=>setsingleHouse(res.data))
    
    
  }, [Hid])

  
  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
    {!singleHouse&&<LoadingIndicator/>}
      <div className="dashboard_body">
        <AdminNavbar navHeader={"Details"} />
        <ShouseData data={singleHouse}/>
        <Shousephotos data={singleHouse?singleHouse.images:[]}/>
      </div>
    </div>
  );
}

export default AdminHouseDetails;
