import { EventResponseProps } from '@/types';
import { SegmentedControl, Center } from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconQuestionMark,
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';


interface EventControlResponseProps {
    eventId: string;
    responses: EventResponseProps[]; 
  }

interface ResponseState {
    id: string;
    response:string;
    playerId: string
}



export function EventResponseControl(props: EventControlResponseProps) {

  const [selectedResponse, setSelectedResponse] = useState<ResponseState | null>(null);
  useEffect(() => {
    if(props.responses){
        const initialResponse = props.responses.find(response => response.playerName === 'kimi');
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
  }, [props.eventId, props.responses]);

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

  const handleSegmentChange = async (value) => {

    if (selectedResponse && value !== selectedResponse.response) {
        console.log(`Selected value: ${value} for event ID: ${props.eventId}`);
        await updateEventResponseDB(selectedResponse.id, value, props.eventId, selectedResponse.playerId);
        setSelectedResponse({
            id: selectedResponse.id,
            response: value,
            playerId: selectedResponse.playerId
        });
    }else{
        let eventResponseId = await updateEventResponseDB(undefined, value, props.eventId, "4");
        console.log('EventResponseID: ' + eventResponseId);
        if(eventResponseId ){
            setSelectedResponse({
                id: eventResponseId,
                response: value,
                playerId: '4'
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

  return (
    <SegmentedControl
                data={[
                  { label:(
                      <Center>
                        <IconThumbUp size="1rem" />
                      </Center>
                    ), 
                    value: 'yes' 
                  },
                  { label:(
                      <Center>
                        <IconQuestionMark size="1rem" />
                      </Center>
                    ), 
                    value: 'maybe' },
                  { label:(
                      <Center>
                        <IconThumbDown size="1rem" />
                      </Center>
                    ), 
                    value: 'no' },
                ]}
                
                value={selectedResponse?.response ? selectedResponse?.response : null}
                color={getColor()}
                onChange={handleSegmentChange}
              />
  );
}