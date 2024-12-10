import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex items-center  top-[150px] justify-center h-[calc(100vh-80px)]">
      <SignIn signUpUrl="/register"/>
    </div>
  );
};

export default LoginPage;
