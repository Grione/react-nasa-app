import { Link, NavLink } from "react-router-dom";
import classes from './Header.module.css';
import LogoutButton from "../LogoutButton/LogoutButton";
import { useUser } from "../../store/UserContext";

const Header = () => {

  const { isUserAuth } = useUser();

  return (
    <header className={classes.header}>
      <span className={classes.slogan}>COSMOS</span>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink to="/"
            className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>Main</NavLink></li>
          <li><NavLink to="/explorer" className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>Start explorer</NavLink></li>
          <li>

            {isUserAuth ? (
              <NavLink to='/favorites'
                className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>
                Favorites
              </NavLink>
            ) : <Link to={'/auth?mode=login'} className={classes['nav-link']}>Favorites</Link>}

          </li>
          {
            !isUserAuth && (<li>
              <NavLink to="/auth?mode=login"
                className={({ isActive }) => isActive ? `${classes['active']} ${classes['nav-link']}` : classes['nav-link']}>
                Auth
              </NavLink>
            </li>)
          }
          {
            isUserAuth && (
              <li>
                <LogoutButton />
              </li>
            )
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header;