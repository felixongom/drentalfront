import React from "react";
import { NavLink } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import {FaTimes} from "react-icons/fa";
import {useStateContext} from '../assets/js/Context'

function SideBar({admin}) {
  const {sideBarFalse, toggleSideBar} = useStateContext()
 
  return (
    <div className="sidebar_container">
      
      <div className="fixed_sidebar">
        <div className="barner relative">
        <div onClick={()=>toggleSideBar()} className="bg-cyan-500 cursor-pointer absolute rounded-full top-1 right-1">
          <FaTimes/>
        </div>
          <CiDark className="barner_icon" />
          <div className="barner_text">D'RENTALS</div>
        </div>
        {admin.map((link, i) => (
          <div key={i} className="link_list"
          >
            <NavLink  to={`${link.path}`} 
            // className =
              className={`path ${({isActive})=>isActive?'border':''}`}
              onClick={sideBarFalse}
              
              >
              <div>{link.icon}</div>
              <div>{link.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default SideBar;
