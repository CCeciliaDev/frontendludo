import { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";
import "../styles/Places.css";
import pay1 from "../../assets/payment1.png";
import pay2 from "../../assets/payment2.png";
import deco from "../../assets/arrow.png";

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [prices, setPrices] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/places`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux : ", error);
    }
  };

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prices`
      );
      setPrices(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux : ", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchPrices();
  }, []);

  return (
    <div className="mainDivPlaces">
      <div className="divPresPlaces">
        <div className="divTitlePlaces">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Lieux de consultation</h2>
        </div>
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}

        <div className="divTitlePlaces">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Tarifs des consultations</h2>
        </div>

        <div className="divPrices">
          {prices.map((price) => (
            <p className="presPrices" key={price.id}>
              {price.consultationType} : {price.price}€
            </p>
          ))}
          <p className="infoPrices">
            Les consultations de psychologie ne sont pas remboursées par la
            sécurité sociale, néanmoins certaines mutuelles peuvent participer à
            leur prise en charge.
          </p>
          <p className="infoPrices">
            Je ne suis pas conventionné par la CPAM dans le cadre de
            MonParcoursPsy.
          </p>
        </div>

        <div className="divTitlePlaces">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Moyens de paiement</h2>
        </div>
        <div className="divPayment">
          <div className="divFlexPayment">
            <img className="pay" src={pay1} alt="espèces" />
            Espèce
          </div>
          <div className="divFlexPayment">
            <img className="pay" src={pay2} alt="carte bancaire" />
            Carte bancaire
          </div>
        </div>
      </div>
    </div>
  );
}
