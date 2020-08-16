import React, { useContext } from 'react';

import { Navbar, Search, Info, User, Repos } from '../components';
import { GithubContext } from '../context/context';
import loadingImage from '../images/preloader.gif';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { Loading } = useContext<any>(GithubContext);

  if (Loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loadingImage' />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
