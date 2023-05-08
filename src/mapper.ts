// mapper.ts
import { EventProps } from './types';

interface Event {
    attributes: {
        startDateTime: string;
        meetDateTime: string;
        endDateTime: string
        type: string;
        opponent: string;
        title: string;
        event_responses?: {
        data: Array<{
            id: string;
            attributes: {
            response: string;
            player: {
                data: {
                id: string;
                attributes: {
                    name: string;
                };
                };
            };
            };
        }>;
        };
    };
    id: string;
}

interface Response {
    id: string;
    response: string;
    playerId: string;
    playerName: string;
}

export function mapEvents(data: Event[]): EventProps[] {
    return data.map((event:Event) => {
        let responses : Response[] = [];
        if(event.attributes.event_responses && event.attributes.event_responses.data){
            responses = event.attributes.event_responses.data.map((response) => {
                return {
                    id: response.id,
                    response: response.attributes.response,
                    playerId: response.attributes.player.data.id,
                    playerName: response.attributes.player.data.attributes.name,
                }
            });
        }
        return {
            startDateTime: event.attributes.startDateTime,
            meetDateTime: event.attributes.meetDateTime,
            endDateTime: event.attributes.endDateTime,
            type: event.attributes.type,
            id: event.id,
            responses: responses,
            opponent: event.attributes.opponent,
            title: event.attributes.title,
        }
    })
};