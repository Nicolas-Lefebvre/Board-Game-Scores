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

// ============================================ Composant===========================================
function PlayerEdit({ setUserInfos, userInfos }) {
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.patch(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/user/infos',
      // données
      {
        nickname: values.nickname,
        email: values.email,
        birthday: values.birthday,
      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. profil bien modifié');
        navigate('/tableau-de-bord');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container addGame-container">
      <div className="form-container">
        <section>
          <h2>Modifier le profil</h2>
          {/* <h3>Ajouter un nouveau joueur</h3> */}
          <Form
            name="validate_new_player"
            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
            onFinish={onFinish}
            initialValues={{
              nickname: userInfos.nickname,
              email: userInfos.email,
              birthday: userInfos.birthday.substr(0, 10),
            }}
            // style={{ maxWidth: 2000 }}
          >
            <Space>
              <Form.Item label="Pseudo" name="nickname">
                <Input
                  style={{ minWidth: '100px' }}
                  type="text"
                  // defaultValue={userInfos.nickname}
                  className="existing-game-input"
                  name="nickname"
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Email" name="email">
                <Input
                  style={{ minWidth: '100px' }}
                  type="email"
                  // defaultValue={userInfos.email}
                  className="existing-game-input"
                  name="email"
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Date de naissance" name="birthday">
                <Input
                  style={{ minWidth: '100px' }}
                  type="date"
                  // defaultValue={userInfos.birthday}
                  className="existing-game-input"
                  name="birthday"
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
