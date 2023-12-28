/* eslint-disable max-len */
import './gameList.scss';

import winnerMedal from 'src/assets/images/winner-medal.png';

import axios from 'axios';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
// import { MenuProps } from 'antd';
import { Dropdown, Space, Modal, } from 'antd';

import { NavLink } from 'react-router-dom';
import Loader from '../Loader';


const { confirm } = Modal;

let gameList = [];
let uniqueGameList = [];

// == Composant
function GameList() {
  const [loading, setLoading] = useState(true);

  // ---------------------- Get token from local storage---------------------
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  useEffect(() => {
    axios.get(
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/usergame',
      config,
    )

      .then((response) => {
        console.log('Liste des parties du user bien récupérée');
        console.log(response);
        // -------------Tableau contenant toutes les parties (un object par gagnants)----------
        gameList = response.data.results;
        // -------------Tableau contenant toutes les parties (un object par partie)----------
        uniqueGameList = [...new Map(gameList.map((game) => [game.game_id, game])).values()];
        console.log(gameList);
        console.log(uniqueGameList);

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

  // --------------------- CLICK ON GAME DELETE ----------------------------
  // const showDeleteConfirm = (deleteGameId) => {
  //   confirm({
  //     title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
  //     icon: <ExclamationCircleFilled />,
  //     content: 'suppression définitive !',
  //     okText: 'Oui',
  //     okType: 'danger',
  //     cancelText: 'Annuler',
  //     onOk() {
  //       console.log(deleteGameId);
  //       console.log('OK');
  //       axios.delete(
  //       // URL
  //         `http://nicolas-lefebvre.vpnuser.lan:8000/api/game/${deleteGameId}`,
  //         // données
  //         config,
  //       )
  //         .then(() => {
  //           console.log('Supression de la partie OK');

  //           // On refait appel à l'API pour mettre à jour la liste des joueurs et re-render le composant
  //           axios.get(
  //             // URL
  //             'http://nicolas-lefebvre.vpnuser.lan:8000/api/usergame',
  //             // données
  //             config,
  //           )
  //             .then((response) => {
  //               console.log('MAJ de la liste de toutes les parties OK');
  //               // setPlayerListNoStats(response.data.results);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         })

  //         .catch((error) => {
  //           console.log(error);
  //         })
  //         .finally(() => {
  //         });
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // };
  const [gameDetails, setgameDetails] = useState(false);
  const onClick = () => {
    // console.log('Click');
    setgameDetails(!gameDetails);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container gameList">

      <h2>Mes parties</h2>

      <div className="main">

        {uniqueGameList.map((game) => (
          <NavLink className="card" to={`/parties/id?game_id=${game.game_id}`} key={game.game_id}>
            {/* <div className="card"> */}
            <div className="game-card">
              <div className="img-container">
                <img src={game.picture} alt="" className="image" />
              </div>
              <div className="text-container">
                <h5 className="card-title">{game.start_date.substr(0, 10)}</h5>
                {/* <p className="category">Jeu de gestion</p> */}
                <ul className="">
                  <li><strong>{game.board_game_name}</strong></li>
                  <li className="winner-block">
                    <div className="nb-participants">{game.player_number} participants</div>
                    <img style={{ marginLeft: '1rem' }} src={winnerMedal} alt="medaille du gagnant" className="winner-img" />
                    <div className="winner-name">
                      {/* Récupération de la liste des gagnants pour chaque partie  */}
                      {/* eslint-disable-next-line max-len */}
                      { (gameList.filter((filteredGame) => (filteredGame.game_id === game.game_id))).map((subGame) => (<span key={subGame.id}>{subGame.player_name}</span>)) }
                    </div>
                  </li>
                  {/* <li>{game.playerNumber}</li> */}
                </ul>
              </div>
              {/* <div className="btn-container">
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
                          <NavLink
                            rel="noopener noreferrer"
                            to="#"
                            onClick={(e) => {
                              showDeleteConfirm(game.game_id);
                            }}
                          >
                            Supprimer
                          </NavLink>
                        ),
                      },
                    ],
                  }}
                >
                  <Space>
                    <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: '#2f71af' }} />
                  </Space>
                </Dropdown>
              </div> */}
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
