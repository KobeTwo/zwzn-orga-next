import {Group, Text, Center, Grid} from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import { EventProps } from '../types';
import { useState, useEffect } from 'react';
import EventCard from './EventCard'

import {IconBallFootball, IconTournament, IconRun, IconHome, IconUsers, IconPlayerPlay} from '@tabler/icons-react';


interface EventListProps {
    data: EventProps[];
}

export function EventList({ data }: EventListProps) {
  const [rowHTML, setRowHTML] = useState<JSX.Element | undefined>();
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