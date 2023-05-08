import Layout from '../components/Layout';
import { EventList } from '@/components/EventList';
import { GetServerSideProps, NextPage } from 'next';
import { EventProps } from '../types';
import { mapEvents } from '@/mapper';

interface EventsProps {
    eventData: EventProps[];
} 

const EventsPage: NextPage<EventsProps> = ({ eventData }) => {
    return (
        <>
          <Layout title="Events"> 
          <EventList data={eventData}></EventList>
        </Layout>
        </>
      )
  };

export const getServerSideProps: GetServerSideProps<EventsProps> = async (context) => {
    const currentDate = new Date().toISOString();
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/events?populate[event_responses][populate][0]=player&sort[0]=startDateTime&filters[startDateTime][$gt]='+currentDate);
    const resJSON = await res.json();
    const events = mapEvents(resJSON.data)
    const _props: EventsProps = {
        eventData: events,
      }
      return { props: _props }
};

export default EventsPage;