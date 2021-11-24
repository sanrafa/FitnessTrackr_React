import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login Here</h1>
      <Link to="/register">New User?</Link>
    </div>
  );
};

export default Login;
