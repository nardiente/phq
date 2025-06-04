import { useEffect } from 'react';
import queryString from 'query-string';
import { postApi } from '../../utils/api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { clearQueryString } from '../../utils/uri';

export const SSOVerifyingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { search } = location;
    if (search.length > 0) {
      const queries = queryString.parse(search);

      getUserInfo(queries);

      clearQueryString();
    }
  }, []);

  const getUserInfo = (queries: any) => {
    postApi({ url: 'auth/google/callback', payload: queries }).then((res) => {
      if (res.results.data) {
        const data = res.results.data as {
          email: string;
          family_name: string;
          given_name: string;
          state?: string;
        };
        if (data.state) {
          window.location.assign(
            `http://${data.state}/sign-in?sso=1&e=${data.email}&f=${data.given_name}&l=${data.family_name}`
          );
        } else {
          navigate(
            `/sign-in?sso=1&e=${data.email}&f=${data.given_name}&l=${data.family_name}`
          );
        }
      }
    });
  };

  return (
    <div id="verifying-container">
      <div id="verifying-div">Verifying…</div>
    </div>
  );
};
