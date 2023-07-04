/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// import './gameAdd.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';
import { Link, useNavigate } from 'react-router-dom';

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
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Loader from '../Loader';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';
import { fetchUsersBoardgameList } from '../../actions/boardgames';
import { fetchPlayerListNoStats } from '../../actions/players';
import { fetchGameInfos } from '../../actions/games';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 20 },
};

const { TextArea } = Input;

let permission = false;
const onPermissionChanged = () => {
  permission = !permission;
};

// ============================================ Composant===========================================
function GameEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParameters = new URLSearchParams(window.location.search);
  const gameId = queryParameters.get('game_id');
  console.log('game_id :', gameId);

  // ------------------ Recuperation de la liste des jeux du user -------------------------------------
  useEffect(() => {
    dispatch(fetchUsersBoardgameList());
  }, []);
  const usersBoardgameListLoaded = useSelector((state) => state.boardgames.usersBoardgameListLoaded);
  const usersBoardgameList = useSelector((state) => state.boardgames.usersBoardgameList);
  console.log('usersBoardgameList', usersBoardgameList);

  // ------------------ Recuperation de la liste de tous les joueurs du user --------------------------
  useEffect(() => {
    dispatch(fetchPlayerListNoStats());
  }, []);
  const usersPlayerList = useSelector((state) => state.players.playerListNoStats);
  const usersPlayerListLoaded = useSelector((state) => state.players.playerListNoStatsLoaded);
  console.log('usersPlayerList', usersPlayerList);

  // ------------------ Recuperation des infos de la partie -------------------------------------------
  useEffect(() => {
    // const queryParameters = new URLSearchParams(window.location.search);
    // const gameId = queryParameters.get('game_id');
    // console.log(gameId);
    dispatch(fetchGameInfos(gameId));
  }, []);
  const gameInfosLoaded = useSelector((state) => state.games.gameInfosLoaded);
  const gameInfos = useSelector((state) => state.games.gameInfos);
  console.log('gameInfos', gameInfos);
  // const [boardgameId, setBoardgameId] = useState('');


  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.patch(
      // URL
      `${baseUrl}/api/user/game/${gameId}`,
      // données
      {
        name: values.name,
      },
      config,
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. joueur bien ajouté');
        navigate('/joueurs');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const initialValues = {
  //   'input-number': 3,
  //   'checkbox-group': ['A', 'B'],
  //   rate: 3.5,
  //   boardGame: gameInfos[0].board_game_id,
  // };
  if (!usersBoardgameListLoaded || !usersPlayerListLoaded || !gameInfosLoaded) {
    return <Loader />;
  }
  return (
    <div className="container addGame-container">
      <h2>Modifier une partie</h2>

      <div>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          // initialValues={initialValues}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
            boardGame: gameInfos[0].board_game_id,
            status: gameInfos[0].status,
            startDate: "2023-07-04T14:29",
            // quand on valide une partie, la date remonte comme cela : "2023-07-04T14:29"
            // endDate: gameInfos[0].end_date,
            comment: gameInfos[0].comment,
          }}
          style={{ maxWidth: 2000 }}
        >

          {/* ------------------------------------STATUS PARTIE--------------------------------- */}
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Jeu</h3>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item name="status" label="Statut partie">
                <Radio.Group>
                  <Radio value="1">Partie terminée</Radio>
                  <Radio value="0">Partie en cours</Radio>
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
                <Select
                  // value={gameInfos.board_game_id}
                  placeholder="Selectionner un jeu"
                  style={{ minWidth: '200px' }}
                  disabled
                  // options=
                >
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
              initialValue={gameInfos.map((game) => ({
                player: game.player_name,
                score: game.score,
                fairplay: game.fairplay,
                // eslint-disable-next-line no-unneeded-ternary
                isWinner: game.is_winner === '1' ? true : false,
                isTeam: game.is_Team,
                team: null,
              }))}
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
                      {gameInfos.is_Team && (
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
                    <input type="datetime-local" id="partieDate" name="startDate" defaultValue={gameInfos[0].start_date} />
                  </label>
                </div>
              </FormItem>
            </Space>
            <Space>
              <FormItem name="endDate">
                <div className="form-group">
                  <label htmlFor="partieDate">Fin partie :
                    <input type="datetime-local" id="partieDate" name="endDate" defaultValue={gameInfos[0].end_date} />
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
export default GameEdit;
