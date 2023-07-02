import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import plant1 from "../../assets/boho_1B.png";
import plant2 from "../../assets/boho_2.png";
import plant3 from "../../assets/boho_3.png";
import plant4 from "../../assets/boho_4.png";

export default function Home() {
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/welcome`
        );
        console.info("API Response data:", response.data);
        setWelcomeText(response.data.welcomeText);
      } catch (error) {
        console.error("Erreur lors de la récupération du message :", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="mainDivHome">
      <div className="divPresHome">
        <div>
          <h2>Ludovic Fournier</h2>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div
          className="divWelcomeTextHome"
          dangerouslySetInnerHTML={{ __html: welcomeText }}
        />
        <div className="divTextHome">
          <h4>Bienvenue sur mon site</h4>
        </div>
        <div className="divTextHome">
          <h5>
            Je vous invite à aller découvrir mon
            <Link className="Hlink" to="/about">
              profil
            </Link>
            , mon
            <Link className="Hlink" to="/consultation">
              travail
            </Link>
            ou encore mes
            <Link className="Hlink" to="/articles">
              articles.
            </Link>
          </h5>
        </div>
        <div className="divImg">
          <img className="imgPlant plant4" src={plant4} alt="logo" />
          <img className="imgPlant plant3" src={plant3} alt="logo" />
          <img className="imgPlant plant2" src={plant2} alt="logo" />
          <img className="imgPlant plant1" src={plant1} alt="logo" />
        </div>
      </div>
    </div>
  );
}
