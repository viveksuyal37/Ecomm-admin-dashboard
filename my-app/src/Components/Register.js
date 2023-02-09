import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  //Sending data to Db via Api
  const signUpHandler = async () => {
    //validation for name
    if (name === "") {
      setMsg("name cant be empty..!");
      return;
    }
    await axios
      .post(`user-routes/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/Login");
        } else {
          res.data.errors
            ? setMsg(res.data.errors[0].msg)
            : setMsg(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="text-center my-4">Register</h2>
      {msg !== "" ? <p className="text-center message text-danger">{msg}</p> : <p className="message"></p>}
      <form className="m-auto w-50 form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => {
              setName(capitalizeFirstChar(e.target.value));
            }}
            type="text"
            className="form-control"
            id="name"
            value={name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => {
              setEmail(capitalizeFirstChar(e.target.value));
            }}
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            value={email}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Pass" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            id="Pass"
            value={password}
            required
          />
        </div>

        <button onClick={signUpHandler} type="button" className="btn btn-dark">
          Sign Up
        </button>
      </form>
    </div>
  );
}
