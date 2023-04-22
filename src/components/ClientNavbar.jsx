import { CiDark, CiSearch } from "react-icons/ci";
import {FaMoneyBill} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useClientContext } from "../assets/js/ClientContext";

function ClientNavbar({ toggleSerach, page }) {
  const {hideMyhouses} = useClientContext()
  const navigate = useNavigate();
  const logout = ()=>{sessionStorage.removeItem('client')}

  const token = sessionStorage.getItem("admintoken");
  return (
    <div className="fixed flex w-full top-0 left-0 right-0">
      <div className="bg-gray-300 flex p-2 w-full justify-between bg-opacity-90 relative">
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
            <CiSearch
              onClick={() => toggleSerach()}
              className={` text-lg mr-5 mt-2 cursor-pointer`}
            />
          )}
          {!page && (
            <FaMoneyBill
              onClick={() => hideMyhouses()}
              className={` text-lg mr-5 mt-2 cursor-pointer`}
            />
          )}
          {token !== null && (
            <Link
              to=""
              onClick={()=> logout() }
              className="capitalize mr-5 flex text-white bg-black pr-4 pl-4 pb-1 pt-1 curser-pointer "
            >
              logout
            </Link>
          )}

          {/* {token == null && (
            <Link
              to="/admin/dashboard"
              className=" capitalize mr-5 flex text-white bg-black px-5  py-1 curser-pointer "
            >
              Login
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ClientNavbar;
