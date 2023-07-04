import React, { useState, useEffect } from 'react';
import { account } from './Config/appwriteConfig';
import { useNavigate, Link } from 'react-router-dom';
import { UpdateTodoProvider } from './Context/UpdateTodoContext';
import Button from './UI/Button';
import TodoForm from './TodoForm';
import Todos from './Todos';

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await account.get();
        setUserDetails(getData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handlelogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userDetails);

  return (
    <div>
      {userDetails ? (
        <>
          <div className="py-4"></div>
          <div className="min-h-min max-w-6xl mx-auto flex justify-between rounded-2xl">
            <div className="flex justify-center items-center p-4">
              <p className="text-4xl font-black text-blured-white">
                Hello, {userDetails.name}
              </p>
            </div>
            <div className="p-4">
              <Button text={'Logout'} onClick={handlelogout} />
            </div>
          </div>
          <UpdateTodoProvider>
            <TodoForm />
            <Todos />
          </UpdateTodoProvider>
        </>
      ) : (
        <div className="flex w-screen h-screen justify-center items-center">
          <p className="pt-4 text-white text-xl">
            Please Login to see Profile{' '}
            <Link to="/">
              <span className="bg-black hover:bg-white p-2 cursor-pointer text-white hover:text-black rounded-2xl">
                Login
              </span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
