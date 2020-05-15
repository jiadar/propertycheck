import React from 'react';
import { Td } from '../HoverTable';
import { Link } from '../Link';

const InspectionRowItem = (props) => {
  const { _id, dateAdded, dateCompleted, type, address, status } = props;
  const link = `/inspection/${_id}`
  const completed = status === "Complete" ? dateCompleted : "-";
  return (
    <React.Fragment>
      <Td><Link to={link}>{address}</Link></Td>
      <Td><Link to={link}>{type}</Link></Td>      
      <Td><Link to={link}>{status}</Link></Td>
      <Td><Link to={link}>{dateAdded}</Link></Td>
      <Td><Link to={link}>{completed}</Link></Td>
    </React.Fragment>
  )
};

export default InspectionRowItem;
