import avater from '../assets/images/user.png'
import {useStateContext} from '../assets/js/Context'

function SpopularCustomers() {
  const {users} = useStateContext() 
  
  const userdata = users.filter((u)=>u.usertype ==='admin').slice(0,4)
  return (
    <div
    className="popular_customer mb-10">
     
        {userdata.map((data, index)=>(
            <div key={index} className="customer_card">
                <img src={data.avater?data.avater:avater} alt="" />
                <h2>{data.name}</h2>
                <h4>{data.email}</h4>
            </div>

        ))}

    </div>
  )
}

export default SpopularCustomers