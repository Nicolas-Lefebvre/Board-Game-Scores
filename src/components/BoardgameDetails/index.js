/* eslint-disable arrow-body-style */
import './boardgameDetails.scss';

import image from 'src/assets/images/catan-300x300.jpg';

const BoardgameDetails = ({ name, price, description, players, playtime, stats }) => {
  return (
    <div className="product-card">
            <img className="product-card__image" src={image} alt={name} />
            <div className="product-card__info">
                <h3>{name}</h3>
                <p>{description}</p>
                <table className="product-card__stats">
                    <thead>
                        <tr>
                            <th>Statistique</th>
                            <th>Valeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre de parties jouées</td>
                            <td>{stats.played}</td>
                        </tr>
                        <tr>
                            <td>Nom du champion</td>
                            <td>{stats.champion}</td>
                        </tr>
                        <tr>
                            <td>Nom du recordman</td>
                            <td>{stats.recordholder}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
  );
};

export default BoardgameDetails;
