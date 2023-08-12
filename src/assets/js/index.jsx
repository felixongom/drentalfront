import {BiHomeAlt, BiUser, BiAdjust, BiChart, BiRegistered} from 'react-icons/bi'
import {FaMoneyBill} from 'react-icons/fa'
import axios from 'axios';
export const BASE_URL = 'http://localhost:5000'

// Set config defaults when creating the instance
export const axiosClient = axios.create({
    baseURL: BASE_URL
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
        name:"Bookings",
        icon:<FaMoneyBill/>,
        path:'/super/bookings'
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

// data for client

export const images = [
    'data:image/jpeg;base64,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',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGhvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1642426020136-8a90aa58d31e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1562601632-fc04bc5bfdee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://media.istockphoto.com/id/1440549586/photo/painted-hous-in-jodhpur-rajasthan-india.webp?b=1&s=170667a&w=0&k=20&c=RPW5ccJGWk8VjdLhN4HQThZLEAhvtWHq_HiEbZNSlwA=',
    'https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
]

export const dashboards =[
    {
        title:'client',
        logo:'https://cdn4.iconfinder.com/data/icons/user-interface-ui-fill/1000/User-64.png',
        linkto:'/client',
        bg:'bg-teal-500',
        btn:'bg-teal-400',
        page:'Home'

        
    },
    {
        title:'manage my house',
        logo:'https://cdn1.iconfinder.com/data/icons/human-resource-management-set-1-1/64/2-17-64.png',
        linkto:'/admin',
        bg:'bg-rose-600',
        btn:'bg-rose-400',
        page:'admin'
        
    },
    {
        title:'super admin',
        logo:'https://cdn0.iconfinder.com/data/icons/flat-design-database-set-2/24/database-admin-64.png',
        linkto:'/super',
        bg:'bg-orange-600',
        btn:'bg-orange-400',
        page:'super admin'
        

    },
]
