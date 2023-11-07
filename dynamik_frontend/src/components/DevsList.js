import React, { useState } from "react";

export default function PersonList({ onDeleteDev, onDevsList }) {
  const [details, setDetails] = useState(null);

  const onChosenDev = (dev) => {
    setDetails(dev);
  };

  const handleDeleteDev = (dev) => {
    onDeleteDev(dev._id);
  };

  return (
    <ul>
      {onDevsList.map((dev) => (
        <li key={dev._id}>
          {dev.name}
          <button onClick={() => onChosenDev(dev)}>Show Details</button>
          <button onClick={() => handleDeleteDev(dev)}>❌</button>
        </li>
      ))}
      {details && (
        <ul>
          <li>{details.nickname}</li>
          <li>{details.birth_date}</li>
          <li>{details.stack}</li>
        </ul>
      )}
    </ul>
  );
}
