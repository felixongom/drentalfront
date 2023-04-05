import { useState} from "react";
import "./scss/loginRegister.scss";
import bg from "../assets/images/bg.jpg";
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";
import { useStateContext } from "../assets/js/Context";
import { useNavigate } from "react-router-dom";

function Rigister() {
  const { instance } = useStateContext();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [registerIndicator, setregisteIndicator] = useState(false);
  const [error, setError] = useState([]);


  // function to submit
  const Register = async (e) => {
    const payload = {
      name,
      email,
      phone,
      password,
      usertype: "admin",
    };
    e.preventDefault();
    setregisteIndicator(true);

    const res = await instance.post("/api/user/register", payload);


    if (res.status === 200) {
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      // navigate
      navigate("/admin");
      setregisteIndicator(false);
    } else {
      setError(res.data);
      setregisteIndicator(false);
    }
    setregisteIndicator(false);
  };

  return (
    <div
      className="contact_form_wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="contact_form">
        <div className="user_icon">
          <div>
            <img src={user} alt="" />
          </div>
        </div>

        {error.length > 0 &&
          error.map((err, i) => (
            <p className="mb-4 bg-red-400 capitalize pl-1" key={i}>
              {err}
            </p>
          ))}

        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className="input_children input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            className={`input_children label trick_label`}
            style={{ top: name.length === 0 ? 10 : -20 }}
          >
            username
          </label>
        </div>
        <br />

        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className="input_children input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className={`input_children label trick_label`}
            style={{ top: email.length === 0 ? 10 : -20 }}
          >
            email
          </label>
        </div>
        <br />
        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className={`input_children input `}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label
            className={`input_children label`}
            style={{ top: phone.length === 0 ? 10 : -20 }}
          >
            phone
          </label>
        </div>
        <br />
        <div className="input_container">
          <input
            type="text"
            autoComplete="off"
            id="input"
            className="input_children input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className={`input_children label`}
            style={{ top: password.length === 0 ? 10 : -20 }}
          >
            password
          </label>
        </div>

        <button onClick={Register} disabled={registerIndicator ? true : false}>
          {registerIndicator ? (
            <div className="bg-gray-800 h-full">. . .</div>
          ) : (
            "Register"
          )}
        </button>

        <p>
          Already have an accoun't
          <Link to="/admin" className="link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Rigister;
