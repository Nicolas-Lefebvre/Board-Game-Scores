/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import './boardgameDetails.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';

import image from 'src/assets/images/catan-300x300.jpg';

import Loader from '../Loader';

const BoardgameDetails = ({ name, editor, author, description, players, playtime, stats }) => {
  const [loading, setLoading] = useState(true);
  const [boardgameInfos, setBoardgameInfos] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const boardgameId = queryParameters.get('boardgame_id');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  useEffect(() => {
    axios.get(
      `http://laura-poitou.vpnuser.lan:8000/api/user/boardgames/${boardgameId}`,
      config,
    )

      .then((response) => {
        console.log(response);
        setBoardgameInfos(response.data.result);
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
    <div className="boardgame-card">
      <img className="boardgame-card__image" src={boardgameInfos[0].picture} alt={boardgameInfos[0].name} />
      <div className="boardgame-card__info">
        <h3>{boardgameInfos[0].name}</h3>
        <p><strong>Editeur :</strong> {boardgameInfos[0].editor}</p>
        <p><strong>Auteur :</strong> {boardgameInfos[0].author}</p>
        <p><strong>Nombre de joueurs :</strong> de {boardgameInfos[0].minPlayer} à {boardgameInfos[0].maxPlayer} joueurs</p>
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
                <td>{boardgameInfos[0].game_number}</td>
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
      </div>
    </div>
  );
};

export default BoardgameDetails;
