// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
// eslint-disable-next-line import/no-extraneous-dependencies
import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'Laura',
    label: 'Laura',
    value: 23,
    color: 'hsl(15, 70%, 50%)',
  },
  {
    id: 'Syham',
    label: 'Syham',
    value: 21,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'Amar',
    label: 'Amar',
    value: 19,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'Nico',
    label: 'Nico',
    value: 15,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'Maman',
    label: 'Maman',
    value: 13,
    color: 'hsl(30, 70%, 50%)',
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PlayersPieChart = () => (
  // <div style={{ height: '200px' }}>
  <ResponsivePie
    data={data}
    margin={{
      top: 40,
      right: 40,
      bottom: 40,
      left: -130,
    }}
    valueFormat=" ^-~f"
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'set1' }}
    // colorsBy="index"
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
        translateX: -20,
        translateY: 5,
        itemsSpacing: 0,
        itemWidth: 89,
        itemHeight: 20,
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
  // </div>
);

export default PlayersPieChart;
