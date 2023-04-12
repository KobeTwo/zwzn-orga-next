import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import AppHeader from './AppHeader';
import { AppShell, useMantineTheme, Header } from '@mantine/core';


interface LayoutProps {
    title?: string;
    children: ReactNode;
}



const Layout = ({ title = 'Next.js App', children }: LayoutProps) => {
    const theme = useMantineTheme();
    const links = [
        {
          "link": "/about",
          "label": "Features"
        },
        {
          "link": "/pricing",
          "label": "Pricing"
        },
        {
          "link": "/learn",
          "label": "Learn"
        },
        {
          "link": "/community",
          "label": "Community"
        }
      ]
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <AppShell
            styles={{
              main: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            }}
            padding="md"
            navbarOffsetBreakpoint="sm"
            header={<AppHeader links={links}></AppHeader>}
            >
            <main>{children}
            </main>
        </AppShell>
      </>
    );
};

export default Layout;  