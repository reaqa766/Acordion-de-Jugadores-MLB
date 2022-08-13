import React, { useState, useEffect } from "react";
// import data from "./data";
// import SingleQuestion from "./Question";

function App() {
  const [datosP, setDatosP] = useState([]);
  const url =
    "https://statsapi.mlb.com/api/v1/sports/1/players?season=2022&gameType=R";

  const fetchData = async () => {
    const response = await fetch(url);
    const datosPlayers = await response.json();
    const players = Object.values(datosPlayers);
    console.log(datosPlayers.people);
    const jugadoresFiltrados = datosPlayers.people.filter(
      (jugador) => jugador.birthCountry === "Venezuela"
    );
    setDatosP(jugadoresFiltrados);
    console.log(jugadoresFiltrados);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // .filter((jugador) => jugador.birthCountry === "Venezuela")

  return (
    <>
      <h2>jugadores</h2>
      {datosP.map((datoPlayer, index) => {
        // console.log("Index", index);
        // console.log("datosP", datosP[index]);
        // console.log("index", index);
        // if (index) {
        return (
          <div key={datosP[index]}>
            <h3>{datosP[index].fullName}</h3>
            <h3>{datosP[index].birthCity}</h3>
            <h3>{datosP[index].id}</h3>
          </div>
        );
        // }
      })}
    </>
  );
}

export default App;
