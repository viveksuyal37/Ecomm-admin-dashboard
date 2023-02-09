import axios from "axios";
import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import img from "../user.png";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const uId = JSON.parse(localStorage.getItem("user")).userId;
  const token = JSON.parse(localStorage.getItem("token")).token;
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(uId, token);
    // eslint-disable-next-line
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const editHandler = async (name, password, email) => {
    if (name !== "" && password !== "" && email !== "") {
      await axios
        .put(
          `/user-routes/getCurrentUser/${uId}`,
          {
            name,
            password,
            email,
          },
          {
            headers: { authorization: `bearer ${token}` },
          }
        )
        .then((res) => {
          res.data.errors
            ? setMsg(res.data.errors[0].msg)
            : setMsg(res.data.msg);
        });
    } else {
      setMsg("All feilds are required..!");
    }
  };

  const deleteHandler = async () => {
    const confirmation = window.confirm(
      "Are you sure to delete your account..?"
    );
    if (confirmation) {
      await axios.delete(`/user-routes/getCurrentUser/${uId}`).then((res) => {
        res.data.success && setMsg(res.data.msg);
        setTimeout(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/Register");
        }, 1000);
      });
    }
  };

  const getUserInfo = async (id, token) => {
    await axios
      .get(`/user-routes/getCurrentUser/${id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        res.data.success && setUserName(res.data.foundUser[0].name);
        setUserId(res.data.foundUser[0]._id);
        setUserEmail(res.data.foundUser[0].email);
        setUserCreatedAt(Date(res.data.foundUser[0].joined));
      });
  };

  return (
    <>
      <div>
        <h1 className="mt-3 text-center">Personal Info</h1>
        {msg !== "" ? (
          <p className="mt-2 text-center message text-danger">{msg}</p>
        ) : (
          <p className="message"></p>
        )}
        <table className="ms-2">
          <tbody>
            <tr>
              <td className="table-head">Username: </td>
              <td>{userName}</td>
            </tr>
            <tr>
              <td className="table-head">User-Id: </td>
              <td>{userId}</td>
            </tr>
            <tr>
              <td className="table-head">Email: </td>
              <td>{userEmail}</td>
            </tr>
            <tr>
              <td className="table-head">Joined On: </td>
              <td>{userCreatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="account-card">
        <div className="card" style={{ width: "220px", marginRight: "20px" }}>
          <img src={img} className="card-img-top img" alt="..." />
          <div className="card-body">
            <h5 className="">{userName}</h5>

            <button onClick={toggleEdit} className="btn btn-dark">
              Edit
            </button>
            <button onClick={deleteHandler} className="btn btn-danger ms-2">
              Delete A/c
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditUser edit={editHandler} name={userName} email={userEmail} />
      )}
    </>
  );
}
