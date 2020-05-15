import React from 'react';
import { Td } from '../HoverTable';
import { Link } from '../Link';

const PropertyRowItem = (props) => {
  const { _id, address, city, state, zip, num_inspections } = props;
  const link = `/property/${_id}/inspections`
  return (
    <React.Fragment>
      <Td><Link to={link}>{address}</Link></Td>
      <Td><Link to={link}>{city}</Link></Td>
      <Td><Link to={link}>{state}</Link></Td>
      <Td><Link to={link}>{zip}</Link></Td>
      <Td><Link to={link}>{num_inspections}</Link></Td>
    </React.Fragment>
  )
};

export default PropertyRowItem;
