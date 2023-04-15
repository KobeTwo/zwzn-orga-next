import { EventProps } from '@/types';
import { Card, Text, Button, Group, createStyles, rem, Divider, Center } from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import {IconBallFootball, IconTournament, IconRun, IconHome} from '@tabler/icons-react';
import { useState, useEffect } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.sm,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

function EventCard(event: EventProps) {
  const { classes } = useStyles();

  const [hrWeekday, setHRWeekday] = useState<string | undefined>();
  const [hrStartDate, setHRStartDate] = useState<string | undefined>();
  const [hrStartTime, setHRStartTime] = useState<string | undefined>();
  const [hrMeetTime, setHRMeetTime] = useState<string | undefined>();
  const [hrEndTime, setHREndTime] = useState<string | undefined>();
  useEffect(() => {
      const startDate = event.startDate ? new Date(event.startDate) : null;
      const formattedWeekday = startDate?.toLocaleString("de-DE", { 
        weekday: 'short'
      });
      const formattedStartDate = startDate?.toLocaleString("de-DE", { 
        month: 'long', 
        day: 'numeric' 
      });
      setHRWeekday(formattedWeekday);
      setHRStartDate(formattedStartDate);

      const startTime = event.startDate && event.startTime ? new Date(event.startDate + 'T' + event.startTime + 'Z'): null;
      const formattedStartTime = startTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHRStartTime(formattedStartTime);

      const meetTime = event.startDate && event.meetTime ? new Date(event.startDate + 'T' + event.meetTime + 'Z'): null;
      const formattedMeetTime = meetTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHRMeetTime(formattedMeetTime);

      console.log('ENDTIME: ' + event.endTime)
      const endTime = event.startDate && event.endTime ? new Date(event.startDate + 'T' + event.endTime + 'Z'): null;
      const formattedEndTime = endTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHREndTime(formattedEndTime);
  }, [event]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
      <Card.Section className={classes.footer}>
        <Group spacing={30}>
        <div>
          <Text size="xl">
            {hrWeekday}
          </Text>
          <Text weight={500} size="sm">
            {hrStartDate}
          </Text>
        </div>
        <Group>
          <Group spacing={10}>
              {(() => {
                const size = '2rem'
                switch (event.type) {
                  case 'game':
                    return <IconBallFootball size={size}/>;
                  case 'friendly':
                    return <IconBallFootball size={size}/>;
                  case 'tournament':
                    return <IconTournament size={size}/>;
                  case 'training':
                    return <IconRun size={size}/>;
                  case 'indoortraining':
                    return <IconHome size={size}/>;
                  default:
                    return <IconRun size={size}/>;
                }
              })()}
            <Text size="xl" >
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
            
        </Group>
        </Group>
        
      </Card.Section>
      <Card.Section className={classes.section} >
        <Group grow position='apart' spacing={50}>
          
          {hrMeetTime && (
            <Center>
            <div>
              <Text weight={500} size="md">
                {hrMeetTime}
              </Text>
              <Text size="xs" color="dimmed">
                Treffen
              </Text>
            </div>
            </Center>
          )}
          
          {hrStartTime && (
            <Center>
            <div>
              <Text weight={500} size="md">
                {hrStartTime}
              </Text>
              <Text size="xs" color="dimmed">
                Start
              </Text>
            </div>
            </Center>
          )}

          {hrEndTime && (
            <Center>
            <div>
              <Text weight={500} size="md">
                {hrEndTime}
              </Text>
              <Text size="xs" color="dimmed">
                Ende
              </Text>
            </div>
            </Center>
          )}
        </Group>
      </Card.Section>
      <Card.Section>
      <EventResponseControl 
              eventId={event.id} 
              responses={event.responses}
            />
      </Card.Section>
    </Card>
  )
}

export default EventCard