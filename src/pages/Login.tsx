import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  return (
    <div className="bg-secondary text-center p-12 text-white grid gap-3">
      <img src="login.svg" alt="" />
      <h3 className=" tex-lg font-medium">Welcome Back!</h3>
      <h1 className="text-2xl font-bold">Please, Log In</h1>
      <form action="" className="space-y-3">
        <Input placeholder="johndoe@gmail.com" src="user-alt.svg" />
        <Input placeholder="password..." type="password" src="lock-open.svg" />
      </form>
        <Button value="Login"  />
      <div className="flex gap-2 justify-center items-center">
        <span className="h-0.5 bg-white w-full"></span>
        <p>or</p>
        <span className="h-0.5 bg-white w-full"></span>
      </div>
      <Button value="Create an account" option={true} />
    </div>
  );
};

export default Login;
