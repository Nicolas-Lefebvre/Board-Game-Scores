/* eslint-disable max-len */
import './boardgameList.scss';

import { useSelector, useDispatch } from 'react-redux';
// import jwtDecode from 'jwt-decode';

import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';
import Loader from '../Loader';
import { fetchBoardgameList, fetchPlayedBoardgameList } from '../../actions/boardgames';

// const items = [
//   {
//     key: '1',
//     label: (
//       <NavLink rel="noopener noreferrer" to="#">
//         Voir
//       </NavLink>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <NavLink rel="noopener noreferrer" to="#">
//         Editer
//       </NavLink>
//     ),
//   },
//   {
//     key: '3',
//     label: (
//       <NavLink rel="noopener noreferrer" to="#">
//         Supprimer
//       </NavLink>
//     ),
//   },
// ];

// == Composant
function BoardgameList() {
  const boardgameListLoaded = useSelector((state) => state.boardgames.boardgameListLoaded);
  const playedBoardgameListLoaded = useSelector((state) => state.boardgames.playedBoardgameListLoaded);

  const dispatch = useDispatch();

  // RECUPERATION DE TOUS LES JEUX AVEC OU SANS PARTIE
  useEffect(() => {
    dispatch(fetchBoardgameList());
  }, []);
  const boardgameList = useSelector((state) => state.boardgames.boardgameList);

  // RECUPERATION DE TOUS LES JEUX AVEC AU MOINS UNE PARTIE, INDIQUANT LE NBRE TOTAL DE PARTIES
  useEffect(() => {
    dispatch(fetchPlayedBoardgameList());
  }, []);
  const playedBoardgameList = useSelector((state) => state.boardgames.playedBoardgameList);

  // -------------------------- VERIFICATION DU JWT TOKEN -------------------------
  // let isExpired = false;
  // const decodedToken = jwtDecode(localStorage.getItem('BGStoken'));
  // console.log(decodedToken);
  // const dateNow = new Date();

  // if (decodedToken.exp < dateNow.getTime()) {
  //   isExpired = true;
  // }
  // ------------------------------------------------------------------------------

  if (!boardgameListLoaded || !playedBoardgameListLoaded) {
    return <Loader />;
  }

  if (boardgameListLoaded && playedBoardgameListLoaded && boardgameList.length === 0) {
    return (
      <div className="container">
        <h2 style={{ marginTop: '20vh', color: 'grey', fontStyle: 'italic' }}>Vous n'avez encore aucune donnée : ajoutez votre premier jeu</h2>
      </div>
    );
  }

  return (
    <div className="container gameList">

      <h2>Ma Collection de jeux</h2>

      <div className="main">

        {boardgameList.map((boardgame) => (
          <NavLink className="card" to={`/jeux/${boardgame.id}?boardgame_id=${boardgame.id}`} key={boardgame.id}>
            {/* <div className="card"> */}
            <div className="collection-card">
              <div className="img-container">
                <img src={boardgame.picture} alt={boardgame.name} className="image" />
              </div>
              <div className="text-container">
                <h5 className="card-title">{boardgame.name}</h5>
                {/* <p className="category">Jeu de gestion</p> */}
                <ul className="stats-container">
                  <li>
                    Parties :
                    {(playedBoardgameList.find((playedBoardgame) => (
                      playedBoardgame.board_game_id === boardgame.board_games_id)))
                      ? ` ${(playedBoardgameList.find((playedBoardgame) => (
                        playedBoardgame.board_game_id === boardgame.board_games_id))).game_number}`
                      : ' 0'}
                  </li>
                  {/* <li>Victoires : 15</li> */}
                </ul>
              </div>
              <div className="btn-container">
                {/* <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <Space>
                    <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                  </Space>
                </Dropdown> */}
              </div>
            </div>
            {/* </div> */}
          </NavLink>
        ))}

      </div>

    </div>
  );
}

// == Export
export default BoardgameList;
