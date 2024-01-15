/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import './dashboard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';

import avatarPic from 'src/assets/images/avatar-pic.jpg';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';
import { useDispatch } from 'react-redux';
// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../../apiConfig';

import Loader from '../Loader';
import GamesPieChart from './PieCharts/GamesPieChart';
import { setTokenValidity } from '../../actions/user';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

// ================== Configuration du side menu ==================
function getItem(label, key, icon, children, type, url) {
  return {
    key,
    icon,
    children,
    label: url ? <Link to={url}>{label}</Link> : label,
    type,
  };
}
const items = [
  getItem('Joueurs', 'sub1', <MailOutlined />, [
    getItem('Liste des joueurs', '1', null, null, null, '/joueurs'),
    getItem('Ajouter un joueur', '2', null, null, null, '/joueurs/ajouter'),
  ]),
  getItem('Jeux', 'sub2', <AppstoreOutlined />, [
    getItem('Liste des jeux', '3', null, null, null, '/jeux'),
    getItem('Ajouter un jeux', '4', null, null, null, '/jeux/ajouter'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Parties', 'sub3', <SettingOutlined />, [
    getItem('Liste des parties', '5', null, null, null, '/parties'),
    getItem('Ajouter une partie', '6', null, null, null, '/parties/ajouter'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

// ================== FIN Configuration du side menu ==================


// == Composant
function Dashboard({ setUserInfos, userInfos }) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // ================== Configuration du side menu ======================
  const [openKeys, setOpenKeys] = useState(['']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // ================== FIN Configuration du side menu ==================

  const [loadingPlayerResults, setLoadingPlayerResults] = useState(true);

  const [playerList, setPlayerList] = useState([]);
  const [playerListWithGames, setPlayerListWithGames] = useState([]);
  // const [numberOfPlayerWhoWon, setNumberOfPlayerWhoWon] = useState(0);

  const [loadingUserInfos, setLoadingUserInfos] = useState(true);
  // const [playerListSingle, setPlayerListSingle] = useState([]);
  // const [lossPlayerList, setLossPlayerList] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [data, setData] = useState([]);

  // =====================================  RECUPERATION INFOS USER =============================
  useEffect(() => {
    axios.get(
      // URL
      `${baseUrl}/api/user`,
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des infos du user OK');
        // console.log(response.data);
        setUserInfos(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          console.log('Erreur 401 : Redirection vers GetConnected');
          dispatch(setTokenValidity(false));
          navigate('/connexion');
        }
      })
      .finally(() => {
        setLoadingUserInfos(false);
      });
  }, []);

  // =====================================  RECUPERATION STATS PAR JOUEUR =============================
  const [topPlayersData, setTopPlayersData] = useState([]);
  useEffect(() => {
    axios.get(
      // URL
      `${baseUrl}/api/user/players/stats`,
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation de tous les joueurs OK');
        console.log(response.data);
        setPlayerList(response.data.results);
        // On défini la variable playerListWithGames en filtrant les joueurs qui ont au moins une partie jouée :
        setPlayerListWithGames(response.data.results.filter((filteredPlayer) => (filteredPlayer.games_played > 0)));
        setSelectedPlayerId(response.data.results[0].player_id);
        // setLossPlayerList(response.data.results.filter((filteredPlayer) => (Number(filteredPlayer.is_winner) === 0)));
        // const numberOfPlayer = (response.data.results.filter((filteredPlayer) => (Number(filteredPlayer.is_winner) === 0))).length;
        // setNumberOfPlayerWhoWon((response.data.results.filter((filteredPlayer) => (Number(filteredPlayer.is_winner) === 1)).length));
        // console.log('number of players :', numberOfPlayer);

        // On rempli le premier camembert avec les données du joueur en index zéro par défaut
        setData(
          [
            {
              id: 'victoires',
              label: 'victoires',
              value: response.data.results[0].victories,
              color: 'hsl(15, 70%, 50%)',
            },
            {
              id: 'défaites',
              label: 'Défaites',
              value: response.data.results[0].defeats,
              color: 'hsl(30, 70%, 50%)',
            },
          ],
        );

        // ====================  Remplisage données du camembert de l'encart TOP JOUEURS ================================
        // Initialisation du tableau vide
        const topPlayersPieData = [];
        // Boucle pour remplir le tableau
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < response.data.results.filter((filteredPlayer) => (filteredPlayer.games_played > 0)).length; i++) {
          // Création de l'objet pour chaque jeu
          const player = {
            id: response.data.results.filter((filteredPlayer) => (filteredPlayer.games_played > 0))[i].player_name,
            label: response.data.results.filter((filteredPlayer) => (filteredPlayer.games_played > 0))[i].player_name,
            value: response.data.results.filter((filteredPlayer) => (filteredPlayer.games_played > 0))[i].victories,
            color: `hsl(${i * 15}, 70%, 50%)`,
          };

          // Ajout de l'objet au tableau
          topPlayersPieData.push(player);
        }

        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTopPlayersData(topPlayersPieData);
        // =================================================================================================================
      })
      // .then(() => {
      //   console.log(playerList);
      //   setPlayerListSingle(playerList.slice(0, lossPlayerList.length));
      // })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingPlayerResults(false);
      });
  }, []);

  const onChange = (event) => {
    console.log(event.target.value);
    const filteredPlayer = playerList.filter((player) => (
      player.player_id === event.target.value
    ));
    console.log(filteredPlayer);
    const victoryNumber = filteredPlayer[0].victories;
    const lossNumber = filteredPlayer[0].defeats;

    setSelectedPlayerId(event.target.value);

    setData(
      [
        {
          id: 'victoires',
          label: 'victoires',
          value: victoryNumber,
          color: 'hsl(15, 70%, 50%)',
        },
        {
          id: 'défaites',
          label: 'Défaites',
          value: lossNumber,
          color: 'hsl(0, 55%, 60%)',
        },
      ],
    );
  };

  // Recuperation des top 5 jeux par joueur
  const [loadingTop5Games, setLoadingTop5Games] = useState(true);
  const [topGames, setTopGames] = useState([]);
  const [topPlayedGames, setTopPlayedGames] = useState([]);
  // const [numberOfGames, setNumberOfGames] = useState(0);
  const [top5GamesData, setTop5GamesData] = useState([]);

  // =====================================  RECUPERATION TOP JEUX JOUES =============================
  useEffect(() => {
    axios.get(
      // URL
      `${baseUrl}/api/user/boardgames5`,
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 jeux OK');
        console.log(response.data);
        // On supprime les doublons (lorsqu'un user ajoute un jeu déjà existant à sa collection, celui-ci s'affiche en double)
        const boardgameNoDoubles = response.data.results.filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
        console.log('sans doublons', boardgameNoDoubles);
        setTopGames(boardgameNoDoubles);
        setTopPlayedGames(boardgameNoDoubles.filter((filteredGame) => (filteredGame.num_games_played > 0)));
        // setNumberOfGames(response.data.results.length);

        setLoadingTop5Games(false);

        // Initialisation du tableau vide
        const top5GamesPieData = [];

        // Boucle pour remplir le tableau
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < boardgameNoDoubles.filter((filteredGame) => (filteredGame.num_games_played > 0)).length; i++) {
          // Création de l'objet pour chaque jeu
          const game = {
            id: boardgameNoDoubles.filter((filteredGame) => (filteredGame.num_games_played > 0))[i].name,
            label: boardgameNoDoubles.filter((filteredGame) => (filteredGame.num_games_played > 0))[i].name,
            value: boardgameNoDoubles.filter((filteredGame) => (filteredGame.num_games_played > 0))[i].num_games_played,
            color: `hsl(${i * 15}, 70%, 50%)`,
          };

          // Ajout de l'objet au tableau
          top5GamesPieData.push(game);
        }
        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTop5GamesData(top5GamesPieData);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [loadingTop5Categories, setLoadingTop5Categories] = useState(true);
  const [topCategories, setTopCategories] = useState([]);
  const [topPlayedCategories, setTopPlayedCategories] = useState([]);

  // =====================================  RECUPERATION TOP CATEGORIES =============================
  useEffect(() => {
    // Vérifie si les catégories sont déjà chargées, si oui, ne fait rien
    if (topCategories.length > 0 && topPlayedCategories.length > 0) {
      return;
    }
  
    axios.get(`${baseUrl}/api/user/categories5`, config)
      .then((response) => {
        console.log('Recuperation des top 5 catégories OK');
        setTopCategories(response.data.results);
        setTopPlayedCategories(response.data.results.filter((category) => category.total_games > 0));
        setLoadingTop5Categories(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // tableau de dépendances vide pour s'exécuter une seule fois au montage du composant

  // ----------------------Recuperation des top 5 JOUEURS -----------------------
  // const [loadingTop5Players, setLoadingTop5Players] = useState(true);
  // const [top5Players, setTop5Players] = useState([]);
  // const [top5PlayersData, setTop5PlayersData] = useState([]);

  // =====================================  RECUPERATION TOP 5 JOUEURS =============================
  // CODE DESACTIVE CAR ON UTILISE LA MEME API QUE POUR LA LISTE DE TOUS LES JOUEURS
  // useEffect(() => {
  //   axios.get(
  //     // URL
  //     `${baseUrl}/api/user/players5`,
  //     // données
  //     config,
  //   )
  //     .then((response) => {
  //       console.log('Recuperation des top 5 joueurs OK');
  //       console.log(response.data);
  //       setTop5Players(response.data.results);

  //       setLoadingTop5Players(false);

  //       // Initialisation du tableau vide
  //       const top5PlayersPieData = [];

  //       // Boucle pour remplir le tableau
  //       // eslint-disable-next-line no-plusplus
  //       for (let i = 0; i < response.data.results.length; i++) {
  //         // Création de l'objet pour chaque jeu
  //         const player = {
  //           id: response.data.results[i].player_name,
  //           label: response.data.results[i].player_name,
  //           value: response.data.results[i].victory_number,
  //           color: `hsl(${i * 15}, 70%, 50%)`,
  //         };

  //         // Ajout de l'objet au tableau
  //         top5PlayersPieData.push(player);
  //       }

  //       // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
  //       setTop5PlayersData(top5PlayersPieData);
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  console.log('loadingTop5Categories :', loadingTop5Categories);
  console.log('loadingTop5Games :', loadingTop5Games);

  if (loadingPlayerResults || loadingUserInfos) {
    return <Loader />;
  }
  if (!loadingPlayerResults && !playerList[0]) {
    return (
      <div className="container dashboard">

        <h2>Mon tableau de bord</h2>

        <main className="main">

          <section className="profil-container">
            <div className="avatar-img">
              <img src={avatarPic} alt="" />
            </div>
            <div className="profil-text">
              <h3 className="pseudo">{userInfos.nickname}</h3>
              <p className="email">{userInfos.email}</p>
              <p className="email">Né le : {userInfos.birthday.substr(0, 10)}</p>
              <p className="profil-edit-btn"><Link className="profil-edit-link" to="/profil/modifier">Modifier</Link></p>
            </div>
          </section>
          <div className="container dashboard">
            <h2 style={{ marginTop: '20vh', color: 'grey', fontStyle: 'italic' }}>Vous n'avez encore aucune donnée : enregistrez votre première partie</h2>
          </div>
        </main>
      </div>
    );
  }
  return (

    <div className="container dashboard">

      <h2>Mon tableau de bord</h2>

      <main className="main">

        <section className="profil-container">
          <div className="avatar-img">
            <img src={avatarPic} alt="" />
          </div>
          <div className="profil-text">
            <h3 className="pseudo">{userInfos.nickname}</h3>
            <p className="email">{userInfos.email}</p>
            <p className="email">Né le : {userInfos.birthday.substr(0, 10)}</p>
            <p className="profil-edit-btn"><Link className="profil-edit-link" to="/profil/modifier">Modifier</Link></p>
          </div>
        </section>

        {/* ----------------------------------------MENU CONTAINER--------------------------- */}  
        <section className="side-menu-container">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            // width: 256,
          }}
          items={items}
        />
        </section>

        {/* ----------------------------------------RESULTS CONTAINER--------------------------- */}

        <section className="scores-container">

          <h4>Résultats</h4>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={onChange}
          >
            {
                (playerList.map((player) => (
                  <option key={player.player_id} value={player.player_id}>{player.player_name}</option>
                )))
            }
          </select>

          <div className="resultats-wrapper">

            <div className="resultat-pieChart">
              <ResponsivePie
                data={data}
                margin={{
                  top: 40,
                  right: 40,
                  bottom: 40,
                  left: -10,
                }}
                valueFormat=" ^-~f"
                activeOuterRadiusOffset={8}
                colors={[
                  'rgb(107, 142, 35)',    // Goldenrod (jaune boisé)
                  'rgb(205, 92, 92)',     // Rouge indien (rouge boisé)
                ]}
                colorsBy="index"
                borderWidth={1}
                borderColor={{
                  from: 'color',
                  modifiers: [
                    [
                      'darker',
                      0.2,
                    ],
                  ],
                }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsRadiusOffset={0.65}
                arcLabelsTextColor="#ffffff"
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 50,
                    translateY: 10,
                    itemsSpacing: 0,
                    itemWidth: 89,
                    itemHeight: 30,
                    itemTextColor: 'black',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>

          <div className="tables-wrapper">
            <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="2">Stats personnelles</th>
                    {/* <th scope="col">245</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Parties</td>
                    <td>
                      {
                        Number((playerList.filter((player) => (player.player_id === selectedPlayerId))[0].games_played))
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Victoires</td>
                    <td>
                      {
                        Number((playerList.filter((player) => (player.player_id === selectedPlayerId))[0].victories))
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Défaites</td>
                    <td>
                      {
                        Number((playerList.filter((player) => (player.player_id === selectedPlayerId))[0].defeats))
                      }
                    </td>
                  </tr>
                  {/* <tr>
                    <td>jeux joués</td>
                    <td>28</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            {/* <div className="resultat-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th colSpan="4">Dernières parties</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Jeu</th>
                    <th>Joueurs</th>
                    <th>Resultats</th>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                  <tr>
                    <td>2023/01/25</td>
                    <td>122</td>
                    <td>2</td>
                    <td>Victoire</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>

        </section>

        {/* ------------------------------ TOP GAMES CONTAINER-------------------------- */}

        {loadingTop5Games || loadingTop5Categories ? (<Loader />)
          : (
            <section className="topGames-container">

              <h4>Top jeux</h4>
              <div className="resultats-wrapper">

                <div className="resultat-pieChart">
                  <GamesPieChart data={top5GamesData} />
                </div>
              </div>

              <div className="tables-wrapper">
                <div className="resultat-table">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="8">Top jeux</th>
                        {/* <th scope="col">245</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Jeu</th>
                        <th>Parties</th>
                        {/* <th>Victoires</th>
                        <th>Défaites</th> */}
                        <th className="desktop">Champion <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th className="desktop">Max Victoires <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th className="desktop">Recordman <img src={lauriers} alt="laurier des records" /></th>
                        <th className="desktop">Record <img src={lauriers} alt="laurier des records" /></th>
                        {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th><img src={lauriers} alt="laurier des records" /></th> */}
                        {/* <th>Champion</th>
                        <th>Recordman</th> */}
                      </tr>
                      {
                        topPlayedGames.length === 0
                          ? (
                            <tr>
                              <td style={{ fontStyle: 'italic' }} colSpan="2">Aucune jeu renseignée : ajoutez votre première partie</td>
                            </tr>
                          )
                          : topPlayedGames.map((game) => (
                            <tr key={game.id}>
                              <td><Link to={`/jeux/${game.id}?boardgame_id=${game.id}`}>{game.name}</Link>
                              </td>
                              <td>{game.num_games_played}</td>
                              {/* <td>18</td>
                              <td>5</td> */}
                              <td className="desktop">{game.champion}</td>
                              <td className="desktop">{game.champion_victories}</td>
                              <td className="desktop">{game.recordman}</td>
                              <td className="desktop">{game.recordman_score}</td>
                            </tr>
                          ))
                    }
                      {/* <tr>
                        <td><Link to={`/jeux/${top5Games[0].board_game_id}?boardgame_id=${top5Games[0].board_game_id}`}>{top5Games[0].board_game_name}</Link></td>
                        <td>{top5Games[0].game_number}</td>
                        {/* <td>18</td>
                        <td>5</td> */}
                      {/* <td className="desktop">Laura</td>
                      <td className="desktop">2</td>
                      <td className="desktop">Syham</td>
                      <td className="desktop">12</td> */}
                      {/* </tr> */}
                    </tbody>
                  </table>
                </div>

                {/* ==============================================   AFFICHAGE MOBILE ONLY ============================================= */}
                <div className="resultat-table mobile">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="4">Champion / Jeu</th>
                        {/* <th scope="col">245</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Jeu</th>
                        <th>Champion <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th>Victoires <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        {/* <th>Recordman</th>
                        <th>Défaites</th> */}
                        {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th><img src={lauriers} alt="laurier des records" /></th> */}
                        {/* <th>Champion</th>
                        <th>Recordman</th> */}
                      </tr>
                      {
                      topGames.map((game) => (
                        <tr key={game.id}>
                          <td>
                            <Link to={`/jeux/${game.id}`}>
                              {game.name}
                            </Link>
                          </td>
                          <td>{game.champion}</td>
                          <td>{game.champion_victories}</td>
                        </tr>
                      ))
                    }
                      {/* <tr>
                        <td><Link to={`/jeux/${top5Games[0].board_game_id}`}>{top5Games[0].board_game_name}</Link></td>
                        <td>Laura</td>
                        <td>18</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

                <div className="resultat-table mobile">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="4">Recordman / Jeu</th>
                        {/* <th scope="col">245</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Jeu</th>
                        <th>Recordman <img src={lauriers} alt="laurier des records" /></th>
                        <th>Record <img src={lauriers} alt="laurier des records" /></th>
                        {/* <th>Recordman</th>
                        <th>Défaites</th> */}
                        {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th><img src={lauriers} alt="laurier des records" /></th> */}
                        {/* <th>Champion</th>
                        <th>Recordman</th> */}
                      </tr>
                      {
                      topGames.map((game) => (
                        <tr key={game.id}>
                          <td>
                            <Link to={`/jeux/${game.id}`}>
                              {game.name}
                            </Link>
                          </td>
                          <td>{game.recordman}</td>
                          <td>{game.recordman_score}</td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>

                <div className="resultat-table">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="4">Top catégories</th>
                        {/* <th scope="col">245</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Catégorie</th>
                        <th>Parties</th>
                        <th>Champion</th>
                        <th>nb victoire(s)</th>
                      </tr>
                      {
                      topPlayedCategories.length === 0
                        ? (
                          <tr>
                            <td style={{ fontStyle: 'italic' }} colSpan="2">Aucune catégorie renseignée</td>
                          </tr>
                        )
                        : topPlayedCategories.map((category) => (
                          <tr key={category.category_id}>
                            <td>{category.category_name}</td>
                            <td>{category.total_games}</td>
                            <td>{category.name}</td>
                            <td>{category.max_wins}</td>
                          </tr>
                        ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

        {/* ------------------------------ TOP PLAYERS CONTAINER-------------------------- */}

        {loadingPlayerResults ? (<Loader />)
          : (
            <section className="top-player-container">

              <h4>Top joueurs</h4>
              <div className="resultats-wrapper">

                <div className="resultat-pieChart">
                  <GamesPieChart data={topPlayersData} />
                </div>
              </div>

              <div className="tables-wrapper">
                <div className="resultat-table">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="5">Top joueurs</th>
                        {/* <th scope="col">245</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Nom</th>
                        <th>Parties</th>
                        <th>Victoires</th>
                        <th>Défaites</th>
                        <th>Champion <img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        {/* <th><img src={lauriers} alt="laurier des records" /></th> */}
                      </tr>
                      {
                      playerListWithGames.length === 0
                        ? (
                          <tr>
                            <td style={{ fontStyle: 'italic' }} colSpan="2">Aucun joueur renseigné</td>
                          </tr>
                        )
                        : playerListWithGames.map((player) => (
                          <tr key={player.player_id}>
                            <td>
                              <Link to={`/joueurs/id?player_id=${player.player_id}`}>
                                {player.player_name}
                              </Link>
                            </td>
                            <td>{player.games_played}</td>
                            <td>{player.victories}</td>
                            <td>{player.defeats}</td>
                            <td>{player.champion_titles}</td>
                            {/* <td>1</td> */}
                          </tr>
                        ))
                    }

                      {/* <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[0].player_id}`}>{top5Players[0].player_name}</Link></td>
                        <td>{top5Players[0].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[0].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[0].player_id))).victory_number) : '0' }</td>
                        <td>2</td>
                        <td>1</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

              </div>
            </section>
          )}

      </main>

    </div>

  );
}

// == Export
export default Dashboard;
