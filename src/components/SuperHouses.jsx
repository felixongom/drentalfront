import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../assets/js/Context";
import { useNavigate } from "react-router-dom";

const Superhouses = () => {
  const {
    bottomPaginater,
    pageData,
    superAllHouses,
    search,
    approveHouse,
    deleteHouse,
  } = useStateContext();
  const itemPerPage = 12;
  const filteredHouses = superAllHouses.filter((el) =>
    el.name.includes(search)
  );
  const paginate = bottomPaginater(filteredHouses.length, itemPerPage);
  const [page, setPage] = useState(1);

  const pageDatas = pageData(filteredHouses, page, itemPerPage);
  const navigate = useNavigate();



  return (
    <div className="card_container customers">
      <table>
        <tr className="tableheading">
          <th>houses</th>
          <th>type</th>
          <th>added</th>
          <th>active</th>
          <th>approved</th>
          <th>district</th>
          <th>amount /=</th>
          <th>deleted</th>
          <th>actions</th>
        </tr>

        <tbody>
          {pageDatas.map((item) => (
            <tr key={item.id}>
              <td className="customer_name_avater">
                <img src={item.images[0]} alt="" />
                {item.name}
              </td>
              <td>
              <small className={`${item.type==='lodge'?'bg-cyan-400':'bg-teal-500'} rounded-md text-black cursor-pointer pl-2 pr-2`}>
                    {item.type} 
                  </small>
              </td>
              <td>{item.added}</td>
              <td>
                {item.timeleft!=="0 sec" ? (
                  <small className="bg-orange-500 rounded-md text-black cursor-pointer pl-2 pr-2">
                    {item.timeleft} left
                  </small>
                ) : (
                  <small className="bg-red-500 text-cyan-50 cursor-pointer rounded-md pl-2 pr-2 font-bold">
                    inactive
                  </small>
                )}
              </td>
              <td>
                {item.approve ? (
                  <small className="bg-orange-500 rounded-md text-black cursor-pointer pl-2 pr-2">
                    {item.approve ? "Yes" : "No"}
                  </small>
                ) : (
                  <small
                    onClick={() => approveHouse(item)}
                    className="bg-red-700 text-cyan-50 cursor-pointer rounded-md pl-2 pr-2 font-bold"
                  >
                    {item.approve ? "Yes" : "No"}
                  </small>
                )}
              </td>
              <td>{item.address.district}</td>

              <td>
                <small className="bg-orange-500 pr-2 pl-2 rounded text-black cursor-pointer">
                  {item.amountpayed}
                </small>
              </td>
              <td>
                {item.deleted ? (
                  <small className="bg-red-500 pr-2 pl-2 rounded text-black cursor-pointer">
                    deleted
                  </small>
                ) : (
                  <small className="bg-teal-500 pr-2 pl-2 rounded text-black cursor-pointer">
                    available
                  </small>
                )}
              </td>
              <td id="actions">
                <FaEye
                  onClick={() =>
                    navigate(`/super/house-details/${item.id}/${item.user_id}`)
                  }
                  className="text-teal-500 cursor-pointer"
                  title="Veiw"
                />
                <RiDeleteBin6Line
                  onClick={() => deleteHouse(item.id)}
                  className="trush"
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table_pagination">
        <div className="page_container flex">
          {paginate.map((pages) => (
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
};

export default Superhouses;
