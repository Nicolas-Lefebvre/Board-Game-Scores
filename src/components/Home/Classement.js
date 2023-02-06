import image from 'src/assets/images/catan-300x300.jpg';
import image2 from 'src/assets/images/la-bonne-paye.jpg';
// import image3 from 'src/assets/images/13_4527287_6_60_FR.jpg';
// import PieChart from './PieChart/PieChart';
import { Chart } from 'react-google-charts';
// import GooglePieChart3D from './GooglePieChart3D/GooglePieChart3D';
import Loader from '../Loader';

// == Composant
function Classement({ top5Games, loading }) {
  console.log(top5Games);
  console.log(top5Games[0]);

  const data = [
    ["Catan", "Hours per Day"],
    [top5Games[0].name, top5Games[0].game_number],
    [top5Games[1].name, top5Games[1].game_number],
    [top5Games[2].name, top5Games[2].game_number],
    [top5Games[3].name, top5Games[3].game_number],
    [top5Games[4].name, top5Games[4].game_number],
  ];

  const options = {
    // title: 'Top jeux',
    // backgroundColor: '#00000000',
    is3D: true,
    legend: { position: 'right', alignment: 'center', textStyle: { color: 'black', fontSize: 13 } },
    titleTextStyle: {
      color: 'black', // any HTML string color ('red', '#cc00cc')
      // fontName: <string>, // i.e. 'Times New Roman'
      fontSize: 24, // 12, 18 whatever you want (don't specify px)
      // {/* bold: <boolean>,    // true or false */}
      // {/* italic: <boolean>   // true of false */}
    },
    // legendPosition: 'labeled',
  };

  return (
    <div className="container classement">

      <h2>Classement</h2>

      {loading ? (<Loader />)
        : (
          <div className="card-container">
            <div className="card mb-3 " style={{ maxWidth: '540px' }}>
              <h3 className="card-title">Jeu le plus joué #1</h3>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={image} alt="" className="image" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4>{top5Games[0].name}</h4>
                    {/* <p className="game-category">Jeu de gestion</p> */}
                    <ul>
                      <li><strong>{top5Games[0].game_number}</strong> Parties jouées</li>
                      {/* <li><strong>25</strong> Record</li> */}
                      {/* <li><strong>3544</strong> Joueurs</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: '415px', margin: 'auto', marginBottom: '-1.4rem' }}>
              <h3 style={{ marginBottom: '-2rem', zIndex: 'inherit' }}>Top jeux</h3>

              {/* <h3 className="card-title">Top Jeux</h3> */}

              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="415px"
                height="236.8px"
                style={{ marginTop: '2rem' }}
                className="pieChart"
                // labelStyle={{ marginTop= "10rem" }}
              />
            </div>

            <div className="card mb-3 " style={{ maxWidth: '540px' }}>
              <h3 className="card-title">Jeu le plus joué #2</h3>
              <div className="row g-0">
                {/* <div className="col-md-4">
                  <img src={image2} alt="" className="image" />
                </div> */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h4>{top5Games[1].name}</h4>
                    {/* <p className="game-category">Jeu de gestion</p> */}
                    <ul>
                      <li><strong>{top5Games[1].game_number}</strong> Parties jouées</li>
                      {/* <li><strong>25</strong> Record cette semaine</li> */}
                      {/* <li><strong>3544</strong> Joueurs</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
    </div>
  );
}

// == Export
export default Classement;
