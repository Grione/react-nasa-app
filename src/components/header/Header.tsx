import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <span>COSMOS</span>
      <nav>
        <ul>
          <li><NavLink to="/">Main</NavLink></li>
          <li><NavLink to="/explorer">Start explorer</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;