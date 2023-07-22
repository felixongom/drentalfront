
import { useClientContext } from '../assets/js/ClientContext'

function ClientSearch({showSearchBar}) {
    const {search, searchFunct} = useClientContext()
  return (
    <div className={` fixed w-full z-30 flex justify-center top-20 px-10 rounded-full`}>
      <input value={search} onChange={(e)=>searchFunct(e.target.value)} className={`${showSearchBar===false && 'animate_search'}  p-1 sm:w-3/4 md:w-1/3 h-10 border-2 focus:outline-none border-blue-800 rounded-full`} placeholder='Search by district or town' />
    </div>
  )
}

export default ClientSearch