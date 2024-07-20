import { NavLink } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {

  return (
    <header className={classes.header}>
      <span className={classes.slogan}>COSMOS</span>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink to="/"
            className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>Main</NavLink></li>
          <li><NavLink to="/explorer" className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>Start explorer</NavLink></li>
          <li>
            <NavLink to="/favorites"
              className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth?mode=login"
              className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>
              Auth
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;