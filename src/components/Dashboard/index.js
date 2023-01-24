import './dashboard.scss';
import { Link } from 'react-router-dom';

import avatarPic from 'src/assets/images/avatar-pic.jpg';
// import ResultatPieChart from './PieCharts/ResultatPieChart';
import MyResponsivePie from './PieCharts/NivoPieChart';
import GamesPieChart from './PieCharts/GamesPieChart';

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

        <section className="scores-container">

          <h4>Résultats</h4>
          <div className="resultats-wrapper">

            <div className="resultat-pieChart">
              <MyResponsivePie />
            </div>
          </div>

          <div className="tables-wrapper">
            <div className="resultat-table">
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

      </main>

    </div>

  );
}

// == Export
export default Dashboard;
