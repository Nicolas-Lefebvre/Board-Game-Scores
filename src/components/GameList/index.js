import './gameList.scss';
import image from 'src/assets/images/catan-300x300.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { NavLink } from 'react-router-dom';

// == Composant
function GameList() {
  return (
    <div className="container gameList">
      <h2>Ma liste de jeux</h2>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '80%' }}>
        <div className="collection-card">
          <div className="img-container">
            <img src={image} alt="" className="image" />
          </div>
          <div className="">
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties jouées : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
          </div>
          <div className="btn-container">
            <NavLink>
              <FontAwesomeIcon icon={faCaretDown} className="title-icon" />
            </NavLink>
          </div>
        </div>
      </div>

    </div>
  );
}

// == Export
export default GameList;
