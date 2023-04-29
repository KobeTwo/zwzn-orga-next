import { withAuth } from "next-auth/middleware"
import { getSession } from 'next-auth/client';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        console.log(token?.user)
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      if(token){
        token.isAdmin = true
      }
      console.log(token)
      return !!token
    },
  },
})

export const config = { matcher: ["/admin", "/players", "/events"] }