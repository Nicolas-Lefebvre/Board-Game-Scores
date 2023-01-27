// == Composant
import { Spin, Space } from 'antd';

function Loader() {
  return (
    <div className="loader">
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Space>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>
      </Space>

    </div>
  );
}

// == Export
export default Loader;
