import { useEffect, useState } from "react";

import { Sadmin } from "../assets/js";
import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";
import SprogrssBar from "../components/SprogrssBar";


import { FiUsers, FiHome } from "react-icons/fi";
import { FaMoneyBill, FaTimesCircle } from "react-icons/fa";

import "./scss/sidenav.scss";
import "./scss/dashboard_cards.scss";
import { useStateContext } from "../assets/js/Context";
import SpopularCustomers from "../components/SpopularCustomers";

function Sdasboard() {
  const { showSideBar, superAllHouses,sinstance } = useStateContext();

  const [allUsers, setAllUers]= useState([])
  
  const visibleHouses = superAllHouses.filter(el=>el.approve===true&&el.active===true&&el.deleted===false).length
  const activeHouses = superAllHouses.filter(el=>el.active===true).length
  
  // lodge count
  const lodgesCount = superAllHouses.filter(el=>el.type==='lodge').length
  
  // rental count
  const rentalCount = superAllHouses.filter(el=>el.type==='rental').length
  
  // percentage calculation
  const lodges = (lodgesCount/superAllHouses.length)*100 
  const rentals = (rentalCount/superAllHouses.length)*100 
  const other = 100-(lodges+rentals)


  // progrsss bar daa
  const progressdata = [
    {
      type:'Rentals',
      value:rentals?Math.ceil( rentals):0,
      color:'#f26367',

    },
    {
      type:'Lodges',
      value:lodges?Math.ceil(lodges):0,
      color:'  #33bbff',
      

    }, 
    {
      type:'Others',
      value:other?Math.floor(other):0,
      color:'#ace600',


    }
  ]

  useEffect(()=>{
    const getUser = async()=>{
      let res = await sinstance.get('/api/user')
      setAllUers(res.data)
    }
    getUser()

  }, [sinstance])
  
const userCount = allUsers.length

  return (
    <div className="content">
      {showSideBar && <SideBar admin={Sadmin} />}
      <div className="dashboard_body">
        <Navbar navHeader={'Dashboard'}/>
        <div className="card_container justify-between">
          <div className=" Admincard card1">
            <FiUsers className="card_icons" />
            <div>
              <h5>active users</h5>
              <h2>{userCount<10?"0"+userCount.toString():userCount}</h2>
            </div>
          </div>
          <div className="Admincard card2">
            <FiHome className="card_icons" />
            <div>
              <h5>visible houses</h5>
              <h2>{visibleHouses<10?'0'+visibleHouses.toString():visibleHouses}</h2>
            </div>
          </div>
          <div className="Admincard card3">
            <FaMoneyBill className="card_icons" />
            <div>
              <h5>payed houses</h5>
              <h2>{activeHouses<9?'0'+activeHouses.toString():activeHouses}</h2>
            </div>
          </div>
          <div className="Admincard card4">
            <FaTimesCircle className="card_icons" />
            <div>
              <h5>unapproved houses</h5>
              <h2>{superAllHouses.length-visibleHouses}</h2>
            </div>
          </div>
        </div>

        {/* progrssbar for rentals and lodges */}
        <SprogrssBar  data={progressdata}/>
        <SpopularCustomers/>
      </div>
    </div>
  );
}

export default Sdasboard;
