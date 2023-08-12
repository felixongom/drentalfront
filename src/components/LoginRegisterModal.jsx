import React from "react";
import { useClientContext } from "../assets/js/ClientContext";

function LoginRegisterModal() {
  const {
    loginRegisterSwitching,
    hideModal,
    switchLoginRegisterForm,
    
    name,
    email,
    phone,
    password,

    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    registerUser,
    loginUser,
    registerError,
    authIndicator
  } = useClientContext();

  return (
    <div className="darkeningModal">
      <div
        onClick={() => hideModal()}
        className="absolute top-20 left-10 px-4 py-1 bg-red-700 text-white cursor-pointer"
      >
        Councel
      </div>
      <div className="errorContainer w-30">
      {
        registerError && registerError.map(err=>(
          <p className="text-red-700 bg-red-200 my-1 capitalize px-1" >{err}</p>
        ))
      }
      </div>

      {loginRegisterSwitching && (
        <div className="inputModal login bg-white p-2 rounded">
          <div>
            <input value={email} type="email" onChange={(e)=>onChangeEmail(e.target.value)} className="border border-black" placeholder="email" />
          </div>
          <div>
            <input value={password} type="password" onChange={(e)=>onChangePassword(e.target.value)} className="border border-black" placeholder="Password" /> <br />
          </div>

          <button disabled= {authIndicator && true} onClick={()=>loginUser()} >{authIndicator?'Loging in. . . ':'Login'}</button>
          <p className="text-gray-400">
            Don't have account{" "}
            <span
              onClick={() => switchLoginRegisterForm()}
              className="text-black cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      )}

      {!loginRegisterSwitching && (
        <div className="inputModal login bg-white p-2 rounded">
          <div>
            <input value={name} onChange={(e)=>onChangeName(e.target.value)} className="border border-black" placeholder="Username" />
          </div>
          <div>
            <input value={email} type="email" onChange={(e)=>onChangeEmail(e.target.value)} className="border border-black" placeholder="Email" /> <br />
          </div>
          <div>
            <input value={phone} type="number" onChange={(e)=>onChangePhone(e.target.value)} className="border border-black" placeholder="Phone" /> <br />
          </div>
          <div>
            <input value={password} type="password" onChange={(e)=>onChangePassword(e.target.value)} className="border border-black" placeholder="Password" />{" "}
            <br />
          </div>

          <button disabled= {authIndicator && true} onClick={()=>registerUser()} >{authIndicator?'registering. . . ':'Register'}</button>
          <p className="text-gray-400">
            Already have account{" "}
            <span
              onClick={() => switchLoginRegisterForm()}
              className="text-black cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginRegisterModal;
