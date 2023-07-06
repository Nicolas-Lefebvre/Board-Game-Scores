/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import './addGame.scss';

// import Link from 'antd/es/typography/Link';
import { Link, useNavigate } from 'react-router-dom';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  InputNumber,
  Radio,
  Rate,
  Select,
  Switch,
  Space,
  Input,
  // eslint-disable-next-line no-unused-vars
  Checkbox,
} from 'antd';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import FormItem from 'antd/es/form/FormItem';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

import Loader from '../Loader';

import {
  fetchUsersBoardgameList,
} from '../../actions/boardgames';
import { fetchPlayerListNoStats } from '../../actions/players';

// import {
//   fetchUsersPlayerList,
// } from '../../actions/players';

// Fonction de comparaison pour trier par ordre alphabétique
function compareNames(a, b) {
  const nameA = a.name.toUpperCase(); // Convertir en majuscules pour ignorer la casse
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1; // a vient avant b
  }
  if (nameA > nameB) {
    return 1; // a vient après b
  }
  return 0; // a et b sont égaux
}

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 20 },
};
// const formItemLayout = {
//     labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
//     wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
// };

// const normFile = (e) => {
//   console.log('Upload event:', e);
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

const { TextArea } = Input;

// -------------------------------------------------------

let permission = false;
const onPermissionChanged = () => {
  permission = !permission;
};

