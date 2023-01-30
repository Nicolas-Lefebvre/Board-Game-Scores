/* eslint-disable arrow-body-style */
import './boardgameDetails.scss';

import image from 'src/assets/images/catan-300x300.jpg';

const BoardgameDetails = ({ name, editor, author, description, players, playtime, stats }) => {
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
