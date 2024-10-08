// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
// eslint-disable-next-line import/no-extraneous-dependencies
import { ResponsivePie } from '@nivo/pie';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsivePie() {
  const data = [
    {
      id: 'victoires',
      label: 'victoires',
      value: 447,
      color: 'hsl(15, 70%, 50%)',
    },
    {
      id: 'défaites',
      label: 'Défaites',
      value: 269,
      color: 'hsl(30, 70%, 50%)',
    },
  ];
  // <div style={{ height: '200px' }}>
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
      colors={['green', 'red']}
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
    />;
  // </div>
}

export default MyResponsivePie;
