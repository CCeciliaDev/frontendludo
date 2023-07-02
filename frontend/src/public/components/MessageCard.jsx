import React from "react";
import PropTypes from "prop-types";

export default function MessageCard({ message }) {
  console.info("Message card :", message);
  return (
    <div className="message-card">
      <p>{message}</p>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.string.isRequired,
};
