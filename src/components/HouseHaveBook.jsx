import React from "react";
import { useClientContext } from "../assets/js/ClientContext";

function HouseHaveBook() {
  const { houseHaveBook,
hideMyhouses } = useClientContext();
  console.log(houseHaveBook);
  return (
    <div onClick={()=>hideMyhouses()} className="setHouseHaveBook bg-white rounded-lg p-3 shadow-2xl">
      <small className="font-semibold text-green-400  ">
        Houses i have booked
      </small>
        {houseHaveBook!==null &&houseHaveBook.map((book,i)=>(
      <div className="w-100 booked mt-3 flex-shrink-0 flex border-b-2 py-2 ">
        <div className="flex w-1/4">
          <img className="rounded-lg bookedImg" src={book?.houses?.images[0]} alt={''}/>
          <small className="ml-4 font-semibold capitalize text-blue-600">{book?.houses?.name}</small>
        </div>
        <div className="ml-10 flex">
            <h2 className="font-bold">{book.booking.price}</h2>
            <div  className="ml-2">/per</div>
            <h2  className="font-bold flex ml-2" >{book.booking.duration}</h2>

        </div>
        <small className="ml-3 px-5 py-0 bg-orange-600 h-5 rounded-2xl font-semibold">
            {new Date(book.booking.createdAt).getFullYear()} /
            {new Date(book.booking.createdAt).getMonth()} /
            {new Date(book.booking.createdAt).getDay()}
        </small>
      </div>

        ))}
    </div>
  );
}

export default HouseHaveBook;
