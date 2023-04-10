export interface EventProps {
    startDate: string; 
    type: string; 
    id: string; 
    responses: EventResponseProps[]; 
}

export interface EventResponseProps {
    id: String;
    response: string;
    playerName: string;
    playerId: string;
}