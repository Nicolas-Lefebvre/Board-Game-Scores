import './boardgameList.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';
import Loader from '../Loader';

const items = [
  {
    key: '1',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Voir
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Editer
      </NavLink>
    ),
  },
  {
    key: '3',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Supprimer
      </NavLink>
    ),
  },
];

// == Composant
function BoardgameList() {
  const [loading, setLoading] = useState(true);
  const [playedBoardgamesloading, setPlayedBoardgamesloading] = useState(true);
  const [boardgameList, setBoardgameList] = useState([]);
  const [playedBoardgameList, setPlayedBoardgameList] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  // RECUPERATION DE TOUS LES JEUX AVEC OU SANS PARTIE
  useEffect(() => {
    axios.get(
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/collection',
      config,
    )

      .then((response) => {
        console.log(response);
        setBoardgameList(response.data.results);

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

  // RECUPERATION DE TOUS LES JEUX AVEC AU MOINS UNE PARTIE, INDIQUANT LE NBRE TOTAL DE PARTIES
  useEffect(() => {
    axios.get(
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgames',
      config,
    )

      .then((response) => {
        console.log(response);
        setPlayedBoardgameList(response.data.results);

        // console.log(response.data.results[0].name);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        // traitement exécuté dans tous les cas, après then ou après catch
        setPlayedBoardgamesloading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (!loading && boardgameList.length === 0) {
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
                <ul className="">
                  <li>
                    Parties : 
                    {(playedBoardgameList.find((playedBoardgame) => (
                      playedBoardgame.board_game_id === boardgame.board_games_id)))
                      ? ' ' + (playedBoardgameList.find((playedBoardgame) => (
                        playedBoardgame.board_game_id === boardgame.board_games_id))).game_number
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
