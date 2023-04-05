import { FiTrash } from "react-icons/fi";
import { useStateContext } from "../assets/js/Context";

function Shousephotos({ data }) {
  const {instance} = useStateContext()
  if (data === null) return <div>Loding...</div>;

  const deletePhoto = async(name) =>{
      await instance.get(`/api/modify/image/`, {name})
   
    }

  return (
    <div className="card_container customers">
      <div className="photos_container">
        {data.map((item, i) => (
          <div key={i} className="img_Container">
            <img src={item} width={50} alt="" />
            <FiTrash className="deletePhoto" onClick={()=>deletePhoto(item)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shousephotos;
