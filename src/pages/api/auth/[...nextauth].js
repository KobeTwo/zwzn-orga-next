import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    authorization: { params: { scope: 'identify email guilds' } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        const accessToken  = account.access_token;
        const response = await fetch('https://discordapp.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const guilds = await response.json();
        const guildIDToFind = process.env.DISCORD_GUILD_ID;
        const foundGuildWithID = guilds.find(guild => guild.id === guildIDToFind);

        if (foundGuildWithID) {
            return true;
        }

        return false;
    },
},
}
export default NextAuth(authOptions)