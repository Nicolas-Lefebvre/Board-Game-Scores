/* eslint-disable max-len */
import { Link } from 'react-router-dom';
// import image from '../../assets/images/amis-jouant-a-un-jeu-de-societe.jpg';
import boardgamescoreImg from '../../assets/images/boardgamescores-logo.png';
// == Composant
function Presentation() {
  return (
    <section className="container presentation">

      <img src={boardgamescoreImg} alt="pion de jeu de société avec une couronne en or et une couronne de lauriers" />
      <h2 className="presentation-h2">Présentation du site</h2>
      <div>
        {/* <img src={image} alt="" /> */}
        <p>
          Boardgamescores est le site web ultime pour enregistrer et suivre les scores de tes parties de jeux de société préférés !
          Que tu soies un joueur occasionnel ou un véritable passionné, Boardgamescores te permet de garder une trace de tes victoires
          et de créer des profils personnalisés pour chaque joueur. Enregistre facilement les scores, consulte les classements, et
          compare tes performances avec celles de tes amis !
        </p>
        <p style={{ fontWeight: 'bold' }}>
          <Link as={Link} to="/inscription">Inscris-toi dès maintenant et profite d'une expérience de jeu encore plus captivante !</Link>
        </p>
        <p>
          Boardgamescores offre une interface conviviale et intuitive. Suis les tendances, les classements et les performances
          de chaque joueur au fil du temps. Tu pourras ainsi découvrir qui est le champion incontesté de ton groupe d'amis !
          Explore de nombreuses statistiques pour chaque jeu, telles que le pourcentage de victoires par joueur ou les records de chacun.
          Utilise ces informations pour te perfectionner et te lancer de nouveaux défis !
        </p>

      </div>

      { localStorage.getItem('BGStoken') ? ''
        : (
          <div>
            <Link style={{ marginBottom: '2rem' }} className="btn btn-primary" to="/inscription" role="button">Je m'inscris !</Link>
          </div>
        )}
    </section>
  );
}

// == Export
export default Presentation;
