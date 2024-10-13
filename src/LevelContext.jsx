import { createContext, useState } from 'react';

export const LevelContext = createContext("");

export const LevelContextProvider = ({ children }) => {
    const [username, setUsername] = useState("");
  
    return (
      <LevelContext.Provider value={{ username, setUsername }}>
        {children}
      </LevelContext.Provider>
    );
  };