import { useState, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import "../DeleteLogin/indexDeleteLogin.css";
import "../../App";

const DeleteLogin = () => {
  const [getInput, setGetInput] = useState({ name: "" });
  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {    
    const { name, value } = event.target;    
    setGetInput({ ...getInput, [name]: value });
  }
  
  function deleteData() {
    if (!validateEmail(getInput.name) || getInput.name === "") {
      alert("Please, type a valid e-mail");
      return;
    }
    api.get("/").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (JSON.stringify(response.data[i].name) === JSON.stringify(getInput.name)) {
          const id = response.data[i].id          
          api.delete(`/${id}`)
          alert('Login deleted successfully!')          
          history.push('/')
          return;
        }
      }
      alert('E-mail not found')
    }).catch(function () {      
      alert("Connection error: server not found.");
    });
  }

  function validateEmail(email: string): boolean {
    var re = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return re.test(email);
  }

  return (
    <div className="main-page">
      <form action="" className="data">
        <input
          onChange={handleInputChange}
          name="name"
          type="email"
          placeholder="Enter your e-mail"
          className="styleInput"
          required
        />
        <button
          type="button"
          className="styleLogin"
          onClick={() => deleteData()}
        >
          Delete            
        </button>     
        <div className="link">
          <Link to="/" id="link1">
            <strong>Back</strong>
            <span>
              <FiArrowLeft />
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default DeleteLogin;