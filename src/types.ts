export interface EventProps {
    startDate: string; 
    startTime: string;
    meetTime: string;
    endTime: string;
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