// ============================================ Composant===========================================
function AddGame() {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };
  // eslint-disable-next-line no-unused-vars
  const [isTeam, setIsTeam] = useState(false);
  // const [allBoardGames, setAllBoardGamess] = useState([]);
  // const [allBoardgamesloading, setAllBoardgamesloading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ------------------ Recuperation de la liste des jeux du user --------------------------
  useEffect(() => {
    dispatch(fetchUsersBoardgameList());
  }, []);

  const usersBoardgameListLoaded = useSelector((state) => state.boardgames.usersBoardgameListLoaded);
  // On récupére la liste des jeux et on les classe par ordre alphabétique
  const usersBoardgameList = useSelector((state) => state.boardgames.usersBoardgameList.sort(compareNames));
  console.log(usersBoardgameList);

  // Ancienne méthode avec useState :
  // useEffect(() => {
  //   axios.get(
  //     // URL
  //     'http://127.0.0.1:8000/api/user/collection',
  //     // données
  //     config,
  //   )
  //     .then((response) => {
  //       console.log('Récupération des jeux OK');
  //       setAllBoardGamess(response.data.results);
  //       setAllBoardgamesloading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // ------------------ Recuperation de la liste de tous les joueurs du user --------------------------
  useEffect(() => {
    dispatch(fetchPlayerListNoStats());
  }, []);

  const usersPlayerList = useSelector((state) => state.players.playerListNoStats);
  const usersPlayerListLoaded = useSelector((state) => state.players.playerListNoStatsLoaded);

  // Ancienne version avec useState :
  // const [allPlayers, setAllPlayers] = useState([]);
  // const [allPlayersloading, setPlayersloading] = useState(true);
  // useEffect(() => {
  //   axios.get(
  //     // URL
  //     'http://127.0.0.1:8000/api/user/players',
  //     // données
  //     config,
  //   )
  //     .then((response) => {
  //       console.log('Récupération des joueurs OK');
  //       setAllPlayers(response.data.results);
  //       setPlayersloading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       // navigate('/jeux');
  //     });
  // }, []);

  // console.log(allPlayers);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(values.comment ? values.comment : null);
    console.log(values.players.length);

    for (const item of values.players) {
      if (!item.isTeam) {
        item.isTeam = false;
      }
    }

    for (const item of values.players) {
      if (!item.isWinner) {
        item.isWinner = false;
      }
    }

    for (const item of values.players) {
      if (!item.team) {
        item.team = null;
      }
    }

    if (!values.status) {
      values.status = false;
    }

    axios.post(
      // URL
      `${baseUrl}/api/games`,
      // données
      {
        startDate: values.startDate,
        endDate: values.endDate,
        playerNumber: values.players.length,
        picture: null,
        status: values.status,
        comment: (values.comment ? values.comment : null),
        boardGame: values.boardGame,
        players: values.players,

      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. partie bien ajoutée');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // navigate('/parties');
      });
  };

  if (!usersBoardgameListLoaded || !usersPlayerListLoaded) {
    return <Loader />;
  }
  return (
    <div className="container addGame-container">
      <h2>Ajouter une partie</h2>

      <div>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          style={{ maxWidth: 2000 }}
        >

          {/* ------------------------------------STATUS PARTIE--------------------------------- */}
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Jeu</h3>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item name="status" label="Statut partie" required>
                <Radio.Group>
                  <Radio value={true}>Partie terminée</Radio>
                  <Radio value={false}>Partie en cours</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>

            {/* ------------------------------------SELECTION JEU------------------------------- */}
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item
                name="boardGame"
                label="Jeu"
                hasFeedback
                rules={[{ required: true, message: 'Selectionnez un jeu' }]}
              >
                <Select placeholder="Selectionner un jeu" style={{ minWidth: '200px' }}>
                  {usersBoardgameList.map((boardgame) => (
                    <Option
                      key={boardgame.id}
                      value={boardgame.id}
                    >
                      {boardgame.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/jeux/ajouter" style={{ color: 'blue' }}>Ajouter un jeu à ma collection <br /><i style={{ fontStyle: 'italic', color: 'black' }}>(ceci vous amènera sur une nouvelle page)</i></Link>
            </Space>

            {/* Ce code est désactivé car le jeu en équipe n'est pas encore géré */}
            {/* Quand ca sera le cas, nous pourrons décommenter cette partie : */}
            {/* c'est une checkbox qui active le no d'équipe pour chaque joueur lignes 353 à 364 */}
            {/* <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item
                label="Jeu en équipes lors de cette partie ?"
                valuePropName="checked"
              >
                <Checkbox
                  defaultChecked={false}
                  // disabled={!isTeam}
                  onChange={() => {
                    setIsTeam(!isTeam);
                  }}
                />
              </Form.Item>
            </Space> */}

          </section>

          {/* ------------------------------------SELECTION JOUEURS----------------------------- */}
          <section>
            <h3>Joueurs</h3>
            <Form.List
              name="players"
              className="players-wrapper"
              // style={{ display: 'flex', flexWrap: 'wrap', minWidth: "100px" }}
              initialValue={[
                {
                  player: null, score: null, fairplay: 5, isWinner: false, isTeam: isTeam, team: null,
                },
                {
                  player: null, score: null, fairplay: 5, isWinner: false, isTeam: isTeam, team: null,
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      className="add-player-container"
                      key={key}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        // flexDirection: 'column',
                        // borderBottom: '1px solid',
                        marginBottom: 8,
                        justifyContent: 'center',
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'player']}
                        rules={[
                          {
                            required: true,
                            message: 'Indiquer le Nom',
                          },
                        ]}
                        label={`Nom joueur ${key + 1}`}
                      >
                        {/* <Input placeholder="Nom Joueur" /> */}
                        <Select placeholder="Selectionner un joueur" style={{ minWidth: '200px' }}>
                          {usersPlayerList.map((player) => (
                            <Option
                              key={player.id}
                              value={Number(player.id)}
                            >
                              {player.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      {/* -------------------------Score-------------------------- */}
                      <Form.Item
                        {...restField}
                        name={[name, 'score']}
                        rules={[
                          {
                            required: false,
                            message: 'Il manque le score',
                          },
                        ]}
                        label={`Score joueur ${key + 1}`}
                      >
                        <InputNumber placeholder="Score" />
                      </Form.Item>
                      {/* ------------------------isWINNER ------------------------ */}
                      <Form.Item
                        label="Vainqueur"
                        valuePropName="checked"
                        {...restField}
                        name={[name, 'isWinner']}
                      >
                        <Switch
                          style={{ backgroundColor: permission ? 'green' : 'orange' }}
                          checked={permission}
                          checkedChildren="V"
                          unCheckedChildren="L"
                          onChange={(e) => onPermissionChanged(e, permission)}
                        />
                      </Form.Item>
                      {/* ------------------------NOTE ------------------------ */}
                      <Form.Item name={[name, 'fairplay']} label="Note">
                        <Rate />
                      </Form.Item>
                      {/* ------------------------EQUIPE ----------------------- */}
                      {isTeam && (
                      <Form.Item label="N° équipe">
                        <Form.Item name={[name, 'team']} noStyle>
                          <InputNumber min={1} max={10} style={{ width: '50px' }} />
                        </Form.Item>
                        {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                          n° Equipe
                        </span> */}
                      </Form.Item>
                      )}
                      {/* ------------------------------------------------------ */}
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item style={{
                    display: 'flex',
                    // marginBottom: 8,
                    justifyContent: 'center',
                  }}
                  >
                    <Button type="dashed" style={{ width: '200px', height: '40px', fontWeight: 'bold' }} onClick={() => add()} block icon={<PlusOutlined />}>
                      Ajouter un joueur
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          {/* ------------------------------------FIN SELECTION JOUEUR-------------------------- */}

          {/* ------------------------------------SELECTIONS DATES ET HEURE------------------- */}
          <section>
            <h3>Date et heure</h3>
            {/* <Form.Item name="startDate" label="Date et heure de début" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="endDate" label="Date et heure de fin" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item> */}
            <Space>
              <FormItem name="startDate">
                <div className="form-group">
                  <label htmlFor="partieDate">Début partie :
                    <input type="datetime-local" id="partieDate" name="startDate" />
                  </label>
                </div>
              </FormItem>
            </Space>
            <Space>
              <FormItem name="endDate">
                <div className="form-group">
                  <label htmlFor="partieDate">Fin partie :
                    <input type="datetime-local" id="partieDate" name="endDate" />
                  </label>
                </div>
              </FormItem>
            </Space>
          </section>
          {/* ------------------------------------COMMENTAIRE ET PHOTO-------------------------- */}
          <section>
            <h3>Commentaires</h3>
            <Form.Item label="Commentaires" name="comment" className="comment-form-item">
              <TextArea rows={4} />
            </Form.Item>
            {/* <h3>Photo souvenir</h3> */}
            {/* <Form.Item
              name="upload"
              label="Ajouter une photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Formats acceptés"
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Téléverser</Button>
              </Upload>
            </Form.Item> */}
          </section>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Valider
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

// == Export
export default AddGame;
