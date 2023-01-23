import './boardgameList.scss';
import image from 'src/assets/images/catan-300x300.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

import { NavLink } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Voir
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Editer
      </NavLink>
    ),
  },
  {
    key: '3',
    label: (
      <NavLink rel="noopener noreferrer" to="#">
        Supprimer
      </NavLink>
    ),
  },
];

// == Composant
function BoardgameList() {
  return (
    <div className="container gameList">

      <h2>Ma Collection de jeux</h2>

      <div className="main">

        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <div className="btn-container">
              <Dropdown
                menu={{
                  items,
                }}
              >
                {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space>
                  <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                </Space>
                {/* </a> */}
              </Dropdown>
            </div>
          </div>
          {/* </div> */}
        </NavLink>
        <NavLink className="card" to="#">
          {/* <div className="card"> */}
          <div className="collection-card">
            <div className="img-container">
              <img src={image} alt="" className="image" />
            </div>
            <div className="text-container">
              <h5 className="card-title">Catan</h5>
              {/* <p className="category">Jeu de gestion</p> */}
              <ul className="">
                <li>Parties : 15</li>
                <li>Victoires : 15</li>
              </ul>
            </div>
            <Dropdown
              menu={{
                items,
              }}
            >
              {/* <a onClick={(e) => e.preventDefault()}> */}
              <Space>
                <div className="btn-wrapper">
                  <div className="btn-container">
                    <FontAwesomeIcon icon={faCaretDown} className="title-icon" style={{ fontSize: '2rem', color: 'green' }} />
                  </div>
                </div>
              </Space>
              {/* </a> */}
            </Dropdown>
          </div>
          {/* </div> */}
        </NavLink>

      </div>

    </div>
  );
}

// == Export
export default BoardgameList;
