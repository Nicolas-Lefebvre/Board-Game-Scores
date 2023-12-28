/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import './playerDetails.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';

// import image from 'src/assets/images/catan-300x300.jpg';

import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const { confirm } = Modal;

const PlayerDetails = () => {
  const [loading, setLoading] = useState(true);
  const [playerInfos, setplayerInfos] = useState([]);

  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const playerId = queryParameters.get('player_id');
    axios.get(
      `http://nicolas-lefebvre.vpnuser.lan:8000/api/user/player/${playerId}/stats`,
      config,
    )

      .then((response) => {
        console.log(response);
        setplayerInfos(response.data.results);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        // traitement exécuté dans tous les cas, après then ou après catch
        setLoading(false);
      });
  }, []);

  const showDeleteConfirm = (deletePlayerId) => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
      icon: <ExclamationCircleFilled />,
      content: 'suppression définitive !',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        console.log(deletePlayerId);
        console.log('OK');
        axios.delete(
        // URL
          `http://nicolas-lefebvre.vpnuser.lan:8000/api/player/${deletePlayerId}`,
          // données
          config,
        )
          .then(() => {
            console.log('Supression du joueur OK');
            navigate('/joueurs');
          })

          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading && !playerInfos[0]) {
    return (
      <div className="container dashboard">
        <h2 style={{ marginTop: '40vh' }}>Aucune donnée renseignée</h2>
      </div>
    );
  }
  return (
    <>
      <div className="gameDetails-card">
        {/* <img className="gameDetails-card__image" src={playerInfos.image} alt={playerInfos.name} /> */}
        <div className="gameDetails-card__info">
          <h3>{playerInfos[0].player_name}</h3>
          <p><strong>Nombre de parties :</strong> {(Number(playerInfos[0].victory_number)) + (Number(playerInfos[1].victory_number)) }</p>
          <p><strong>Nombre de victoires :</strong> {playerInfos[0].victory_number}</p>
          <p><strong>Nombre de défaites :</strong> {playerInfos[1].victory_number}</p>
        </div>
      </div>
      <div>
        <Button
          variant="secondary"
          // onClick={() => {
          //   navigate(`/parties/modifier/${gameInfos[0].game_id}`);
          // }}
        >
          Modifier
        </Button>{' '}
        <Button
          className="red-btn"
          variant="danger"
          // style={{ backgroundColor: 'red' }}
          onClick={() => {
            showDeleteConfirm(playerInfos.player_id);
          }}
        >Supprimer
        </Button>{' '}
      </div>
    </>
  );
};

export default PlayerDetails;
