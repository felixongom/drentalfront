
import { useClientContext } from '../assets/js/ClientContext'

function ClientSearch({showSearchBar}) {
    const {search, searchFunct} = useClientContext()
  return (
    <div className={` fixed w-full z-30 flex justify-center top-20 px-10`}>
      <input value={search} onChange={(e)=>searchFunct(e.target.value)} className={`${showSearchBar===false && 'animate_search'}  p-1 sm:w-3/4 md:w-1/3 h-10 border-2 focus:outline-none border-orange-500`} placeholder='Search by district or town' />
    </div>
  )
}

export default ClientSearch