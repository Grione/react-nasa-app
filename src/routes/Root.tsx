import { Outlet } from "react-router-dom";
import Header from "../components/header/Header"
import { useEffect } from "react";
import { getAuthToken, getTokenDuration } from "../utils/auth";
import { useUser } from "../store/UserContext";
import Modal from "../components/Modal/Modal";
import { createPortal } from "react-dom";

const Root = () => {
  const token = getAuthToken();
  const { logoutUser } = useUser();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      logoutUser();
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      logoutUser();
    }, tokenDuration)

  }, [token, logoutUser]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Outlet />
        {createPortal(<Modal />, document.body)}
      </div>
    </div>
  )
}

export default Root;