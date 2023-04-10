import Layout from '../components/Layout';
import LoginButton from '@/components/LoginButton';
import { EventList } from '@/components/EventList';
import { GetServerSideProps, NextPage } from 'next';

interface EventsProps {
    eventData: { startDate: string; type: string; id: string }[];
}

const EventsPage: NextPage<EventsProps> = ({ eventData }) => {
    return (
        <>
          <Layout title="Events">
          <LoginButton></LoginButton>
          <EventList data={eventData}></EventList>
        </Layout>
        </>
      )
  };

export const getServerSideProps: GetServerSideProps<EventsProps> = async (context) => {
    const res = await fetch(process.env.STRAPI_HOST + '/api/events?populate=*');
    const resJSON = await res.json();
    const events = resJSON.data.map((item) => {
        return {
            startDate: item.attributes.startDate,
            type: item.attributes.type,
            id: item.id,
        }
      })
    const _props: EventsProps = {
        eventData: events,
      }
      return { props: _props }
};

export default EventsPage;