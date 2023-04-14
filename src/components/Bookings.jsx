import { useState} from "react";
import avater from '../assets/images/user.png'
import {useStateContext} from '../assets/js/Context'
import LoadingIndicator from '../components/LoadingIndicator'

function Bookings({bookings}) {
    const { bottomPaginater, pageData} = useStateContext()
    
    const [page, setPage] =useState(1)
    if(bookings===null)return <LoadingIndicator/>
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    
  let numPerPage = 8
  const bpage = bottomPaginater(bookings.length, numPerPage) 
  const __users = pageData(bookings,page, numPerPage )
  console.log(bookings);

  return (
    <div className="card_container customers">

      <table>
        <tr className="tableheading">
          <th>customer</th>
          <th>email</th>
          <th>phone</th>
          <th>house</th>
          <th>Pricing</th>
          <th>time</th>
        </tr>

        <tbody>
          {__users.map((item, index) => (
            <tr key={index}>
              <td className="customer_name_avater">
                <img src={item.customer.avater?item.customer.avater:avater} alt="" />
                <h3>{item.customer.name}</h3>
              </td>
              <td style={{textTransform:'lowercase'}}>{item.customer.email}</td>
              <td>{item.customer.phone}</td>
              <td>{item.houses.name}</td>
              <td>{item.booking.price} /per {item.booking.duration}</td>
             <td>
             <small className="ml-3 px-2 py-0 bg-green-600 h-5 text-white rounded-2xl font-semibold">
            {new Date(item.booking.createdAt).getFullYear()} /
            {monthNames[new Date(item.booking.createdAt).getMonth()]} /
            {new Date(item.booking.createdAt).getDay()}
        </small>
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

export default Bookings;
