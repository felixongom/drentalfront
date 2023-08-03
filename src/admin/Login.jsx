import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import "./scss/loginRegister.scss";
import bg from "../assets/images/bg.jpg";
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";
import { useStateContext } from "../assets/js/Context";


function Login() {
  const {instance} = useStateContext()
const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [loginIndicator, setloginIndicator] = useState(false)
  const [tokenn, setTokenn] = useState(false)
const [error, setError] = useState(null)

  useEffect(()=>{
    const token = sessionStorage.getItem('admintoken')
    setTokenn(token)

    if(token!==null){
      navigate('/admin/dashboard')
    }else{
      navigate('/admin')
    }
    

  },[tokenn,navigate])
  


  const payload = {
      email,
      password,
      usertype: "admin"
}

  // function to login
  const Login = async (e)=>{
    e.preventDefault()
    setloginIndicator(true)
    
    instance.post('/api/user/login',payload)
    .then(res=>{
      if(res.data.length>20){
        sessionStorage.setItem('admintoken',res.data)
        // navigate('/admin/dashboard')
        window.location.href='/admin/dashboard'

        // empty the input fields
        setEmail('')
        setPassword('')

      }else{
        setError('Incorrect email or password')
        setloginIndicator(false)
      }
    })
     
  }


  return (
    <div
      className="contact_form_wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="contact_form" onSubmit={Login}>
        <div className="user_icon">
          <div>
            <img src={user} alt="" />
          </div>
        </div>

        {error!==null && (
          <p className="text-blue-600 capitalize bg-red-300 p-1 text-sm ">{error}</p>
        )}
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

        <button disabled={loginIndicator ? true : false}
          style={{backgroundColor:loginIndicator?'gray':''}}
        >
          {loginIndicator?'. . .':'Login'}
          </button>

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

export default Login;
