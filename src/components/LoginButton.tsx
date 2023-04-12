import React, { PropsWithChildren } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { ActionIcon, Button } from '@mantine/core';
import {
  IconLogin,
  IconLogout,
} from '@tabler/icons-react';
import { Image } from '@mantine/core';

interface LoginButtonProps {
  // Define your props here
}

const LoginButton: React.FC<PropsWithChildren<LoginButtonProps>> = ({ children }) => {
    const { data: session } = useSession()
    
    if (session) {
        console.log("session: "+ JSON.stringify(session))
      return (
        <>
          <ActionIcon onClick={() => signOut()}>
            <IconLogout />
          </ActionIcon>
        </>
      )
    }
    return (
      <>
        <Button leftIcon={<IconLogin/>} onClick={() => signIn()}>
          Login
        </Button>
      </>
    )
};

export default LoginButton;