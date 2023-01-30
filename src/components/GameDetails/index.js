/* eslint-disable arrow-body-style */
import './GameDetails.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

import image from 'src/assets/images/catan-300x300.jpg';

import Loader from '../Loader';

let gameInfos = [];
const GameDetails = ({ startDate, endDate, date, name, remarks, players, playtime, stats }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://laura-poitou.vpnuser.lan:8000/api/games/5')

      .then((response) => {
        console.log(response);
        gameInfos = response.data.result;
        console.log(gameInfos);

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

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="gameDetails-card">
      <img className="gameDetails-card__image" src={gameInfos.image} alt={gameInfos.name} />
      <div className="gameDetails-card__info">
        <h3>Partie du {gameInfos.startDate}</h3>
        <p><strong>Jeu :</strong> {gameInfos.boardGame.name}</p>
        {/* <p><strong>Auteur :</strong> {author}</p> */}
        <p><strong>Participants :</strong> {players}</p>
        <p><strong>Début partie :</strong> {gameInfos.startDate}</p>
        <p><strong>Fin partie :</strong> {gameInfos.endDate}</p>
        <p><strong>Commentaires :</strong></p>
        <p className="remarks">{gameInfos.comment}</p>
        <div className="resultat-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th colSpan="2">Statistiques</th>
                {/* <th scope="col">245</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Début</td>
                <td>{gameInfos.startDate}</td>
              </tr>
              <tr>
                <td>Fin</td>
                <td>{gameInfos.endDate}</td>
              </tr>
              <tr>
                <td>Participants</td>
                <td>{players}</td>
              </tr>
              <tr>
                <td>Vainqueur(s)</td>
                <td>Syham (45 points)</td>
              </tr>
              <tr>
                <td>Scores</td>
                <td>
                  <div><strong>Amar</strong> - 15 points - fairplay 5/5</div>
                  <div><strong>Laura</strong> - 20 points - fairplay 5/5</div>
                  <div><strong>Syham</strong> - 45 points - fairplay 5/5</div>
                  <div><strong>Nico</strong> - 12 points - fairplay 5/5</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
