import styled from "styled-components";
import { Container } from "react-bootstrap";

export const ContainerB = styled(Container)`
  height: 5rem;
  border-bottom: 1px solid #29295e;
`;

export const Content = styled.header`
  height: 5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;


  nav {
    margin-left: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;

    a {
        display: inline-block;
        position: relative;
        padding: 0 0.5rem;
        height: 5rem;
        line-height: 5rem;
        color: gray

        transition: color 0.2s

        & + a {
            margin-left: 2rem;

        }

        &:hover {
            color: white;
        }

        &.active{
            border-bottom: 2px solid yellow
            font-weight: bold
        }
    }
  }

`;
