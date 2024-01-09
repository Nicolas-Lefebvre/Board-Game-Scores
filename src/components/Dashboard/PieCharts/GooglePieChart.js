/* eslint-disable arrow-body-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart } from 'react-google-charts';

export const data = [
  ['Catan', 'Hours per Day'],
  ['Victoires', 49],
  ['défaites', 46],
];

export const options = {
  // title: 'Top jeux',
  // backgroundColor: '#00000000',
  is3D: true,
  legend: { position: 'none', alignment: 'center', textStyle: { color: 'black', fontSize: 13 } },
  titleTextStyle: {
    color: 'black', // any HTML string color ('red', '#cc00cc')
    // fontName: <string>, // i.e. 'Times New Roman'
    fontSize: 24, // 12, 18 whatever you want (don't specify px)
    // {/* bold: <boolean>,    // true or false */}
    // {/* italic: <boolean>   // true of false */}
  },
  colors: ['green', 'red'],
  // chartArea:{ left: 0, top: 0, width: '100%', height: '100%' },
  // height: 200,
  // width: 500,
  // legendPosition: 'labeled',
};

// == Composant
const ResultatPieChart = () => {
  return (

    <div
      className="pieChart-wrapper"
      style={{
        width: '200px',
        // margin: 'auto',
        // marginBottom: '-1.4rem',
      }}
    >
      {/* <h3 style={{ marginBottom: '-2rem', zIndex: 'inherit' }}>Top jeux</h3> */}

      {/* <h3 className="card-title">Top Jeux</h3> */}

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="100%"
        // height="200px"
        style={{
          // marginTop: '2rem',
          textAlign: 'left',
        }}
        className="pieChart"
        // labelStyle={{ marginTop= "10rem" }}
      />
    </div>

  );
};

// == Export
export default ResultatPieChart;
