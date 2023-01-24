// == Import
import './styles.scss';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Home from '../Home';
import Inscription from '../Inscription';
import Connexion from '../Connexion';
import BoardgameList from '../BoardgameList';
import GameList from '../GameList';
import Dashboard from '../Dashboard';

// == Composant
function App() {
  axios.get('http://syham-zedri.vpnuser.lan:8000/api/boardgames/top5')

    .then((response) => {
      console.log(response);
    })

    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="app">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        {/*<Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/faq" element={<Faq />} />*/}
        <Route path="/collection" element={<BoardgameList />} />
        <Route path="/parties/liste" element={<GameList />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />

      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default App;
