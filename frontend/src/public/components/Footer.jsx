import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="mainDivFooter">
      <p>&#xA9; Ludovic Fournier 2023</p>
      <p>-</p>
      <p>
        <Link className="Flink" to="/mentions-legales">
          Mentions légales
        </Link>
      </p>
      <p className="separator">-</p>
      <p>
        Site web réalisé par&#x0A;
        <Link
          className="Flink"
          target="_blanck"
          to="https://www.cwebcreations.fr"
        >
          Cweb Créations
        </Link>
      </p>
    </div>
  );
}
