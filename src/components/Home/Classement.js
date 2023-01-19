import image from 'src/assets/images/catan-300x300.jpg'
import image2 from 
import image3 from


// == Composant
function Classement() {
  return (
    <div className="container classement">

      <h2>Classement</h2>

      <div className="card-container">
        <div className="card mb-3 " style={{ maxWidth: '540px' }}>
          <h3 className="card-title">Jeu le plus joué</h3>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={image} alt="" className="image" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4>Catan</h4>
                <p className="game-category">Jeu de gestion</p>
                <ul>
                  <li><strong>1244</strong> Parties jouées</li>
                  <li><strong>25</strong> Record cette semaine</li>
                  <li><strong>3544</strong> Joueurs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3 " style={{ maxWidth: '540px' }}>
          <h3 className="card-title">Jeu le plus joué</h3>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={image} alt="" className="image" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4>Catan</h4>
                <p className="game-category">Jeu de gestion</p>
                <ul>
                  <li><strong>1244</strong> Parties jouées</li>
                  <li><strong>25</strong> Record cette semaine</li>
                  <li><strong>3544</strong> Joueurs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3 " style={{ maxWidth: '540px' }}>
          <h3 className="card-title">Jeu le plus joué</h3>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={image} alt="" className="image" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4>Catan</h4>
                <p className="game-category">Jeu de gestion</p>
                <ul>
                  <li><strong>1244</strong> Parties jouées</li>
                  <li><strong>25</strong> Record cette semaine</li>
                  <li><strong>3544</strong> Joueurs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// == Export
export default Classement;
