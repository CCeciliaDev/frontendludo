import { Link } from "react-router-dom";
import "../styles/Header.css";
import boho from "../../assets/deco.png";
import Burger from "./Burger";

export default function Header() {
  return (
    <div className="mainDivHeader">
      <Link className="homeLinkHeader" to="/">
        <div className="firstDivHeader">
          {/* <img className="logoHeader" src={logo} alt="logo" /> */}
          <img className="logoHeader" src={boho} alt="logo" />
          <div className="secondDivHeader">
            <div className="divNameHeader">
              <p className="titleHeader">Ludovic Fournier</p>
            </div>
            <div>
              <p className="sstitleHeader">Psychologue clinicien</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="divNavHeader">
        <Link className="linkHeader" to="/about">
          <p className="animLink">Présentation</p>
        </Link>
        <Link className="linkHeader" to="/consultation">
          <p className="animLink">Consultations</p>
        </Link>

        <Link className="linkHeader" to="/infos">
          <p className="animLink">Lieux et tarifs</p>
        </Link>
        <Link className="linkHeader" to="/contact">
          <p className="animLink">Contact et rendez-vous</p>
        </Link>
        <Link className="linkHeader" to="/articles">
          <p className="animLink">Articles</p>
        </Link>
        <Link className="linkHeader" to="/userlogin">
          <p className="animLink2">Espace patients</p>
        </Link>
        <div className="burgerMenu">
          <Burger />
        </div>
      </div>
    </div>
  );
}
