/* eslint-disable max-len */
import './dashboard.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';

import avatarPic from 'src/assets/images/avatar-pic.jpg';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';

import Loader from '../Loader';
// import ResultatPieChart from './PieCharts/ResultatPieChart';
// import ResultPieChart from './PieCharts/ResultPieChart';
import GamesPieChart from './PieCharts/GamesPieChart';
// import PlayersPieChart from './PieCharts/PlayersPieChart';
// import AddBoardgame from '../AddBoardgame';

// == Composant
function Dashboard({ setUserInfos, userInfos }) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('BGStoken')}` },
  };

  const [loadingPlayerResults, setLoadingPlayerResults] = useState(true);

  const [playerList, setPlayerList] = useState([]);

  const [loadingUserInfos, setLoadingUserInfos] = useState(true);
  // const [playerListSingle, setPlayerListSingle] = useState([]);
  const [lossPlayerList, setLossPlayerList] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [data, setData] = useState([]);

  // =====================================  RECUPERATION INFOS USER =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des infos du user OK');
        console.log(response.data);
        setUserInfos(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingUserInfos(false);
      });
  }, []);

  // =====================================  RECUPERATION STATS PAR JOUEUR =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/players/stats',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation de tous les joueurs OK');
        console.log(response.data);
        setPlayerList(response.data.results);
        setSelectedPlayerId(response.data.results[0].player_id);
        setLossPlayerList(response.data.results.filter((filteredPlayer) => (Number(filteredPlayer.is_winner) === 0)));
        const numberOfPlayer = lossPlayerList.length;

        // On rempli le premier camembert avec les données du joueur en index zéro par défaut
        setData(
          [
            {
              id: 'victoires',
              label: 'victoires',
              value: response.data.results[0].victory_number,
              color: 'hsl(15, 70%, 50%)',
            },
            {
              id: 'défaites',
              label: 'Défaites',
              value: response.data.results[numberOfPlayer].victory_number,
              color: 'hsl(30, 70%, 50%)',
            },
          ],
        );
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
      player.player_id == event.target.value
    ));
    console.log(filteredPlayer);
    const victoryNumber = filteredPlayer[0].victory_number;
    const lossNumber = (filteredPlayer[1] ? filteredPlayer[1].victory_number : '0');

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
  const [top5GamesData, setTop5GamesData] = useState([]);

  // =====================================  RECUPERATION TOP 5 JEUX =============================
  useEffect(() => {
    axios.get(
      // URL
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgames5',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 jeux OK');
        console.log(response.data);
        setTop5Games(response.data.results);

        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTop5GamesData([
          {
            id: response.data.results[0].board_game_name,
            label: response.data.results[0].board_game_name,
            value: response.data.results[0].game_number,
            color: 'hsl(15, 70%, 50%)',
          },
          {
            id: response.data.results[1].board_game_name,
            label: response.data.results[1].board_game_name,
            value: response.data.results[1].game_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[2].board_game_name,
            label: response.data.results[2].board_game_name,
            value: response.data.results[2].game_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[3].board_game_name,
            label: response.data.results[3].board_game_name,
            value: response.data.results[3].game_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[4].board_game_name,
            label: response.data.results[4].board_game_name,
            value: response.data.results[4].game_number,
            color: 'hsl(30, 70%, 50%)',
          },
        ]);

        setLoadingTop5Games(false);
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
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/categories5',
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
      'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/players5',
      // données
      config,
    )
      .then((response) => {
        console.log('Recuperation des top 5 joueurs OK');
        console.log(response.data);
        setTop5Players(response.data.results);

        // On rempli le 2nd camembert avec les données du joueur en index zéro par défaut
        setTop5PlayersData([
          {
            id: response.data.results[0].player_name,
            label: response.data.results[0].player_name,
            value: response.data.results[0].victory_number,
            color: 'hsl(15, 70%, 50%)',
          },
          {
            id: response.data.results[1].player_name,
            label: response.data.results[1].player_name,
            value: response.data.results[1].victory_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[2].player_name,
            label: response.data.results[2].player_name,
            value: response.data.results[2].victory_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[3].player_name,
            label: response.data.results[3].player_name,
            value: response.data.results[3].victory_number,
            color: 'hsl(30, 70%, 50%)',
          },
          {
            id: response.data.results[4].player_name,
            label: response.data.results[4].player_name,
            value: response.data.results[4].victory_number,
            color: 'hsl(30, 70%, 50%)',
          },
        ]);

        setLoadingTop5Players(false);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <h2 style={{ marginTop: '10vh', color: 'grey', fontStyle: 'italic' }}>Vous n'avez encore aucune donnée : enregistrez votre première partie</h2>
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
            {(playerList.slice(0, lossPlayerList.length+1)).map((player) => (
              <option key={player.player_id} value={player.player_id}>{player.player_name}</option>
            ))}
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
                        Number((playerList.filter((player) => (player.player_id == selectedPlayerId))[0].victory_number))
                        + (((lossPlayerList.find((player) => (player.player_id == selectedPlayerId)))) ? Number((playerList.filter((player) => (player.player_id == selectedPlayerId))[1].victory_number)) : 0)
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Victoires</td>
                    <td>
                      {
                        playerList.filter((player) => (player.player_id == selectedPlayerId))[0] ? playerList.filter((player) => (player.player_id == selectedPlayerId))[0].victory_number : '0'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Défaites</td>
                    <td>
                      {
                        playerList.filter((player) => (player.player_id == selectedPlayerId))[1] ? playerList.filter((player) => (player.player_id == selectedPlayerId))[1].victory_number : '0'
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
                      <tr>
                        <td><Link to={`/jeux/${top5Games[0].board_game_id}?boardgame_id=${top5Games[0].board_game_id}`}>{top5Games[0].board_game_name}</Link></td>
                        <td>{top5Games[0].game_number}</td>
                        {/* <td>18</td>
                        <td>5</td> */}
                        <td className="desktop">Laura</td>
                        <td className="desktop">2</td>
                        <td className="desktop">Syham</td>
                        <td className="desktop">12</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[1].board_game_id}?boardgame_id=${top5Games[1].board_game_id}`}>{top5Games[1].board_game_name}</Link></td>
                        <td>{top5Games[1].game_number}</td>
                        {/* <td>2</td>
                        <td>120</td> */}
                        <td className="desktop">Amar</td>
                        <td className="desktop">3</td>
                        <td className="desktop">Syham</td>
                        <td className="desktop">24</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[2].board_game_id}?boardgame_id=${top5Games[2].board_game_id}`}>{top5Games[2].board_game_name}</Link></td>
                        <td>{top5Games[2].game_number}</td>
                        {/* <td>12</td>
                        <td>3</td> */}
                        <td className="desktop">Nico</td>
                        <td className="desktop">2</td>
                        <td className="desktop">Nico</td>
                        <td className="desktop">32</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[3].board_game_id}?boardgame_id=${top5Games[3].board_game_id}`}>{top5Games[3].board_game_name}</Link></td>
                        <td>{top5Games[3].game_number}</td>
                        {/* <td>8</td>
                        <td>7</td> */}
                        <td className="desktop">Syham</td>
                        <td className="desktop">5</td>
                        <td className="desktop">Amar</td>
                        <td className="desktop">23</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[4].board_game_id}?boardgame_id=${top5Games[4].board_game_id}`}>{top5Games[4].board_game_name}</Link></td>
                        <td>{top5Games[4].game_number}</td>
                        {/* <td>12</td>
                        <td>3</td> */}
                        <td className="desktop">Alexis</td>
                        <td className="desktop">5</td>
                        <td className="desktop">Syham</td>
                        <td className="desktop">24</td>
                      </tr>
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
                      <tr>
                        <td><Link to={`/jeux/${top5Games[0].board_game_id}`}>{top5Games[0].board_game_name}</Link></td>
                        <td>Laura</td>
                        <td>18</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[1].board_game_id}`}>{top5Games[1].board_game_name}</Link></td>
                        <td>Amar</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[2].board_game_id}`}>{top5Games[2].board_game_name}</Link></td>
                        <td>Syham</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[3].board_game_id}`}>{top5Games[3].board_game_name}</Link></td>
                        <td>Nico</td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td><Link to={`/jeux/${top5Games[4].board_game_id}`}>{top5Games[4].board_game_name}</Link></td>
                        <td>Amar</td>
                        <td>12</td>
                      </tr>
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
                      <tr>
                        <td>{top5Categories[0].name}</td>
                        <td>{top5Categories[0].Category_number}</td>
                        {/* <td>18</td> */}
                        {/* <td>5</td> */}
                      </tr>
                      <tr>
                        <td>{top5Categories[1].name}</td>
                        <td>{top5Categories[1].Category_number}</td>
                        {/* <td>2</td> */}
                        {/* <td>120</td> */}
                      </tr>
                      <tr>
                        <td>{top5Categories[2].name}</td>
                        <td>{top5Categories[2].Category_number}</td>
                        {/* <td>12</td> */}
                        {/* <td>3</td> */}
                      </tr>
                      <tr>
                        <td>{top5Categories[3].name}</td>
                        <td>{top5Categories[3].Category_number}</td>
                        {/* <td>8</td> */}
                        {/* <td>7</td> */}
                      </tr>
                      <tr>
                        <td>{top5Categories[4].name}</td>
                        <td>{top5Categories[4].Category_number}</td>
                        {/* <td>12</td> */}
                        {/* <td>3</td> */}
                      </tr>
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
                  <GamesPieChart data={top5PlayersData} />
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
                        <th><img src={lauriers} alt="laurier des records" /></th>
                      </tr>
                      <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[0].player_id}`}>{top5Players[0].player_name}</Link></td>
                        <td>{top5Players[0].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[0].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[0].player_id))).victory_number) : '0' }</td>
                        <td>2</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[1].player_id}`}>{top5Players[1].player_name}</Link></td>
                        <td>{top5Players[1].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[1].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[1].player_id))).victory_number) : '0' }</td>
                        <td>1</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[2].player_id}`}>{top5Players[2].player_name}</Link></td>
                        <td>{top5Players[2].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[2].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[2].player_id))).victory_number) : '0' }</td>
                        <td>1</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[3].player_id}`}>{top5Players[3].player_name}</Link></td>
                        <td>{top5Players[3].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[3].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[3].player_id))).victory_number) : '0' }</td>
                        <td>1</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td><Link to={`/joueurs/id?player_id=${top5Players[4].player_id}`}>{top5Players[4].player_name}</Link></td>
                        <td>{top5Players[4].victory_number}</td>
                        <td>{ ((lossPlayerList.find((player) => (player.player_id == top5Players[4].player_id)))) ? ((lossPlayerList.find((player) => (player.player_id == top5Players[4].player_id))).victory_number) : '0' }</td>
                        <td>2</td>
                        <td>1</td>
                      </tr>
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
