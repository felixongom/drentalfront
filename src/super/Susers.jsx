import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";


import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import Scustommers from "../components/Scustommers";
import { Sadmin } from "../assets/js";


function Susers() {
  // the side bar
    const { showSideBar } = useStateContext();
 
  
    return (
      <div className="content">
        {showSideBar && <SideBar admin={Sadmin}/>}
  
        <div className="dashboard_body">
          <Navbar navHeader={'Users'}/>
          
          <Scustommers />
        </div>
      </div>
    );
  }
  
  export default Susers;