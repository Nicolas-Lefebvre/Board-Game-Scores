import './players.scss';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';


function Players() {
  return (
         <div className="tables-wrapper">
            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="5">Top joueurs</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Nom</th>
                    <th>Victoires</th>
                    <th>Défaites</th>
                    <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th><img src={lauriers} alt="laurier des records" /></th>
                  </tr>
                  <tr>
                    <td>Laura</td>
                    <td>23</td>
                    <td>18</td>
                    <td>5</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Syham</td>
                    <td>122</td>
                    <td>2</td>
                    <td>120</td>
                    <td>120</td>
                  </tr>
                  <tr>
                    <td>Amar</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Nico</td>
                    <td>15</td>
                    <td>8</td>
                    <td>7</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>Maman</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
  )}
// == Export
export default Players;    
