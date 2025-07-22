import React, { useEffect, useState } from "react";

const SecondsCounter = (props) => {
  // Hook que se encarga de almacenar y cambiar los segundos (si el usuario especifica un número, entonces parte de ahi, si no se especifica entonces parte en 0)
  const [seconds, setSeconds] = useState(props.seconds ? props.seconds : 0);

  // Hook que controla si el contador esta en ejecucion o pausado
  const [isPlaying, setPlaying] = useState(false);

  // Hook que controla si el contador debe incrementar o decrementar
  const [isToggled, setToggled] = useState(false);

  // Hook que se encarga de aumentar o decrementar el valor de seconds en 1 cada 1000 ms (1 segundo) dependiendo el estado
  useEffect(() => {
    // Creo un intervalo como nulo
    let interval = null;

    // Si isPlaying e isToggled son verdaderos, entonces el intervalo pasa a cambiar los segundos aumentando de 1 en 1 cada 1 segundo
    if (isPlaying && !isToggled) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    // En cambio, si isPlaying es verdadero pero isToggled es falso, en lugar de aumentar en 1 segundo, el valor disminuira en 1 cada segundo
    else if (isPlaying && isToggled) {
      if (seconds > 0) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
      } else {
        return () => clearInterval(interval);
      }
    }
    // En el caso de que ambos sean falsos, el intervalo se limpia
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
          className="btn btn-bg-black text-white"
          onClick={() => setToggled(!isToggled)}
        >
          {isToggled ? (
            <div>
              <i class="fa-solid fa-toggle-on"></i>
              <p>countdown</p>
            </div>
          ) : (
            <div>
              <i class="fa-solid fa-toggle-off"></i>
              <p>chrono</p>
            </div>
          )}
        </button>
        <button
          className="btn btn-bg-black text-white"
          onClick={() => setPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <div>
              <i class="fa-solid fa-pause"></i>
              <p>pause</p>
            </div>
          ) : (
            <div>
              <i class="fa-solid fa-play"></i>
              <p>resume</p>
            </div>
          )}
        </button>
        <button
          className="btn btn-bg-black text-white"
          onClick={() => setSeconds(0)}
        >
          <i class="fa-solid fa-rotate-left"></i>
          <p>restart</p>
        </button>
      </div>
    </div>
  );
};
//TODO: ARREGLAR NEGATIVOS EN AL CUENTA ATRAS
export default SecondsCounter;
