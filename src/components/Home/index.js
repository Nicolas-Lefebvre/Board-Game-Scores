import './home.scss';
// import image from 'src/assets/images/game-gc51c3c193_1920.jpg';
import Header from './Header';
import Presentation from './Presentation';
import Classement from './Classement';
import TableauDeBord from './TableauDeBord';

// == Composant
function Home() {
  return (
    <div className="home">

      <Header />
      <Presentation />
      <Classement />
      <TableauDeBord />

      {/* <img src={image} alt="" className="header-image" /> */}
    </div>
  );
}

// == Export
export default Home;
