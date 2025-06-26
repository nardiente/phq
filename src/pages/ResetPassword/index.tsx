import { useEffect } from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { ResetPasswordForm } from './reset-password-form';
import './styles.css';
import { getKaslKey } from '../../utils/localStorage';
import { login_image_mobile } from '../../utils/constants';
import {
  login_image_web,
  min_web_width,
  mobile_image_height,
  mobile_image_width,
} from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';
import { useUser } from '../../contexts/UserContext';
import { isSuperDuperAdmin } from '../../utils/user';

export const ResetPasswordPage: FC = () => {
  const { is_public } = useApp();
  const { user: userContext } = useUser();
  const { user } = userContext ?? {};

  const [image_height, setImageHeight] = useState<number>(0);
  const [is_mobile, setIsMobile] = useState<boolean>(false);
  const [left_image, setLeftImage] = useState<string>(login_image_web);
  const [screen_width, setScreenWidth] = useState<number>(0);

  const isMobile = () => {
    const screen_width = window.screen.width;
    setIsMobile(screen_width < min_web_width);
    setImageHeight(
      (window.screen.width > mobile_image_width
        ? window.screen.width - mobile_image_width
        : 0) + mobile_image_height
    );
    setScreenWidth(window.screen.width);
  };

  useEffect(() => {
    if (getKaslKey() && user) {
      // has logged in user
      window.location.href = !is_public
        ? isSuperDuperAdmin(user)
          ? '/super-duper-admin'
          : '/dashboard'
        : '/';
    } else {
      // no logged in user
      const containers = document.getElementsByClassName(
        'container'
      ) as HTMLCollectionOf<HTMLDivElement>;
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        container.style.maxWidth = 'none';
      }
      isMobile();

      const footers = document.getElementsByClassName(
        'footer'
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < footers.length; i++) {
        const footer = footers[i];
        footer.style.display = 'none';
      }
    }

    function onResize(event: any) {
      setIsMobile(event.target.innerWidth < min_web_width);
      setImageHeight(
        (event.target.innerWidth > mobile_image_width
          ? event.target.innerWidth - mobile_image_width
          : 0) + mobile_image_height
      );
      setScreenWidth(event.target.innerWidth);
    }

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [user]);

  useEffect(() => {
    if (is_mobile) {
      setLeftImage(login_image_mobile);
    } else {
      setLeftImage(login_image_web);
    }
  }, [is_mobile]);

  useEffect(() => {
    const left_image_div = document.querySelector(
      '[class="left-image"]'
    ) as HTMLDivElement;
    if (left_image_div) {
      left_image_div.style.backgroundImage = `url("${left_image}")`;
    }
  }, [left_image]);

  useEffect(() => {
    const bodies = document.getElementsByClassName(
      'background-color'
    ) as HTMLCollectionOf<HTMLBodyElement>;
    if (screen_width < min_web_width) {
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        body.style.overflow = 'auto';
      }
    } else {
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        body.style.overflow = 'clip';
      }
    }
  }, [screen_width]);

  return getKaslKey() ? undefined : (
    <section className="hero" id="ResetPasswordPage">
      <div className="hero is-fullheight">
        <div className={`hero-body${is_mobile ? ' mobile' : ''}`}>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div
                  className="left-image"
                  style={{
                    backgroundImage: `url("${left_image}")`,
                    height: `${is_mobile ? `${image_height}px` : '100vh'}`,
                  }}
                >
                  <img
                    className={`logo${is_mobile ? ' mobile' : ''}`}
                    src="./static/assets/login_logo.svg"
                  />
                </div>
              </div>
              <div className="column right-column">
                <div className={`${!is_mobile ? 'padding-top-web' : ''}`}>
                  <ResetPasswordForm is_mobile={is_mobile} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
