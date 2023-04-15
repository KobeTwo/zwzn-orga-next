import { EventProps } from '@/types';
import { Card, Text, Badge, Button, Group, Image, CardSection } from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import {IconBallFootball, IconTournament, IconRun, IconHome} from '@tabler/icons-react';
import { useState, useEffect } from 'react';


function EventCard(event: EventProps) {

  const [hrStartDate, setHRStartDate] = useState<string | undefined>();
  const [hrStartTime, setHRStartTime] = useState<string | undefined>();
  const [hrMeetTime, setHRMeetTime] = useState<string | undefined>();
  useEffect(() => {
      const startDate = event.startDate ? new Date(event.startDate) : null;
      const formattedStartDate = startDate?.toLocaleString("de-DE", { 
        weekday: 'short',
        month: 'long', 
        day: 'numeric' 
      });
      setHRStartDate(formattedStartDate);

      const startTime = event.startDate && event.startTime ? new Date(event.startDate + 'T' + event.startTime + 'Z'): null;
      const formattedStartTime = startTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHRStartTime(formattedStartTime);

      const meetTime = event.startDate && event.startTime ? new Date(event.startDate + 'T' + event.meetTime + 'Z'): null;
      const formattedMeetTime = startTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHRMeetTime(formattedMeetTime);
  }, [event]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

<Card.Section>
    <Group position="apart" mt="md" mb="xs">
      <Group spacing="sm" position='left'>
      <Text size="sm">
          {(() => {
            switch (event.type) {
              case 'game':
                return <IconBallFootball/>;
              case 'friendly':
                return <IconBallFootball/>;
              case 'tournament':
                return <IconTournament/>;
              case 'training':
                return <IconRun/>;
              case 'indoortraining':
                return <IconHome/>;
              default:
                return <IconRun/>;
            }
          })()}
        </Text>
        <Text size="sm" >
              {(() => {
                switch (true) {
                  case (!!event.title):
                    return event.title;
                  case (!!event.opponent):
                    return event.opponent;
                  default:
                    return "Event";
                  }
                })()}
          </Text>
        </Group>
        
        <Group spacing="sm" position='right'>
          <EventResponseControl 
            eventId={event.id} 
            responses={event.responses}
          />
        </Group>
      </Group>
      </Card.Section>
      <Card.Section>
        <Group position="apart" mt="md" mb="xs">
          {hrStartDate} {hrMeetTime} {hrMeetTime}
        </Group>
      </Card.Section>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  )
}

export default EventCard