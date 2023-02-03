/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import './players.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
// import winnerMedal from 'src/assets/images/winner-medal.png';
// import lauriers from 'src/assets/images/laurier-records-2.png';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Loader from '../Loader';

const { confirm } = Modal;

function Players() {
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [playerListNoStats, setPlayerListNoStats] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [lossplayerList, setLossPlayerList] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  // -------------- RECUPERATION LISTE JOUEURS SANS STATS --------------------
  useEffect(() => {
    axios.get(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/user/players',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation de tous les joueurs no stat OK');
        console.log(response.data);
        setPlayerListNoStats(response.data.results);
        // setLossPlayerList(response.data.results.filter((filteredPlayer) => (filteredPlayer.is_winner == 0)));
        // eslint-disable-next-line max-len
        // const winUniquePlayerList = playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 1));
        // eslint-disable-next-line max-len
        // const lossUniquePlayerList = playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 0));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingAll(false);
      });
  }, []);

  useEffect(() => {
    axios.get(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/user/players/stats',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation de tous les joueurs OK');
        console.log(response.data);
        setPlayerList(response.data.results);
        setLossPlayerList(response.data.results.filter((filteredPlayer) => (filteredPlayer.is_winner == 0)));
        // eslint-disable-next-line max-len
        // const winUniquePlayerList = playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 1));
        // eslint-disable-next-line max-len
        // const lossUniquePlayerList = playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 0));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingStats(false);
      });
  }, []);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
      icon: <ExclamationCircleFilled />,
      content: 'suppression définitive !',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        console.log('OK');
        // axios.get(
        // // URL
        //   'http://syham-zedri.vpnuser.lan:8000/api/boardgames',
        //   // données
        //   {
        //   },
        // )
        //   .then((response) => {
        //     console.log('Recuperation des tous les jeux OK');
        //     console.log(response.data);
        //     setAllGames(response.data.results);

        //     setDisabled(false);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
        //   .finally(() => {
        //     setAllGamesLoading(false);
        //   });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  if (loadingAll || loadingStats) {
    return <Loader />;
  }
  return (
    <div className="tableau_mesjoueurs">

      <h2>Mes Joueurs</h2>

      <div className="wrapper">
        <div className="resultat-table">
          <table className="table table-striped">
            <thead />
            {/* </thead> */}
            <tbody>
              <tr>
                <th>Nom</th>
                <th>Nb Total de parties</th>
                <th>Victoires</th>
                <th>Défaites</th>
                {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th> */}
                {/* <th><img src={lauriers} alt="laurier des records" /></th> */}
                <th>Modifier/Supprimer</th>
              </tr>
              {/* { (playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 1))) } */}
              {playerListNoStats.map((playerNoStat) => (
                <tr key={playerNoStat.id}>
                  <td><Link to={`/joueurs/id?player_id=${playerNoStat.id}`}>{playerNoStat.name}</Link></td>

                  {
                    // On cherche dans la liste de tous les joueurs si on a une correspondance dans la liste des joueurs qui ont au moins une partie
                    (playerList.find((filteredPlayer) => (filteredPlayer.player_id == playerNoStat.id))) ?
                    // Si oui, on affiche les stats correspondantes
                      (playerList.filter((filteredPlayer) => (filteredPlayer.is_winner == 1 && filteredPlayer.player_id == playerNoStat.id))).map((player) => (
                        <>
                          <td>
                            { Number((player.victory_number)) + Number((lossplayerList.filter((filteredPlayer) => (filteredPlayer.player_id == player.player_id))).map((filteredPlayer) => (filteredPlayer.victory_number))) }
                          </td>
                          <td>{player.victory_number}</td>
                          <td>
                            {/* -------------- on récupère le player concerné avec son id pour afficher cette fois le nombre de défaites */}
                            { (lossplayerList.filter((filteredPlayer) => (filteredPlayer.player_id == player.player_id))).map((filteredPlayer) => (filteredPlayer.victory_number)) }
                          </td>
                          {/* <td>5</td> */}
                          {/* <td>5</td> */}
                          <td>
                            <NavLink to={`/joueurs/modifier/?player_name=${player.player_name}&?player_id=${player.player_id}`}>
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                style={{
                                  // marginRight: '.5rem',
                                  marginTop: '.6rem',
                                  color: '#0070ff',
                                  fontSize: '1.7rem',
                                }}
                              />
                            </NavLink>
                            <span onClick={showDeleteConfirm}>
                              <FontAwesomeIcon
                                className="delete-btn"
                                icon={faTrashCan}
                                style={{
                                  // marginLeft: '.5rem',
                                  color: 'red',
                                  cursor: 'pointer',
                                  fontSize: '1.7rem',
                                }}
                              />
                            </span>
                          </td>
                        </>
                      ))
                      // Si non, on affiche 0 pour chaque colonne
                      : (
                        <>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>
                            <NavLink to={`/joueurs/modifier/?player_name=${playerNoStat.name}&?player_id=${playerNoStat.id}`}>
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                style={{
                                  // marginRight: '.5rem',
                                  marginTop: '.6rem',
                                  color: '#0070ff',
                                  fontSize: '1.7rem',
                                }}
                              />
                            </NavLink>
                            <span onClick={showDeleteConfirm}>
                              <FontAwesomeIcon
                                className="delete-btn"
                                icon={faTrashCan}
                                style={{
                                  // marginLeft: '.5rem',
                                  color: 'red',
                                  cursor: 'pointer',
                                  fontSize: '1.7rem',
                                }}
                              />
                            </span>
                          </td>
                        </>
                      )
                  }
                </tr>
              ))}

              <tr>
                <td colSpan="6"><Link className="btn btn-primary add-player-btn" to="/joueurs/ajouter" role="button">Ajouter un joueur</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
// == Export
export default Players;
