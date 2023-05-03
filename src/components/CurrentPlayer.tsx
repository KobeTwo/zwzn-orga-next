import { Avatar } from '@mantine/core';
import { useContext } from 'react';
import { CurrentPlayerContext } from '../provider/CurrentPlayerProvider';

function CurrentPlayer() {
  const { currentPlayer, setCurrentPlayer } = useContext(CurrentPlayerContext);
  if(currentPlayer){
    return ( 
      <>
        <Avatar alt={currentPlayer?.name} size="md" src={currentPlayer?.avatar ? process.env.NEXT_PUBLIC_STRAPI_HOST + currentPlayer?.avatar : null} radius="md" >
                {currentPlayer?.name.charAt(0).toUpperCase()} 
        </Avatar>
        {currentPlayer?.name} 
      </>
    )
  }else{
    return null
  }
  
}

export default CurrentPlayer