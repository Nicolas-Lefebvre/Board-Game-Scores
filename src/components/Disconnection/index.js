import { Link } from 'react-router-dom';
import { Button } from 'antd';

// == Composant
function Disconnection({ setIsLogged, setToken }) {
  const handleClickOnDashboard = () => {
    console.log('Go to Dashboard');
  };
  const handleClickOnDisconnection = () => {
    console.log('Deconnexion :');
    setIsLogged(false);
    setToken('');
  };

  return (
    <div className="container">

      <h2>Vous êtes déjà connectés</h2>
      {/* <Space wrap> */}
      <Link to="/tableau-de-bord"><Button type="primary" onClick={handleClickOnDashboard}>Accéder à mon tableau de bord</Button></Link>
      <h3>Ou</h3>
      <Button type="primary" onClick={handleClickOnDisconnection} danger>Déconnexion</Button>
      {/* </Space> */}

    </div>

  );
}

// == Export
export default Disconnection;
