import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const Context = createContext();

export const ClientContext = ({ children }) => {
    const [allHouses, setAlHouses] = useState([])
    const [search, setSearh] = useState('')
    const [filter, setFilter] = useState('all')
    const [likeView, setLikeView] = useState(0)

    const toggleFilter = (text)=>{
        setFilter(text)
    }

    // axios instans
const _axios = axios.create({
    baseURL: 'http://localhost:5000',
  });

//   fatching all the houses from active and approved
useEffect(()=>{
    _axios.get('/api/house')
    .then(res=>setAlHouses(res.data))
    
},[search, filter, likeView,_axios])


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
            console.log('');
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
            console.log('liked');
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

const __serchResult = allHouses.filter(h=> h.address.town.includes(search) || h.address.district.includes(search) )

// lets filter the search result by type
let serchResult =[]
if(filter==='all'){
    serchResult = __serchResult
    
}else{
    serchResult = __serchResult.filter(h=> h.type===filter)

}


    return (
        <Context.Provider
            value={{
                name:'felix',
                allHouses,
                searchFunct,
                search,
                serchResult,
                dataLength:serchResult.length,

                toggleFilter,
                filter,

                addViews,
                addLikes
        }}
        >
            {children}
        </Context.Provider>
    )

}

export const useClientContext = () => useContext(Context);
