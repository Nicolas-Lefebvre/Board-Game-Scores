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

// == Composant
function App() {
  axios.get('http://syham-zedri.vpnuser.lan:8000/api/boardgames')

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

      </Routes>

      <Footer />

    </div>
  );
}

// == Export
export default App;
