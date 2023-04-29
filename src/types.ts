export interface EventProps {
    startDateTime: string; 
    meetDateTime: string;
    endDateTime: string;
    type: string; 
    id: string; 
    responses: EventResponseProps[]; 
    opponent: string;
    title: string;
}

export interface EventResponseProps {
    id: string;
    response: string;
    playerName: string;
    playerId: string;
}