import { Avatar } from '@mantine/core';
import { useContext } from 'react';
import { CurrentPlayerContext } from '../provider/CurrentPlayerProvider';

function CurrentPlayer() {
  const { currentPlayer, setCurrentPlayer } = useContext(CurrentPlayerContext);
  if(currentPlayer){
    return ( 
      <>
        <Avatar alt={currentPlayer?.playerName} size="md" src={currentPlayer?.imageURL ? process.env.NEXT_PUBLIC_STRAPI_HOST + currentPlayer?.imageURL : null} radius="md" >
                {currentPlayer?.playerName.charAt(0).toUpperCase()} 
        </Avatar>
        {currentPlayer?.playerName} 
      </>
    )
  }else{
    return null
  }
  
}

export default CurrentPlayer