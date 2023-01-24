import './footer.scss';
//import { Link } from 'react-router-dom';

// == Composant
function Footer() {
  return (
    <div className="footer">

      {/*<Link className="contactbutton" to="/contact" role="button">Contact</Link>*/}
      <ul>
        <li><a>Contact</a></li>
        <li><a>CGU</a></li>
        <li><a>FAQ</a></li>
      </ul>

    </div>
  );
}

// == Export
export default Footer;
