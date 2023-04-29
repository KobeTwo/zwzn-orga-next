import { EventResponseProps } from '@/types';
import { SegmentedControl, Center } from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconQuestionMark,
  IconCircleLetterX, 
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrentPlayerContext } from '../provider/CurrentPlayerProvider';
import { useSession } from "next-auth/react"


interface EventControlResponseProps {
    eventId: string;
    responses: EventResponseProps[]; 
    showNotNominated: boolean;
  }

interface ResponseState {
    id: string;
    response:string;
    playerId: string
}



export function EventResponseControl(props: EventControlResponseProps) {

  const [selectedResponse, setSelectedResponse] = useState<ResponseState | null>(null);
  const { currentPlayer } = useContext(CurrentPlayerContext);
  const { data: session, status } = useSession()

  useEffect(() => {
    if(props.responses){
        const initialResponse = props.responses.find(response => response.playerId === currentPlayer?.id);
        if(initialResponse ){
            console.log('HANDLE USE EFFECT:' +JSON.stringify(initialResponse))
            setSelectedResponse(
                {
                    id: initialResponse.id, 
                    response: initialResponse.response,
                    playerId: initialResponse.playerId
                })
        }
    }
  }, [currentPlayer, props.eventId, props.responses]);

  const updateEventResponseDB = async (id: string | undefined, response: string, eventId: string, playerId: string): Promise<string | undefined> => {
    try {
      console.log('UpdateEventResponseDB ID: ' + id)
      const url = id ? process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/event-responses/' + id : process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/event-responses' 
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "data": {
                "response": response,
                "player": playerId,
                "event": eventId
            }
        }),
      });
  
      const data = await res.json();
      
      console.log(data); // log the updated entry data
      console.log('data.id:'+ data.data.id); // log the updated entry data
      return data.data.id;
    } catch (error) {
      console.error(error);
      return undefined
    }
  };

  const handleSegmentChange = async (value:string) => {

    if (selectedResponse && value !== selectedResponse.response) {
        console.log(`Selected value: ${value} for event ID: ${props.eventId}`);
        await updateEventResponseDB(selectedResponse.id, value, props.eventId, selectedResponse.playerId);
        setSelectedResponse({
            id: selectedResponse.id,
            response: value,
            playerId: selectedResponse.playerId
        });
    }else{
        if(currentPlayer){
            let eventResponseId = await updateEventResponseDB(undefined, value, props.eventId, currentPlayer.id);
            console.log('EventResponseID: ' + eventResponseId);
            if(eventResponseId ){
                setSelectedResponse({
                    id: eventResponseId,
                    response: value,
                    playerId: currentPlayer.id
                });
            }
        }
    }
    
  };

  const getColor = () => {
    switch(selectedResponse?.response) {
      case 'yes':
        return (
          'green'
        );
      case 'no':
        return (
          'red'
        );
      default:
        return (
          'gray'
        );
    }
  };
  const getSegmentControlData = () => {
    const data = [];
    data.push({
      label:(
        <Center>
          <IconThumbUp size="1.5rem" />
          {props.responses.filter(response => response.response === 'yes').length} 
        </Center>
      ), 
      value: 'yes' }
    );
    data.push({
      label:(
        <Center>
          <IconQuestionMark size="1.5rem" />
          {props.responses.filter(response => response.response === 'maybe').length}
        </Center>
      ), 
      value: 'maybe' }
    );
    data.push({
      label:(
        <Center>
          <IconThumbDown size="1.5rem" />
          {props.responses.filter(response => response.response === 'no').length}
        </Center>
      ), 
      value: 'no' }
    );
    if(props.showNotNominated){
      data.push({
        label:(
          <Center>
            <IconCircleLetterX size="1.5rem" />
            {props.responses.filter(response => response.response === 'notnominated').length}
          </Center>
          ), 
        value: 'notnominated' }
      );
    }
    return data;
  };

  return (
    <div>
      <SegmentedControl fullWidth size='lg' transitionDuration={0}
        data={getSegmentControlData()}
        value={selectedResponse?.response ?? ''}
        color={getColor()}
        onChange={handleSegmentChange}
      />
    </div>
    
  );
}