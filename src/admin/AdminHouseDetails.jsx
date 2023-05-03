import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../assets/js/Context";

import AdminNavbar from "../components/AdminNavbar";
import ShouseData from "../components/ShouseData";
import Shousephotos from "../components/ShousPhotes";
import LoadingIndicator from '../components/LoadingIndicator'
import toast from "react-hot-toast";

function AdminHouseDetails() {
  const {sinstance } = useStateContext();

  const [singleHouse, setsingleHouse] = useState(null) 
  const [deleteNotifier, setDeleteNotifier] = useState(0);

  
  
  const {Hid} = useParams()
  
  // fetch single house and fetch single user
  
  useEffect(()=>{
    sinstance.get(`/api/house/${Hid}`)
    .then(res=>setsingleHouse(res.data))
    
    
  }, [Hid, sinstance])

    // deleting photes of the houses
    const deletePhoto = async (name) => {
      // indexOf()
      const _name = name.slice(name.indexOf("/IMAGE") + 1);
      const res = await sinstance.delete(`/api/modify/image/${Hid}/${_name}`);
      if (res.status === 200) {
        toast("deleted");
        setDeleteNotifier(deleteNotifier + 1);
      } else {
        toast("tere was an error");
      }
    };

  
  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
    {singleHouse===null&&<LoadingIndicator/>}
      <div className="dashboard_body">
        <AdminNavbar navHeader={"Details"} />
        <ShouseData data={singleHouse}/>
        <Shousephotos deletePhoto ={deletePhoto} data={singleHouse?singleHouse.images:[]}/>
      </div>
    </div>
  );
}

export default AdminHouseDetails;
