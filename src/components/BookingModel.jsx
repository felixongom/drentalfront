import {FaCheck} from 'react-icons/fa'
import { useClientContext } from "../assets/js/ClientContext";


function BookingModel() {
  const {
    // loginRegisterSwitching,
    // alreadyLogedIn,
    selectIndex,
    selectedPrice,
    hideModal,
    housePrices,
    onChangeAnotherNumber,
    anotherNumber,
    bookSendTheBooking,
    bookingError,
    bookingIndecator
  } = useClientContext();

  return (
    <div className="darkeningModal">
      <div
        onClick={() => hideModal()}
        className="absolute top-20 left-10 px-4 py-1 bg-red-700 text-white cursor-pointer "
      >
        Councel
      </div>
      
        <div className="inputModal login bg-white rounded p-2">
        <div className="errorContainer w-30">
      {
        bookingError && <p className="text-red-700 bg-red-200 my-1 capitalize px-1" >{bookingError}</p>}
      </div>
          <small className=' text-teal-500 font-sm font-bold'>Select pricing</small><br /><br />
          {housePrices.map((price,i)=>(
            <div onClick={()=>selectIndex(price, i)} className="flex cursor-pointer border-b border-gray-500" key={i}>
             {selectedPrice ===i && <span className="mr-3"><FaCheck className='text-green-500'/></span>} 
              <div className='font-bold'>{price.price1}</div>
              <div>/per</div>
              <div>{price.per1}</div> 
              </div>
          ))}
          
          {housePrices.length>0 && <div className='w-full mt-10' >
            <p>Pay with anothee number</p>
            <input value={anotherNumber}  onChange={(e)=>onChangeAnotherNumber(e.target.value)} type className='w-full border font-semibold  ' placeholder='Enter Number'/>
          </div>}
         {housePrices.length>0?<button disabled = {bookingIndecator && true} onClick={()=>bookSendTheBooking()}>{bookingIndecator?'Sending...':'Book'}</button>:<button>Not Available</button>} 

        </div>

    </div>
  )
}

export default BookingModel