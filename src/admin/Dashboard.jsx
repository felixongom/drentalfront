
// import SideNav from '../components/SideNav'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Shouses from '../components/Shouses'

import { useStateContext } from '../assets/js/Context'
import AdminNavbar from '../components/AdminNavbar'
import AddHouseBtn from '../components/AddHouseBtn'
import LoadingIndicator from '../components/LoadingIndicator'

function Dashboard() {
  const navigate = useNavigate()
  const {instance} = useStateContext()
  const [houses, setHouses] = useState([])
  const [deleted, setDeleted] = useState('')


 
  
  useEffect(()=>{
    // faction to fetch houses
      instance.post(`/api/house/me`)
      .then(res=>setHouses(res.data))
  },[deleted]) 

  // deleting house
  const deleteHouse = async(id)=>{
    const res = await instance.delete(`/api/house/delete/${id}`)
    setDeleted(res.data)
  } 

  // navigation to house details
  const toHouseDetails = (id)=>{
    navigate(`/admin/houses-details/${id}`)
  }

  // navigation to house update
  const toHouseUpdate = (id)=>{
    navigate(`/admin/add-houses/${id}`)
  }

  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
        {!houses && <LoadingIndicator/>}
      <div className="dashboard_body">
          <AdminNavbar navHeader={'My Houses'} />
          <AddHouseBtn/>
          <Shouses data={houses}  toHouseUpdate={toHouseUpdate} toHouseDetails={toHouseDetails} deleteHouse={deleteHouse}/> 
      </div>
    </div>
  )
}

export default Dashboard