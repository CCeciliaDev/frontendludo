import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/About.css";
import deco from "../../assets/arrow.png";
// import portrait from "../../assets/portrait.png";

export default function About() {
  const [aboutText, setAboutText] = useState("");
  const [qualifText, setQualifText] = useState("");
  const [xpText, setXpText] = useState("");
  const [aboutImgURL, setAboutImgURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/about`
        );
        console.info("API Response data:", response.data);
        setAboutText(response.data.about || "");
        setQualifText(response.data.qualifications || "");
        setXpText(response.data.experiences || "");
        setAboutImgURL(response.data.urlImgAbout || "");
      } catch (error) {
        console.error("Erreur lors de la récupération du message :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mainDivAbout">
      <div className="divPresAbout">
        <div className="divTitleAbout">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Qui suis-je ?</h2>
        </div>
        <div className="divAbout">
          {/* <img className="portrait" src={portrait} alt="portrait" /> */}
          <img className="portrait" src={aboutImgURL} alt="portrait" />
          <div
            className="divAboutText"
            dangerouslySetInnerHTML={{ __html: aboutText }}
          />
        </div>
        <div className="divTitleAbout">
          <img className="deco" src={deco} alt="deco galet" />
          <h3>Mes diplômes et formations</h3>
        </div>
        <div className="divAbout">
          <div
            className="divAboutText"
            dangerouslySetInnerHTML={{ __html: qualifText }}
          />
        </div>
        <div className="divTitleAbout">
          <img className="deco" src={deco} alt="deco galet" />
          <h3>Mes expériences</h3>
        </div>
        <div className="divAbout">
          <div
            className="divAboutText"
            dangerouslySetInnerHTML={{ __html: xpText }}
          />
        </div>
      </div>
    </div>
  );
}
