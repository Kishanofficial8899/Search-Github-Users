import React, { useEffect, useState, createContext, ReactNode } from 'react';

import mockUser from './mockData/mockUser';
import mockFollowers from './mockData/mockFollowers';
import mockRepos from './mockData/mockRepos';
import axios from 'axios';

//Root URL
const rootUrl = 'https://api.github.com';

interface ContextProps {
  children: ReactNode;
}

interface AppContextInterface {
  githubUser: Object;
  githubUserRepos: Array<any>;
  githubUserFollowers: Array<any>;
  Request: number;
  Error: { show: boolean; message: string };
  githubSearchUser: any;
  Loading: boolean;
}

const GithubContext = React.createContext<AppContextInterface | null>(null);

const GithubProvider = ({ children }: ContextProps) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubUserRepos, setgithubUserRepos] = useState(mockRepos);
  const [githubUserFollowers, setgithubUserFollowers] = useState(mockFollowers);
  const [Request, setRequest] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState<any>({
    show: false,
    message: '',
  });

  const githubSearchUser = async (user: any) => {
    try {
      setLoading(true);
      toggleError();
      const res = await axios.get(`${rootUrl}/users/${user}`);
      const data = await res.data;
      if (data) {
        setGithubUser(data);
        const { login } = data;
        const [repos, followers] = await Promise.all([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`https://api.github.com/users/${login}/followers?per_page=100`),
        ]);
        const statusText = 'OK';
        if (repos.statusText === statusText) {
          setgithubUserRepos(repos.data);
        }
        if (followers.statusText === statusText) {
          setgithubUserFollowers(followers.data);
        }
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toggleError(true, 'There is no User with that Username');
      setLoading(false);
    }
  };

  //Check Rate Request
  const checkRequest: any = async () => {
    try {
      const res = await axios.get(`${rootUrl}/rate_limit`);
      const data = await res.data;
      let {
        rate: { remaining },
      } = data;
      setRequest(remaining);
      if (remaining === 0) {
        toggleError(true, 'Sorry,you have excceded Your hourly Rate Request');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleError = (show = false, message = '') => {
    setError({ show, message });
  };

  useEffect(() => {
    checkRequest();
  }, [checkRequest]);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubUserRepos,
        githubUserFollowers,
        Request,
        Error,
        githubSearchUser,
        Loading,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
