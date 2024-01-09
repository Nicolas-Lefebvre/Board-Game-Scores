/* eslint-disable import/no-extraneous-dependencies */
import './subscribe.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';
// import { EyeTwoTone } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Input,
} from 'antd';

import {
  // useSelector,
  useDispatch,
} from 'react-redux';
// import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

import {
  saveToken,
  // setIsLogged,
  // submitLogin,
} from '../../actions/user';

// import AllGames from '../../Data/AllGames';
// import { useState, useEffect } from 'react';
// import Loader from '../Loader';

// const formItemLayout = {
//   labelCol: { span: 0 },
//   wrapperCol: { span: 24 },
// };

// ============================================ Composant===========================================
function Subscribe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const config = {
  //   headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  // };
  let email;
  let password;
  const onFinish = (values, dateString) => {
    console.log('Received values of form: ', values, dateString);
    email = values.email;
    password = values.password;
    axios.post(
      // URL
      `${baseUrl}/api/user`,
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

        axios.post(
          // URL
          `${baseUrl}/api/login_check`,
          // données
          {
            username: email,
            password: password,
          },
        )
          .then((response) => {
            // console.log('LA REQUETE EST UN SUCCES');
            console.log(response.data);
            // response.data : {logged: true, pseudo: 'John', token: 'eyJhbG....JIUzI1'}
            // on dispatch une action pour envoyer les infos de la réponse dans le state
            // setNickname(response.data.pseudo);
            // setIsLogged(true);
            // dispatch(setIsLogged(true));
            // setToken(response.data.token);
            // On sauve le token dans le state (cette action met isLogged=true dans le state)
            dispatch(saveToken(response.data.token));
            // On sauve le token dans le local storage
            localStorage.setItem('BGStoken', response.data.token);
            const decoded = jwtDecode(response.data.token);
            console.log(decoded);
            // setIsLogged(response.data.logged);
            // store.dispatch(actionToDispatch);
            // const navigate = useNavigate();
            // navigate('/dashboard', { replace: true });
            // on est authentifié, on a un JWT dans le state => on peut demander au serveur
            // les recettes préférées de l'utilisateur connecté
            // store.dispatch(fetchFavoriteRecipes());
            navigate('/tableau-de-bord');
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // const token2 = localStorage.getItem('BGStoken');
            // console.log(token2);
            // const decodedToken = jwtDecode(token2);
            // console.log(decodedToken);
          });
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
                <Input name="pseudo" placeholder="Pseudo" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Email" name="email">
                <Input name="email" placeholder="Email" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Mot de passe" name="password">
                <Input.Password placeholder="Mot de passe" />
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
