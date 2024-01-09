import { Link } from 'react-router-dom';
import { Button } from 'antd';

// == Composant
function GetConnected() {
  return (
    <div className="container gameList">

      <h2>Vous n'êtes pas connectés !</h2>
      <Link to="/connexion"><Button type="primary">Connexion</Button></Link>
      {/* <h3>Ou</h3>
      <Link to="/inscription"><Button type="primary">Inscription</Button></Link> */}

    </div>

  );
}

// == Export
export default GetConnected;
