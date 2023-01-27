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
import Inscription from '../Inscription';
import Connexion from '../Connexion';
import BoardgameList from '../BoardgameList';
import AddBoardgame from '../AddBoardgame';
import GameList from '../GameList';
import Dashboard from '../Dashboard';
import Loader from '../Loader';
import AddGame from '../AddGame';
import GetConnected from '../GetConnected';
import Disconnection from '../Disconnection';
import Contact from '../Contact';
import Cgu from '../Cgu';
import Faq from '../Faq';
import Forgetpassword from '../Forgetpassword';
import Players from '../Players';


// == Composant
function App() {
  const [top5Games, setTop5Games] = useState(Data);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useState(true);
  // eslint-disable-next-line no-unused-vars
  // const [nickname, setNickname] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');

  useEffect(() => {
    axios.get('http://laura-poitou.vpnuser.lan:8000/api/boardgames/top5')

      .then((response) => {
        console.log(response);
        console.log(response.data.results);
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

  console.log(top5Games);

  return (
    <div className="app">

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={(
            <main>
              {loading && (
                <Loader />
              )}
              {!loading && (
                <Home top5Games={top5Games} />
              )}
            </main>
          )}
        />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={isLogged ? <Disconnection setIsLogged={setIsLogged} setToken={setToken} /> : <Connexion setIsLogged={setIsLogged} setToken={setToken} />} />
        <Route path="/jeux" element={isLogged ? <BoardgameList /> : <GetConnected />} />
        <Route path="/jeux/ajouter" element={isLogged ? <AddBoardgame loading={loading} setLoading={setLoading} /> : <GetConnected />} />
        <Route path="/parties" element={isLogged ? <GameList /> : <GetConnected />} />
        <Route path="/parties/ajouter" element={isLogged ? <AddGame /> : <GetConnected />} />
        <Route path="/tableau-de-bord" element={isLogged ? <Dashboard /> : <GetConnected />} />
        <Route path="/joueurs" element={isLogged ? <Players /> : <GetConnected />} />
        <Route path="/joueurs/ajouter" element={isLogged ? <Players /> : <GetConnected />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/faq" element={<Faq />} />

      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default App;
