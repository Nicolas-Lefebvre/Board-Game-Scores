import './navbar.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import {
  // NavLink,
  Link,
} from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import { faUserTie, faDice } from '@fortawesome/free-solid-svg-icons';
// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

function CollapsibleExample() {
  const isLogged = useSelector((state) => state.user.isLogged);

  const role = localStorage.getItem('BGStoken') ? (jwtDecode(localStorage.getItem('BGStoken')).roles[0]) : '';
  const url = new URL(`${baseUrl}`);
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><FontAwesomeIcon icon={faDice} className="title-icon" /><h1>Board Game Score</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="central-container">

          <Nav className="me-auto central-menu">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/tableau-de-bord">Tableau de bord</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title="Joueurs" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/joueurs">Joueurs</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/joueurs/ajouter">Ajouter un joueur</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Jeux" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/jeux">Mes jeux</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/jeux/ajouter">Ajouter un jeu</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Parties" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/parties">Mes parties</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/parties/ajouter">Ajouter une partie</NavDropdown.Item>
            </NavDropdown>
            {role === 'ROLE_ADMIN' ? (
              <Nav.Link as={Link} to="/public/login" className="nav-item">Back Office</Nav.Link>
            )
              : ''}
            <Nav.Link className="nav-item mobile-only" as={Link} to="/connexion">{isLogged ? 'Se déconnecter' : 'Se connecter'}</Nav.Link>
          </Nav>

          <Nav className="navbar-avatar">
            <Nav.Link as={Link} to="/connexion"><FontAwesomeIcon icon={faUserTie} className="icon" />{isLogged ? 'Se déconnecter' : 'Se connecter'}</Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
export default CollapsibleExample;
