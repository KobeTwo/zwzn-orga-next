import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    rowSelected: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
          : theme.colors[theme.primaryColor][0],
    },
}));

interface EventListProps {
    data: { startDate: string; type: string; id: string }[];
}

export function EventList({ data }: EventListProps) {
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState(['1']);
    const toggleRow = (id: string) =>
      setSelection((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      );
    const toggleAll = () =>
      setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));
  
    const rows = data.map((item) => {
      const selected = selection.includes(item.id);
      const startDate = new Date(item.startDate);
      const formattedStartDate = startDate.toLocaleString("de-DE", { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return (
        <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
          <td>
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
              transitionDuration={0}
            />
          </td>
          <td>
            <Group spacing="sm">
              <Text size="sm" weight={500}>
                {item.type}
              </Text>
              <Text size="sm" weight={500}>
                {formattedStartDate}
              </Text>
            </Group>
          </td>
        </tr>
      );
    });
  
    return (
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={selection.length > 0 && selection.length !== data.length}
                  transitionDuration={0}
                />
              </th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
}