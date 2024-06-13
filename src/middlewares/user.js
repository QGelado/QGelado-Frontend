import React from 'react';

export const UserContextType = {
  user: {},
  setUser: React.Dispatch
};

export const UserContext = React.createContext<UserContextType>({
  user: {},
  setUser: null,
});


// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = React.useState({});

  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}