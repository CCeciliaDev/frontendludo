import React from "react";
import PropTypes from "prop-types";
import "../styles/PlaceCard.css";

export default function PlaceCard({ place }) {
  return (
    <div className="mainDivPlaceCard">
      <div className="divDescPlaceCard">
        <h3 className="titlePlaceCard">{place.city}</h3>
        <p>{place.address}</p>
        <p>
          {place.CP} {place.city}
        </p>
        <br />
        <p>{place.time1}</p>
        <p>{place.time2}</p>
        <p>{place.time3}</p>
      </div>
      <div>
        <img src={place.urlImg} alt={place.city} />
      </div>
    </div>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    address: PropTypes.string,
    // CP: PropTypes.string,
    CP: PropTypes.number,
    city: PropTypes.string,
    time1: PropTypes.string,
    time2: PropTypes.string,
    time3: PropTypes.string,
    urlImg: PropTypes.string,
  }).isRequired,
};
