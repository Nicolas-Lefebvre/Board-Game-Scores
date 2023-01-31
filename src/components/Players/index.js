import './players.scss';
import winnerMedal from 'src/assets/images/winner-medal.png';
import lauriers from 'src/assets/images/laurier-records-2.png';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const { confirm } = Modal;

function Players() {
  const showDeleteConfirm = () => {
    confirm({
      title: 'Etes-vous sûrs de vouloir supprimer ce joueur ?',
      icon: <ExclamationCircleFilled />,
      content: 'suppression définitive !',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        console.log('OK');
        // axios.get(
        // // URL
        //   'http://syham-zedri.vpnuser.lan:8000/api/boardgames',
        //   // données
        //   {
        //   },
        // )
        //   .then((response) => {
        //     console.log('Recuperation des tous les jeux OK');
        //     console.log(response.data);
        //     setAllGames(response.data.results);

        //     setDisabled(false);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
        //   .finally(() => {
        //     setAllGamesLoading(false);
        //   });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="tableau_mesjoueurs">

      <h2>Mes Joueurs</h2>

      <div className="resultat-table">
        <table className="table table-striped">
          <thead />
          {/* </thead> */}
          <tbody>
            <tr>
              <th>Nom</th>
              <th>Victoires</th>
              <th>Défaites</th>
              <th><img src={winnerMedal} alt="medaille des titres de champions" /></th>
              <th><img src={lauriers} alt="laurier des records" /></th>
              <th>Modifier/Supprimer</th>
            </tr>
            <tr>
              <td>Laura</td>
              <td>23</td>
              <td>18</td>
              <td>5</td>
              <td>5</td>
              <td>
                <NavLink to="/joueurs/modifier">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{
                      marginRight: '.5rem',
                      marginTop: '.3rem',
                      color: '#0070ff',
                      fontSize: '1.7rem',
                    }}
                  />
                </NavLink>
                <Button onClick={showDeleteConfirm} type="dashed">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{
                      marginLeft: '.5rem',
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '1.7rem',
                    }}
                  />
                </Button>
              </td>
            </tr>
            <tr>
              <td>Syham</td>
              <td>122</td>
              <td>2</td>
              <td>120</td>
              <td>120</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Amar</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Nico</td>
              <td>15</td>
              <td>8</td>
              <td>7</td>
              <td>7</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Virginie</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Fabio</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Maman</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Papa</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Frère</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td>Soeur</td>
              <td>15</td>
              <td>12</td>
              <td>3</td>
              <td>3</td>
              <td>Modifier/Supprimer</td>
            </tr>
            <tr>
              <td colSpan="6"><Link className="btn btn-primary" to="/joueurs/ajouter" role="button">Ajouter un joueur</Link></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
// == Export
export default Players;
