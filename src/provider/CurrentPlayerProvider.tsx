import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface PlayerData {
  id: string,
  playerName: string,
  imageURL: string
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
  const { data: session } = useSession();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storageData : string | null = sessionStorage.getItem('currentPlayer');
            if(storageData){
                const parsedStorageData = JSON.parse(storageData);
                if (session){
                    console.log('before fetch');
                    fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/players?filters[managerEmails][$contains]=' + session.user?.email + '&populate=*')
                    .then((response) => response.json())
                    .then((data) => {
                    if (data.data.length > 0) {
                        console.log('data.data[0].id:' + data.data[0].id);
                        console.log('storageData.id:' +  parsedStorageData?.id);
                        console.log(data.data[0].id === parsedStorageData?.id);
                        console.log('storage data:' + parsedStorageData);
                        const player = data.data.find((p: any) => p.id === parsedStorageData?.id);
                        let playerData : PlayerData;
                        if(player){
                            console.log('found player:' + player);
                            playerData = {
                                id: player.id,
                                playerName: player.attributes.name,
                                imageURL: player?.attributes?.image?.data?.attributes?.url,
                            };
                        }else{
                            console.log('not found player:');
                            playerData = {
                                id: data.data[0].id,
                                playerName: data.data[0].attributes.name,
                                imageURL: data.data[0].attributes.image.data.attributes.url,
                            };
                        }
                        setCurrentPlayer(playerData);
                    }
                    })
                    .catch((error) => console.error(error));
                }
            }
        }
    }, [session]);

  useEffect(() => {
    if (typeof window !== 'undefined' && currentPlayer) {
        console.log('Setting session storage ' + currentPlayer);
        sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    }
  }, [currentPlayer]);

  const contextValue: CurrentPlayerContextType = {
    currentPlayer,
    setCurrentPlayer,
  };

  return <CurrentPlayerContext.Provider value={contextValue}>{children}</CurrentPlayerContext.Provider>;
};
