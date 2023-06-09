
// import SideNav from '../components/SideNav'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Shouses from '../components/Shouses'
import { Link } from 'react-router-dom'

import { useStateContext } from '../assets/js/Context'
import AdminNavbar from '../components/AdminNavbar'
import AddHouseBtn from '../components/AddHouseBtn'
import LoadingIndicator from '../components/LoadingIndicator'
import Info from '../components/Info'


function Dashboard() {
  const navigate = useNavigate()
  const {instance} = useStateContext()
  const [houses, setHouses] = useState(null)
  const [deleted, setDeleted] = useState(0)
  const [housetobeDelededId, setHouseToBeDeleted] = useState('')


 
  
  useEffect(()=>{
    // faction to fetch houses
      instance.post('/api/house/me')
      .then(res=>setHouses(res.data))
  },[deleted, instance]) 

  // deleting house
  const acceptDeleting = async()=>{
    await instance.delete(`/api/house/delete/${housetobeDelededId}`)
    setDeleted(deleted+1)
    setHouseToBeDeleted('')
  } 
  // deleting house
  const councelDeleting = ()=>{
    setHouseToBeDeleted('')
  } 
  const deleteHouse = async(id)=>{
    setHouseToBeDeleted(id)
  } 

  console.log( housetobeDelededId );
  // navigation to house details
  const toHouseDetails = (id)=>{
    navigate(`/admin/houses-details/${id}`)
  }

  // navigation to house update 
  const toHouseUpdate = (id)=>{
    navigate(`/admin/add-houses/${id}`)
  }
  if(houses===null) return <LoadingIndicator/>

  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
      {housetobeDelededId !== "" &&<Info
        councelDeleting={councelDeleting}
        acceptDeleting={acceptDeleting}
        />}
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