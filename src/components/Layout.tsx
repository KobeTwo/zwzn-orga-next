import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import { AppShell } from '@mantine/core';

interface LayoutProps {
    title?: string;
    children: ReactNode;
}



const Layout = ({ title = 'Next.js App', children }: LayoutProps) => {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <AppShell
            padding="md"
            fixed={false}
            navbar={
                <NavBar/>
            }>
            <main>{children}</main>
        </AppShell>
      </>
    );
};

export default Layout;  