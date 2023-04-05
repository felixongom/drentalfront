import {useState, useEffect} from 'react'

import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";

import "./scss/sidenav.scss";
import { useStateContext } from "../assets/js/Context";
import { Sadmin } from "../assets/js";
import toast from 'react-hot-toast';

function Pricing() {
  const { showSideBar, sinstance } = useStateContext();
  const [price, setPrice] = useState(0)
  const [change, setChange] = useState(0)

  // fetchin to see if it has been adda before
  useEffect(()=>{
    sinstance.get('/api/price')
    .then(res=>setPrice(res.data.price))
  },[change])

  const sendPrice = async ()=>{
    if (price>0){
      sinstance.post('/api/price', {price})
      .then(res =>{
        toast('Price changed')
        setChange(change+1)
      } )
    }
  }

  return (
    <div className="content">
      {showSideBar && <SideBar admin={Sadmin} />}

      <div className="dashboard_body">
        <Navbar navHeader={'Add pricing'}/>

        <div className="card_container">
          <div action="">
            <h1 className="font-bold capitalize">adding princing that customers pays in 30 days</h1>
            <div className=" mt-2 mb-3 bottom-2 ">
              <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" className="h-10 border-2 borde-orange" /> Per month <br />
            </div>
              <button onClick={()=>sendPrice()} className="mt-1">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
