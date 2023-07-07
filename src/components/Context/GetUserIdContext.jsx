import React, { useState, useContext } from 'react';

const UserIdContext = React.createContext();
const UserIdUpdateContext = React.createContext();

export const useUserId = () => {
  return useContext(UserIdContext);
};

export const useUserIdUpdate = () => {
  return useContext(UserIdUpdateContext);
};

export const GetUserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  return (
    <UserIdContext.Provider value={userId}>
      <UserIdUpdateContext.Provider value={setUserId}>
        {children}
      </UserIdUpdateContext.Provider>
    </UserIdContext.Provider>
  );
};
