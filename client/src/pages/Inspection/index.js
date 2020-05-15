import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Loading from '../../components/Loading';
import { inspection as inspectionQuery } from '../../queries/Inspections.gql';


function Inspection() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(inspectionQuery, { variables: { id }});
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div><pre>{JSON.stringify(data.inspection, null, 2) }</pre></div>
  );
}

export default Inspection;
