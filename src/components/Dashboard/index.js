import './dashboard.scss';
import { Link } from 'react-router-dom';

import avatarPic from 'src/assets/images/avatar-pic.jpg';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';

// import ResultatPieChart from './PieCharts/ResultatPieChart';
import ResultPieChart from './PieCharts/ResultPieChart';
import GamesPieChart from './PieCharts/GamesPieChart';
import PlayersPieChart from './PieCharts/PlayersPieChart';

// == Composant
function Dashboard() {
  return (

    <div className="container dashboard">

      <h2>Mon tableau de bord</h2>

      <main className="main">

        <section className="profil-container">
          <div className="avatar-img">
            <img src={avatarPic} alt="" />
          </div>
          <div className="profil-text">
            <h3 className="pseudo">Nicolas66</h3>
            <p className="email">email@gmail.com</p>
            <p className="email">Né le : 22/12/1987</p>
            <p className="profil-edit-btn"><Link className="profil-edit-link" to="#">modifier</Link></p>
          </div>
        </section>

        {/* ----------------------------------------RESULTS CONTAINER--------------------------- */}

        <section className="scores-container">

          <h4>Résultats</h4>

          <select className="form-select" aria-label="Default select example">
            <option selected value="1">Laura</option>
            <option value="2">Amar</option>
            <option value="3">Syham</option>
            <option value="3">Nico</option>
          </select>

          <div className="resultats-wrapper">

            <div className="resultat-pieChart">
              <ResultPieChart />
            </div>
          </div>

          <div className="tables-wrapper">
            <div className="resultat-table" style={{ maxWidth: '360px' }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="2">Stats personnelles</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Parties</td>
                    <td>245</td>
                  </tr>
                  <tr>
                    <td>Victoires</td>
                    <td>122</td>
                  </tr>
                  <tr>
                    <td>Défaites</td>
                    <td>123</td>
                  </tr>
                  <tr>
                    <td>jeux joués</td>
                    <td>28</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="4">Dernières parties</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Jeu</th>
                    <th>Joueurs</th>
                    <th>Resultats</th>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* ------------------------------ TOP GAMES CONTAINER-------------------------- */}

        <section className="scores-container">

          <h4>Top jeux</h4>
          <div className="resultats-wrapper">

            <div className="resultat-pieChart">
              <GamesPieChart />
            </div>
          </div>

          <div className="tables-wrapper">
            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="8">Top jeux</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Jeu</th>
                    <th>Parties</th>
                    <th>Victoires</th>
                    <th>Défaites</th>
                    <th className="desktop">Champion</th>
                    <th className="desktop">Max Victoires</th>
                    <th className="desktop">Recordman</th>
                    <th className="desktop">Record</th>
                    {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th><img src={lauriers} alt="laurier des records" /></th> */}
                    {/* <th>Champion</th>
                    <th>Recordman</th> */}
                  </tr>
                  <tr>
                    <td>Catan</td>
                    <td>23</td>
                    <td>18</td>
                    <td>5</td>
                    <td className="desktop">Laura</td>
                    <td className="desktop">5</td>
                    <td className="desktop">Syham</td>
                    <td className="desktop">12</td>
                  </tr>
                  <tr>
                    <td>Monopoly</td>
                    <td>122</td>
                    <td>2</td>
                    <td>120</td>
                    <td className="desktop">Laura</td>
                    <td className="desktop">5</td>
                    <td className="desktop">Syham</td>
                    <td className="desktop">12</td>
                  </tr>
                  <tr>
                    <td>Les aventuriers du rail</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td className="desktop">Laura</td>
                    <td className="desktop">5</td>
                    <td className="desktop">Nico</td>
                    <td className="desktop">12</td>
                  </tr>
                  <tr>
                    <td>Puerto Rico</td>
                    <td>15</td>
                    <td>8</td>
                    <td>7</td>
                    <td className="desktop">Laura</td>
                    <td className="desktop">5</td>
                    <td className="desktop">Amar</td>
                    <td className="desktop">12</td>
                  </tr>
                  <tr>
                    <td>La Bonne paye</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                    <td className="desktop">Laura</td>
                    <td className="desktop">5</td>
                    <td className="desktop">Syham</td>
                    <td className="desktop">12</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="resultat-table mobile">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="4">Champion / Jeu</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Jeu</th>
                    <th>Champion <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th>Victoires <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    {/* <th>Recordman</th>
                    <th>Défaites</th> */}
                    {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th><img src={lauriers} alt="laurier des records" /></th> */}
                    {/* <th>Champion</th>
                    <th>Recordman</th> */}
                  </tr>
                  <tr>
                    <td>Catan</td>
                    <td>Laura</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>Monopoly</td>
                    <td>Amar</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Les aventuriers du rail</td>
                    <td>Syham</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Puerto Rico</td>
                    <td>Nico</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>La Bonne paye</td>
                    <td>Amar</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="resultat-table mobile">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="4">Recordman / Jeu</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Jeu</th>
                    <th>Recordman <img src={lauriers} alt="laurier des records" /></th>
                    <th>Record <img src={lauriers} alt="laurier des records" /></th>
                    {/* <th>Recordman</th>
                    <th>Défaites</th> */}
                    {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                    <th><img src={lauriers} alt="laurier des records" /></th> */}
                    {/* <th>Champion</th>
                    <th>Recordman</th> */}
                  </tr>
                  <tr>
                    <td>Catan</td>
                    <td>Laura</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>Monopoly</td>
                    <td>Amar</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Les aventuriers du rail</td>
                    <td>Syham</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Puerto Rico</td>
                    <td>Nico</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>La Bonne paye</td>
                    <td>Amar</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="4">Top catégories</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Catégorie</th>
                    <th>Parties</th>
                    <th>Victoires</th>
                    <th>Défaites</th>
                  </tr>
                  <tr>
                    <td>Jeux de gestion</td>
                    <td>23</td>
                    <td>18</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>jeux d'argent</td>
                    <td>122</td>
                    <td>2</td>
                    <td>120</td>
                  </tr>
                  <tr>
                    <td>famille</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>commerce</td>
                    <td>15</td>
                    <td>8</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>jeux de dés</td>
                    <td>15</td>
                    <td>12</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* ------------------------------ TOP PLAYERS CONTAINER-------------------------- */}

        <section className="scores-container">

          <h4>Top joueurs</h4>
          <div className="resultats-wrapper">

            <div className="resultat-pieChart">
              <PlayersPieChart />
            </div>
          </div>

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
        </section>

      </main>

    </div>

  );
}

// == Export
export default Dashboard;
