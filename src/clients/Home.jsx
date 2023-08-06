import {useState} from 'react'
import ClientNavbar from '../components/ClientNavbar'
import img from '../assets/images/home.png' 
import  './scss/hero.scss'
import Cards from '../components/Cards'
import { useClientContext } from '../assets/js/ClientContext'
import { useStateContext } from '../assets/js/Context'
import ClientSearch from '../components/ClientSearch'
import LoadingIndicator from '../components/LoadingIndicator'
import LoginRegisterModal from '../components/LoginRegisterModal'
import BookingModel from '../components/BookingModel'
import HouseHaveBook from '../components/HouseHaveBook'
import ClientFooter from '../components/ClientFooter'

function Home() {
  const {allHouses, 
    serchResult,
    latestResult,
    dataLength, 
    toggleFilter, 
    filter,
    showModal,
    alreadyLogedIn,
    showMyHouses,
    getStarted,
    houseBeingBooked
  } = useClientContext()
  const {bottomPaginater, pageData, } = useStateContext()

  const [showSearchBar,setShowSearchBar] = useState(false)
  const [page, setPage] = useState(1)

  const itemPerPage =20
  
  const pages = bottomPaginater(serchResult.length, itemPerPage)
  const __allHouses = pageData(serchResult, page, itemPerPage)

  const toggleSerach = ()=>{
    setShowSearchBar(!showSearchBar)
  }
  let token = sessionStorage.getItem('client')
  
  return (
    <div>
      {showMyHouses && token!==null &&  <HouseHaveBook/>}
      {showModal && !alreadyLogedIn && <LoginRegisterModal/>}
      {alreadyLogedIn && houseBeingBooked!==null && <BookingModel/>}
      {!serchResult && <LoadingIndicator/>}
      <ClientSearch showSearchBar={showSearchBar}/>
      <ClientNavbar toggleSerach={toggleSerach}/>
      <div className="hero_outer">
        <div className='hero_container pt-10 w-full'>
          <div className='inner_container sm:block '>
            <div>
              <h1  className='font-bold hero_heading uppercase text-3xl max-w-2xl flex-wrap break-words'>
                explore and find lodges & rentals in your area</h1>        
              <p className='text-white mt-8 pb-6 text-lg rounded'>Don't go far locking for a lodge or hose for rent, just find them all here and connect to the owner as quickly as posible</p>
              <a href='#item_container' 
                onClick={
                  ()=>token===null && getStarted()
                } 
                className={`capitalize bg-black text-white py-2 px-5 ${token==null && 'animate-pulse rounded-lg bg-red-600' } ` }>{token===null? 'get started':'loged In'}</a>
            </div>
            <div className='image_container'>
            <img className='img' src={img} alt="" width={500}/>

            </div>

          </div>
        </div>
      
      </div>
      <h2 
        id='item_container'
      className='ml-5 mr-5 ml-30 sm:p-10 lg:ml-20 mt-20 font-bold text-gray-600 '>Latest</h2>
    <Cards allHouses={latestResult}/>
    <h1 className='ml-5 mr-5 lg:ml-20 mt-20 font-bold text-orange-600'>{latestResult.length<9?'0'+dataLength.toString():allHouses.length} Availables Results</h1>
    <div className='flex justify-start  ml-5 mr-5 lg:ml-20 mt-20 font-bold' style={{width:300}}>
      {['all', 'lodge', 'rental'].map(item=>(
        <button key={item} onClick={ ()=>toggleFilter(item) } className={`bg-gray-300 ${item===filter?'bg-orange-600 font-bold':''} capitalize h-8 text-sm`}>{item}</button>

      ))}
    </div>
    <Cards allHouses={__allHouses.reverse()}/>
    <div className="table_pagination ml-5 mr-5 lg:ml-20">
        <div className="page_container flex">
          {pages.map((pages) => (
            <div
              onClick={() => setPage(pages)}
              className={`${
                pages === page
                  ? "bg-gray-800 text-white font-bold"
                  : "bg-gray-400"
              } `}
              key={pages}
            >
              {pages}
            </div>
          ))}
        </div>
      </div>
      <ClientFooter/>
    </div>
  )
}

export default Home