import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PersonList({ onDeleteDev }) {
  const [devs, setDevs] = useState([]);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/devs")
      .then((res) => setDevs(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onChosenDev = (dev) => {
    setDetails(dev);
  };

  const handleDeleteDev = (dev) => {
    onDeleteDev(dev._id);
  };

  return (
    <ul>
      {devs.map((dev) => (
        <li key={dev.id}>
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
