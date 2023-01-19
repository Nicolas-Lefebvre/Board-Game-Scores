import './navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faDice, faBars } from '@fortawesome/free-solid-svg-icons';

// == Composant
function Navbar() {
  return (
    <div className="navbar">

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <FontAwesomeIcon icon={faDice} className="title-icon" />
            <h1>Board Game Scores</h1>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon" /> */}
            <FontAwesomeIcon icon={faBars} className="burger-menu" color="white" />
          </button>
          <div className="collapse navbar-collapse menu-wrapper" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Tableau de bord</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mes jeux</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mes parties</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mes joueurs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mes jeux</a>
              </li>
            </ul>
            <ul className="navbar-avatar">
              <li className="nav-item">
                <a className="nav-link connexion-wrapper" href="#">
                  <FontAwesomeIcon icon={faUserTie} className="icon" />
                  {/* <FontAwesomeIcon icon="fa-solid fa-user-tie" /> */}
                  <div className="seConnecter">Se connecter</div>
                </a>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
}

// == Export
export default Navbar;
