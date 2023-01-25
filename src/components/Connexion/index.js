/* eslint-disable react/jsx-indent */
import './connexion.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
  axios.post(
    // URL
    'http://laura-poitou.vpnuser.lan:8000/api/login_check',
    // données
    {
      email: values.email,
      password: values.password,
    },
  )
    .then((response) => {
      // console.log(response);

      // response.data : {logged: true, pseudo: 'John', token: 'eyJhbG....JIUzI1'}

      // on dispatch une action pour envoyer les infos de la réponse dans le state
      setNickname(response.data.pseudo);
      setToken(response.data.token);
      setIsLogged(response.data.logged);
      // store.dispatch(actionToDispatch);

      // on est authentifié, on a un JWT dans le state => on peut demander au serveur
      // les recettes préférées de l'utilisateur connecté
      // store.dispatch(fetchFavoriteRecipes());
    })

    .catch((error) => {
      console.log(error);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// == Composant
function Connexion() {
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
            name="email"
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
           <a> Mot de passe oublié? </a>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Se rappeler de moi</Checkbox>
          </Form.Item>

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
