import Layout from '../components/Layout';
import LoginButton from '@/components/LoginButton';
import { PlayerList } from '@/components/PlayerList';
import { GetServerSideProps, NextPage } from 'next';

interface PlayersProps {
    playerData: { avatar: string; name: string; id: string }[];
}

interface Player {
  attributes: {
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    name: string;
  };
  id: string;
}


const PlayersPage: NextPage<PlayersProps> = ({ playerData }) => {
    return (
        <>
          <Layout title="Players">
          <LoginButton></LoginButton>
          <PlayerList data={playerData}></PlayerList>
        </Layout>
        </>
      )
  };

export const getServerSideProps: GetServerSideProps<PlayersProps> = async (context) => {
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/players?populate=*');
    const resJSON = await res.json();
    const players = resJSON.data.map((item: Player) => {
        return {
            avatar: item.attributes.image.data ? process.env.NEXT_PUBLIC_STRAPI_HOST + item.attributes.image.data.attributes.url : "",
            name: item.attributes.name,
            id: item.id,
        }
      })
    const _props: PlayersProps = {
        playerData: players,
      }
      return { props: _props }
};

export default PlayersPage;