import { useState} from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import avater from '../assets/images/user.png'
import { useNavigate } from "react-router-dom";

import {useStateContext} from '../assets/js/Context'
import LoadingIndicator from '../components/LoadingIndicator'

function Scustommers() {
  const { bottomPaginater, pageData, users, deleteUser, activateUser} = useStateContext()
  const navigate = useNavigate() 

  const [page, setPage] =useState(1)

  let numPerPage =8
  const bpage = bottomPaginater(users.length, numPerPage) 
  const __users = pageData(users,page, numPerPage )
  // console.log(users[0]);

if(!users)return <LoadingIndicator/>

  return (
    <div className="card_container customers">

      <table>
        <tr className="tableheading">
          <th>customer</th>
          <th>email</th>
          <th>phone</th>
          <th>admin type</th>
          <th>active</th>
          <th>action</th>
        </tr>

        <tbody>
          {__users.map((item, index) => (
            <tr key={index}>
              <td className="customer_name_avater">
                <img src={item.avater?item.avater:avater} alt="" />
                <h3>{item.name}</h3>
              </td>
              <td style={{textTransform:'lowercase'}}>{item.email}</td>
              <td>{item.phone}</td>
              <td ><span className={`${item.usertype==='admin'?"bg-green-600":"bg-orange-500"} text-black pr-2 pl-2 rounded-lg`}>{item.usertype}</span></td>
              <td>
                {item.active === 'active' ? (
                  <FaCheck onClick={()=>activateUser(item._id)}   className="trueCheck" />
                ) : (
                  <FaTimes onClick={()=>activateUser(item._id)}   className="falseCross" />
                )}
              </td>
              <td id="actions" >
                
                  <RiDeleteBin6Line onClick={()=>deleteUser(item._id)} className="trush" title="Delete"/>
                  <FiEye onClick={()=>navigate(`/super/user-detail/${item._id}`)} className="Details text-cyan-500" title="Edit"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table_pagination">
      <div className="page_container flex">
          {bpage.map((pages) => (
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
    </div>
  );
}

export default Scustommers;
