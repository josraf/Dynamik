import React from "react";
import DevImage from "../img/dev.png";

export default function DevList({
  onDeleteDev,
  onDetailsDev,
  onDevsList,
  onDevDetails,
}) {
  const onChosenDev = (dev) => {
    onDetailsDev(dev._id);
  };
  const date = new Date(onDevDetails.birth_date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const handleDeleteDev = (dev) => {
    if (window.confirm("Are you sure?")) onDeleteDev(dev._id);
  };

  function Dev({ dev }) {
    return (
      <div className="cenas">
        <div className="listToShow">
          <img src={DevImage} alt={`${dev.name} dev`} />
          <div className="dev-info">
            <h3>{dev.name}</h3>
            <div className="buttons">
              <button className="btn-details" onClick={() => onChosenDev(dev)}>
                👁️
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteDev(dev)}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
        <div>
          {onDevDetails && onDevDetails._id === dev._id ? (
            <div className="dev-details">
              <div>
                <span>{onDevDetails.nickname}</span>
              </div>
              <div>
                <span>{onDevDetails.stack}</span>
              </div>
              <div>
                <span>{formattedDate}</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
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
