import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import photo from '../assets/images/photo.png'
import { useStateContext } from '../assets/js/Context'
import {toast} from 'react-hot-toast'


function UpdateUser() {
  const {instance} = useStateContext()
    const [photos, setPhoto] = useState(null)

    // 

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')



    const sendPhoto =async ()=>{
        const fd = new FormData()

        if(photos.length===1){
          fd.append('avater', photos[0])
  
          // sending to server
  
          const res = await instance.post('/api/user/avater', fd)
          console.log(res); 
          if(res.status===200){
            toast('Updated')

          } else{
            toast('Error')
          }      

        }


    }

    useEffect(()=>{
      instance.get('/api/user/me')
      .then(res=>{
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.phone)
      })

    },[])

    // choanching other details
    const sendUpdate =async()=>{
      let payload = {name, email, phone}
      const res = await instance.patch('/api/user/', payload)
    }


  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
      <div className="dashboard_body">
          <AdminNavbar navHeader={'Update account'} />
          <div className="card_container">
          <div>
            <h3 className="heading">register super administrator</h3>
            <form className="superadmin_register_form">
              <div>
                <input 
                  value={name}
                  onChange = {(e)=>setName(e.target.value)}
                  placeholder="Username" />
              </div>
              <div>
                <input 
                  value={email}
                  onChange = {(e)=>setEmail(e.target.value)}
                  placeholder="Email" />
              </div>
              <div>
                <input 
                  value={phone}
                  onChange = {(e)=>setPhone(e.target.value)}
                  placeholder="phone" />
              </div>
             
              <button 
                type="button"
                onClick={sendUpdate}
                >Send</button>
            </form>
          </div>
        </div>

        <div className="uploade_photo_container">
            <h3 className="heading">upload user image</h3>
            <div className="upload_userImage">
              <img src={photo} alt=""className='stackimageinput'/>
              <input type='file' onChange ={(e)=>setPhoto(e.target.files)} className='stackimageinput'/>
            </div>
            
          </div>
          <button onClick={()=>sendPhoto()} className='w-20 mt-40 ml-10 cursor-pointer'>Upload</button>
      </div>
    </div>
  )
}

export default UpdateUser