import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [screenSize, setScreenSize] = useState(window.screen.width);
  const [superAllHouses,setsuperAllHouses] = useState([])
  const [users, setUser] =useState([])

  const [search, setSearch] = useState('')
  const [update, setApprove] = useState(false) 
  const [deleted, setDeleted] = useState(true)


  
  // toggling sidebar
  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };
  
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.screen.width);
        if (screenSize >= 760) {
          setShowSideBar(true);
        } else {
          setShowSideBar(false);
        }
        return () => window.removeEventListener("resize");
      });
      
      
    }, [screenSize]);
    
    // ..................................................................
  // hiding sidebar on small screen on click of any sidebar link
  const sideBarFalse = () => {
    if (screenSize <= 760) {
        setShowSideBar(false);
    }   
  };
    // .............................................
    
let token = localStorage.getItem("admintoken");
let stoken = localStorage.getItem("sadmintoken");
// axios instans
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {'tokken':token},
    timeout: 1000,

  });
// axios instans
const sinstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {'tokken':stoken},
    timeout: 1000,

  });
  
  
  // pagintion by filtering
  const bottomPaginater = (data_legth, itemPerPage)=>{
    let page =[]
    let numOfPage = Math.ceil(data_legth/itemPerPage)
    for(let i=1; i<=numOfPage; i++){
      page.push(i)
    }
    return page    
    
  }
  
  // the actual date inpages
  const pageData = (data, page, itemPerPage)=>{
    return data.slice((page-1)*itemPerPage, page*itemPerPage)
  }

  
  useEffect(()=>{
    sinstance.get('/api/user')
    .then(res=>setUser(res.data))
    // eslint-disable-next-line  react-hooks/exhaustive-deps
    
  },[deleted])
  
  //   ..............................................
  //   ..............................................
  //   ..............................................

// fetchng content to be used in the admin dasboard
useEffect(()=>{
  async function fetchAllHouses(){
   const res = await sinstance.get('/api/house/everything')
   setsuperAllHouses(res.data)
   
  }
  fetchAllHouses()
}, [deleted])



// setting house to active or inactive
const approveHouse =(h)=>{
  sinstance.patch(`/api/modify/${h.id}/${h.approve}`)
  .then(res=>{
    setDeleted(!deleted)
    toast(res.data)
    console.log(res);
  }) 
}

// deleting ahouse

const deleteHouse = (id)=>{
  sinstance.delete(`/api/house/delete/${id}`)
  .then(res=>{
    setApprove(!update)
    setDeleted(!deleted)
    toast(res.data)
  })
}

// serch house
const searchFuction = (text)=>{
  setSearch(text)
}

// deleting user
const deleteUser = async(id)=>{
  const res = await sinstance.delete(`/api/user/${id}`)
  toast(res.data)
  setDeleted(deleted+1)
}

// activate user
const activateUser = async(id)=>{
  const res = await sinstance.patch(`/api/user/active/${id}`)
  toast(res.data)
  setDeleted(deleted+1)
}



//   ..............................................
//   ..............................................
//   ..............................................


  return (
    <Context.Provider
      value={{
        showSideBar,
        toggleSideBar,
        sideBarFalse,
        instance,
        sinstance,
        token,
        bottomPaginater,
        pageData,
        users,
        deleteUser,
        activateUser,


        // superadminrequest
        superAllHouses,
        approveHouse,
        deleteHouse,
        searchFuction,
        search,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
