import './footer.scss';
import { Link } from 'react-router-dom';

// == Composant
function Footer() {
  return (
    <div className="footer">
      <ul>
        <li><Link className="contactbutton" to="/inscription" role="button">Contact</Link></li>
        <li><Link className="contactbutton" to="/inscription" role="button">CGU</Link></li>
        <li><Link className="contactbutton" to="/inscription" role="button">FAQ</Link></li>
      </ul>
    </div>
  );
}

// == Export
export default Footer;
