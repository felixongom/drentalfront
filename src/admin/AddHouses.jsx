import React, { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useStateContext } from '../assets/js/Context'
import {toast} from 'react-hot-toast'
import AdminNavbar from "../components/AdminNavbar";
import {useParams} from 'react-router-dom'

function AddHouses() {
  const {id} = useParams()
  const {instance} = useStateContext()

  // collecting the form
  const [name, setName] = useState('')
  const [type, setType] = useState('lodge')
  const [phone, setPhone] = useState('')
  const [services, setServices] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState('')
  
  //  address
  const [region, setRegion] = useState('Northern')
  const [district, setDistrict] = useState('')
  const [town, setTown] = useState('')
  const [subcounty, setSubcounty] = useState('')
  const [parish, setParish] = useState('')
  const [village, setVillage] = useState('')
  const [street, setStreet] = useState('')


  // prices
  const [price1, setPrice1] = useState(null)
  const [per1, setPer1] = useState('')
  
  const [price2, setPrice2] = useState(null)
  const [per2, setPer2] = useState('')
  
  const [price3, setPrice3] = useState(null)
  const [per3, setPer3] = useState('')

  const [price4, setPrice4] = useState(null)
  const [per4, setPer4] = useState('')
  
  // show price onclick
  const [counter, setCounter] = useState(1)
  const [sending, setSending]= useState(false)
  
  //buy clicking on the plass button
  // const increasCounter => 
  
  const formData = ()=>{
  const fd = new FormData()
  
  // appending all images to fd
  for (let img of images){
    fd.append('files', img)
  }
  
  // adding other fields to fd

  fd.append('name', name)
  fd.append('type', type)
  fd.append('phone', phone)
  fd.append('services', services)
  fd.append('description', description)
  // 
  fd.append('region', region)
  fd.append('district', district)
  fd.append('town', town)
  fd.append('subcounty', subcounty)
  fd.append('parish', parish)
  fd.append('village', village)
  fd.append('street', street)
  
    fd.append('price1', price1)
    fd.append('per1', per1)

    fd.append('price2', price2)
    fd.append('per2', per2)

    fd.append('price3', price3)
    fd.append('per3', per3)

    fd.append('price4', price4)
    fd.append('per4', per4)

    

  return fd
}

// usereffect to get the house we gaonna update
useEffect(()=>{
  instance.get(`/api/house/${id}`)
  .then(res=> {
    let H = res.data
    if(id!==undefined){
      setName(H.name)
      setType(H.type)
      setDescription(H.description)
      setPhone(H.phone.toString())
      const services = H.services.map((s)=>s.service)
      setServices(services.toString())

      // address
      const address = H.address

      setRegion(address.region)
      setDistrict(address.district)
      setTown(address.town)
      setSubcounty(address.subcounty)
      setParish(address.parish)
      setVillage(address.parish)
      setStreet(address.street)

      // pricess
      const P =H.prices
      setPrice1(P[0].price1)
      setPer1(P[0].per1)

      setPrice2(P[1].price2)
      setPer2(P[1].per2)

      setPrice3(P[2].price3)
      setPer3(P[2].per3)

      setPrice4(P[3].price4)
      setPer4(P[3].per4)


        
      }
  } 
)}, [id, instance])


// sending request if the params id exist
  const sendData = async ()=>{
    setSending(true)
    let __res=''
    if(id===undefined){
      const res = await instance.post('/api/house', formData())
      __res =res
    }else{
      const res = await instance.put(`/api/house/${id}`, formData())
      __res =res
      

    }
    setSending(false)

  if(__res.status===200){
    toast('Updated successfully') 
    setSending(false)
  }else{
    toast('There was an error')
    setSending(false)
  }
    
  }


 
  
  return (
    <div className="content">
      {/* {showSideBar && <SideNav admin={Admin}/>} */}
      <div className="dashboard_body">
        <AdminNavbar navHeader={"Add Houses"} admin = 'admin' />
        <div className="card_container">
          <div>
            <h1 className="font-bold capitalize text-teal-500 text-md">
              add house
            </h1>
            <div className="pt-2">
              <small className="text-black-300 font-bold pb-2">
                House name
              </small>
              <br />
              <input
                type="text"
                id="house_name"
                value={name}
                onChange ={(e)=>setName(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>
            <div className="pt-2">
              <small className="text-black-300 font-bold pb-2">
                House type 
              </small>

              <br />
              <input
                type="radio"
                id="house_name"
                value={'lodge'}
                name='type'

                onChange ={(e)=>setType(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                /> Logde <span className="w-full"> </span>
              <input
                type="radio"
                id="house_name"
                value={'rental'}
                name='type'
                onChange ={(e)=>setType(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              /> Rental
            </div>
            <div className="pt-2 mt-2">
              <small className="text-black-300 font-bold pb-2">
                House phone
              </small>
              <br />
              <input
                type="text"
                placeholder="0773849825, 07749624662"
                value={phone}
                onChange ={(e)=>setPhone(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>
            <div className="pt-2 mt-3">
              <small className="text-black-300 font-bold pb-2">
                Services provided
              </small>
              <br /> 
              <input
                type="text"
                placeholder="water, wi-fi, electricity"
                value={services}
                onChange ={(e)=>setServices(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>
            <div className="pt-2 mt-3">
              <small className="text-black-300 font-bold pb-2">
                House description
              </small>
              <br />
              <textarea 
                value={description}
                onChange ={(e)=>setDescription(e.target.value)}
                className="bg-black outline text-white rounded h-200 p-1"></textarea>
            </div>
            <div className="pt-2">
              <small className="text-black-300 font-bold pb-2">
                House images
              </small>
              <br />
              <input type="file" 
                onChange ={(e)=>setImages(e.target.files)}
                multiple />
            </div>
          </div>

          <div>
            <h1 className="font-bold capitalize text-teal-500 text-md">
              House address
            </h1>
            <small className="text-gray-500">
              You may not fill all the fills
            </small>
            <div className="pt-2">
              <small className="text-black-300 font-bold pb-2">Region</small>
              <br />
              <select className="mt-3 mb-3" 
              value={region}
                onChange={(e)=>setRegion(e.target.value)}
                >
                  <option >Northern</option>
                  <option >Eastern</option>
                  <option >Western</option>
                  <option >Central</option>
 
              </select>
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">District</small>
              <br />
              <input
                type="text"
                placeholder="Lira"
                value={district}
                onChange = {(e)=>setDistrict(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">
                Town / City
              </small>
              <br />
              <input
                type="text"
                placeholder="Gulu"
                value={town}
                onChange ={(e)=>setTown(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">
                Sub-county
              </small>
              <br />
              <input
                type="text"
                placeholder="Paboo"
                value={subcounty}
                onChange = {(e)=>setSubcounty(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">
                Parish /word
              </small>
              <br />
              <input
                type="text"
                placeholder="Akot"
                value={parish}
                onChange ={(e)=>setParish(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">
                Village / Shell
              </small>
              <br />
              <input
                type="text"
                placeholder="Te-poto"
                value={village}
                onChange={(e)=>setVillage(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>

            <div className="pt-2 mt-1 mb-1">
              <small className="text-black-300 font-bold pb-2">Street </small>
              <br />
              <input
                type="text"
                placeholder="Obote avenue"
                value={street}
                onChange ={(e)=>setStreet(e.target.value)}
                className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
              />
            </div>
          </div>

          <div className="ml-5">
            <h1 className="font-bold capitalize text-teal-500 text-md">
              House prices
            </h1>
            <FiPlay onClick={()=>setCounter(counter+1)} className="bg-teal cursor-pointer mt-1 mb-2" />
            <div className="pt-2">
             {counter>=1 && (
               
               <div className="mt-3">
                 <small className="text-black-300 font-bold pb-2">Price 1</small>
                 <br />
                <input
                  type="text"
                  placeholder="2000"
                  value={price1}
                  onChange ={(e)=>setPrice1(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
                <span>/Per</span>
                <input
                  type="text"
                  placeholder="Day"
                  value={per1}
                  onChange ={(e)=>setPer1(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
              </div>
             )} 

             {counter >=2 && (
              <div className="mt-5">
                <small className="text-black-300 font-bold pb-2">Price 2</small>
                <br />
                <input
                  type="text"
                  placeholder="10000"
                  value={price2}
                  onChange ={(e)=>setPrice2(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
                <span>Par</span>
                <input
                  type="text"
                  placeholder="Week"
                  value={per2}
                  onChange ={(e)=>setPer2(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
              </div>
             )}

              {counter >=3 && (
              <div className="mt-5">
                <small className="text-black-300 font-bold pb-2">Price 3</small>
                <br />
                <input
                  type="text"
                  placeholder="50000"
                  value={price3}
                  onChange ={(e)=>setPrice3(e.target.value)}
                  setPer3
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
                <span>/Per</span>
                <input
                  type="text"
                  placeholder="Manth"
                  value={per3}
                  onChange ={(e)=>setPer3(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
              </div>
              )}

              {counter>=4 && (
              <div className="mt-5">
                <small className="text-black-300 font-bold pb-2">Price 4</small>
                <br />
                <input
                  type="text"
                  placeholder="200000"
                  value={price4}
                  onChange ={(e)=>setPrice4(e.target.value)}
                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
                <span>/Per</span>
                <input
                  type="text"
                  placeholder="3 months"
                  value={per4}
                  onChange ={(e)=>setPer4(e.target.value)}

                  className="border-black-200  border-b-2 pl-1 pr-1 outline-none"
                />
              </div>

              )}
            </div>
          </div>
          <div className="ml-5">
            {id? (
              <button 
              onClick={sendData}
              disabled ={sending?true:false}
               className={`mr-4 curser-pointer pr-10 ${sending && 'bg-slate-500'} rounded-lg pl-10 border-collapse`}>{sending?'Updating. . . ':'Update'}</button>

            ):(
              <button 
              onClick={sendData}
              disabled ={sending?true:false}
               className={`mr-4 curser-pointer pr-10 ${sending && 'bg-slate-500'} rounded-lg pl-10 border-collapse`}>{sending?'Sending. . . ':'Send'}</button>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHouses;
