import React from "react";

export default function Alert({ message, onClose }) {
    return (
      <div className="custom-modal">
        <div className="custom-modal-content">
          <h3>{message}</h3>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
};