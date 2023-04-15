import { Table, ScrollArea, Group, Text, Center} from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import { EventProps } from '../types';

import {IconBallFootball, IconTournament, IconRun, IconHome, IconUsers, IconPlayerPlay} from '@tabler/icons-react';


interface EventListProps {
    data: EventProps[];
}

export function EventList({ data }: EventListProps) {
    const rows = data.map((item) => {
      const startDate = item.startDate ? new Date(item.startDate) : null;
      const formattedStartDate = startDate?.toLocaleString("de-DE", { 
        weekday: 'short',
        month: 'long', 
        day: 'numeric' 
      });
      const startTime = item.startDate && item.startTime ? new Date(item.startDate + 'T' + item.startTime + 'Z'): null;
      const formattedStartTime = startTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      const meetTime = item.startDate && item.startTime ? new Date(item.startDate + 'T' + item.meetTime + 'Z'): null;
      const formattedMeetTime = startTime?.toLocaleString("de-DE", { 
        hour: '2-digit',
        minute: '2-digit', 
      });
      return (
        <tr key={item.id}>
          <td>
            <Text size="sm">
              {(() => {
                switch (item.type) {
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
          </td>
          <td>
            <Text size="sm" >
            {(() => {
              switch (true) {
                case (!!item.title):
                  return item.title;
                case (!!item.opponent):
                  return item.opponent;
                default:
                  return "Event";
                }
              })()}
            </Text>
          </td>
          <td>
            <Text size="sm" >
              {formattedStartDate}
            </Text>
          </td>
          <td>
          <Center>
            <Text size="lg">
              {formattedStartTime ? (
                <>
                  <IconPlayerPlay size={20}/> {formattedStartTime}
                </>
              ) : ''}
              {formattedMeetTime ? (
                <>
                  <IconUsers/> {formattedMeetTime}
                </>
              ) : ''}
            </Text>
            </Center>
          </td>
          <td>
            <Group spacing="sm" position='right'>
              <EventResponseControl 
                eventId={item.id} 
                responses={item.responses}
              />
            </Group>
          </td>
        </tr>
      );
    });
  
    return (
      <ScrollArea>
        <Table verticalSpacing="sm">
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
}