/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import './playerDetails.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

// import image from 'src/assets/images/catan-300x300.jpg';

import Loader from '../Loader';

const PlayerDetails = () => {
  const [loading, setLoading] = useState(true);
  const [playerInfos, setplayerInfos] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const playerId = queryParameters.get('player_id');
    axios.get(
      `http://syham-zedri.vpnuser.lan:8000/api/user/player/${playerId}/stats`,
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

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="gameDetails-card">
      {/* <img className="gameDetails-card__image" src={playerInfos.image} alt={playerInfos.name} /> */}
      <div className="gameDetails-card__info">
        <h3>{playerInfos[0].player_name}</h3>
        <p><strong>Nombre de parties :</strong> {(Number(playerInfos[0].victory_number)) + (Number(playerInfos[1].victory_number)) }</p>
        {/* <p><strong>Auteur :</strong> {author}</p> */}
        <p><strong>Nombre de victoires :</strong> {playerInfos[0].victory_number}</p>
        <p><strong>Nombre de défaites :</strong> {playerInfos[1].victory_number}</p>
        {/* <p><strong>Fin partie :</strong> {playerInfos.endDate}</p> */}
        <p><strong>Commentaires :</strong></p>
        {/* <p className="remarks">{playerInfos.comment}</p> */}
      </div>
    </div>
  );
};

export default PlayerDetails;
