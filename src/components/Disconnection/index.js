import './disconnection.scss';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

// == Composant
function Disconnection({ setIsLogged, isLogged, setToken }) {
  const navigate = useNavigate();

  const handleClickOnDashboard = () => {
    console.log('Go to Dashboard');
    navigate('/tableau-de-bord');
  };
  const handleClickOnDisconnection = () => {
    console.log('Deconnexion :');
    setIsLogged(false);
    setToken('');
    localStorage.removeItem('BGStoken');
    navigate('/connexion');
  };

  return (
    <div className="container">

      <h2>Etes-vous sûrs ?</h2>
      {/* <Space wrap> */}
      <Link to="/tableau-de-bord"><Button type="primary" onClick={handleClickOnDashboard}>Accéder à mon tableau de bord</Button></Link>
      <h3>Ou</h3>
      <Button type="primary" onClick={handleClickOnDisconnection} danger style={{ backgroundColor: 'red !important' }}>Déconnexion</Button>
      {/* </Space> */}

    </div>

  );
}

// == Export
export default Disconnection;
