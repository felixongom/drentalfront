function Sservices({ data }) {
    
    return (
      <div className="card_container customers">
        <div className="sevice_container">
            {data.map((item, i)=>(
              <div className="service">
                  <h1>item</h1>
              </div>

            ))}
           
        </div>
        
      </div>
    );
  }
  
  export default Sservices;