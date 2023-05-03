import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";

import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import { Sadmin } from "../assets/js";
import Superhouses from "../components/SuperHouses";
import Info from "../components/Info";



function Susers() {
  const { showSideBar, councelDeleting,
    acceptDeleting, deleteHouseId  } = useStateContext();

  return (
    <div className="content">
       {deleteHouseId !== "" &&<Info
        councelDeleting={councelDeleting}
        acceptDeleting={acceptDeleting}
        />}
      
        {showSideBar && <SideBar admin={Sadmin}/>}
  
        <div className="dashboard_body">
          <Navbar navHeader={'Houses'}/> 
          <Superhouses/>
        </div>
      </div>
    );
  }
  
  export default Susers;