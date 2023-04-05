import {BiHomeAlt, BiUser, BiAdjust, BiChart, BiRegistered} from 'react-icons/bi'
import axios from 'axios';

// Set config defaults when creating the instance
export const axiosClient = axios.create({
    baseURL: 'http://localhost:5000'
  });



// supper admin dashboard
export const Sadmin = [
    {
        name:"Dashboard",
        icon:<BiAdjust/>,
        path:'/super/dashboard'
    },
    {
        name:"User",
        icon:<BiUser/>,
        path:'/super/users'
    },
    {
        name:"Houses",
        icon:<BiHomeAlt/>,
        path:'/super/houses'
    },
    {
        name:"Register",
        icon:<BiRegistered/>,
        path:'/super/register'
    },
    {
        name:"Pricing",
        icon:<BiChart/>,
        path:'/super/pricing'
    }
]

// admin dashboard
export const Admin = [
    {
        name:"Dashboard",
        icon:<BiAdjust/>,
        path:'/super/dashboard'
    },
    
    {
        name:"Houses",
        icon:<BiHomeAlt/>,
        path:'/super/houses'
    },
    
    {
        name:"Chats",
        icon:<BiChart/>,
        path:'/admin/chart'
    }
]