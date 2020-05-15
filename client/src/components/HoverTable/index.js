import styled from 'styled-components';

export const HoverTable = styled.table.attrs(props => ({
className: 'f5 w-100 mw8 center',
}))`
`;

export const Th = styled.th.attrs(props => ({
  className: 'fw6 bb b--black-20 tl pb3 pr3 bg-white',
}))`
`;

export const Tr = styled.tr.attrs(props => ({
  className: 'tl',
}))`
  &:hover {
    background-color: #d1dbe8;
}
`;

export const Td = styled.td.attrs(props => ({
  className: "pv1 pr1 bb b--black-20",
}))`
`;

