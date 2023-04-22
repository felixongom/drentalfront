

function Info({councelDeleting, acceptDeleting}) {
  return (
    <div className="info">
        <div className="infopopup p-2 rounded-lg">
            <h1 className="text-xlg text-cyan-500">!</h1>
            <h2 className="capitalize text-cyan-600">deleted item can not be restored</h2>
            <div className="flex justify-between w-full">
                <div onClick={()=>councelDeleting()}  className="m-3 w-1/3 bg-red-500 cursor-pointer text-white align-middle text-center ">Councel</div>
                <div onClick={()=>acceptDeleting()} className="m-3 w-1/3 bg-black cursor-pointer text-white align-middle text-center ">Delete</div>
            </div>

        </div>
    </div>
  )
}

export default Info