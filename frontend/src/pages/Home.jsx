import herosection from "../../../backend/public/assets/images/herosection.svg";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="hero-section">
      <div className="hero-section-wrapper-text">
        <h1 className="main-title">Ne perdez plus jamais une tâche de vue !</h1>
        <button className="btn-hero-section" type="submit">
          S'INSCRIRE
        </button>
      </div>
      <div className="hero-section-img">
        <img src={herosection} alt="une femme zen" />
      </div>
    </div>
  );
}
