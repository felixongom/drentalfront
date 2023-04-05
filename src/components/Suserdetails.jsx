import user from '../assets/images/user.png'
function SuserDetail({ data }) {
    return (
      <div className="card_container customers">
        <div className="user_container">
          <img src={data?.avater?data?.avater:user} width={50} alt="" />
          <div className="credential">
            <h1>{data?.name}</h1>
            <h5><small className="">phone: </small>{data?.phone}</h5>
            <h6>{data?.email}</h6>
            <span>{data?.active}</span>
          </div>
        </div>
        
      </div>
    );
  }
  
  export default SuserDetail;