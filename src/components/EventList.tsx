import {Grid, Button} from '@mantine/core';
import { EventProps } from '../types';
import EventCard from './EventCard';
import React, { useState } from 'react';
import { mapEvents } from '@/mapper';



interface EventListProps {
    data: EventProps[];
}



export function EventList({ data }: EventListProps) {
  const [events, setEvents] = useState(data);

  async function loadOlderEvents() {
    const date = events[0].startDateTime
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/events?populate[event_responses][populate][0]=player&sort[0]=startDateTime%3Adesc&filters[startDateTime][$lt]='+date);
    const resJSON = await res.json();
    const newEvents = mapEvents(resJSON.data)
    setEvents([...newEvents.reverse(), ...events])
  }

  async function loadNewerEvents() {
    const date = events[events.length - 1].startDateTime
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/events?populate[event_responses][populate][0]=player&sort[0]=startDateTime&filters[startDateTime][$gt]='+date);
    const resJSON = await res.json();
    const newEvents = mapEvents(resJSON.data)
    setEvents([...events, ...newEvents])
}
    return (
      <>
      <Grid>
        <Grid.Col md={12} lg={12} sm={12}>
          <Button onClick={loadOlderEvents} variant="outline" fullWidth compact>Ältere Termine laden</Button>
        </Grid.Col>
      </Grid>
      <Grid>
        {events.map(event => (
          <Grid.Col key={event.id} md={6} lg={3} sm={12}>
            <EventCard key={event.id} {...event} />
          </Grid.Col>
        ))}
      </Grid>
      <Grid>
        <Grid.Col md={12} lg={12} sm={12}>
          <Button onClick={loadNewerEvents} variant="outline" fullWidth compact>Neuere Termine laden</Button>
        </Grid.Col>
      </Grid>
      </>
      
    );
}