import {Grid, Button} from '@mantine/core';
import { EventProps } from '../types';
import EventCard from './EventCard'



interface EventListProps {
    data: EventProps[];
}

export function EventList({ data }: EventListProps) {
    return (
      <Grid>
        <Grid.Col md={6} lg={3} sm={12}>
          <Button variant="outline" fullWidth compact>Ältere Termine laden</Button>
        </Grid.Col>
        <Grid.Col md={6} lg={9} sm={0}>
          
        </Grid.Col>
        {data.map(event => (
          <Grid.Col key={event.id} md={6} lg={3} sm={12}>
            <EventCard key={event.id} {...event} />
          </Grid.Col>
        ))}
      </Grid>
      
    );
}