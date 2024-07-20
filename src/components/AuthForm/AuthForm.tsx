import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authentication } from "../../utils/http";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const { mutate } = useMutation({
    mutationFn: authentication
  })

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mode = searchParams.get('mode') || 'login';

    const formData = new FormData(event.currentTarget);

    const dataObject = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    console.log(dataObject, mode);

    mutate({ dataObject, mode })

  }

  return (
    <>
      <form method="post" onSubmit={onSubmitHandler}>
        <h2>{isLogin ? 'Log in' : 'Create a new user'}</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="passwod">Password</label>
          <input type="password" id="passwod" name="password" required />
        </div>
        <div>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Create new user' : 'Login'}</Link>
          <button>Save</button>
        </div>
      </form>
    </>
  )
}

export default AuthForm;