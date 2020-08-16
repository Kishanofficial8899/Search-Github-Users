import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h2>Sorry,The Page you Tried is Not found</h2>
        <Link to='/' className='btn'>
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  background: var(--clr-primary-10);
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;

export default Error;
