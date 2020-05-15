import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import InspectionRowItem from '../../components/InspectionRowItem';
import Loading from '../../components/Loading';
import { propertyInspections as propertyInspectionsQuery } from '../../queries/Properties.gql';
import { HoverTable, Th, Tr } from '../../components/HoverTable';

function Inspections() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(propertyInspectionsQuery, { variables: { id }});
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div className="pa4">
      <h1 className="f3 lh-copy tc">Inspections for {data.property.address}</h1>
      <div className="overflow-auto">
        <HoverTable cellSpacing="0">
          <thead>
            <tr>
              <Th>Address</Th>
              <Th>Inspection Type</Th>
              <Th>Status</Th>
              <Th>Date Added</Th>
              <Th>Date Completed</Th>
            </tr>
          </thead>
          <tbody className="lh-copy">
            {
              data.property.inspections.map((inspection) => (
                <Tr key={inspection._id}>
                  <InspectionRowItem {...inspection} address={data.property.address}/>
                </Tr>
              ))
            }
          </tbody>
        </HoverTable>
      </div>
    </div>
  );
}

export default Inspections;

