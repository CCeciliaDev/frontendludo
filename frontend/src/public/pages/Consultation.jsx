import { useState, useEffect } from "react";
import "../styles/Consultation.css";
import axios from "axios";
import deco from "../../assets/arrow.png";

export default function Consultation() {
  const [reasonText, setReasonText] = useState("");
  const [expertText, setExpertText] = useState("");
  const [ConsultText, setConsultText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/consultation`
        );
        console.info("API Response data:", response.data);
        setReasonText(response.data.reason || "");
        setExpertText(response.data.expertise || "");
        setConsultText(response.data.consultation || "");
      } catch (error) {
        console.error("Erreur lors de la récupération du message :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mainDivConsultation">
      <div className="divPresConsultation">
        <div className="divTitleConsultation">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Pour quels motifs consulter ?</h2>
        </div>
        <div className="divConsult">
          <div
            className="divConsultText"
            dangerouslySetInnerHTML={{ __html: reasonText }}
          />
        </div>
        <div className="divTitleConsultation">
          <img className="deco" src={deco} alt="deco galet" />
          <h3>Mes domaines d'expertise</h3>
        </div>
        <div className="divConsult">
          <div
            className="divConsultText"
            dangerouslySetInnerHTML={{ __html: expertText }}
          />
        </div>
        <div className="divTitleConsultation">
          <img className="deco" src={deco} alt="deco galet" />
          <h3>Comment je mène mes consultations ?</h3>
        </div>
        <div className="divConsult">
          <div
            className="divConsultText"
            dangerouslySetInnerHTML={{ __html: ConsultText }}
          />
        </div>
      </div>
    </div>
  );
}
