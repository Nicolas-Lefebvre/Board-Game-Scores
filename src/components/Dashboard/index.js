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

import Loader from '../Loader';
// import ResultatPieChart from './PieCharts/ResultatPieChart';
// import ResultPieChart from './PieCharts/ResultPieChart';
import GamesPieChart from './PieCharts/GamesPieChart';
import { setTokenValidity } from '../../actions/user';
// import PlayersPieChart from './PieCharts/PlayersPieChart';
// import AddBoardgame from '../AddBoardgame';

// == Composant
function Dashboard({ setUserInfos, userInfos }) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingPlayerResults, setLoadingPlayerResults] = useState(true);

  const [playerList, setPlayerList] = useState([]);
  const [numberOfPlayerWhoWon, setNumberOfPlayerWhoWon] = useState(0);

  const [loadingUserInfos, setLoadingUserInfos] = useState(true);
  // const [playerListSingle, setPlayerListSingle] = useState([]);
  const [lossPlayerList, setLossPlayerList] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [data, setData] = useState([]);

  // =====================================  RECUPERATION INFOS USER =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://127.0.0.1:8000/api/user',
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
      'http://127.0.0.1:8000/api/user/players/stats',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation de tous les joueurs OK');
        console.log(response.data);
        setPlayerList(response.data.results);
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

        // Initialisation du tableau vide
        const topPlayersPieData = [];

        // Boucle pour remplir le tableau
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < response.data.results.length; i++) {
          // Création de l'objet pour chaque jeu
          const player = {
            id: response.data.results[i].player_name,
            label: response.data.results[i].player_name,
            value: response.data.results[i].victories,
            color: `hsl(${i * 15}, 70%, 50%)`,
          };

          // Ajout de l'objet au tableau
          topPlayersPieData.push(player);
        }

        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTopPlayersData(topPlayersPieData);
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
  const [top5Games, setTop5Games] = useState([]);
  // const [numberOfGames, setNumberOfGames] = useState(0);
  const [top5GamesData, setTop5GamesData] = useState([]);

  // =====================================  RECUPERATION TOP JEUX JOUES =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://127.0.0.1:8000/api/user/boardgames5',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 jeux OK');
        console.log(response.data);
        setTop5Games(response.data.results);
        // setNumberOfGames(response.data.results.length);

        setLoadingTop5Games(false);

        // Initialisation du tableau vide
        const top5GamesPieData = [];

        // Boucle pour remplir le tableau
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < response.data.results.length; i++) {
          // Création de l'objet pour chaque jeu
          const game = {
            id: response.data.results[i].name,
            label: response.data.results[i].name,
            value: response.data.results[i].num_games_played,
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
  const [top5Categories, setTop5Categories] = useState([]);

  // =====================================  RECUPERATION TOP 5 CATEGORIES =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://127.0.0.1:8000/api/user/categories5',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 catégories OK');
        console.log(response.data);
        setTop5Categories(response.data.results);

        setLoadingTop5Categories(false);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ----------------------Recuperation des top 5 JOUEURS -----------------------
  const [loadingTop5Players, setLoadingTop5Players] = useState(true);
  const [top5Players, setTop5Players] = useState([]);
  const [top5PlayersData, setTop5PlayersData] = useState([]);

  // =====================================  RECUPERATION TOP 5 JOUEURS =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://127.0.0.1:8000/api/user/players5',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 joueurs OK');
        console.log(response.data);
        setTop5Players(response.data.results);

        setLoadingTop5Players(false);

        // Initialisation du tableau vide
        const top5PlayersPieData = [];

        // Boucle pour remplir le tableau
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < response.data.results.length; i++) {
          // Création de l'objet pour chaque jeu
          const player = {
            id: response.data.results[i].player_name,
            label: response.data.results[i].player_name,
            value: response.data.results[i].victory_number,
            color: `hsl(${i * 15}, 70%, 50%)`,
          };

          // Ajout de l'objet au tableau
          top5PlayersPieData.push(player);
        }

        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTop5PlayersData(top5PlayersPieData);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                colors={['green', 'rgb(228, 26, 28)']}
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
            <div className="resultat-table" style={{ maxWidth: '360px' }}>
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
            <section className="scores-container">

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
                        <th className="desktop">Champion</th>
                        <th className="desktop">Max Victoires</th>
                        <th className="desktop">Recordman</th>
                        <th className="desktop">Record</th>
                        {/* <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        <th><img src={lauriers} alt="laurier des records" /></th> */}
                        {/* <th>Champion</th>
                        <th>Recordman</th> */}
                      </tr>
                      {
                        top5Games.length === 0
                          ? (
                            <tr>
                              <td style={{ fontStyle: 'italic' }} colSpan="2">Aucune jeu renseignée : ajoutez votre première partie</td>
                            </tr>
                          )
                          : top5Games.map((game) => (
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
                      top5Games.map((game) => (
                        <tr key={game.board_game_id}>
                          <td>
                            <Link to={`/jeux/${game.board_game_id}`}>
                              {game.board_game_name}
                            </Link>
                          </td>
                          <td>{game.board_game_name}</td>
                          <td>{game.game_number}</td>
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
                      <tr>
                        <td>Catan</td>
                        <td>Laura</td>
                        <td>18</td>
                      </tr>
                      <tr>
                        <td>Monopoly</td>
                        <td>Amar</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Les aventuriers du rail</td>
                        <td>Syham</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>Puerto Rico</td>
                        <td>Nico</td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>La Bonne paye</td>
                        <td>Amar</td>
                        <td>12</td>
                      </tr>
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
                        {/* <th>Victoires</th>
                        <th>Défaites</th> */}
                      </tr>
                      {
                      top5Categories.length === 0
                        ? (
                          <tr>
                            <td style={{ fontStyle: 'italic' }} colSpan="2">Aucune catégorie renseignée</td>
                          </tr>
                        )
                        : top5Categories.map((category) => (
                          <tr key={category.category_id}>
                            <td>{category.name}</td>
                            <td>{category.Category_number}</td>
                            {/* <td>18</td> */}
                            {/* <td>5</td> */}
                          </tr>
                        ))
                    }
                      {/* <tr>
                        <td>{top5Categories[0].name}</td>
                        <td>{top5Categories[0].Category_number}</td> */}
                      {/* <td>18</td> */}
                      {/* <td>5</td> */}
                      {/* </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

        {/* ------------------------------ TOP PLAYERS CONTAINER-------------------------- */}

        {loadingTop5Players ? (<Loader />)
          : (
            <section className="scores-container">

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
                        <th>Victoires</th>
                        <th>Défaites</th>
                        <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
                        {/* <th><img src={lauriers} alt="laurier des records" /></th> */}
                      </tr>
                      {
                      playerList.length === 0
                        ? (
                          <tr>
                            <td style={{ fontStyle: 'italic' }} colSpan="2">Aucun joueur renseigné</td>
                          </tr>
                        )
                        : playerList.map((player) => (
                          <tr key={player.player_id}>
                            <td>
                              <Link to={`/joueurs/id?player_id=${player.player_id}`}>
                                {player.player_name}
                              </Link>
                            </td>
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
