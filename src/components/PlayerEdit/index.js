/* eslint-disable import/no-extraneous-dependencies */
// import './playerAdd.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  Form,
  Space,
  Input,
} from 'antd';

import { useNavigate } from 'react-router-dom';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

// ============================================ Composant===========================================
function PlayerEdit() {
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  const playerId = queryParameters.get('player_id');
  const playerName = queryParameters.get('player_name');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  console.log(playerId);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(playerName);
    axios.patch(
      // URL
      `${baseUrl}/api/user/player/${playerId}`,
      // données
      {
        name: values.name,
      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. joueur bien ajouté');
        navigate('/joueurs');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container addPlayer-container">
      <div className="form-container">
        <section>
          <h2>Modifier un joueur</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_player"
            // {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              name: playerName,
            }}
            // style={{ maxWidth: 2000 }}
          >
            <Space>
              <Form.Item label="Nom du joueur" name="name">
                <Input
                  type="text"
                  // defaultValue={playerName}
                  className="existing-game-input"
                  name="name"
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Valider
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </section>
      </div>

    </div>
  );
}

// == Export
export default PlayerEdit;
