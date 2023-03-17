/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import './home.scss';
import PropTypes from 'prop-types';

import Header from './Header';
import Presentation from './Presentation';
import Classement from './Classement';
import HomeDashboard from './HomeDashboard';
import Loader from '../Loader';

// == Composant
function Home({ top5Games, loading }) {
  return (
    <div className="home">

      <Header />
      <Presentation />
      {top5Games.length === 0 ? '' : <Loader />}
      {!loading ? (top5Games.length !== 0 ? <Classement loading={loading} top5Games={top5Games} /> : '') : <Loader />}
      <HomeDashboard />

    </div>
  );
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  /* list doit être un tableau d'objets, et on précise les propriétés de l'objet (la
    "forme" des objets) */
  top5Games: PropTypes.arrayOf(
    // shape : "des objets qui ont cette forme-là"
    PropTypes.shape({
      // propriété: type attendu
      // il faut une propriété id, de type number
      game_number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default Home;
