import './dashboard.scss';

import avatarPic from 'src/assets/images/avatar-pic.jpg';

import { Link } from 'react-router-dom';

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
            <p className="profil-edit-btn"><Link className="profil-edit-link" to="#">modifier</Link></p>
          </div>
        </section>

        <section className="scores-container">
          
        </section>

      </main>

    </div>

  );
}

// == Export
export default Dashboard;
