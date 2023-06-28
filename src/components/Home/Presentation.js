import { Link } from 'react-router-dom';
// import image from '../../assets/images/amis-jouant-a-un-jeu-de-societe.jpg';
// == Composant
function Presentation() {
  return (
    <div className="container presentation">
      <h2>Présentation du site</h2>
      <section>
        {/* <img src={image} alt="" /> */}
        <p>
          Board Game Scores (BGS) est un site qui permet d'enregistrer les résultats
          des parties de jeux de société faites au sein d’une communauté.Il permet
          de conserver les résultats de toutes les parties jouées et de faire resso
          rtir de nombreuses statistiques, objectifs, et également de sauvegarder une
          partie en cours. BGS permet de se connecter à d’autres joueurs et de gérer
          sa collection de jeux de société.
        </p>
      </section>

      { localStorage.getItem('BGStoken') ? '' :
      (<div>
        <Link style={{ marginBottom: '2rem' }} className="btn btn-primary" to="/inscription" role="button">Je m'inscris !</Link>
      </div>)
    }
    </div>
  );
}

// == Export
export default Presentation;
