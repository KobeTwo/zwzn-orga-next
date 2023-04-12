import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, Avatar } from '@mantine/core';
import {
  IconHome,
  IconCalendarEvent,
  IconUsers,
  IconSettings,
  IconReportAnalytics,
  IconLogout,
} from '@tabler/icons-react';

import { useState } from 'react';
import Logo from './Logo';
import Link from 'next/link'
import { useContext } from 'react';
import { CurrentPlayerContext } from '../provider/CurrentPlayerProvider';

const useStyles = createStyles((theme) => ({
    link: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },
  
    active: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  }));

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    href: string;
    active?: boolean;
    onClick?(): void;
}
  
function NavbarLink({ icon: Icon, label, href, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
  
    return (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <Link href={href}>
          <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
            <Icon size="1.2rem" stroke={1.5} />
          </UnstyledButton>
        </Link>
      </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome, label: 'Home', href: '/' },
    { icon: IconCalendarEvent, label: 'Events', href: '/events' },
    { icon: IconUsers, label: 'Team', href: '/players' },
    { icon: IconReportAnalytics, label: 'Analytics', href: '/stats' },
    { icon: IconSettings, label: 'Settings', href: '/settings' },
];

interface NavBarProps {
}

const NavBar = ({}: NavBarProps) => {
    const [active, setActive] = useState(2);
    const { currentPlayer, setCurrentPlayer } = useContext(CurrentPlayerContext);
    const [opened, setOpened] = useState(false);

    const links = mockdata.map((link, index) => (
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    ));
    return (
      <>
        <Navbar width={{ base: 80 }} p="md" hiddenBreakpoint="sm" hidden={!opened}>
          <Center>
            <Logo/>
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              CP: {currentPlayer?.id}
              <Avatar alt={currentPlayer?.playerName} size="md" src={currentPlayer?.imageURL ? process.env.NEXT_PUBLIC_STRAPI_HOST + currentPlayer?.imageURL : null} radius="md" >
                {currentPlayer?.playerName.charAt(0).toUpperCase()} 
              </Avatar>
              <NavbarLink icon={IconLogout} label="Logout" href='/'/>
            </Stack>
          </Navbar.Section>
        </Navbar>
      </>
    );
};

export default NavBar;  