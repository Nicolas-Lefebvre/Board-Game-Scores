import './loader.scss';
import Image from 'src/assets/images/blue-meeple-image.png';

// import { Spin, Space } from 'antd';

// == Composant
function Loader() {
  return (
    <div className="spinner">
      {/* <Space
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
      </Space> */}

      <img src={Image} alt="Loading" />
      <i>Chargement...</i>

    </div>
  );
}

// == Export
export default Loader;
