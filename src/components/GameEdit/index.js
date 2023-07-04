/* eslint-disable import/no-extraneous-dependencies */
// import './gameAdd.scss';

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
function GameEdit() {
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  const gameId = queryParameters.get('game_id');
  const gameName = queryParameters.get('game_name');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  console.log(gameId);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(gameName);
    axios.patch(
      // URL
      `${baseUrl}/api/user/game/${gameId}`,
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
    <div className="container addGame-container">
      <div className="form-container">
        <section>
          <h2>Modifier une partie</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_game"
            // {...formItemLayout}
            onFinish={onFinish}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
          >
            <Space>
              <Form.Item label="Nom du joueur" name="name">
                <Input
                  type="text"
                  defaultValue={gameName}
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
export default GameEdit;
