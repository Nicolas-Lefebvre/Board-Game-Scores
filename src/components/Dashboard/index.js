import './dashboard.scss';
import { Link } from 'react-router-dom';

import avatarPic from 'src/assets/images/avatar-pic.jpg';
// import ResultatPieChart from './PieCharts/ResultatPieChart';
import MyResponsivePie from './PieCharts/NivoPieChart.js';

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

            <div className="resultat-text-1">
              <ul className="resultat-ul">
                <li><strong>Parties :</strong> 95</li>
                <li><strong style={{ color: 'green' }}>Victoires :</strong> 49</li>
                <li><strong style={{ color: 'red' }}>Défaites :</strong> 46</li>
              </ul>
            </div>

          </div>

        </section>

      </main>

    </div>

  );
}

// == Export
export default Dashboard;
