import React from "react";
import "../styles/Login.css";
import herosection from "../../../backend/public/assets/images/herosection.svg";

function Register() {
  return (
    <div>
      <div className="login">
        <div className="card">
          <div className="left">
            <img src={herosection} alt="femme zen" />
          </div>
          <div className="right">
            <h1>Formulaire d'inscription</h1>
            <form className="register-form" action="">
              <input type="text" placeholder="Nom" className="input-register" />
              <input
                type="password"
                placeholder="Mot de passe"
                className="input-register"
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
