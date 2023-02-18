import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 1170px;
`;

export const Header = styled.header`
  display: flex;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #000000;
`;

export const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  display: inline-block;
  &.active {
    color: red;
  }
`;
