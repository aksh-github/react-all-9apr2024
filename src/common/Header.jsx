import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <nav className="main-nav" aria-label="Main menu">
        <ul className="main-menu">
          <li className="top-level-entry-container ">
            <Link to="/">Home</Link>
          </li>
          <li className="top-level-entry-container ">
            <Link to="/forms">Forms</Link>
          </li>
          <li className="top-level-entry-container ">
            <Link to="/formik">Formik</Link>
          </li>
          <li className="top-level-entry-container ">
            <Link to="/">Home</Link>
          </li>
          <li className="top-level-entry-container ">
            <Link to="/forms">Forms</Link>
          </li>
          <li className="top-level-entry-container ">
            <Link to="/formik">Formik</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
