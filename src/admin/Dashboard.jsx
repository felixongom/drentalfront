
// import SideNav from '../components/SideNav'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Shouses from '../components/Shouses'
import { Link } from 'react-router-dom'

import { useStateContext } from '../assets/js/Context'
import AdminNavbar from '../components/AdminNavbar'
import AddHouseBtn from '../components/AddHouseBtn'
import LoadingIndicator from '../components/LoadingIndicator'

function Dashboard() {
  const navigate = useNavigate()
  const {instance} = useStateContext()
  const [houses, setHouses] = useState([])
  const [deleted, setDeleted] = useState(0)


 
  
  useEffect(()=>{
    // faction to fetch houses
      instance.post('/api/house/me')
      .then(res=>setHouses(res.data))
  },[deleted, instance]) 

  // deleting house
  const deleteHouse = async(id)=>{
    await instance.delete(`/api/house/delete/${id}`)
    setDeleted(deleted+1)
  } 

  // navigation to house details
  const toHouseDetails = (id)=>{
    navigate(`/admin/houses-details/${id}`)
  }

  // navigation to house update 
  const toHouseUpdate = (id)=>{
    navigate(`/admin/add-houses/${id}`)
  }
  if(!houses) return <LoadingIndicator/>

  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
      <div className="dashboard_body">
          <AdminNavbar navHeader={'My Houses'} />
          <br />
          <Link to={'/admin/bookings'} className='bg-blue-400 py-1 px-3 ml-10 font-semibold'>Bookings</Link> 
          <AddHouseBtn/>
          <Shouses data={houses}  toHouseUpdate={toHouseUpdate} toHouseDetails={toHouseDetails} deleteHouse={deleteHouse}/> 
      </div>
    </div>
  )
}

export default Dashboard