/* eslint-disable import/no-extraneous-dependencies */
import './subscribe.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  Form,
  Space,
  Input,
} from 'antd';

// import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// import AllGames from '../../Data/AllGames';
// import { useState, useEffect } from 'react';
// import Loader from '../Loader';

// const formItemLayout = {
//   labelCol: { span: 0 },
//   wrapperCol: { span: 24 },
// };

// ============================================ Composant===========================================
function Subscribe() {
  // const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  const onFinish = (values, dateString) => {
    console.log('Received values of form: ', values, dateString);
    axios.post(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/user',
      // données
      {
        nickname: values.nickname,
        email: values.email,
        password: values.password,
        birthday: values.birthday,
      },
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. user bien inscrit');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // navigate('/jeux');
      });
  };

  return (
    <div className="container addGame-container">
      {/* <h2>Inscription</h2> */}

      {/* ------------------------------------CREATION JEU-------------------------------------- */}
      <div className="form-container">
        <Form
          name="validate_other"
          // {...formItemLayout}
          onFinish={onFinish}
          // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          // style={{ maxWidth: 2000 }}
        >

          <section>
            <h3>Inscription</h3>
            <Space>
              <Form.Item label="Pseudo" name="nickname">
                <Input name="pseudo" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Email" name="email">
                <Input name="email" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Mot de passe" name="password">
                <Input name="password" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item name="birthday">
                <div className="form-group">
                  <label htmlFor="birthdate">Date de naissance :
                    <input type="date" id="birthdate" name="birthdate" className="birthDate" required />
                  </label>
                </div>
              </Form.Item>
            </Space>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Valider
              </Button>

            </Form.Item>
          </section>
        </Form>
      </div>

    </div>
  );
}

// == Export
export default Subscribe;
