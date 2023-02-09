import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //Sending data to Db via Api
  const handleLogin = async () => {
    await axios
      .post(`user-routes/Login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {

          localStorage.setItem("token",JSON.stringify({token:res.data.token}))

          localStorage.setItem(
            "user",
            JSON.stringify({
              name: res.data.user.name,
              userId: res.data.user._id,
            })
          );
          navigate("/");
        } else {
          setMsg(res.data.msg);
          
        }
      })
      .catch((err) => {
        console.log(err);
        // setMsg(err);
      });
  };

  return (
    <div>
      <h2 className="text-center my-4">Login</h2>
      {msg !== "" ? (
        <p className="text-center message text-danger">{msg}</p>
      ) : (
        <p className="message"></p>
      )}
      <form className="m-auto w-50 form">
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(capitalizeFirstChar(e.target.value));
            }}
            type="email"
            className="form-control"
            id="mail"
            value={email}
            required
          />
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

        <button onClick={handleLogin} type="button" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
}
