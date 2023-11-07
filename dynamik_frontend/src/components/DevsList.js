import React, { useState } from "react";

export default function DevList({ onDeleteDev, onDevsList, onSelectDev }) {
  const [details, setDetails] = useState(null);

  const onChosenDev = (dev) => {
    setDetails((currentDetails) => (currentDetails === dev ? null : dev));
  };

  const handleDeleteDev = (dev) => {
    if (window.confirm("Are you sure?")) onDeleteDev(dev._id);
  };

  function Dev({ dev }) {
    return (
      <li onClick={() => onChosenDev(dev)}>
        <h3>{dev.name}</h3>
        <div>
          <p>
            <span>Birth Date: {dev.birth_date}</span>
          </p>
          <p>
            <span>Stack: {dev.stack}</span>
          </p>
        </div>
        <button className="btn-delete" onClick={() => handleDeleteDev(dev)}>
          X
        </button>
      </li>
    );
  }

  return (
    <ul className="list list-devs">
      {onDevsList?.map((dev) => (
        <Dev dev={dev} key={dev._id} />
      ))}
    </ul>
  );
}
