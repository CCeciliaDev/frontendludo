import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Burger.css";

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav>
        <button
          type="button"
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="menu-icon-container">
            {isOpen ? (
              <FaTimes className="close-icon" />
            ) : (
              <FaBars className="menu-icon" />
            )}
          </div>
        </button>
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link className="linkHeader" to="/about">
              Présentation
            </Link>
          </li>
          <li>
            <Link className="linkHeader" to="/consultation">
              Consultations
            </Link>
          </li>
          <li>
            <Link className="linkHeader" to="/infos">
              Lieux et tarifs
            </Link>
          </li>
          <li>
            <Link className="linkHeader" to="/contact">
              Contact et rendez-vous
            </Link>
          </li>
          <li>
            <Link className="linkHeader" to="/articles">
              Articles
            </Link>
          </li>
          <li>
            <Link className="linkHeader" to="/userlogin">
              Espace patients
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
