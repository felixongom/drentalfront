import React from "react";
import { FiThumbsUp, FiEye, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useClientContext } from "../assets/js/ClientContext";
import defaultImg from  '../assets/images/default.jpg'

function Card({ house }) {
  const { addLikes, getHouseData } = useClientContext();
  const navigate = useNavigate();
  const { address } = house;


  if (house.length > 0) return <div className="text-gray-300">loding. . .</div>;

  return (
    <div className="card shadow-md  hover:scale-10 transition-all rounded-md overflow-hidden">
      <div className="w-full coardImageContaioner">
        <img
          onClick={() => navigate(`/detail/${house.id}`)}
          className="cursor-pointer"
          src={house.images[0]?house.images[0]:defaultImg}
          alt=""
        />
      </div>
      <div className="detailsContainer">
        <div className="w-full flex justify-between">
          <h3 className="font-bold capitalize text-black">
            {house.name}{" "}
            <small
              className={`housetype ${
                house.type !== "lodge" ? "rental" : ""
              }  pr-2 pl-2 rounded bg-black text-gray-200`}
            >
              {house.type}
            </small>
          </h3>
          <h3 className="text-gray-400">
            <span className="pr-1 text-sm ">ugx</span>
            <span className="font-bold">{house?.prices[0]?.price1} </span>/{" "}
            <small className="pr-1 text-sm ">{house?.prices[0]?.per1}</small>
          </h3>
        </div>
        <div className=" addressBox text-gray-400 capitalize">
          {address.town},{" "}
          {address.district !== address.town && address.district},{" "}
          {address.parish && address.parish + " parish"} , {address.village}
        </div>
        <div className="flex gap-5 relative">
          <div
            onClick={() => addLikes(house.id)}
            className="flex text-sm text-blue-700 cursor-pointer "
          >
            <FiThumbsUp /> {house.likes} {house.likes <= 1 ? "Like" : " Likes"}
          </div>
          <div className="flex text-sm text-black cursor-pointer ">
            <FiEye /> {house.views} {house.views <= 1 ? "View" : " Views"}
          </div>
          <small className="phone_in_card flex text-sm z-0 absolute right-0 px-2 bg-teal-600  text-white ">
          <FiPhone/>  {house.phone[0]}
          </small>
          <small onClick={()=>getHouseData(house)} className="BookButton mr-5 flex text-sm z-0 absolute px-2 bg-black  text-white ">
            Book
          </small>
        </div>
      </div>
    </div>
  );
}

export default Card;
