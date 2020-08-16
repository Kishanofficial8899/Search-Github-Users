import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Bar3D, Doughnut2D, Pie3D, Column3D } from './Charts';

interface ReposProps {}

const Repos: React.FC<ReposProps> = ({}) => {
  const { githubUserRepos: repos } = useContext<any>(GithubContext);

  //For the PieCharts/Dougnunt Logic
  let languages = repos.reduce((total: any, item: any) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a: any, b: any) => {
      return b.value - a.value;
    })

    .slice(0, 5);
  //Most Start Per languages

  const mostStar = Object.values(languages)
    .sort((a: any, b: any) => {
      return b.stars - a.stars;
    })
    .map((item: any) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  let { stars, forks } = repos.reduce(
    (total: any, item: any) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStar} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
