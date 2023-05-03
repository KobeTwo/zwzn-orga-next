import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Avatar, Stack, Group } from '@mantine/core';
import {IconUsersGroup} from '@tabler/icons-react';
import { EventProps, PlayerProps } from '@/types';
import React, { useState, useEffect } from 'react';
import { EventResponseControl } from './EventResponseControl';

interface Player {
  attributes: {
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    name: string;
  };
  id: string;
}


function AdminPlayerListModal(event: EventProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [allPlayers, setAllPlayers] = useState<PlayerProps[] | null>(null);
  const [hrStartDate, setHRStartDate] = useState<string | undefined>();

  useEffect(() => {
    const startDateTime = event.startDateTime ? new Date(event.startDateTime): null;
    const formattedStartDate = startDateTime?.toLocaleString("de-DE", { 
      month: 'long', 
      day: 'numeric' 
    });
    setHRStartDate(formattedStartDate);

    async function fetchData() {
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/players?populate=*');
    const resJSON = await res.json();
    const players = resJSON.data.map((item: Player) => {
        return {
            avatar: item.attributes.image.data ? item.attributes.image.data.attributes.url : "",
            name: item.attributes.name,
            id: item.id,
        }
      })
      setAllPlayers(players);
    }

    fetchData();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={event.title + ' ' + hrStartDate}
        size="md"
      >
        <Stack>
          {allPlayers?.map(player => (
            <Group key={player.id} position='apart'>
                <Group>
                  <Avatar alt={player.name} size="md" src={player.avatar ? process.env.NEXT_PUBLIC_STRAPI_HOST + player.avatar : null} radius="md" >
                      {player.name.charAt(0).toUpperCase()} 
                  </Avatar>
                  {player.name}
                </Group>
                <EventResponseControl event={event} adminMode={true} player={player} showTotals={false} fullWidth={false} size='xs'/>
              </Group>
          ))}
        </Stack>
      </Modal>
      

      <Button mt={3} size="md" variant="filled" onClick={open}><IconUsersGroup size="1.5rem" /></Button>

    </>
  );
}

export default AdminPlayerListModal