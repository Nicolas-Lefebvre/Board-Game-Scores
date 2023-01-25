import './footer.scss';
import { Link } from 'react-router-dom';

// == Composant
function Footer() {
  return (
    <div className="footer">
      <ul>
        <li><Link className="contactbutton" to="/contact" role="button">Contact</Link></li>
        <li><Link className="contactbutton" to="/cgu" role="button">CGU</Link></li>
        <li><Link className="contactbutton" to="/faq" role="button">FAQ</Link></li>
      </ul>
    </div>
  );
}

// == Export
export default Footer;
