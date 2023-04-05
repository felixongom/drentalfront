import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useParams } from "react-router-dom";

import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";
import "./scss/register_form.scss";

import photo from '../assets/images/photo.png'

import { useStateContext } from "../assets/js/Context";
import { Sadmin } from "../assets/js";

function SRegister() {
  const { showSideBar , sinstance} = useStateContext();
  const {id} = useParams()

  // 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const [registeIndicator, setregisteIndicator] = useState(false)
  const [err, setError] = useState([])

  // submitting the form
  const submitForm = async ()=>{
    let payload = {
      name, email, password, phone, usertype:'super admin'
    }
    setregisteIndicator(true);
    
    let res;
    console.log(id);
    if(id===undefined){
      res = await sinstance.post("/api/user/register", payload);
      
    }else{
      res = await sinstance.patch(`/api/user/admin/${id}`, payload);

    }
    
    
    if (res.status === 200) {
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      
      // navigate
      setregisteIndicator(false);
      id?toast('updatea'):toast('registered')
      
      if(res.status !==200){
        setError(res.data);
        
      }
    } else {
      setregisteIndicator(false);
    }
    setregisteIndicator(false);
  }
  

  return (
    <div className="content">
      {showSideBar && <SideBar admin={Sadmin}/>}
      <div className="dashboard_body">
        <Navbar navHeader={'Add Admin'}/>
        <form  className="card_container">
          <div>
            <h3 className="heading">
              {id?'update':'register'} super administrator</h3>
          {err && err.map((item, i)=>(
            <div className="bg-red-300 mt-1 p-1 capitalize" key={i}>{item}</div>
          ))}
            <form className="superadmin_register_form">
              <div>
                <input value={name} onChange = {(e)=>setName(e.target.value)} placeholder="Username" />
              </div>
              <div>
                <input value={email} onChange = {(e)=>setEmail(e.target.value)}  placeholder="Email" />
              </div>
              <div>
                <input value={phone} onChange = {(e)=>setPhone(e.target.value)}  placeholder="phone" />
              </div>
              <div>
                <input  value={password} onChange = {(e)=>setPassword(e.target.value)} placeholder="password" />
              </div>
              <button  onClick={()=>submitForm()} type="button">{registeIndicator?'. . .':'Send'}</button>
            </form>
          </div>
        </form>
        {/* <div className="card_container"> */}
          <div className="uploade_photo_container">
            <h3 className="heading">upload user image</h3>
            <div className="upload_userImage">
              <img src={photo} alt=""className='stackimageinput'/>
              <input type='file' className='stackimageinput'/>
            </div>
            
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SRegister;
