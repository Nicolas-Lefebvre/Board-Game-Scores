// == Import
import './styles.scss';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from '../Navbar/vanillaNavBar';
import Footer from '../Footer';

import Data from '../../Data/Top5Games';

import Home from '../Home';
import Subscribe from '../Subscribe';
import Connexion from '../Connexion';
import BoardgameList from '../BoardgameList';
import BoardgameDetails from '../BoardgameDetails';
import AddBoardgame from '../AddBoardgame';
import GameList from '../GameList';
import GameDetails from '../GameDetails';
import Dashboard from '../Dashboard';
import AddGame from '../AddGame';
import GetConnected from '../GetConnected';
import Disconnection from '../Disconnection';
import Contact from '../Contact';
import Cgu from '../Cgu';
import Faq from '../Faq';
import Forgetpassword from '../Forgetpassword';
import Players from '../PlayerList';
import PlayerDetails from '../PlayerDetails';
import PlayerAdd from '../PlayerAdd';
import PlayerEdit from '../PlayerEdit';
import Page404 from '../Page404';

// == Composant
function App() {
  const [top5Games, setTop5Games] = useState(Data);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [nickname, setNickname] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');

  useEffect(() => {
    axios.get('http://syham-zedri.vpnuser.lan:8000/api/boardgames/top5')

      .then((response) => {
        // console.log(response);
        // console.log(response.data.results);
        setTop5Games(response.data.results);
        // console.log(response.data.results[0].name);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        // traitement exécuté dans tous les cas, après then ou après catch
        setLoading(false);
      });
  }, []);

  console.log(localStorage.getItem('BGStoken'));

  return (
    <div className="app">

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={(<Home top5Games={top5Games} loading={loading} />)}
        />

        {/* --------------------------------------- BOARDGAMES -------------------------------- */}
        <Route path="/jeux" element={localStorage.getItem('BGStoken') ? <BoardgameList /> : <GetConnected />} />
        <Route
          path="/jeux/:gameId"
          element={
            localStorage.getItem('BGStoken')
              ? (
                <BoardgameDetails
                  name="Catan"
                  image="https://example.com/catan.jpg"
                  editor="Super Meeple"
                  author="Eric marks"
                  description="Explorez l'île de Catane et utilisez vos ressources pour construire villes et routes. Contrôlez le plus grand territoire et remportez la partie. Catan est un jeu mêlant la gestion et la négociation."
                  players="3-4"
                  playtime="90"
                  stats="90"
                />
              )
              : <GetConnected />
          }
        />
        <Route path="/jeux/ajouter" element={localStorage.getItem('BGStoken') ? <AddBoardgame loading={loading} setLoading={setLoading} /> : <GetConnected />} />

        {/* ------------------------------------- GAMES ---------------------------------------- */}
        <Route
          path="/parties/:gameId"
          element={
            localStorage.getItem('BGStoken') ? (
              <GameDetails
                loading={loading}
                setLoading={setLoading}
                date="2023/02/01"
                name="Catan"
                image="https://example.com/catan.jpg"
                editor="Super Meeple"
                author="Eric marks"
                remarks="Une partie très sympa même si Syham a triché pour gagner, mais on a fait semblant de ne rien voir pour lui faire plaisir."
                players="Amar, Syham, Laura, Nico"
                playtime="90"
                stats="90"
                startDate="29/01/23"
                endDate="01/02/23"
              />
            ) : <GetConnected />
        }
        />
        <Route path="/parties" element={localStorage.getItem('BGStoken') ? <GameList loading={loading} setLoading={setLoading} /> : <GetConnected />} />
        <Route path="/parties/ajouter" element={localStorage.getItem('BGStoken') ? <AddGame /> : <GetConnected />} />

        {/* -------------------------------------------- PLAYERS ------------------------------- */}
        <Route path="/joueurs" element={localStorage.getItem('BGStoken') ? <Players /> : <GetConnected />} />
        <Route path="/joueurs/:id" element={localStorage.getItem('BGStoken') ? <PlayerDetails /> : <GetConnected />} />
        <Route path="/joueurs/ajouter" element={localStorage.getItem('BGStoken') ? <PlayerAdd /> : <GetConnected />} />
        <Route path="/joueurs/modifier" element={localStorage.getItem('BGStoken') ? <PlayerEdit /> : <GetConnected />} />

        {/* -------------------------------------------------- DASHBOARD ----------------------- */}
        <Route path="/tableau-de-bord" element={localStorage.getItem('BGStoken') ? <Dashboard /> : <GetConnected />} />

        {/* ---------------------------------------------------- OTHERS------------------------- */}
        <Route path="/inscription" element={<Subscribe />} />
        <Route path="/connexion" element={localStorage.getItem('BGStoken') ? <Disconnection setIsLogged={setIsLogged} setToken={setToken} /> : <Connexion setIsLogged={setIsLogged} setToken={setToken} />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<Page404 />} />

      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default App;
