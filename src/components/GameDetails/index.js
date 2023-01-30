/* eslint-disable arrow-body-style */
import './GameDetails.scss';

import image from 'src/assets/images/catan-300x300.jpg';

const GameDetails = ({ startDate, endDate, date, name, remarks, players, playtime, stats }) => {
  return (
    <div className="game-card">
      <img className="game-card__image" src={image} alt={name} />
      <div className="game-card__info">
        <h3>Partie du {date}</h3>
        <p><strong>Jeu :</strong> {name}</p>
        {/* <p><strong>Auteur :</strong> {author}</p> */}
        <p><strong>Participants :</strong> {players}</p>
        <p><strong>Début partie : :</strong> {startDate}</p>
        <p><strong>Fin partie :</strong> {endDate}</p>
        <p><strong>Commentaires :</strong></p>
        <p className="remarks">{remarks}</p>
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
                <td>{startDate}</td>
              </tr>
              <tr>
                <td>Fin</td>
                <td>{endDate}</td>
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
