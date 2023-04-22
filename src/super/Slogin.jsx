import { useState } from "react";
import "../admin/scss/loginRegister.scss"
import bg from "../assets/images/bg.jpg";

import {useEffect} from 'react'
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";
import {useStateContext} from '../assets/js/Context'
import {useNavigate} from 'react-router-dom'


function Slogin() {
  const navigate = useNavigate()
  const {sinstance} = useStateContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [err, setError] = useState(false)
  const [loginIndicator, setloginIndicator] = useState(false)

  useEffect(()=>{
    const token = sessionStorage.getItem('sadmintoken')
    // setToken(token)

    if(token===null){
      navigate('/super')
    }else{
      navigate('/super/dashboard')
    }
  },[navigate])

  // function to login
  const Slogin = async(e)=>{
    e.preventDefault()
    setloginIndicator(true)
    
    let res = await sinstance.post('/api/user/login',{email, password, usertype:'super admin'})
      if(res.data.length>40){
        
        // empty the input fields
        setEmail('')
        setPassword('')
        setloginIndicator(false)
        sessionStorage.setItem('sadmintoken', res.data)
        navigate('/super/dashboard')

      }else{
        setError('Incorrect email or password')
        setloginIndicator(false)
      }
    console.log(res.data);
     
  }


  return (
    <div
      className="contact_form_wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="contact_form">
        <div className="user_icon">
          <div>
            <img src={user} alt="" />
          </div>
        </div>
        {err && <div className="bg-red-200 pr-1 pl-1 text-red-500">{err}</div>}

        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className="input_children input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label className={`input_children label trick_label`} style={{top: email.length===0?10:-20}}>
            email
          </label>
        </div>
          <br />
        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className="input_children input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <label className={`input_children label`} style={{top: password.length===0?10:-20}}>
            password
          </label>
        </div>

        <button disabled={loginIndicator?true:false} className={`${loginIndicator?'bg-gray-600':''}`} onClick={Slogin}>Login</button>

        
          <p>
            Don't have accoun't
            <Link to="/admin/register" className="link">
              Register
            </Link>
          </p>
      </form>
    </div>
  );
}

export default Slogin;
