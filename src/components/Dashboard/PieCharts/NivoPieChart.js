// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
// eslint-disable-next-line import/no-extraneous-dependencies
import { ResponsivePie } from '@nivo/pie';

const data =
[
  {
    "id": "javascript",
    "label": "javascript",
    "value": 63,
    "color": "hsl(134, 70%, 50%)"
  },
  {
    "id": "python",
    "label": "python",
    "value": 292,
    "color": "hsl(16, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 447,
    "color": "hsl(15, 70%, 50%)"
  },
  {
    "id": "css",
    "label": "css",
    "value": 303,
    "color": "hsl(316, 70%, 50%)"
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 269,
    "color": "hsl(30, 70%, 50%)"
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = () => (
  // <div style={{ height: '200px' }}>
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'category10' }}
    borderWidth={3}
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
    arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
    arcLabelsRadiusOffset={0.55}
    arcLabelsSkipAngle={11}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          2,
        ],
      ],
    }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: -123,
        translateY: 86,
        itemsSpacing: 0,
        itemWidth: 104,
        itemHeight: 24,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 17,
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

export default MyResponsivePie;
