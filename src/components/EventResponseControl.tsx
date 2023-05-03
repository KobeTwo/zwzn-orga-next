import { EventProps, EventResponseProps, PlayerProps } from '@/types';
import { SegmentedControl, Center } from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconQuestionMark,
  IconCircleLetterX, 
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';


interface EventControlResponseProps {
    event: EventProps;
    player: PlayerProps;
    showNotNominated?: boolean;
    showTotals?: boolean;
    fullWidth?: boolean;
    size?: string;
  }

interface ResponseState {
    id: string;
    response:string;
    playerId: string
}



export function EventResponseControl(props: EventControlResponseProps) {

  const [selectedResponse, setSelectedResponse] = useState<ResponseState | null>(null);

  useEffect(() => {
    if(props.event.responses){
        const initialResponse = props.event.responses.find(response => response.playerId === props.player.id);
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
  }, [props.player, props.event.id, props.event.responses]);

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
        console.log(`Selected value: ${value} for event ID: ${props.event.id}`);
        await updateEventResponseDB(selectedResponse.id, value, props.event.id, selectedResponse.playerId);
        setSelectedResponse({
            id: selectedResponse.id,
            response: value,
            playerId: selectedResponse.playerId
        });
    }else{
          let eventResponseId = await updateEventResponseDB(undefined, value, props.event.id, props.player.id);
          console.log('EventResponseID: ' + eventResponseId);
          if(eventResponseId ){
              setSelectedResponse({
                  id: eventResponseId,
                  response: value,
                  playerId: props.player.id
              });
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
          {props.showTotals ? props.event.responses.filter(response => response.response === 'yes').length : null} 
        </Center>
      ), 
      value: 'yes' }
    );
    data.push({
      label:(
        <Center>
          <IconQuestionMark size="1.5rem" />
          {props.showTotals ? props.event.responses.filter(response => response.response === 'maybe').length : null}
        </Center>
      ), 
      value: 'maybe' }
    );
    data.push({
      label:(
        <Center>
          <IconThumbDown size="1.5rem" />
          {props.showTotals ? props.event.responses.filter(response => response.response === 'no').length : null}
        </Center>
      ), 
      value: 'no' }
    );
    if(props.showNotNominated){
      data.push({
        label:(
          <Center>
            <IconCircleLetterX size="1.5rem" />
            {props.showTotals ? props.event.responses.filter(response => response.response === 'notnominated').length : null} 
          </Center>
          ), 
        value: 'notnominated' }
      );
    }
    return data;
  };

  return (
    <div>
      <SegmentedControl fullWidth={props.fullWidth !== undefined ? props.fullWidth : true} size={props.size ? props.size : 'lg'} transitionDuration={0}
        data={getSegmentControlData()}
        value={selectedResponse?.response ?? ''}
        color={getColor()}
        onChange={handleSegmentChange}
      />
    </div>
    
  );
}