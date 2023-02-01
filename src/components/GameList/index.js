import './gameList.scss';

import winnerMedal from 'src/assets/images/winner-medal.png';

import axios from 'axios';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

import { NavLink } from 'react-router-dom';
import Loader from '../Loader';

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

let gameList = [];

// == Composant
function GameList() {
  const [loading, setLoading] = useState(true);

  // ---------------------- Get token from local storage---------------------
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  useEffect(() => {
    axios.get(
      'http://syham-zedri.vpnuser.lan:8000/api/usergame',
      config,
    )

      .then((response) => {
        console.log('Liste des parties du user bien récupérée');
        console.log(response);
        gameList = response.data.results;
        console.log(gameList);

        // const concatGameList = gameList.concat();
        // console.log(concatGameList);
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

  // const [gameDetails, setgameDetails] = useState(false);
  // const onClick = () => {
  //   // console.log('Click');
  //   setgameDetails(!gameDetails);
  // };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container gameList">

      <h2>Mes parties</h2>

      <div className="main">

        {gameList.map((game) => (
          <NavLink className="card" to={`/parties/id?game_id=${game.id}`} key={game.id}>
            {/* <div className="card"> */}
            <div className="game-card">
              <div className="img-container">
                <img src={game.picture} alt="" className="image" />
              </div>
              <div className="text-container">
                <h5 className="card-title">{game.start_date.substr(0, 10)}</h5>
                {/* <p className="category">Jeu de gestion</p> */}
                <ul className="">
                  <li>{game.board_game_name}</li>
                  <li className="winner-block">
                    <div>{game.player_number} particpants</div>
                    <img style={{ marginLeft: '1rem' }} src={winnerMedal} alt="medaille du gagnant" className="winner-img" />
                    <div className="winner-name">{game.player_name}</div>
                  </li>
                  {/* <li>{game.playerNumber}</li> */}
                </ul>
              </div>
              <div className="btn-container">
                <Dropdown
                  menu={{
                    items: [
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
                    ],
                  }}
                >
                  {/* <a onClick={(e) => e.preventDefault()}> */}
                  <Space>
                    <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: '#2f71af' }} />
                  </Space>
                  {/* </a> */}
                </Dropdown>
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
export default GameList;
