// eslint-disable-next-line import/no-extraneous-dependencies
import { RadialChart } from 'react-vis';

const myData = [
  {
    angle: 1, label: 'Catan', labelsAboveChildren: true, labelsStyle: { color: 'white' }, color: '#2f71af',
  },
  {
    angle: 5, label: 'Monopoly', color: '#c33254',
  },
  {
    angle: 2, label: 'La Bonne Paye', color: '#4ca16c',
  },
];

// == Composant
function PieChart() {
  return (
    <div className="container pie-chart">

      <h2>Classement</h2>

      <div className="card chart-card mb-3 " style={{ maxWidth: '540px', maxHeight: '300px', border: 'none' }}>

        <h3 className="card-title">Top Jeux</h3>

        <div className="pieChart-container">
          <RadialChart
            colorType="literal"
            className="classement-pie"
            data={myData}
            width={300}
            height={300}
            labelsStyle={{
              textAnchor: 'end',
              dominantBaseline: 'start',
              fontSize: 17,
              fontWeight: 500,
              fill: '#000000',
              textAlign: 'left',
            }}
            showLabels
            labelsAboveChildren
            // style={{ textAlign: 'center', display: 'flex' }}
          />
          <div className="pieChart-labels">
            <div className="dot" style={{ backgroundColor: '#2f71af' }} />
            <div className="dot" style={{ backgroundColor: '#c33254' }} />
            <div className="dot" style={{ backgroundColor: '#4ca16c' }} />
          </div>

        </div>

      </div>

    </div>
  );
}

// == Export
export default PieChart;
