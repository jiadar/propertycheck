import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../../components/Loading';
import { properties as propertiesQuery } from '../../queries/Properties.gql';
import Properties from '../Properties';

function Dashboard() {
  const { loading, error, data } = useQuery(propertiesQuery);
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return <Properties properties={data.properties} />
}

export default Dashboard;
