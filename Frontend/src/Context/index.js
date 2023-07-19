import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const withAuthContext = (Component) => (props) =>
  (
    <AuthContext.Consumer>
      {(value) => <Component {...value} {...props} />}
    </AuthContext.Consumer>
  );

const AuthProvider = ({ children }) => {
  const [Token, setToken] = useState(null);
  const [Users, setUsers] = useState([]);
  const [CurrChat, setCurrentChat] = useState(null);

  function GetAllUsers() {
    if (Token && Users.length <= 0) {
      axios
        .get(`${process.env.REACT_APP_PUBLIC_PATH}/GetAllUsers`, {
          headers: { authorization: `${Token}` },
        })
        .then((res) => {
          setUsers(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        if (localStorage.getItem("token"))
          setToken(localStorage.getItem("token"));
        GetAllUsers();
      }, 3000);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    GetAllUsers();
  }, []);

  function setChat(id) {
    setCurrentChat(id)
  }

  return (
    <AuthContext.Provider
      value={{
        Token,
        setToken,
        Users,
        GetAllUsers,
        CurrChat,
        setChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
