import './styles.css';
import { getKaslKey } from '../../utils/localStorage';
import {
  min_web_width,
  mobile_image_height,
  mobile_image_width,
} from '../../utils/constants';
import { SignUpForm } from './sign-up-form';
import { UserTypes } from '../../types/user';
import { Testimonials } from '../../components/Testimonials';
import { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

export const SignUpPage = () => {
  const { is_public } = useApp();

  const [image_height, setImageHeight] = useState<number>(0);
  const [is_mobile, setIsMobile] = useState<boolean>(false);
  const [screen_width, setScreenWidth] = useState<number>(0);
  const [type, setType] = useState<UserTypes>(UserTypes.CUSTOMER);

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
    setType(is_public ? UserTypes.USER : UserTypes.CUSTOMER);

    if (getKaslKey() !== undefined) {
      // has logged in user
      window.location.href = !is_public ? '/upvotes' : '/';
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
  }, []);

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

  return getKaslKey() === undefined ? (
    <section id="SignUpPage">
      {/* <div className="hero is-fullheight">
        <div className={`hero-body${is_mobile ? ' mobile' : ''}`}>
          <div className="container">
            <div className="columns">
              <div className="column right-column">
                <div className={`${!is_mobile ? 'padding-top-web' : ''}`}>
                  <SignUpForm is_mobile={is_mobile} type={type} />
                </div>
              </div>
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
                    src="../../../static/assets/login_logo.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="left">
        <SignUpForm is_mobile={is_mobile} type={type} />
      </div>
      <div
        className="right"
        style={{
          height: `${is_mobile ? `${image_height}px` : ''}`,
        }}
      >
        <Testimonials />
      </div>
    </section>
  ) : (
    <></>
  );
};

export default SignUpPage;
