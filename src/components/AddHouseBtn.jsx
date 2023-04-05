import React from 'react'
import {useNavigate} from 'react-router-dom'

function AddHouseBtn() {
    const navigate = useNavigate()
  return (
    <button className='w-10 fixed bottom-10 right-10 shadow-2xl h-10 curser-pointer ml-5 font-bold rounded-3xl' 
          onClick={()=>navigate('/admin/add-houses')}
          >+</button>
  )
}

export default AddHouseBtn