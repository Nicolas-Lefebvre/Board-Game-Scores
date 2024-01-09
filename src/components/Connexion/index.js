/* eslint-disable react/jsx-indent */
import './connexion.scss';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // useSelector,
  useDispatch,
} from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {
  Button,
  Space,
  Form,
  Input,
} from 'antd';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

import {
  saveToken,
  // setIsLogged,
  // submitLogin,
} from '../../actions/user';

// == Composant
function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    // dispatch(submitLogin(values.username, values.password));

    // const isLogged = useSelector((state) => state.user.isLogged);
    // if (isLogged) {
    //   navigate('/tableau-de-bord');
    // }
    axios.post(
      // URL
      `${baseUrl}/api/login_check`,
      // données
      {
        username: values.username,
        password: values.password,
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form-container">
      <section>
        <h2>Connexion</h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, fontSize: '2rem' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Space style={{ minHeight: '100px' }}>
              <Form.Item
                label="Adresse Email"
                placeholder="Adresse Email"
                name="username"
                rules={[{ required: true, message: 'Email' }]}
                style={{ overflow: 'hidden' }}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                label="Mot de passe"
                placeholder="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Mot de passe' }]}
              >
                <Input.Password />
              </Form.Item>
            </Space>
              {/* <Link
              className="forgetPassword"
              to="/forgetpassword"
              role="button">
                Mot de passe oublié?
              </Link> */}
            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Se rappeler de moi</Checkbox>
            </Form.Item> */}
            <Space style={{ justifyContent: 'center' }}>
              <Form.Item
                // wrapperCol={{ offset: 8, span: 16 }}
                style={{ textAlign: 'center' }}
              >
                <Button type="primary" htmlType="submit">
                  Se connecter
                </Button>
              </Form.Item>
            </Space>
          </Form>
      </section>

    <section>
      <h2 style={{ marginTop: '2rem' }}>Vous n'êtes pas encore inscrit?</h2>
      {/* <Link className="btn btn-primary" to="/inscription" role="button"> */}
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            navigate('/inscription');
          }}
        >
          Inscrivez vous !
        </Button>
      {/* </Link> */}
    </section>

    </div>
  );
}

// == Export
export default Connexion;
