import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from ".";
import { useMemo } from "react";
import toast from "react-hot-toast";
const Context = createContext();

export const ClientContext = ({ children }) => {
    const [allHouses, setAlHouses] = useState([])
    const [search, setSearh] = useState('')
    const [filter, setFilter] = useState('all')
    const [likeView, setLikeView] = useState(0)

    const toggleFilter = (text)=>{
        setFilter(text)
    }

const headers =useMemo(()=>({'tokken':sessionStorage.getItem('client')}), []) 
    // axios instans
const _axios = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers

  });

//   fatching all the houses from active and approved
useEffect(()=>{
    axios.get(`${BASE_URL}/api/house`, {headers})
    .then(res=>setAlHouses(res.data.reverse()))
    
},[filter, likeView, headers])


// adding likes and view
const addViews =  async (house_id)=>{
    
    
    const localViews = localStorage.getItem('views')
    if (localViews===null){
        // save it to localstorage
        localStorage.setItem('views', JSON.stringify([house_id]))
        // send request
        await _axios.post(`/api/modify/views/${house_id}`)
        setLikeView(likeView+1)
        

    }else{
        if(JSON.parse(localViews).includes(house_id) ){
        }else{
            // push to localstorage items
           let newLoclaviews = JSON.parse(localViews)
           localStorage.setItem('views', JSON.stringify([...newLoclaviews, house_id]))
            // send request
            await _axios.post(`/api/modify/views/${house_id}`)
            setLikeView(likeView+1)
        }
    
    }

}
// adding likes and view
const addLikes =  async (house_id)=>{
    const localLikes = localStorage.getItem('likes')
    if (localLikes===null){
        // save it to localstorage
        localStorage.setItem('likes', JSON.stringify([house_id]))
        // send request
        await _axios.get(`/api/modify/likes/${house_id}`)
        setLikeView(likeView+1)
        

    }else{
        if(JSON.parse(localLikes).includes(house_id) ){
        }else{
            // push to localstorage items
           let newLoclalike = JSON.parse(localLikes)
           localStorage.setItem('likes', JSON.stringify([...newLoclalike, house_id]))
            // send request
            await _axios.get(`/api/modify/likes/${house_id}`)
            setLikeView(likeView+1)
        }
    
    }


}



const searchFunct =(text)=>{
    // const searchHouse = allHouses.filter(h=>h.address.district.includes('text') || h.address.town.includes(text))
    setSearh(text)
}

const __serchResult = allHouses.filter(h=> h.address.town.includes(search) || h.address.district.includes(search) || h.name.includes(search))

// lets filter the search result by type
let serchResult =[]
if(filter==='all'){
    serchResult = __serchResult
    
}else{
    serchResult = __serchResult.filter(h=> h.type===filter)

}

// .............................................
// .............................................
// handling booking
const [loginRegisterSwitching,setLoginRegisterswitching] = useState(true)
const [alreadyLogedIn,setAlreadyLogedIn] = useState(false)
const [showModal,setShowModal] = useState(false)
const [houseBeingBooked,setHouseBeingBooked] = useState({})

// collecting the reister form field
const[name, setName] = useState('')
const[email, setEmail] = useState('')
const[phone, setPhone] = useState('')
const[password, setPassword] = useState('')
const [authIndicator, setAuthIndicator] = useState(false)
const [registerError, setregisterError] = useState([])
const [authUser, setAuthUser] =useState(null)
const[anotherNumber, setAnotherNumber]=useState('')
const[bookingPrice, setBookingPrice]=useState({})

const [selectedPrice, setSelectedPrice] =useState(0)
const [bookingError, setBookingError] =useState('')
const [bookingIndecator, setBookingIndicator] =useState(false)
const [houseHaveBook, setHouseHaveBook] = useState(null)

const [showMyHouses, setShowMyHouses] =useState(false)

// 

// collecting the house


const switchLoginRegisterForm = ()=>{
    setLoginRegisterswitching(!loginRegisterSwitching)
}
// collecting house data
const getHouseData = (house)=>{
    const clientToken = sessionStorage.getItem('client')
    if(clientToken!==null){
        setAlreadyLogedIn(true)
        setBookingPrice(house.prices[0])
    }
    setShowModal(true)
    setHouseBeingBooked(house)
}
// showing maodal 
const hideModal = (house)=>{
    setShowModal(false)
    setAlreadyLogedIn(false)
   
}

