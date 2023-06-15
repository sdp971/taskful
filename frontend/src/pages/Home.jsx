import { useNavigate } from "react-router-dom";
import herosection from "../../../backend/public/assets/images/herosection.svg";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleTesterClick = () => {
    navigate("/profile");
  };
  return (
    <div className="hero-section">
      <div className="hero-section-wrapper-text">
        <h1 className="main-title">Ne perdez plus jamais une tâche de vue !</h1>
        <button
          className="btn-hero-section"
          type="submit"
          onClick={handleTesterClick}
        >
          {" "}
          TESTER
        </button>
      </div>
      <div className="hero-section-img">
        <img src={herosection} alt="une femme zen" />
      </div>
    </div>
  );
}
