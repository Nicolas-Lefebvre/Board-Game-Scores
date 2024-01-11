/* eslint-disable import/no-extraneous-dependencies */
import './playerAdd.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  message,
  Form,
  Space,
  Input,
} from 'antd';

import { useNavigate } from 'react-router-dom';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

// ============================================ Composant===========================================
function PlayerAdd() {
  const navigate = useNavigate();
  const [
    messageApi,
    contextHolder,
  ] = message.useMessage();
  // const key = 'updatable';
  // const openMessage = () => {
  //   messageApi.open({
  //     key,
  //     type: 'success',
  //     content: 'Joueur bien ajouté!',
  //     duration: 2,
  //   });
  // };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(
      // URL
      `${baseUrl}/api/user/player`,
      // données
      {
        name: values.name,
      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. joueur bien ajouté');
        // openMessage();
        navigate('/joueurs');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <section>
          <h2>Ajouter un joueur</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_player"
            // {...formItemLayout}
            onFinish={onFinish}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            style={{ alignItems: 'center' }}
          >
            <Space>
              <Form.Item label="Nom du joueur" name="name">
                <Input
                  className="existing-game-input"
                  name="name"
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item>
                {contextHolder}
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
export default PlayerAdd;
