import {FiLoader} from 'react-icons/fi'
function LoadingIndicator() {
  return (
    <div className="bg-black-100 h-full w-full  pl-2 loading_container" >
        <div className='flex justify-center h-full'>
            <FiLoader className='spin text-xlg animate-spin icon text-white '/>
        </div>
    </div>
  )
}

export default LoadingIndicator