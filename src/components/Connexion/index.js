/* eslint-disable react/jsx-indent */
import './connexion.scss';
// import { setToken, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  // Checkbox,
  Form,
  Input,
} from 'antd';

// == Composant
function Connexion({setIsLogged, setToken}) {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/login_check',
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
        // setToken(response.data.token);
        setIsLogged(true);
        setToken(response.data.token);
        localStorage.setItem('BGStoken', response.data.token);
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
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form-container">
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
          <Form.Item
            label="Adresse Email"
            name="username"
            rules={[{ required: true, message: 'Email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: 'Mot de passe' }]}
          >
            <Input.Password />
          </Form.Item>
            <Link className="forgetPassword" to="/forgetpassword" role="button"> Mot de passe oublié? </Link>
          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Se rappeler de moi</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Se connecter
            </Button>
          </Form.Item>
        </Form>

    <h2>Vous n'êtes pas encore inscrit?</h2>
    <Link className="btn btn-primary" to="/inscription" role="button">Inscrivez vous!</Link>

    </div>
  );
}

// == Export
export default Connexion;
