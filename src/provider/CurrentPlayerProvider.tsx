import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from "next-auth/react"

interface PlayerData {
  // Your additional player data here
}

interface CurrentPlayerContextType {
  currentPlayer: PlayerData | null;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerData | null>>;
}

interface CurrentPlayerProviderProps {
  children: ReactNode;
}

export const CurrentPlayerContext = createContext<CurrentPlayerContextType>({
  currentPlayer: null,
  setCurrentPlayer: () => {},
});

export const CurrentPlayerProvider = ({ children }: CurrentPlayerProviderProps) => {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerData | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem('currentPlayer');
      if (sessionData) {
        setCurrentPlayer(JSON.parse(sessionData));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    }
  }, [currentPlayer]);

  const contextValue: CurrentPlayerContextType = {
    currentPlayer,
    setCurrentPlayer,
  };

  return <CurrentPlayerContext.Provider value={contextValue}>{children}</CurrentPlayerContext.Provider>;
};
