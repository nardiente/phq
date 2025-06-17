import { getApi, postApi } from '../../../utils/api/api';
import { ChevronRightIcon } from '../../../components/icons/chevron-right.icon';
import { GithubIcon } from '../../../components/icons/github.icon';
import * as React from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useApp } from '../../../contexts/AppContext';

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

const GithubLogin = ({
  loading,
  handleSocialLogin,
}: {
  loading: boolean;
  handleSocialLogin: (email: string, domain?: string) => Promise<void>;
}) => {
  const { is_public } = useApp();
  const { githubCode, setFirstName, setLastName, setLoadingSocial } = useUser();

  React.useEffect(() => {
    if (githubCode.length > 0) {
      processGithubLogin(githubCode);
    }
  }, [githubCode]);

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&state=${window.location.host}`
    );
  };

  const processGithubLogin = async (githubCode: string) => {
    setLoadingSocial(true);
    getApi<{ access_token: string }>({
      url: 'auth/github-access-token',
      params: {
        code: githubCode,
      },
    }).then((res) => {
      setLoadingSocial(false);
      if (res.results.data && res.results.data.access_token) {
        setLoadingSocial(true);
        postApi({
          url: 'auth/github-user-data',
          payload: {
            access_token: res.results.data.access_token,
          },
        }).then((res) => {
          setLoadingSocial(false);
          if (res.results.data) {
            const data = res.results.data as { email: string; name?: string };
            setFirstName(data.name || '');
            handleSocialLogin(
              data.email,
              is_public ? window.location.host : undefined
            );
          }
        });
      }
    });
  };

  return (
    <div
      className={`login-container${
        !loading ? ' is-clickable ' : ' is-disabled'
      }`}
      onClick={() => {
        if (!loading) {
          setFirstName('');
          setLastName('');
          loginWithGithub();
        }
      }}
    >
      <div className="login-content github">
        <div className="icon-social">
          <GithubIcon />
        </div>
        <div className="label-social">
          <span>Log in with Github</span>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default GithubLogin;
