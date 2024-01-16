import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// == Composant
function Header() {

  const navigate = useNavigate();

  return (
    <div className="header-image">

      <div className="header-image__content">
        <h2 className="header-image__content__title">Boardgame scores</h2>
        <p className="header-image__content__text">Le site qui pimente vos parties !</p>
        <button
          className='header-image__content__button'
          // variant="primary"
          onClick={() => navigate('/inscription')}
        >
          Je m'inscris
        </button>
      </div>

      {/* <img src={image} alt="" className="header-image" /> */}
    </div>
  );
}

// == Export
export default Header;
