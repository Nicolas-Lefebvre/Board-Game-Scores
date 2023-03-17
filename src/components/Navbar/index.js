import './navbar.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link } from 'react-router-dom';
import { faUserTie, faDice, faBars } from '@fortawesome/free-solid-svg-icons';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home"><FontAwesomeIcon icon={faDice} className="title-icon" /><h1>Board Game Score</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="">

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/tableau-de-bord">Tableau de bord</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title="Jeux" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/jeux">Mes jeux</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/jeux/ajouter">Ajouter un jeu</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Parties" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/parties">Mes parties</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/parties/ajouter">Ajouter une partie</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Joueurs" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/joueurs">Joueurs</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/joueurs/ajouter">Ajouter un joueur</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <Nav.Link href="#deets"><FontAwesomeIcon icon={faUserTie} className="icon" /> Se connecter</Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
export default CollapsibleExample;
