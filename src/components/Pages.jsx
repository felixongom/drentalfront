import React from "react";
import { Route, Routes } from "react-router-dom";

// admin
import Login from "../admin/Login";
import Register from "../admin/Register";
import Dashboard from "../admin/Dashboard";
import AddHouses from "../admin/AddHouses";
import AdminHouseDetails from "../admin/AdminHouseDetails";
// super admin
import Sdasboard from "../super/Sdasboard";
import Slogin from "../super/Slogin";
import Susers from "../super/Susers";
import Sregister from "../super/Sregister";
import Shouses from "../super/Shouses";
import ShousesDetails from "../super/ShouseDetails";
import Pricing from "../super/Pricing";
import SuperUserDetails from "../super/SuperUserDetails";
// client
import Home from "../clients/Home";
import Details from "../clients/HomeDetails";
// import UpdateUser from "../admin/UpdateUser";
import NotFound from "../clients/scss/NotFound";


function Pages() {
  return (
    
    <Routes>
          {/* cliens */}
          <Route path="/" element={<Home />}/>
          <Route path="/detail/:Hid" element={<Details />} />
          

          {/* admins */}
          <Route path="/admin" element={<Login />}/>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path ='/admin/add-houses' element={<AddHouses/>}/>      
          <Route path ='/admin/add-houses/:id' element={<AddHouses/>}/>      
          <Route path ='/admin/houses-details/:Hid' element={<AdminHouseDetails/>}/>      
          <Route path ='/admin/update-user' element={<SuperUserDetails/>}/>      

          {/* super admins */}
          <Route path="super" element={<Slogin />}/>
          <Route path="super/dashboard" element={<Sdasboard />} />  
          <Route path="super/users" element={<Susers />} />  
          <Route path="super/register" element={<Sregister />} />  
          <Route path="super/user-detail/:id" element={<SuperUserDetails />} />  
          <Route path="super/houses" element={<Shouses/>} />  
          <Route path="super/house-details/:Hid/:Uid" element={<ShousesDetails/>} />  
          <Route path="super/pricing" element={<Pricing/>} />  
          <Route path="*" element={<NotFound/>} />  
        </Routes>

  );
}

export default Pages;
