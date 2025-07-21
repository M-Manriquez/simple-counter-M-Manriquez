import React, { useEffect, useState } from "react";

const SecondsCounter = (props) => {
  // Hook que se encarga de almacenar y cambiar los segundos (parte en 0)
  const [seconds, setSeconds] = useState(props.seconds ? props.seconds : 0);
  const [isPlaying, setPlaying] = useState(false);
  const [isToggled, setToggled] = useState(false);

  // Hook que se encarga de aumentar el valor de seconds en 1 cada 1000 ms (1 segundo)
  useEffect(() => {
    // Creo un intervalo como nulo
    let interval = null;

    // Si isActive es verdadero, entonces el intervalo pasa a cambiar los segundos aumentando de 1 en 1 cada 1 segundo.
    if (isPlaying && isToggled) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (isPlaying && !isToggled) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  // Creo una variable que almacenara los segundos como strings en un formato especifico (6 digitos y digitos vacios rellenados con 0)
  // Utilizo map para que se rendericen los 6 digitos a la vez
  const formattedSeconds = seconds.toString().padStart(6, "0").split("");
  return (
    <div className="container bg-black text-white mt-1 d-flex justify-content-center align-items-center second-counter justify-content-evenly">
      <i className="fa-regular fa-clock clock"></i>
      <div className="seconds">
        {formattedSeconds.map((digit, index) => (
          <span key={index} className="digit mx-2 px-2 digit-bg-color">
            {digit}
          </span>
        ))}
      </div>
      <div>
        <button
          className="btn btn-success"
          onClick={() => setToggled(!isToggled)}
        >
          {isToggled ? (
            <i class="fa-solid fa-toggle-on"></i>
          ) : (
            <i class="fa-solid fa-toggle-off"></i>
          )}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <i class="fa-solid fa-pause"></i>
          ) : (
            <i class="fa-solid fa-play"></i>
          )}
        </button>
        <button className="btn btn-primary" onClick={() => setSeconds(0)}>
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    </div>
  );
};
//TODO: ARREGLAR NEGATIVOS EN AL CUENTA ATRAS
export default SecondsCounter;
