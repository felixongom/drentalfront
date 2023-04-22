import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useParams } from "react-router-dom";

import SideBar from "../components/SideNav";
import Navbar from "../components/Navbar";
import "./scss/register_form.scss";

import photo from '../assets/images/photo.png'

import { useStateContext } from "../assets/js/Context";
import { Sadmin } from "../assets/js";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/js";

function SRegister() {
  const { showSideBar , sinstance, headers} = useStateContext();
  const {id} = useParams()

  
  // 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [Uid, setUid] = useState('')
  const [avater, setAvater] = useState('')
  
  const [registeIndicator, setregisteIndicator] = useState(false)
  const [err, setError] = useState([])
  
  useEffect(()=>{
    if(id){
      axios.get(`${BASE_URL}/api/user/me`, {headers})
      .then(res=>{
        console.log(res.data);
        let data = res.data
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setUid(data._id)
      })
    }
  }, [id, headers])
  // submitting the form
  const submitForm = async ()=>{
    let payload = {
      name, email, password, phone, usertype:'super admin'
    }
    setregisteIndicator(true);
    
    let res;
    if(id===undefined){
      res = await sinstance.post("/api/user/register", payload);
      
    }else{
      res = await sinstance.patch(`/api/user/admin/${Uid}`, payload);

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
        setregisteIndicator(false);
        setError(res.data);
        
      }
    } else {
      setregisteIndicator(false);
    }
    setregisteIndicator(false);
  }
  
  // ading profile picture
  const uploadAvater = async()=>{
    const fd = new FormData()
    fd.append('avater', avater[0])
    console.log(avater[0]);



    const res = await axios.post(`${BASE_URL}/api/user/avater`, fd, {headers})
    if(res.data ==='sent'){
      toast('Successfull')
    }else{
      toast('Please choose an image')
      
    }

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
              {!id && 
              <div>
                <input  value={password} onChange = {(e)=>setPassword(e.target.value)} placeholder="password" />
              </div>
              }
              <button  onClick={()=>submitForm()} type="button">{registeIndicator?'. . .':'Send'}</button>
            </form>
          </div>
        </form>
          <div className="uploade_photo_container">
            <h3 className="heading">upload user image</h3>
            <div className="upload_userImage">
              <img src={photo} alt=""className='stackimageinput'/>
              <input onChange={(e)=>setAvater(e.target.files)} type='file' className='stackimageinput'/>
            </div>
            
            <button onClick={()=>uploadAvater()} className="addUserPhoto">{!id?'Add user image':'change user image'}</button>
        </div>
      </div>
    </div>
  );
}

export default SRegister;
