import React, { useEffect, useState } from "react";
import {Route, Routes } from "react-router-dom";

// admin
import Login from "../admin/Login";
import Register from "../admin/Register";
import Dashboard from "../admin/Dashboard";
import AddHouses from "../admin/AddHouses";
import AdminHouseDetails from "../admin/AdminHouseDetails";
import ABookings from "../admin/ABooking";
// super admin
import Sdasboard from "../super/Sdasboard";
import Slogin from "../super/Slogin";
import Susers from "../super/Susers";
import Sregister from "../super/Sregister";
import Shouses from "../super/Shouses";
import ShousesDetails from "../super/ShouseDetails";
import Pricing from "../super/Pricing";
import SuperUserDetails from "../super/SuperUserDetails";
import SBookings from '../super/SBookins'
// client
import Home from "../clients/Home";
import Details from "../clients/HomeDetails";
import NotFound from "../clients/scss/NotFound";


function Pages() {
  const[Admintoken, setAdminLogedIn] = useState(null)
  const[Supertoken, setSuperLogedIn] = useState(null)

  useEffect(()=>{

    setAdminLogedIn(sessionStorage.getItem('admintoken'))
    setSuperLogedIn(sessionStorage.getItem('sadmintoken'))
    console.log(Supertoken);
    console.log(Admintoken);
    
  },[Admintoken, Supertoken])

  

const AdminAuth = (routePage)=>Admintoken!==null?routePage:<Login/> || <Register />
const SuperAuth = (routePage)=>Supertoken!==null?routePage:<Slogin /> || <Sregister />



  return (
    
    <Routes>
          {/* cliens */}
          <Route path="/" element={<Home />}/>
          <Route path="/detail/:Hid" element={<Details />} />
          

          {/* admins */}
          <Route path="/admin" element={AdminAuth(<Login />)}/>
          <Route path="/admin/dashboard" element={AdminAuth(<Dashboard />)} />
          <Route path="/admin/register" element={<Register />} />
          <Route path ='/admin/add-houses' element={AdminAuth(<AddHouses/>)}/>      
          <Route path ='/admin/bookings' element={AdminAuth(<ABookings/>)}/>      
          <Route path ='/admin/add-houses/:id' element={AdminAuth(<AddHouses/>)}/>      
          <Route path ='/admin/houses-details/:Hid' element={AdminAuth(<AdminHouseDetails/>)}/>      
          <Route path ='/admin/update-user' element={AdminAuth(<SuperUserDetails/>)}/>      

          {/* super admins */}
          <Route path="super" element={<Slogin />}/>
          <Route path="super/dashboard" element={SuperAuth(<Sdasboard />)} />  
          <Route path="super/users" element={SuperAuth(<Susers />)} />  
          <Route path="super/register" element={SuperAuth(<Sregister />)} />  
          <Route path="super/register" element={SuperAuth(<Sregister />)} />  
          <Route path="super/update/:id" element={SuperAuth(<Sregister />)} />  
          <Route path="super/user-detail/:id" element={SuperAuth(<SuperUserDetails />)} />  
          <Route path="super/houses" element={SuperAuth(<Shouses/>)} />  
          <Route path="super/bookings" element={SuperAuth(<SBookings/>)} />  
          <Route path="super/house-details/:Hid/:Uid" element={SuperAuth(<ShousesDetails/>)} />  
          <Route path="super/pricing" element={SuperAuth(<Pricing/>)} />  
          <Route path="*" element={<NotFound/>} />  
        </Routes>

  );
}

export default Pages;
