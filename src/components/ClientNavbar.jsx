import { CiDark, CiSearch } from "react-icons/ci";
import {FaMoneyBill} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useClientContext } from "../assets/js/ClientContext";

function ClientNavbar({ toggleSerach, page }) {
  const {hideMyhouses,houseHaveBook, setHouseHaveBook} = useClientContext()
  const navigate = useNavigate();
  const logout = ()=>{
    setHouseHaveBook(0)
    sessionStorage.removeItem('client')
  }

  
  const token = sessionStorage.getItem("client");

  return (
    <div className="fixed flex w-full top-0 left-0 right-0 z-10">
      <div className="bg-gray-300  flex p-2 w-full justify-between bg-opacity-90 relative">
        <div className="flex justify-center align-middle h-full cursor-pointer w-1/6">
          <div
            onClick={() => navigate("/")}
            className="flex gap-2 align-bottom"
          >
            <CiDark className="text-3xl font-bold text-black " />
            <div className="text-2xl font-bold text-black">D'rental</div>
          </div>
        </div>

        <div className="pr-5 flex justify-center md:ml-10 md:pr-36">
          {!page && (
            <div className="flex bg-transparent text-black cursor-pointer border border-teal-500 px-2 hover:bg-teal-500 rounded"
              onClick={() => toggleSerach()}
            >
            <CiSearch
              className={` text-lg mr-2  mt-1 cursor-pointer`}
              />
            <span className=" text-black ">Search</span>
            </div>
          )}
          {!page && token!==null &&  (
            <>
            <FaMoneyBill
              onClick={() => hideMyhouses()}
              className={` text-lg mr-5 ml-7 mt-2 cursor-pointer`}
            />
            {token!==null && (

              <div className="relative cursor-pointer"
                onClick={() => hideMyhouses()}>

                <div className="bg-red-600 w-5 h-5 rounded-full align-middle justify-center absolute text-white text-sm font-semibold text-center right-2">
                  {houseHaveBook!==null && houseHaveBook.length} 
                </div>

              </div>
            )
            }
            </>
          )}
          {token !== null && (
            <Link
              to=""
              onClick={()=> logout() }
              className="capitalize ml-5 flex text-white bg-black pr-4 pl-4 pb-1 pt-1 curser-pointer "
            >
              logout
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}

export default ClientNavbar;
