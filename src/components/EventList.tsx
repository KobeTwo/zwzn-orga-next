import { createStyles, Table, ScrollArea, Group, Text} from '@mantine/core';
import { EventResponseControl } from './EventResponseControl';
import { EventProps } from '../types';


interface EventListProps {
    data: EventProps[];
}

export function EventList({ data }: EventListProps) {
    const rows = data.map((item) => {
      const startDate = new Date(item.startDate);
      const formattedStartDate = startDate.toLocaleString("de-DE", { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return (
        <tr key={item.id}>
          <td>
              <Text size="sm" weight={500}>
                {item.type}
              </Text>
          </td>
          <td>
            <Group spacing="sm">
              <Text size="sm" weight={500}>
                {formattedStartDate}
              </Text>
            </Group>
          </td>
          <td>
            <Group spacing="sm">
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