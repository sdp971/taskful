import React, { useState } from "react";

import "../styles/Login.css";
import herosection from "../../../backend/public/assets/images/herosection.svg";

function Login() {
  const [setUsernameLogin] = useState("");
  const [setUserpasswordLogin] = useState("");

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src={herosection} alt="femme zen" />
        </div>
        <div className="right">
          <h1>Formulaire de connexion</h1>
          <form action="" className="login-form">
            <input
              type="text"
              placeholder="Nom"
              className="input-login"
              onChange={(e) => setUsernameLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="input-login"
              onChange={(e) => setUserpasswordLogin(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
