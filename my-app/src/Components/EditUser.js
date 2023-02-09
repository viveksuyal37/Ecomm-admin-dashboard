
import { useState } from 'react';

const EditUser = (props) => {
    
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState("");
     // eslint-disable-next-line
    const [msg, setMsg] = useState("");
  
    const capitalizeFirstChar = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
  
  return (
    <div className='edit-container' >
 <h2 className="text-center mt-1 ">Edit your profile</h2>
      {(msg!=="")? <p className="text-center text-danger">{msg}</p> : <p></p>}
      <form className="m-2 ">
        <div className="mb-2">
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

        <button onClick={(e)=>{props.edit(name, password, email)}} type="button" className="btn btn-dark">
         Update
        </button>
      </form>
    </div>
   
  )
}

export default EditUser;