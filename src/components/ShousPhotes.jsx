import { FiTrash } from "react-icons/fi";

function Shousephotos({ data, deletePhoto }) {
  if (data === null) return <div>Loding...</div>;



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
