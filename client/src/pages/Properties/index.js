import React from 'react';
import PropertyRowItem from '../../components/PropertyRowItem';
import { HoverTable, Th, Tr } from '../../components/HoverTable';

const Properties = ({ properties }) => {

  return (
    <div className="pa4">
      <h1 className="f3 lh-copy tc">Properties</h1>
      <div className="overflow-auto">
        <HoverTable cellSpacing="0">
          <thead>
            <tr>
              <Th>Property Address</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Zip</Th>
              <Th>Inspections</Th>              
            </tr>
          </thead>
          <tbody className="lh-copy">
            {
              properties.map((property) => (
                <Tr key={property._id}>
                  <PropertyRowItem
                      {...property}
                      num_inspections={property.inspections.length}
                    />
                </Tr>
              ))
            }
          </tbody>
        </HoverTable>
      </div>
    </div>
  );
}
      
export default Properties;
