import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from './Logo';
import LoginButton from './LoginButton';
import CurrentPlayer from './CurrentPlayer';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface AppHeaderProps {
}

function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();


  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Logo/>
        <Group>
          <CurrentPlayer/>
          <LoginButton/>
        </Group>

      </Container>
    </Header>
  );
}
export default AppHeader; 