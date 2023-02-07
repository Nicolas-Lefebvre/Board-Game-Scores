import './navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faDice, faBars } from '@fortawesome/free-solid-svg-icons';

import { NavLink, Link } from 'react-router-dom';

// == Composant
function Navbar() {
  return (
    <div className="navbar">

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faDice} className="title-icon" />
            <h1>Board Game Scores</h1>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon" /> */}
            <FontAwesomeIcon icon={faBars} className="burger-menu" color="white" />
          </button>
          <div className="collapse navbar-collapse menu-wrapper" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Accueil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tableau-de-bord">Tableau de bord</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink to="/jeux" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mes jeux</NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="jeux">Liste des jeux</NavLink></li>
                  <li><NavLink className="dropdown-item" to="jeux/ajouter">Ajouter un jeu</NavLink></li>
                </ul>
                {/* <NavLink className="nav-link" to="/collection">Mes jeux</NavLink> */}
              </li>
              {/* <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="#">Action</NavLink>
              <NavLink className="dropdown-item" to="#">Another action</NavLink>
              <NavLink className="dropdown-item" to="#">Something else here</NavLink>
            </div>
          </li> */}
              <li className="nav-item dropdown">
                <NavLink to="/parties" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                  Mes parties
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="parties">Liste des parties</NavLink>
                  <NavLink className="dropdown-item" to="parties/ajouter">Ajouter une partie</NavLink>
                </div>
                {/* <NavLink className="nav-link" to="/parties/liste">Mes parties</NavLink> */}
              </li>
              <li className="nav-item dropdown">
                <NavLink to="/joueurs" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                  Mes joueurs
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/joueurs">Liste des joueurs</NavLink>
                  <NavLink className="dropdown-item" to="joueurs/ajouter">Ajouter un joueur</NavLink>
                </div>
                {/* <NavLink className="nav-link" to="/parties/liste">Mes parties</NavLink> */}
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="http://syham-zedri.vpnuser.lan:8000/back/home">Back Office</NavLink>
              </li> */}
            </ul>
            <ul className="navbar-avatar">
              <li className="nav-item">
                <Link className="nav-link connexion-wrapper" to="/connexion">
                  <FontAwesomeIcon icon={faUserTie} className="icon" />
                  {/* <FontAwesomeIcon icon="fa-solid fa-user-tie" /> */}
                  <div className="seConnecter">Se connecter</div>
                </Link>
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
