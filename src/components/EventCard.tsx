import { EventProps } from '@/types';
import { Card, Text, Group, createStyles, rem, Grid, Center } from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import {IconBallFootball, IconTournament, IconRun, IconHome} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import AdminPlayerListDrawer from './AdminPlayerListDrawer';

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

  const { data: session, status } = useSession()

  const [hrWeekday, setHRWeekday] = useState<string | undefined>();
  const [hrStartDate, setHRStartDate] = useState<string | undefined>();
  const [hrStartTime, setHRStartTime] = useState<string | undefined>();
  const [hrMeetTime, setHRMeetTime] = useState<string | undefined>();
  const [hrEndTime, setHREndTime] = useState<string | undefined>();
  useEffect(() => {


      const startDateTime = event.startDateTime ? new Date(event.startDateTime): null;
      const formattedStartTime = startDateTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      const formattedWeekday = startDateTime?.toLocaleString("de-DE", { 
        weekday: 'short'
      });
      const formattedStartDate = startDateTime?.toLocaleString("de-DE", { 
        month: 'long', 
        day: 'numeric' 
      });
      setHRWeekday(formattedWeekday);
      setHRStartDate(formattedStartDate);
      setHRStartTime(formattedStartTime);

      const meetDateTime = event.meetDateTime ? new Date(event.meetDateTime): null;
      const formattedMeetTime = meetDateTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      setHRMeetTime(formattedMeetTime);

      const endDateTime = event.endDateTime ? new Date(event.endDateTime): null;
      const formattedEndTime = endDateTime?.toLocaleString("de-DE", { 
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

       
          <Grid justify="space-between">
            <Grid.Col span="auto">
              <EventResponseControl 
                    eventId={event.id} 
                    responses={event.responses}
                    showNotNominated={false}
                  />
            </Grid.Col>
              {session?.user.isAdmin ? 
                <Grid.Col span={4}>
                  <Group mr={4} position="right">
                    <AdminPlayerListDrawer {...event}/>
                  </Group>
                </Grid.Col>
              : null}
          </Grid>
        
      </Card.Section>
    </Card>
  )
}

export default EventCard