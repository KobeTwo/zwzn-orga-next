import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';
import {IconUsersGroup} from '@tabler/icons-react';
import { EventProps } from '@/types';

function AdminPlayerListDrawer(event: EventProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        {event?.responses?.map(response => (
          response.playerId
        ))}
      </Drawer>

      <Button size="lg" variant="filled" onClick={open}><IconUsersGroup size="1.5rem" /></Button>

    </>
  );
}

export default AdminPlayerListDrawer