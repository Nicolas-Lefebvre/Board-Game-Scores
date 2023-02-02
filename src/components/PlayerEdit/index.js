/* eslint-disable import/no-extraneous-dependencies */
// import './playerAdd.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  Form,
  InputNumber,
  Space,
  Input,
  // DatePicker,
  Radio,
} from 'antd';

import { useNavigate } from 'react-router-dom';

// const formItemLayout = {
//   labelCol: { span: 0 },
//   wrapperCol: { span: 24 },
// };
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };

// ============================================ Composant===========================================
function PlayerEdit() {
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);
  const playerId = queryParameters.get('player_id');
  const playerName = queryParameters.get('player_name');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // axios.post(
    //   // URL
    //   'http://syham-zedri.vpnuser.lan:8000/api/user/new-players',
    //   // données
    //   config,
    //   {
    //     name: values.name,
    //   },
    // )
    //   .then(() => {
    //     console.log('LA REQUETE EST UN SUCCES. joueur bien ajouté');
    //     navigate('/joueurs');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="container addGame-container">
      <div className="form-container">
        <section>
          <h2>Modifier un joueur</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_player"
            // {...formItemLayout}
            onFinish={onFinish}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
          >
            <Space>
              {/* <Form.Item label="Nom du joueur" name="name" value="fsfsfs"> */}
              <input
                type="text"
                value={playerName}
                className="existing-game-input"
                name="name"
              />
              {/* </Form.Item> */}
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
