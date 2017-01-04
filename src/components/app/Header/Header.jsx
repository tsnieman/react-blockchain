import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header>
    <strong>🍞 webpack2test</strong>

    <nav>
      <ul>
        <li>
          <Link to="/">/home</Link>
        </li>

        <li>
          <Link to="/about">/about</Link>
        </li>

        <li>
          <Link to="/hash">/hash</Link>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
};

export default Header;
