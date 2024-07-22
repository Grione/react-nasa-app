import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext";

const LogoutButton = () => {

  const navigate = useNavigate();
  const { logoutUser } = useUser();


  function logoutHandler() {
    logoutUser();
    navigate('/');
  }

  return <button onClick={logoutHandler}>Logout</button>
}

export default LogoutButton; 