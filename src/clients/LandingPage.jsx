import React from 'react'
import {NavLink} from 'react-router-dom'
import './scss/landingPage.scss'
import { images, dashboards} from '../assets/js/index'
function LandingPage() {
  return (
    <div className='landing_page_container '>
        <div className='image_container'>
            {images.map(image=>(
                <div className='image_wrapper'>
                    <img src={image} alt="img"/>
                </div>
            ))}
        </div>
        <div className='links_container p-3'>
            {
               dashboards.map(dashboard=>(
                <NavLink to={dashboard.linkto} className={`dashboard rounded cursor-pointer ${dashboard.bg}`}>
                   <div className='bg-white rounded-full p-3'> 
                        <img src={dashboard.logo} alt="img" />
                    </div>
                    <h3 className='font-semibold capitalize'>{dashboard.title}</h3>
                    <div className={`${dashboard.btn} px-6 rounded-full capitalize font-bold m-4`}>{dashboard.page}</div>
                </NavLink>

               ))
            }
            
        </div>
    </div>
  )
}

export default LandingPage