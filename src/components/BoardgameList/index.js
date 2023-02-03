import './boardgameList.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Loader from '../Loader';

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
  const [loading, setLoading] = useState(true);
  const [boardgameList, setBoardgameList] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  useEffect(() => {
    axios.get(
      'http://syham-zedri.vpnuser.lan:8000/api/user/boardgames',
      config,
    )

      .then((response) => {
        console.log(response);
        setBoardgameList(response.data.results);

        // console.log(response.data.results[0].name);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        // traitement exécuté dans tous les cas, après then ou après catch
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container gameList">

      <h2>Ma Collection de jeux</h2>

      <div className="main">

        {boardgameList.map((boardgame) => (
          <NavLink className="card" to={`/jeux/?boardgame_id=${boardgame.id}`} key={boardgame.id}>
            {/* <div className="card"> */}
            <div className="collection-card">
              <div className="img-container">
                <img src={boardgame.picture} alt={boardgame.name} className="image" />
              </div>
              <div className="text-container">
                <h5 className="card-title">{boardgame.name}</h5>
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
        ))}

      </div>

    </div>
  );
}

// == Export
export default BoardgameList;
