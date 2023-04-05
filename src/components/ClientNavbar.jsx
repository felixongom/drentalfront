import { CiDark, CiSettings, CiSearch } from "react-icons/ci";
import{Link, useNavigate} from 'react-router-dom'

function ClientNavbar({toggleSerach}) {
  const navigate = useNavigate()

    const token = localStorage.getItem('admintoken')
  return (
  <div className="fixed flex w-full top-0 left-0 right-0"> 

    <div className="bg-gray-300 flex p-2 w-full justify-between bg-opacity-90 relative">
      <div className="flex justify-center align-middle h-full cursor-pointer w-1/6">
        <div onClick={()=>navigate('/')} className="flex gap-2 align-bottom">
          <CiDark className="text-3xl font-bold text-black " />
          <div className="text-2xl font-bold text-black">D'rental</div>
        </div>
      </div>

      <div className="pr-5 flex justify-center md:ml-10 md:pr-36">
      <CiSearch onClick={()=>toggleSerach()} className={` text-lg mr-5 mt-2`}/>
        {token!==null && (
          <Link to='/admin/dashboard' className="capitalize mr-5 flex text-white bg-black pr-4 pl-4 pb-1 pt-1 curser-pointer ">logout</Link>
          
          )}
        {token!==null && (
          <Link to='/admin/dashboard' className=" capitalize mr-5 flex text-white bg-cyan-600 pr-4 pl-4 pb-1 pt-1 curser-pointer "><span><CiSettings/> </span>manage</Link>
          
          )}
        {token==null &&(
            <Link to='/admin/dashboard' className=" capitalize mr-5 flex text-white bg-black pl-10  pb-1 pt-1 curser-pointer ">Login</Link>

            )}
      </div>
    </div>
  </div>
  );
}

export default ClientNavbar;
