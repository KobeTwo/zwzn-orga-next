import {Grid} from '@mantine/core';
import { EventProps } from '../types';
import EventCard from './EventCard'



interface EventListProps {
    data: EventProps[];
}

export function EventList({ data }: EventListProps) {
    return (
      <Grid>
        {data.map(event => (
          <Grid.Col key={event.id} md={6} lg={3} sm={12}>
            <EventCard key={event.id} {...event} />
          </Grid.Col>
        ))}
      </Grid>
      
    );
}