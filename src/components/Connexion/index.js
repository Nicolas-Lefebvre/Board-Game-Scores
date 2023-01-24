import './connexion.scss';
import { Link } from 'react-router-dom';

// == Composant
function Connexion() {
  return (
  <div>

    <h2>Connexion</h2>

    <div>
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Adresse Mail/Pseudo</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
              <input type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div type="link" id="emailHelp" className="form-text">
            {/*<Link className="forgetpassword" to="/forgetpassword" role="link">Mot de passe oublié?</Link>*/}
                Mot de passe oublié?
              </div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
    </div>

    <h2>Vous n'êtes pas encore inscrit?</h2>
    <Link className="btn btn-primary" to="/inscription" role="button">Inscrivez vous!</Link>

  </div>
);
}

// == Export
export default Connexion;

