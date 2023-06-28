/* eslint-disable max-len */
import { useRef } from 'react';
import './navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faDice, faBars } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';

import { NavLink, Link } from 'react-router-dom';
// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

// == Composant
function Navbar({ token }) {
  const role = localStorage.getItem('BGStoken') ? (jwtDecode(localStorage.getItem('BGStoken')).roles[0]) : '';
  const url = new URL(`${baseUrl}/login`);
  const navBarRef = useRef(null);

  const closeDropdown = () => {
    // Ne fermez les menus déroulants que si la largeur de la fenêtre est supérieure à 992px
    // (ce qui signifie que nous ne sommes pas en mode mobile)
    if (window.innerWidth > 992) {
      const dropdowns = navBarRef.current.getElementsByClassName('show');
      for (let j = 0; j < dropdowns.length; j++) {
        dropdowns[j].classList.remove('show');
      }
    }
};

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg" ref={navBarRef}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faDice} className="title-icon" />
            <h1>Board Game Scores</h1>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
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
                <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                  Mes joueurs
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/joueurs" onClick={closeDropdown}>Liste des joueurs</NavLink>
                  <NavLink className="dropdown-item" to="joueurs/ajouter" onClick={closeDropdown}>Ajouter un joueur</NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mes jeux</NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="jeux" onClick={closeDropdown}>Liste des jeux</NavLink></li>
                  <li><NavLink className="dropdown-item" to="jeux/ajouter" onClick={closeDropdown}>Ajouter un jeu</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                  Mes parties
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="parties" onClick={closeDropdown}>Liste des parties</NavLink>
                  <NavLink className="dropdown-item" to="parties/ajouter" onClick={closeDropdown}>Ajouter une partie</NavLink>
                </div>
              </li>
              {role === 'ROLE_ADMIN' ? (
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href={`${url}`} rel="noopener noreferrer">Back Office</a>
                </li>
              )
                : ''}
            </ul>
            <ul className="navbar-avatar">
              <li className="nav-item">
                <Link className="nav-link connexion-wrapper" to="/connexion">
                  <FontAwesomeIcon icon={faUserTie} className="icon" />
                  <div className="seConnecter">{localStorage.getItem('BGStoken') ? 'Se déconnecter' : 'Se connecter'}</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

// == Export
export default Navbar;
