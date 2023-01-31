/* eslint-disable import/no-extraneous-dependencies */
import './addBoardgame.scss';

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

// import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// import AllGames from '../../Data/AllGames';
import { useState, useEffect } from 'react';
import Loader from '../Loader';

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

const { TextArea } = Input;
// -----------------YEAR PICKER INFOS--------------------
// const onChange = (date, dateString) => {
//   console.log(dateString);
// };

// ============================================ Composant===========================================
function AddBoardgame() {
  const [allGamesLoading, setAllGamesLoading] = useState(true);
  const [allGames, setAllGames] = useState([]);
  // disabled : si la requete API pour récupérer la liste de tous les jeux n'aboutie pas,
  // la partie pour ajouter un jeu existant n'apparait pas.
  const [disabled, setDisabled] = useState(true);
  // console.log(AllGames[0].results);

  // console.log(suggestions);
  useEffect(() => {
    axios.get(
    // URL
      'http://syham-zedri.vpnuser.lan:8000/api/boardgames',
      // données
      {
      },
    )
      .then((response) => {
        console.log('Recuperation des tous les jeux OK');
        console.log(response.data);
        setAllGames(response.data.results);

        setDisabled(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAllGamesLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const onSubmitExisting = () => {
    console.log('Submit existing game');
  };

  const onFinish = (values, dateString) => {
    console.log('Received values of form: ', values, dateString);
    axios.post(
      // URL
      'http://syham-zedri.vpnuser.lan:8000/api/boardgames',
      // données
      {
        name: values.name,
        editor: values.editor,
        author: values.author,
        year: values.year,
        scoreType: values.scoreType,
        picture: values.picture,
        description: values.description,
        minPlayer: values.min_player,
        maxPlayer: values.max_player,
      },
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. Jeu bien ajouté');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate('/jeux');
      });
  };

  // --------------------------------ALL GAMES API REQUEST-----------------------------
  // useEffect(() => {
  // setLoading(true);
  // }, [suggestions]);

  // return loading && <Loader />;
  if (allGamesLoading) {
    return <Loader />;
  }
  return (
    <div className="container addGame-container">
      <h2>Ajouter un jeu</h2>
      {/* -----------------------------------SELECTION JEU EXISTANT--------------------------- */}
      {!disabled
      && (
      <div className="form-container">
        <section>
          <h3>Choisir un jeu existant</h3>
          <Form
            disabled={disabled}
            name="validate_existing_game"
            // {...formItemLayout}
            onFinish={onSubmitExisting}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
          >
            <Form.Item>
              <input
                className="existing-game-input"
                // value="jeux"
                // onChange={e => setValue(e.target.value)}
                list="suggestions"
              />
              <datalist id="suggestions">
                {allGames.map((game, index) => (
                  <option value={game.name} key={index} aria-label={game.name} />
                ))}
              </datalist>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Valider
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
      )}

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
            <h3>Créer un nouveau jeu</h3>
            {/* <h3>Jeu</h3> */}
            <Space>
              <Form.Item label="Nom du jeu*" name="name">
                <Input name="name" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Editeur" name="editor">
                <Input name="editor" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Auteur" name="author">
                <Input name="author" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Date de parution" name="year">
                {/* <DatePicker
                  onChange={onChange}
                  picker="year"
                  name="year"
                /> */}
                <Input name="year" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} cols={50} name="description" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item name="scoreType" label="Type de scoring">
                <Radio.Group>
                  <Radio value="highestScore">Le plus haut score gagne</Radio>
                  <Radio value="lowestScore">Le plus petit score gagne</Radio>
                  <Radio value="noScore">Pas de système de scoring</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Joueurs Min*" name="max_player">
                <InputNumber name="max_player" min={1} required />
              </Form.Item>
              <Form.Item label="Joueurs Max*" name="min_player">
                <InputNumber name="min_player" min={1} required />
              </Form.Item>
            </Space>

            <Space>
              <Form.Item label="Lien vers image" name="picture">
                <Input name="picture" />
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
export default AddBoardgame;
