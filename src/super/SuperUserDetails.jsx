import { useState, useEffect } from 'react'
import { Sadmin } from '../assets/js'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideNav'
import SuserDetail from '../components/Suserdetails'

import { useParams } from 'react-router-dom'
import { useStateContext } from "../assets/js/Context";
import LoadingIndicator from '../components/LoadingIndicator'


function SuperUserDetails() {
  const {showSideBar, sinstance} = useStateContext()
  const {id} = useParams()

  const [user, setUser] = useState(null)
  useEffect(()=>{
    sinstance.get(`/api/user/user/${id}`)
    .then(res=>setUser(res.data))
  }, [id, sinstance])

  
  return ( 
    <div className="content">
        {showSideBar && <SideBar admin={Sadmin}/>}
        {!user && LoadingIndicator}
  
        <div className="dashboard_body">
          <Navbar navHeader={'Houses'}/>
          <SuserDetail data ={user}/>
        </div>
      </div>
  )
}

export default SuperUserDetails