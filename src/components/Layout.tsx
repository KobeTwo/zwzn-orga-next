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
            header={<AppHeader></AppHeader>}
            >
            <main>{children}
            </main>
        </AppShell>
      </>
    );
};

export default Layout;  