// showing maodal 
const getStarted = ()=>{
    setShowModal(true)   
}


// hondling onchang of registration
const onChangeName = (name)=>{
    setName(name)
}
const onChangeEmail = (email)=>{
    setEmail(email)
}
const onChangePhone = (phone)=>{
    setPhone(phone)
}

const onChangePassword = (password)=>{
    setPassword(password)
}
const registerUser = async ()=>{
    setAuthIndicator(!authIndicator)
    const payload = {
        name,email, password, phone,
        usertype:'client'
    }
    
    const res = await _axios.post('/api/user/register', payload)
    setAuthIndicator(!authIndicator)
    if (res.data.length){
        setregisterError(res.data)
    }else{
        setLoginRegisterswitching(true)
    }
    
    
}
// .............................................
const loginUser = async ()=>{
    setAuthIndicator(!authIndicator)
    const payload = {
        email,
        password,
        usertype:'client'
        
    }
    
    const res = await _axios.post('/api/user/login', payload)

    setAuthIndicator(!authIndicator)
    if (res.data.messege){
        setregisterError([res.data.messege])
    }else{
        setLoginRegisterswitching(true)
        setregisterError([])
        setShowModal(false)
        setAlreadyLogedIn(true)
       
        // set token in local storage
        sessionStorage.setItem('client', res.data)
        setAnotherNumber(authUser.phone)
        
    }
    
}



// get the authenticated client use 

useEffect(()=>{
    axios.get(`${BASE_URL}/api/user/me`, {headers})
    .then(res=>{
        setAuthUser(res.data)
        setAnotherNumber(res.data.phone)
    })



},[headers])


// sending the actual booking
const selectIndex =(price, i)=>{
    setSelectedPrice(i)
    setBookingPrice(price)


}

// getting another number
const onChangeAnotherNumber =(number)=>{
    setAnotherNumber(number)
}

//details for booking the house that will be sent to the server

const bookSendTheBooking = async ()=>{
    setBookingIndicator(true)
    const payload = {
        houseId:houseBeingBooked.id,
        bookeeId:authUser._id,
        bookeePhone:anotherNumber,
        houseOwner:houseBeingBooked.user_id,
        price:bookingPrice

        
    }

    const res = await axios.post(`${BASE_URL}/api/booking`, payload, {headers})
    if(res.data.error){
        setBookingError(res.data.error)
        setBookingIndicator(false)
        toast('failed')
        
    }
    setBookingIndicator(false)
    toast('Succeeded')
    
}

// find all the houses booked
useEffect(()=>{
    axios.get(`${BASE_URL}/api/booking/me`, {headers})
    .then(res =>setHouseHaveBook(res.data))  
},[headers, bookingIndecator, alreadyLogedIn])

const hideMyhouses =()=>{
    setShowMyHouses(!showMyHouses)
}
// .............................................
// .............................................
return (
    <Context.Provider
    value={{
                allHouses:allHouses,
                latestResult:allHouses.slice(0,3),
                searchFunct,
                search,
                serchResult:serchResult.reverse(),
                dataLength:serchResult.length,

                toggleFilter,
                filter,

                addViews,
                addLikes,

                // toggling modles
                loginRegisterSwitching,
                alreadyLogedIn,
                switchLoginRegisterForm,
                getHouseData,
                showModal, 
                hideModal,
                getStarted,
                houseBeingBooked,
                // 
                name,
                email,
                phone,
                password,
                onChangeName,
                onChangeEmail,
                onChangePhone,
                onChangePassword,
                registerUser, 
                registerError,
                // 
                loginUser,

                // passong house deteils
                housePrices:houseBeingBooked?houseBeingBooked.prices:[],
                selectIndex,
                selectedPrice,
                onChangeAnotherNumber,
                anotherNumber,
                bookSendTheBooking,
                bookingError,
                bookingIndecator,
                houseHaveBook,
                setHouseHaveBook,

                hideMyhouses,
                showMyHouses

        }}
        >
            {children}
        </Context.Provider>
    )

}

export const useClientContext = () => useContext(Context);
