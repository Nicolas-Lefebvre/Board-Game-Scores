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
  Checkbox,
  Radio,
  Select,
} from 'antd';

// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// import AllGames from '../../Data/AllGames';
import {
  // useState,
  useEffect,
} from 'react';

import Loader from '../Loader';
import {
  // addExistingBoardgame,
  fetchAllBoardgameList,
  fetchAllCategories,
} from '../../actions/boardgames';

const { Option } = Select;

const { TextArea } = Input;
// -----------------YEAR PICKER INFOS--------------------
// const onChange = (date, dateString) => {
//   console.log(dateString);
// };

// ============================================ Composant===========================================
function AddBoardgame() {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  // const [allGamesLoading, setAllGamesLoading] = useState(true);
  // const [allGames, setAllGames] = useState([]);
  // const [allCategoriesLoading, setAllCategoriesLoading] = useState(true);
  // const [categoryList, setCategoryList] = useState([]);
  // disabled : si la requete API pour récupérer la liste de tous les jeux n'aboutie pas,
  // la partie pour ajouter un jeu existant n'apparait pas.
  // const [disabled, setDisabled] = useState(true);
  // console.log(AllGames[0].results);

  const dispatch = useDispatch();
  const allBoardgameListLoaded = useSelector((state) => state.boardgames.allBoardgameListLoaded);
  // eslint-disable-next-line max-len
  const existingBoardgamesDisabled = useSelector((state) => state.boardgames.existingBoardgamesDisabled);

  // console.log(suggestions);

  // --------------------------GET ALL GAMES FOR PREFILL------------------------------------------
  useEffect(() => {
    dispatch(fetchAllBoardgameList());
  }, []);

  // Récupération liste des jeux complète (tous jeux confondus) dans le state
  const allBoardgameList = useSelector((state) => state.boardgames.allBoardgameList);
  // console.log(allBoardgameList);

  const navigate = useNavigate();
  // const [selectedBoardGameId, setSelectedBoardGameId] = useState('');

  // ----------------------------VALIDATION OF EXISTING BOARDGAME FORM----------------------------
  const onSubmitExisting = (values) => {
    // dispatch(addExistingBoardgame(values.boardgame));
    // console.log(values);
    axios.post(
      // URL
      'http://127.0.0.1:8000/api/user/collection/boardgames/',
      // données
      {
        boardGames: values.boardgame,
      },
      config,
    )
      .then(() => {
        // console.log('LA REQUETE EST UN SUCCES. Jeu bien ajouté');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate('/jeux');
      });
  };

  // ----------------------------VALIDATION OF CREATE BOARDGAME FORM--------------------------------
  const onFinish = (values) => {
    // console.log('Received values of form: ', values, dateString);
    axios.post(
      // URL
      'http://127.0.0.1:8000/api/boardgames',
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
        categories: values.categories,
        isCreatedByUser: true,
      },
      config,
    )
      .then(() => {
        // console.log('LA REQUETE EST UN SUCCES. Jeu bien ajouté');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate('/jeux');
      });
  };

  // --------------------------------ALL CATEGORIES API REQUEST-----------------------------
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const allCategoriesLoaded = useSelector((state) => state.boardgames.allCategoriesLoaded);
  const categoryList = useSelector((state) => state.boardgames.allCategories);

  // CI-DESSOUS L'ANCIENNE RECUP DES CATEGORIES EN UTILISANT USESTATE()
  // useEffect(() => {
  //   axios.get(
  //     // URL
  //     'http://127.0.0.1:8000/api/category',
  //     // données
  //   )
  //     .then((response) => {
  //       console.log('Récupéraion catégories SUCCES :');
  //       // console.log(response.data.results);
  //       setCategoryList(response.data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setAllCategoriesLoading(false);
  //     });
  // }, []);

  // return loading && <Loader />;
  if (!allBoardgameListLoaded || !allCategoriesLoaded) {
    return <Loader />;
  }
  return (
    <div className="container addGame-container">
      <h2>Ajouter un jeu</h2>
      {/* -----------------------------------SELECTION JEU EXISTANT--------------------------- */}
      {/* existingBoardgamesDisabled : si l'API qui récupère la liste des jeux existants
      a un probleme, le form est disabled = n'apparait pas */}
      {!existingBoardgamesDisabled
      && (
      <div className="form-container">
        <section>
          <h3>Choisir un jeu existant</h3>
          <Form
            disabled={existingBoardgamesDisabled}
            name="validate_existing_game"
            // {...formItemLayout}
            onFinish={onSubmitExisting}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
          >
            <Form.Item
              // {...restField}
              name="boardgame"
              rules={[
                {
                  required: true,
                  message: 'Indiquer le jeu',
                },
              ]}
              // label={`Nom joueur ${key + 1}`}
            >
              {/* <Input placeholder="Nom Joueur" /> */}
              <Select placeholder="Selectionner un jeu" style={{ minWidth: '100px' }}>
                {allBoardgameList.map((game) => (
                  <Option
                    key={game.id}
                    value={Number(game.id)}
                  >
                    {game.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* <Form.Item name="boardgame">
              <input
                className="existing-game-input"
                // value="jeux"
                name="boardgame"
                // onChange={e => setValue(e.target.value)}
                list="suggestions"
              />
              <datalist id="suggestions" name="boardgame">
                {allGames.map((game) => (
                  <option
                    value={game.name}
                    key={game.id}
                    aria-label={game.name}
                    onChange={() => {
                      setSelectedBoardGameId(game.id);
                    }}
                  />
                ))}
              </datalist>
            </Form.Item> */}
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
              <Form.Item label="Categories" name="categories">
                <Checkbox.Group>
                  <div className="categories-wrapper">
                    {categoryList.map((category) => (
                      <label key={category.id} htmlFor={category.id}>
                        <Checkbox
                          type="checkbox"
                          value={category.id}
                          // checked={checkedItems[category.value]}
                          // onChange={handleChange}
                        >
                          {category.name}
                        </Checkbox>
                      </label>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                name="scoreType"
                label="Type de scoring"
                rules={[{ required: true }]}
                style={{ minHeight: '100px' }}
              >
                <Radio.Group>
                  <Radio value="Highest score">Le plus haut score gagne</Radio>
                  <Radio value="Lowest score">Le plus petit score gagne</Radio>
                  <Radio value="No score">Pas de système de scoring</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Joueurs Min*" name="min_player">
                <InputNumber name="min_player" min={1} required />
              </Form.Item>
              <Form.Item label="Joueurs Max*" name="max_player">
                <InputNumber name="max_player" min={1} required />
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
