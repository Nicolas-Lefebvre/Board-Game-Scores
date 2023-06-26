// == Import
import './styles.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Navbar from '../Navbar/vanillaNavBar';
import Footer from '../Footer';
import Home from '../Home';
import Subscribe from '../Subscribe';
import Connexion from '../Connexion';
import BoardgameList from '../BoardgameList';
import BoardgameDetails from '../BoardgameDetails';
import AddBoardgame from '../AddBoardgame';
import GameList from '../GameList';
import GameDetails from '../GameDetails';
import GameEdit from '../GameEdit';
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
import ProfilEdit from '../ProfilEdit';
import { checkTokenValidity } from '../../actions/user';

// == Composant
function App() {
  const [userInfos, setUserInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  // const [isLogged, setIsLogged] = useState(false);
  let isLogged = useSelector((state) => state.user.isLogged);

  if (localStorage.getItem('BGStoken')) {
    dispatch(checkTokenValidity());
  }
  else {
    isLogged = false;
  }
  console.log('Validité du token :', isLogged);

  // -------------------------- VERIFICATION DU JWT TOKEN -------------------------
  // let isExpired;
  // const decodedToken = jwtDecode(localStorage.getItem('BGStoken'));
  // console.log(decodedToken);
  // const dateNow = new Date();

  // if (decodedToken.exp < dateNow.getTime()) {
  //   isExpired = true;
  // }
  // -----------------------------------------------------------------------------

  // eslint-disable-next-line no-unused-vars
  // const [nickname, setNickname] = useState('');
  // eslint-disable-next-line no-unused-vars
  // const [token, setToken] = useState('');
  const token = useSelector((state) => state.user.token);

  // useEffect(() => {
  //   if (localStorage.getItem('BGStoken')) {
  //     setToken(localStorage.getItem('BGStoken'));
  //   }
  //   // else {
  //   //   setToken(localStorage.getItem(''));
  //   // }
  // }, []);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/boardgames/top5')

  //     .then((response) => {
  //       console.log(response);
  //       // console.log(response.data.results);
  //       setTop5Games(response.data.results);
  //       // console.log(response.data.results[0].name);
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     })

  //     .finally(() => {
  //       // traitement exécuté dans tous les cas, après then ou après catch
  //       setLoading(false);
  //     });
  // }, []);

  // console.log(localStorage.getItem('BGStoken'));

  return (
    <div className="app">

      <Navbar token={token} />

      <Routes>
        <Route path="/" element={(<Home />)} />

        {/* --------------------------------------- BOARDGAMES -------------------------------- */}
        <Route path="/jeux" element={isLogged ? <BoardgameList /> : <GetConnected />} />
        <Route
          path="/jeux/:boardgameId"
          element={isLogged ? (<BoardgameDetails />) : <GetConnected />}
        />
        <Route path="/jeux/ajouter" element={isLogged ? <AddBoardgame loading={loading} setLoading={setLoading} /> : <GetConnected />} />

        {/* ------------------------------------- GAMES ---------------------------------------- */}
        <Route
          path="/parties/:gameId"
          element={
            isLogged ? (<GameDetails />) : <GetConnected />
        }
        />
        <Route
          path="/parties/modifier/:id"
          element={isLogged ? (<GameEdit />) : <GetConnected />}
        />
        <Route path="/parties" element={isLogged ? <GameList loading={loading} setLoading={setLoading} /> : <GetConnected />} />
        <Route path="/parties/ajouter" element={isLogged ? <AddGame /> : <GetConnected />} />

        {/* -------------------------------------------- PLAYERS ------------------------------- */}
        <Route path="/joueurs" element={isLogged ? <Players /> : <GetConnected />} />
        <Route path="/joueurs/:id" element={isLogged ? <PlayerDetails /> : <GetConnected />} />
        <Route path="/joueurs/ajouter" element={isLogged ? <PlayerAdd /> : <GetConnected />} />
        <Route path="/joueurs/modifier" element={isLogged ? <PlayerEdit /> : <GetConnected />} />

        {/* -------------------------------------------------- DASHBOARD ----------------------- */}
        <Route path="/tableau-de-bord" element={isLogged ? <Dashboard setUserInfos={setUserInfos} userInfos={userInfos} /> : <GetConnected />} />

        {/* ---------------------------------------------------- OTHERS------------------------- */}
        <Route path="/inscription" element={<Subscribe />} />
        <Route path="/connexion" element={isLogged ? <Disconnection /> : <Connexion />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/profil/modifier" element={<ProfilEdit setUserInfos={setUserInfos} userInfos={userInfos} />} />

      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default App;
