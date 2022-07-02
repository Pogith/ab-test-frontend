import React from "react";

export default function Button({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick}>
        <h3>{children}</h3>
      </button>
    </div>
  );
}
