import './connexion.scss';

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
            <div type="link" id="emailHelp" className="form-text">Mot de passe oublié?</div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
    </div>

    <h2>Vous n'êtes pas encore inscrit?</h2>

    <div>
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Adresse Mail*</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputPseudo1" className="form-label">Pseudo*</label>
              <input type="text" className="form-control" id="exampleInputPseudo1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputAge1" className="form-label">Age</label>
              <input type="text" className="form-control" id="exampleInputAge1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">Mot de passe*</label>
              <input type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputConfirmPassword1" class="form-label">Confirmer mot de passe*</label>
              <input type="password" className="form-control" id="exampleInputConfirmPassword1"></input>
            </div>
            <div type="text" id="champs" className="form-text">Champs obligatoires*</div>
            <button type="submit" className="btn btn-primary">Je m'inscris!</button>
          </form>
      </div>

  </div>
);
}

// == Export
export default Connexion;

