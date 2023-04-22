import React from "react";
import { useClientContext } from "../assets/js/ClientContext";
import defaultImg from  '../assets/images/default.jpg'


function HouseHaveBook() {
  const { houseHaveBook,
hideMyhouses } = useClientContext();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

if(!houseHaveBook)return
console.log(houseHaveBook);


return (
    <div onClick={()=>hideMyhouses()} className="setHouseHaveBook bg-white rounded-lg p-3 shadow-2xl">
      <small className="font-semibold text-green-400  ">
        Houses i have booked
      </small>
        {houseHaveBook!==null &&houseHaveBook.map((book,i)=>(
      <div key={i} className="w-100 booked mt-3 flex-shrink-0 flex border-b-2 py-2 ">
        <div className="flex w-1/4">
          <img className="rounded-lg bookedImg" src={book?.houses.name!==''?book?.houses?.images[0]:defaultImg} alt={''}/>
          <small className="ml-4 font-semibold capitalize text-blue-600">{book?.houses.name!==''?book?.houses?.name:<small className="bg-red-600 rounded-lg px-2 text-white">removed</small>}</small>
        </div>
        <div className="ml-10 flex">
            <h2 className=" text-sm">ugx </h2>
            <h2 className="font-semibold text-sm">{book.booking.price}</h2>
            <h2 className=" text-sm ml-1">/per</h2>
            <h2  className="font-semibold text-sm flex ml-2" >{book.booking.duration}</h2>
        </div>
        <small className="ml-3 px-5 py-0 bg-orange-600 h-5 rounded-sm font-sm">
            {new Date(book.booking.createdAt).getFullYear()} /
            {monthNames[new Date(book.booking.createdAt).getMonth()]} /
            {new Date(book.booking.createdAt).getDay()}
        </small>
      </div>

        ))}
    </div>
  );
}

export default HouseHaveBook;
