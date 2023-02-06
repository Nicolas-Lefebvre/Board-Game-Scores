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

// ============================================ Composant===========================================
function PlayerAdd() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'success',
      content: 'Joueur bien ajouté!',
      duration: 2,
    });
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(
      // URL
      'http://laura-poitou.vpnuser.lan:8000/api/user/player',
      // données
      {
        name: values.name,
      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. joueur bien ajouté');

        openMessage();

        // setTimeout(navigate('/joueurs'), 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container addGame-container">
      <div className="form-container">
        <section>
          <h2>Ajouter un joueur</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_player"
            // {...formItemLayout}
            onFinish={onFinish}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
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
                {contextHolder};
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
