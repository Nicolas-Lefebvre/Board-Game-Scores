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
function Home() {
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
      {boardgamesLoaded ? (top5Games.length >= 5 ? <Classement /> : '') : <Loader />}
      <HomeDashboard />

    </div>
  );
}

Home.propTypes = {
};

// == Export
export default Home;
