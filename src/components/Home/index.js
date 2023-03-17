/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import './home.scss';
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTop5Games } from '../../actions/boardgames';

import Header from './Header';
import Presentation from './Presentation';
import Classement from './Classement';
import HomeDashboard from './HomeDashboard';
import Loader from '../Loader';

// == Composant
function Home({ loading }) {
  const boardgamesLoaded = useSelector((state) => state.boardgames.top5GamesLoaded);
  console.log(boardgamesLoaded);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTop5Games());
  }, []);

  const top5Games = useSelector((state) => state.boardgames.top5Games);

  // useEffect(() => {
  //   const dispatch = useDispatch();
  //   dispatch(fetchTop5Games());
  //   console.log(top5Games);
  // }, []);

  return (
    <div className="home">

      <Header />
      <Presentation />
      {/* {top5Games.length === 0 ? '' : <Loader />} */}
      {boardgamesLoaded ? (top5Games.length !== 0 ? <Classement loading={loading} top5Games={top5Games} /> : '') : <Loader />}
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
