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
    //console.log(event.target.name, event.target.value)
    const { name, value } = event.target;
    //console.log(name, value)
    setGetInput({ ...getInput, [name]: value });
  }
  
  function deleteData() {
    if (!validateEmail(getInput.name) || getInput.name === "") {
      alert("Please, type a valid e-mail");
      return;
    }
    api.get("/").then((response) => {
      const login = response.data.filter(
        (login: { name: string; id: number; }) => 
          JSON.stringify(login.name) === JSON.stringify(getInput.name)
      );

      if (login.length > 0) {
        const id = login[0].id;

        api.delete(`/${id}`);

        alert('Login deleted successfully!');
        history.push('/');
      } else {
        alert('E-mail not found');
      }
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