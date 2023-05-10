import React, { createContext } from 'react'
import { useState } from 'react';
import { useContext } from 'react';

const LoginContext = createContext({login: "", setLogin: () => {}});


export default function LoginProvider({children}) {
  const [ login, setLogin ] = useState("");

  return (
    <LoginContext.Provider value={{login, setLogin}}>
        {children}
    </LoginContext.Provider>
  )
}

export const useLogin = ()=>{
    return useContext(LoginContext);
}