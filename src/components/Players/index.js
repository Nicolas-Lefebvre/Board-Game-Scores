import './players.scss';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';


function Players() {
  return (
    
         <div className="tables-wrapper_players">

          <h2>Mes Joueurs</h2>

            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  
                </thead>
                <tbody>
                  <tr>
                    <th>Nom</th>
                    <th>Victoires</th>
                    <th>Défaites</th>
                    <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th><img src={lauriers} alt="laurier des records" /></th>
                    <th>Modifier/Supprimer</th>
                  </tr>
                  <tr>
                    <td>Laura</td>
                    <td>23</td>
                    <td>18</td>
                    <td>5</td>
                    <td>5</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Syham</td>
                    <td>122</td>
                    <td>2</td>
                    <td>120</td>
                    <td>120</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Amar</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Nico</td>
                    <td>15</td>
                    <td>8</td>
                    <td>7</td>
                    <td>7</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Virginie</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Fabio</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Maman</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Papa</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Frère</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td>Soeur</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                    <td>Modifier/Supprimer</td>
                  </tr>
                  <tr>
                    <td colSpan={6}><button>Ajouter un joueur</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
  )}
// == Export
export default Players;
