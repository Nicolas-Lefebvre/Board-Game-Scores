/* eslint-disable react/jsx-indent */
import './connexion.scss';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  // useSelector,
  useDispatch,
} from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Space } from 'antd';

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

    // Ajout d'un état pour le message d'erreur
    const [errorMessage, setErrorMessage] = useState('');

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
        // Mise à jour de l'état avec le message d'erreur
        if(error.response.status === 401){setErrorMessage('Échec de la connexion. Veuillez vérifier vos identifiants.')}
        else{setErrorMessage('Échec de la connexion. Veuillez réessayer plus tard.')}
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
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Veuillez indiquer votre identifiant !',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Veuillez indiquer votre mot de passe !',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className='remember-me'>Se souvenir de moi</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Mot de passe oublié
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Connexion
            </Button>
            {/* Affichage du message d'erreur */}
            

            <span style={{marginRight:'1rem'}}>Pas encore inscrit ?</span>  
            <a 
              className="mdp-oublie"
              style={{textDecoration:'underline'}}
              onClick={() => {
              navigate('/inscription');
              }}>
              Inscrivez-vous!
            </a>
          </Form.Item>
        </Form>

      </section>

      {errorMessage && 
        <Space direction="vertical" className='message-erreur'>
          <Alert message={errorMessage} type="error" />
        </Space>
      }

      {/* <section>
        <h2 style={{ marginTop: '2rem' }}>Vous n'êtes pas encore inscrit?</h2>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              navigate('/inscription');
            }}
          >
            Inscrivez vous !
          </Button>
      </section> */}

    </div>
  );
}

// == Export
export default Connexion;
