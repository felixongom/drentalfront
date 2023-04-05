import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";

import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import { Sadmin } from "../assets/js";
import Superhouses from "../components/SuperHouses";


function Susers() {
  const { showSideBar } = useStateContext();

  
  return (
    <div className="content">
      
        {showSideBar && <SideBar admin={Sadmin}/>}
  
        <div className="dashboard_body">
          <Navbar navHeader={'Houses'}/>
          
          <Superhouses/>
        </div>
      </div>
    );
  }
  
  export default Susers;