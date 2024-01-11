/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import './players.scss';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import Loader from '../Loader';
import { fetchPlayerListNoStats, fetchPlayerList, deletePlayer } from '../../actions/players';

const { confirm } = Modal;

function Players() {
  const playerListNoStatsLoaded = useSelector((state) => state.players.playerListNoStatsLoaded);
  const playerListLoaded = useSelector((state) => state.players.playerListLoaded);

  const dispatch = useDispatch();

  // -------------- RECUPERATION LISTE JOUEURS SANS STATS --------------------
  useEffect(() => {
    dispatch(fetchPlayerListNoStats());
  }, []);

  const playerListNoStats = useSelector((state) => state.players.playerListNoStats);

  const playerList = useSelector((state) => state.players.playerList);
  // const lossPlayerList = useSelector((state) => state.players.lossPlayerList);
  // -------------- RECUPERATION LISTE JOUEURS AVEC STATS --------------------
  useEffect(() => {
    dispatch(fetchPlayerList());
  }, [playerListNoStats]);
  console.log('liste joueurs :', playerList);

  const showDeleteConfirm = (deletePlayerId) => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
      icon: <ExclamationCircleFilled />,
      content: 'suppression définitive !',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        // console.log(deletePlayerId);
        // console.log('OK');
        dispatch(deletePlayer(deletePlayerId));
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  if (!playerListNoStatsLoaded || !playerListLoaded) {
    return <Loader />;
  }
  return (
    <section className="tableau_mesjoueurs">

      <h2>Mes Joueurs</h2>

      <div className="wrapper">
        <div className="resultat-table">
          <table className="table table-striped">
            <thead />
            {/* </thead> */}
            <tbody>
              <tr>
                <th>Nom</th>
                <th>Parties jouées</th>
                <th>Victoires</th>
                <th>Défaites</th>
                {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th> */}
                {/* <th><img src={lauriers} alt="laurier des records" /></th> */}
                <th></th>
              </tr>
              {/* { (playerList.filter((filteredPlayer) => (filteredPlayer.is_winner === 1))) } */}
              {playerList.map((playerNoStat) => (
                <tr key={playerNoStat.player_id}>
                  <td><Link to={`/joueurs/id?player_id=${playerNoStat.player_id}`}>{playerNoStat.player_name}</Link></td>
                  <React.Fragment key={playerNoStat.player_id}>
                    <td>{playerNoStat.games_played}</td>
                    <td>{playerNoStat.victories}</td>
                    <td>{playerNoStat.defeats}</td>
                    <td>
                      <NavLink to={`/joueurs/modifier/?player_id=${playerNoStat.player_id}&player_name=${playerNoStat.player_name}`}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{
                            // marginRight: '.5rem',
                            marginTop: '.6rem',
                            color: '#0070ff',
                            fontSize: '1rem',
                          }}
                        />
                      </NavLink>
                      <span onClick={() => {
                        // setDeletePlayerId(player.player_id)}
                        showDeleteConfirm(playerNoStat.player_id);
                      }}
                      >
                        <FontAwesomeIcon
                          className="delete-btn"
                          icon={faTrashCan}
                          style={{
                            // marginLeft: '.5rem',
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '1rem',
                          }}
                        />
                      </span>
                    </td>
                  </React.Fragment>
                </tr>
              ))}

              <tr>
                <td colSpan="5"><Link className="btn btn-primary add-player-btn" to="/joueurs/ajouter" role="button">Ajouter un joueur</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
// == Export
export default Players;
