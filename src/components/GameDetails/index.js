/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import './GameDetails.scss';
import axios from 'axios';
import { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { fetchGameInfos } from '../../actions/games';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

const { confirm } = Modal;

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
};

const GameDetails = () => {
  const navigate = useNavigate();

  const { gameId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // const queryParameters = new URLSearchParams(window.location.search);
    // const gameId = queryParameters.get('game_id');
    // console.log(gameId);

    dispatch(fetchGameInfos(gameId));
  }, []);

  const gameInfos = useSelector((state) => state.games.gameInfos);
  const gameInfosLoaded = useSelector((state) => state.games.gameInfosLoaded);

  const showDeleteConfirm = (deleteGameId) => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
      icon: <ExclamationCircleFilled />,
      content: 'suppression définitive !',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        console.log(deleteGameId);
        console.log('OK');
        axios.delete(
        // URL
          `${baseUrl}/api/game/${deleteGameId}`,
          // données
          config,
        )
          .then(() => {
            console.log('Supression de la partie OK');
          })

          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            navigate('/parties');
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  if (!gameInfosLoaded) {
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
                      return <div key={game.game_id}>{game.player_name} - {game.score} points</div>;
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
                    return <div key={game.id}><strong>{game.player_name}</strong> - {game.score} points - fairplay : {game.fairplay ? game.fairplay : <i>Non renseigné</i> }</div>;
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            navigate(`/parties/modifier/${gameInfos[0].game_id}?game_id=${gameInfos[0].game_id}`);
          }}
        >
          Modifier
        </Button>{' '}
        <Button
          variant="danger"
          className="red-btn"
          style={{ backgroundColor: 'red' }}
          onClick={() => {
            showDeleteConfirm(gameInfos[0].game_id);
          }}
        >Supprimer
        </Button>{' '}
      </div>
    </div>
  );
};

export default GameDetails;
