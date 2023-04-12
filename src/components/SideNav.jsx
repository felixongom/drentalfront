import React from "react";
import { NavLink } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import {useStateContext} from '../assets/js/Context'

function SideBar({admin}) {
  const {sideBarFalse} = useStateContext()
 
  return (
    <div className="sidebar_container">
      <div className="fixed_sidebar">
        <div className="barner">
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
