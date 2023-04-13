import Layout from '../components/Layout';
import LoginButton from '@/components/LoginButton';
import { EventList } from '@/components/EventList';
import { GetServerSideProps, NextPage } from 'next';
import { EventProps } from '../types';

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
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_HOST + '/api/events?populate[event_responses][populate][0]=player');
    const resJSON = await res.json();
    const events = resJSON.data.map((event) => {
    let responses = [];
      if(event.attributes.event_responses && event.attributes.event_responses.data){
        responses = event.attributes.event_responses.data.map((response) => {
          return {
            id: response.id,
            response: response.attributes.response,
            playerId: response.attributes.player.data.id,
            playerName: response.attributes.player.data.attributes.name,
          }
        });
      }
        return {
            startDate: event.attributes.startDate,
            startTime: event.attributes.startTime,
            type: event.attributes.type,
            id: event.id,
            responses: responses,
            opponent: event.attributes.opponent,
            title: event.attributes.title,
        }
      })
    const _props: EventsProps = {
        eventData: events,
      }
      return { props: _props }
};

export default EventsPage;