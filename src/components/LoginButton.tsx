import React, { PropsWithChildren } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

interface LoginButtonProps {
  // Define your props here
}

const LoginButton: React.FC<PropsWithChildren<LoginButtonProps>> = ({ children }) => {
    const { data: session } = useSession()
    
    if (session) {
        console.log("session: "+ JSON.stringify(session))
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
};

export default LoginButton;