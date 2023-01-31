/* eslint-disable arrow-body-style */
import './boardgameDetails.scss';

import axios from 'axios';
import { useState } from 'react';

import image from 'src/assets/images/catan-300x300.jpg';

import Loader from '../Loader';

let boardgameInfos = [];
const BoardgameDetails = ({ name, editor, author, description, players, playtime, stats }) => {
  const [loading, setLoading] = useState(true);
  axios.get('http://syham-zedri.vpnuser.lan:8000/api/boardgames/5')

    .then((response) => {
      console.log(response);
      boardgameInfos = response.data.results;
      console.log(boardgameInfos);

      // console.log(response.data.results[0].name);
    })

    .catch((error) => {
      console.log(error);
    })

    .finally(() => {
      // traitement exécuté dans tous les cas, après then ou après catch
      setLoading(false);
    });

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="boardgame-card">
      <img className="boardgame-card__image" src={image} alt={name} />
      <div className="boardgame-card__info">
        <h3>{name}</h3>
        <p><strong>Editeur :</strong> {editor}</p>
        <p><strong>Auteur :</strong> {author}</p>
        <p><strong>Nombre de joueurs :</strong> {players}</p>
        <p><strong>description :</strong></p>
        <p className="description">{description}</p>
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
                <td>245</td>
              </tr>
              <tr>
                <td>Champion</td>
                <td>Syham (5 victoires)</td>
              </tr>
              <tr>
                <td>Recordman</td>
                <td>Amar (5 victoires)</td>
              </tr>
              <tr>
                <td>Nombre de parties</td>
                <td>28</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardgameDetails;
