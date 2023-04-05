import { FaEye ,FaThumbsUp} from "react-icons/fa";
import { FiActivity} from "react-icons/fi";

function ShouseData({ data }) {
  if (data === null) {
    return <div className="bg-black-100 pl-2">Loading...</div>;
  }


  return (
    <div className="card_container customers">
      <div className="house_container">
        <img src={data.images[0]} alt="" />
        <div className="credential">
          <h1>{data.name}</h1>
            {data.approve ? (<div>
              
              <small className="bg-orange-500 rounded-md text-black pl-2 pr-2">
                Approved
              </small>
            </div>) : (<div>
              <small className="bg-red-700 text-cyan-50  rounded-md pl-2 pr-2 font-bold">
                not approved
              </small>
            </div>)}
            {data.active ? (<div>
              <small className="bg-green-500 rounded-md text-black   pl-2 pr-2">
              {data.timeleft} left
              </small>
            </div>) : (<div>
              <small className="bg-red-400 text-cyan-50  rounded-md  pl-2 pr-2 font-bold">
                inactive
              </small>
            </div>)}

            <div>
              
            <div className="flex  text-cyan-500 mt-2 ml-2">
               <FaEye/><span className="text-gray-500"> {data.likes} likes</span>
            </div>
            </div>
            <div className="flex  text-blue-600 mt-2">
               <FaThumbsUp/><span className="text-gray-500"> {data.views} likes</span>
            </div>
            
          
          <div className="house_contact">
            {data.phone.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>

        <div className="credential">
          <h1>{data.address.region} uganda</h1>
          <div className="district">{data.address.district} district</div>
          <div className="city">{data.address.town} town/city</div>
          <div className="parish">{data.address.parish} word/parish</div>
          <div className="village">{data.address.village} village/shell</div>
        </div>

        <div className="credential flex">
          <div>
          <div className="sevices_offered">services offered</div>
          {data.services.map((service, i) => (
            <div key={i} className="sevices" index={i}>
              <FiActivity />
              <div>
                <div>{service.service}</div>
              </div>
            </div>
          ))}
          </div>
          <div className="ml-4">
            <div className="text-blue-400 capitalize font-bold">prices</div>
            {data.prices.map((p, i)=>(
              <div className="px-5 mt-5 shadow-md " key={i}>{p.price1} /per {p.per1}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShouseData;
