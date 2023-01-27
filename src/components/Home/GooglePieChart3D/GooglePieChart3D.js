// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart } from 'react-google-charts';

export const data = [
  ["Catan", "Hours per Day"],
  ["Catan", 1244],
  ["Monopoly", 2455],
  ["La bonne paye", 1000],
  ["Autres", 500],
];

export const options = {
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

// == Composant
function GooglePieChart3D() {
  return (

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

  );
}

// == Export
export default GooglePieChart3D;
