import React, { useState } from 'react';
import { account } from './Config/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ThreeDots } from 'react-loader-spinner';
import Card from './UI/Card';
import Button from './UI/Button';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // TODO: Signup function
  const signupUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await account.create(uuidv4(), user.email, user.password, user.name);
      setLoading(false);
      // console.log(promise);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
    // const promise = account.create(
    //   uuidv4(),
    //   user.email,
    //   user.password,
    //   user.name
    // );

    // promise.then(
    //   function (response) {
    //     navigate('/');
    //     console.log(response); // Success
    //   },
    //   function (error) {
    //     console.log(error); // Failure
    //   }
    // );
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
      <Card className="h-auto w-80 md:w-auto glassmorphism">
        <div className="m-4">
          <h1 className="text-[2.5rem] md:text-[3rem] font-black text-blured-white text-center">
            Sign up
          </h1>
        </div>
        <div className="flex flex-col mx-4">
          <form onSubmit={signupUser} className="space-y-6 w-72 md:w-96">
            <div>
              <label
                htmlFor="name"
                className="block text-sm pl-4 text-blured-white"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearence-none block w-72 md:w-full px-4 py-2 border-b-2 outline-none bg-transparent text-white"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
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
                  className="appearence-none block w-72 md:w-full px-4 py-2 border-b-2 outline-none bg-transparent text-white"
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
                  className="appearence-none block w-72 md:w-full px-4 py-2 border-b-2 outline-none bg-transparent text-white"
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
              <Button text={'Sign in'} />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
