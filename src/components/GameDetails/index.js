/* eslint-disable arrow-body-style */
import './GameDetails.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

import image from 'src/assets/images/catan-300x300.jpg';

import Button from 'react-bootstrap/Button';
import Loader from '../Loader';

let gameInfos = [];
const GameDetails = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const gameId = queryParameters.get('game_id');
    console.log(gameId);

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
    };
    axios.get(
      `http://syham-zedri.vpnuser.lan:8000/api/user/game/${gameId}`,
      config,
    )
      .then((response) => {
        console.log(response);
        gameInfos = response.data.results;
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
      <img className="gameDetails-card__image" src={gameInfos[0].picture} alt={gameInfos[0].board_game_name} />
      <div className="gameDetails-card__info">
        <h3>Partie du {gameInfos[0].start_date}</h3>
        <p><strong>Jeu :</strong> {gameInfos[0].board_game_name}</p>
        {/* <p><strong>Auteur :</strong> {author}</p> */}
        <p><strong>Participants :</strong> {gameInfos[0].player_number}</p>
        <p><strong>Début partie :</strong> {gameInfos[0].start_date}</p>
        <p><strong>Fin partie :</strong> {gameInfos[0].end_date}</p>
        <p><strong>Commentaires :</strong></p>
        <p className="remarks">{gameInfos[0].comment}</p>
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
                <td>{gameInfos[0].start_date}</td>
              </tr>
              <tr>
                <td>Fin</td>
                <td>{gameInfos[0].end_date}</td>
              </tr>
              <tr>
                <td>Participants</td>
                <td>{gameInfos[0].player_number}</td>
              </tr>
              <tr>
                <td>Vainqueur(s)</td>
                <td>
                  {gameInfos.map((game) => {
                    if (game.is_winner == 1) {
                      return <div>{game.player_name} - {game.score} points</div>;
                    }
                  })}
                </td>
                {/* <td>Syham (45 points)</td> */}
              </tr>
              <tr>
                <td>Scores</td>
                <td>
                  {gameInfos.map((game) => {
                    // eslint-disable-next-line max-len
                    return <div><strong>{game.player_name}</strong> - {game.score} points - fairplay : {game.fairplay ? game.fairplay : <i>Non renseigné</i> }</div>;
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button variant="secondary">Modifier</Button>{' '}
        <Button variant="danger" style={{ backgroundColor: 'red' }}>Supprimer</Button>{' '}
      </div>
    </div>
  );
};

export default GameDetails;
