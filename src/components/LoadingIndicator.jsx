// import {FaLaptop} from 'react-icons/fa'
import {FaSpinner} from 'react-icons/fa'
function LoadingIndicator() {
  return (
    <div className="bg-white h-full w-full  pl-2 loading_container" >
        <div className='flex justify-center h-full'>
            <FaSpinner className='spin text-xlg animate-spin icon text-blue-600 '/>
        </div>
    </div>
  )
}

export default LoadingIndicator