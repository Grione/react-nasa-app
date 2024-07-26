import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authentication } from "../../utils/http";
import { useUser } from "../../store/UserContext";
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const { loginUser } = useUser();

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authentication,
    onSuccess: () => {
      loginUser();
      navigate('/favorites');
    }
  })

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mode = searchParams.get('mode') || 'login';

    const formData = new FormData(event.currentTarget);

    const dataObject = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    mutate({ dataObject, mode })

  }

  return (
    <>
      <form method="post" onSubmit={onSubmitHandler} className={classes.form}>
        <h2>{isLogin ? 'Log in' : 'Create a new user'}</h2>
        <div className={classes.wrapper}>
          <div className={classes.row}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className={classes.input} required />
          </div>
          <div className={classes.row}>
            <label htmlFor="passwod">Password</label>
            <input type="password" id="passwod" className={classes.input} name="password" required />
          </div>
          <div className={`${classes.row} ${classes.action}`}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} className={classes.link}>{isLogin ? 'Create new user' : 'Login'}</Link>
            <button className={classes.button}>Save</button>
          </div>
        </div>

      </form>
    </>
  )
}

export default AuthForm;