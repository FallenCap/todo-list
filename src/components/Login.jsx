import React, { useState } from 'react';
import { account } from './Config/appwriteConfig';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Card from './UI/Card';
import Button from './UI/Button';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await account.createEmailSession(user.email, user.password);
      setLoading(false);
      // console.log(promise);
      const data = await account.get();
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#fff"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="h-auto w-auto glassmorphism">
        <div className="m-4">
          <h1 className="text-[3rem] font-black text-blured-white text-center">
            Login
          </h1>
        </div>
        <div className="flex flex-col mx-4">
          <form onSubmit={loginUser} className="space-y-6 w-96">
            <div>
              <label
                htmlFor="email"
                className="block text-sm pl-4 text-blured-white"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  className="appearence-none block w-full px-4 py-2 border-b-2 outline-none bg-transparent text-white"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm pl-4 text-blured-white"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearence-none block w-full px-4 py-2 border-b-2 outline-none bg-transparent text-white"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center pb-6">
              <Button text={'Login'} />
            </div>
          </form>
          <p className="text-white hover:text-blue-500 text-center pb-4">
            <Link to="/signup">Don't have account, Sign in</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
