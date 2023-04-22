import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from ".";
import { useMemo } from "react";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [screenSize, setScreenSize] = useState(window.screen.width);
  const [superAllHouses,setsuperAllHouses] = useState([])
  const [users, setUser] =useState([])

  const [search, setSearch] = useState('')
  const [update, setApprove] = useState(false) 
  const [deleted, setDeleted] = useState(true)

  const [deleteHouseId, setDeleteHouseId] = useState('')

  
  
  
  
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
    
    const headers =useMemo(()=>({'tokken':sessionStorage.getItem('sadmintoken')}), []) 
    const Aheaders =useMemo(()=>({'tokken':sessionStorage.getItem('admintoken')}), []) 
    let token = sessionStorage.getItem("admintoken");
    let stoken = sessionStorage.getItem("sadmintoken");

    // axios instans
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {'tokken':token},
    timeout: 1000,   

  });
// axios instans
const sinstance = axios.create({
    baseURL: BASE_URL,
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
    axios.get(`${BASE_URL}/api/user`, {headers})
    .then(res=>setUser(res.data))
    // eslint-disable-next-line  react-hooks/exhaustive-deps
    
  },[deleted, headers])
  
  //   ..............................................
  //   ..............................................
  //   ..............................................
  
  // fetchng content to be used in the admin dasboard
  useEffect(()=>{
    axios.get(`${BASE_URL}/api/house/everything`, {headers})
    .then(res=>setsuperAllHouses(res.data)) 
    // eslint-disable-next-line  react-hooks/exhaustive-deps
}, [deleted, headers]) 



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
const acceptDeleting =async()=>{
  if(deleteHouseId!==''){
    sinstance.delete(`/api/house/delete/${deleteHouseId}`)
    .then(res=>{
      setApprove(!update)
      setDeleted(!deleted)
      toast(res.data)
      setDeleteHouseId('')
    })
  }
}

const councelDeleting =()=>{
  setDeleteHouseId('')

}

const deleteHouse = (id)=>{
  setDeleteHouseId(id)
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
        deleteHouseId,
        councelDeleting,
        acceptDeleting,


        // superadminrequest
        superAllHouses,
        approveHouse,
        deleteHouse,
        searchFuction,
        search,
        headers,
        Aheaders
      }}
    >
      {children}
    </Context.Provider>
  );
};


export const useStateContext = () => useContext(Context);
