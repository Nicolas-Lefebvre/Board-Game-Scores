import './styles.scss';
// == Import
import axios from 'axios';

import Navbar from '../Navbar';
import Home from '../Home';
import Footer from '../Footer';

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
      <Home />
      <Footer />

    </div>
  );
}

// == Export
export default App;
