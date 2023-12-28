/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import './boardgameDetails.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import Loader from '../Loader';

const { confirm } = Modal;

const BoardgameDetails = ({ name, editor, author, description, players, playtime, stats }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [boardgameInfos, setBoardgameInfos] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const boardgameId = queryParameters.get('boardgame_id');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  useEffect(() => {
    axios.get(
      `http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgames/${boardgameId}`,
      config,
    )

      .then((response) => {
        console.log(response);
        setBoardgameInfos(response.data.result);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        // if (boardgameInfos.game_number == false) {
        //   axios.get(
        //     `http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgameNG/${boardgameId}`,
        //     config,
        //   )
        //     .then((response) => {
        //       console.log(response);
        //       setBoardgameInfos(response.data.result);
        //       // console.log(response.data.results[0].name);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     })
        //     .finally(() => {
        //       setLoading(false);
        //     });
        // traitement exécuté dans tous les cas, après then ou après catch
        setLoading(false);
      });
  }, []);

  const showDeleteConfirm = (deleteGameId) => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce jeu ?',
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
          `http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgame/${deleteGameId}/delete`,
          // données
          config,
        )
          .then(() => {
            console.log('Supression du jeu OK');
          })

          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            navigate('/jeux');
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
  // if (!boardgameInfos.name) {
  //   return (
  //     <h2>Aucune donnée à afficher</h2>
  //   );
  // }
  return (
    <div className="boardgame-card">
      <img className="boardgame-card__image" src={boardgameInfos[0].picture} alt={boardgameInfos[0].name} />
      <div className="boardgame-card__info">
        <h3>{boardgameInfos[0].name}</h3>
        <p><strong>Editeur :</strong> {boardgameInfos[0].editor}</p>
        <p><strong>Auteur :</strong> {boardgameInfos[0].author}</p>
        <p><strong>Nombre de joueurs :</strong> de {boardgameInfos[0].min_player} à {boardgameInfos[0].max_player} joueurs</p>
        <p><strong>description :</strong></p>
        <p className="description">{boardgameInfos[0].description}</p>
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
                <td>Nombre de parties</td>
                <td>{boardgameInfos[0].game_number ? boardgameInfos[0].game_number : '0'}</td>
              </tr>
              {/* <tr>
                <td>Champion</td>
                <td>Syham (5 victoires)</td>
              </tr>
              <tr>
                <td>Recordman</td>
                <td>Amar (5 victoires)</td>
              </tr> */}
            </tbody>
          </table>
        </div>
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
            showDeleteConfirm(boardgameInfos[0].board_game_id);
          }}
        >Supprimer
        </Button>{' '}
      </div>
    </div>
  );
};

export default BoardgameDetails;
