import React, { useState, useEffect } from "react";
// import data from "./data";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// import data from "./data";
import SingleQuestion from "./Question";

function App() {
  const [datosP, setDatosP] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  // const url =
  //   "https://statsapi.mlb.com/api/v1/people?personIds=650402&season=2018&&gamePk=529410&hydrate=stats(type=gameLog)";
  const url =
    "https://statsapi.mlb.com/api/v1/sports/1/players?season=2022&gameType=R";

  const fetchData = async () => {
    const response = await fetch(url);
    const datosPlayers = await response.json();
    const players = Object.values(datosPlayers);
    // console.log(datosPlayers.people[0].stats[0].splits[101].stat.avg);

    const jugadoresFiltrados = datosPlayers.people.filter(
      (jugador) => jugador.birthCountry === "Venezuela"
    );
    setDatosP(jugadoresFiltrados);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="names">jugadores venezolanos</h1>
      <section className="info2">
        {datosP.map((datoPlayer, index) => {
          return (
            // <SingleQuestion key={datosP[index]} {...datosP} />
            // <div key={datosP[index]} className="container">
            <article key={datosP[index].currentTeam} className="question">
              <header>
                <div className="question">
                  <h2 className="names">{datosP[index].fullName}</h2>
                  <button
                    className="btn"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
                  </button>
                </div>
              </header>
              <div className="info">
                {showInfo && (
                  <div>
                    <h4>Fecha de Debut en MLB: {datosP[index].mlbDebutDate}</h4>
                    <h4>Lugar de Nacimiento:{datosP[index].birthCity}</h4>
                    <h4>Fecha de nacimiento: {datosP[index].birthDate}</h4>
                    <h4>Edad: {datosP[index].currentAge}</h4>
                    <h4>Codigo Interno MLB.com: {datosP[index].id}</h4>
                  </div>
                )}
              </div>
            </article>
            // </div>
          );
        })}
        ;
      </section>
    </div>
  );
}

export default App;
