// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
// eslint-disable-next-line import/no-extraneous-dependencies
import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'catan',
    label: 'catan',
    value: 23,
    color: 'hsl(15, 70%, 50%)',
  },
  {
    id: 'Monopoly',
    label: 'Monopoly',
    value: 21,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'Les aventuriers du rail',
    label: 'Les aventuriers du rail',
    value: 19,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'Puerto Rico',
    label: 'Puerto Rico',
    value: 15,
    color: 'hsl(30, 70%, 50%)',
  },
  {
    id: 'La bonne paye',
    label: 'La bonne paye',
    value: 13,
    color: 'hsl(30, 70%, 50%)',
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const GamesPieChart = () => (
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

export default GamesPieChart;
