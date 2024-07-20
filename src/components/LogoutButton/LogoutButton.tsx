import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../utils/http";

const LogoutButton = () => {

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.log('Logout failed', error);
    }
  });

  function logoutHandler() {
    mutate()
  }

  return <button onClick={logoutHandler}>Logout</button>
}

export default LogoutButton; 