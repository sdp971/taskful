import React, { useState } from "react";
import "../styles/Login.css";
import herosection from "../../../backend/public/assets/images/herosection.svg";
import useAPI from "../api/useApi";

function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [userpasswordReg, setUserpasswordReg] = useState("");
  const [userEmailReg, setUserEmailReg] = useState("");

  const api = useAPI();

  const register = async () => {
    try {
      const response = await api.post("users", {
        name: usernameReg,
        password: userpasswordReg,
        email: userEmailReg,
      });
      return response.json();
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div className="login">
        <div className="card">
          <div className="left">
            <img src={herosection} alt="femme zen" />
          </div>
          <div className="right">
            <h1>Formulaire d'inscription</h1>
            <form
              className="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
            >
              <input
                type="text"
                placeholder="Nom"
                className="input-register"
                onChange={(e) => setUsernameReg(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-login"
                onChange={(e) => setUserEmailReg(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="input-register"
                onChange={(e) => setUserpasswordReg(e.target.value)}
              />
              <button type="submit" className="register-btn">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
