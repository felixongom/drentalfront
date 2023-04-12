import React, { useState, useEffect } from "react";
import {FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useStateContext } from "../assets/js/Context";

function Shouses({
  data,
  deleteHouse,
  toHouseUpdate,
  toHouseDetails, 
}) {


  // const {instance} = useStateContext()
  const { bottomPaginater, pageData, instance } = useStateContext();
  const itemPerPage = 12;
  const paginate = bottomPaginater(data.length, itemPerPage);
  const [page, setPage] = useState(1);
  // const

  const [payment, setPatment] = useState(0); //pyment input
  const [displyModal, setDisplayModal] = useState(false)// toggling modal form
  const [id, setId] = useState(null)// toggling modal form
  const [exprice, setExprice] = useState(0)
  const pageDatas = pageData(data, page, itemPerPage);

//  feting prices
 useEffect(()=>{
  instance.get('/api/price')
  .then(res=>setExprice(res.data.price))
 }, [instance])



  // open modle
  const getItemid = (id)=>{
    setDisplayModal(true)
    setId(id)
  }

  // organising and sending request
  const setDisplayModalfunc = async ()=>{
    setDisplayModal(false)
    const payload  ={amount: payment}
      const res = await instance.post(`api/payment/${id}`, payload)
      if(res.data){
        toast('payed')
      }
       
  }

  // 

  // getting the amout per second
  const amounPerSce = (30/exprice)*24*60*60
  const seconds = amounPerSce*(payment-(payment*0.2));

  // getting the number of days it will last
  const daysGiven =()=>{
    const min = 60
    const hr= 60*60
    const day= 60*60*24
    const month= 60*60*24*30
    const yr= 60*60*24*30*12

    if(seconds/yr >=1){
      return Math.round(seconds/yr).toString()+ ' yr'
    }
    if(seconds/month>=1){
      return Math.round(seconds/month).toString()+ ' month'
    }
    if(seconds/day >=1){
      return Math.round(seconds/day).toString()+ ' day'
    }
    if(seconds/hr>1){
      return Math.round(seconds/hr).toString()+ ' hr'
    }
    if(seconds/min>1){
      return Math.round(seconds/min).toString()+ ' min'
    }else{
      return '0 sec'

    }
  }

  

  return (
    <div className="card_container customers">
      {/* payment madal form */}
      
      {displyModal && (
      <div className="payment_modal_container">
        <div className="modal_form shadow-lg ">
          
          <div className="w-full text-cyan-400 capitalize">valid for {daysGiven()}</div>
          <div className="w-full flex h-8 align-middle mt-2">
            <input
              className="outline-none border-2  "
              type="number"
              value={payment}
              onChange={(e) => setPatment(e.target.value)}
            />
            <button onClick={()=>{setDisplayModalfunc()} }className="bg-black m-0 pr-1 pl-1 h-full">send</button>

          </div>
          <div className="mt-3">

          <small onClick={()=>setDisplayModal(false)} className="bg-black cursor-pointer  text-sm px-3 text-white mr-10 capitalize  rounded-md">close</small>
          </div>
        </div>
      </div>)}


      <table>
        <tr className="tableheading">
          <th>houses</th>
          <th>added</th>
          <th>type</th>
          <th>active</th>
          <th>approved</th>
          <th>Payment</th>
          <th>amount</th>
          <th>actions</th>
        </tr>

        <tbody>
          {pageDatas.map((item) => (
            <tr key={item.id}>
              <td className="customer_name_avater">
                <img src={item?.images[0]} alt="" />
              <td className="email">{item.name}</td>
              </td>
              <td>
              <small className={`${item.type==='lodge'?'bg-cyan-400':'bg-teal-500'} rounded-md text-black cursor-pointer pl-2 pr-2`}>
                    {item.type} 
                  </small>
              </td>

              <td>{item.added}</td>
              <td>
                {item.timeleft!=='0 sec' ? (
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
                    className="bg-red-700 text-cyan-50 cursor-pointer rounded-md pl-2 pr-2 font-bold"
                  >
                    {item.approve ? "Yes" : "No"}
                  </small>
                )}
              </td>
              <td>
                <small  onClick={()=>getItemid(item.id)} className="bg-orange-500 pr-2 pl-2 rounded text-black cursor-pointer">
                  pay
                </small>
              </td>
              <td>
                <small className="bg-teal-500 pr-2 pl-2 rounded text-black cursor-pointer">
                {item.pay}
                </small>
                
              </td>
              <td id="actions">
                <FaEye
                  onClick={() => toHouseDetails(item.id)}
                  className="text-teal-500 cursor-pointer"
                  title="Veiw"
                />
                <RiDeleteBin6Line
                  onClick={() => deleteHouse(item.id)}
                  className="trush"
                  title="Delete"
                />
                <FiEdit
                  onClick={() => toHouseUpdate(item.id)}
                  className="edit"
                  title="Edit"
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
}

export default Shouses;
