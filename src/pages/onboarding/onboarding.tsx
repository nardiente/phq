import './styles.css';
import { useNavigate } from 'react-router-dom';
import { OnboardingPages, OnboardingUrls } from '../../types/onboarding';
import { useEffect } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { ProgressionBar } from '../../components/onboarding/components/progression-bar';
import AddIdeaOnboarding from '../../components/onboarding/add_idea_onboarding/AddIdeaOnboarding';
import { SurveyOnboarding } from '../../components/onboarding/survey_onboarding/SurveyOnboarding';
import WelcomeOnboarding from '../../components/onboarding/welcome_onboarding/WelcomeOnboarding';
import AddTopicsOnboarding from '../../components/onboarding/add_topics_onboarding/AddTopicsOnboarding';
import { Success } from '../../components/onboarding/success/Success';
import { Testimonials } from '../../components/Testimonials';
import { getOnboardingToken } from '../../utils/localStorage';
import { useApp } from '../../contexts/AppContext';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const { is_public } = useApp();
  const {
    state: { activePage },
    setActivePage,
    setToken,
  } = useOnboarding();

  useEffect(() => {
    if (
      is_public ||
      localStorage.getItem('onboarding_page') == null ||
      getOnboardingToken() === undefined
    ) {
      navigate('/dashboard');
      return;
    }
    if (window.location.pathname === '/ob-success') {
      localStorage.setItem('onboarding_page', OnboardingPages.SUCCESS);
      setActivePage(OnboardingPages.SUCCESS);
      return;
    }
    setActivePage(localStorage.getItem('onboarding_page') as OnboardingPages);
    setToken(getOnboardingToken() ?? '');
    navigate(
      OnboardingUrls[localStorage.getItem('onboarding_page') as OnboardingPages]
    );
  }, []);

  return (
    <>
      {activePage === OnboardingPages.SURVEY ? (
        <SurveyOnboarding />
      ) : (
        <div id="Onboarding" className="bg-white">
          <div className="left">
            <div className="left-container">
              {activePage !== OnboardingPages.SUCCESS && <ProgressionBar />}
              {activePage === OnboardingPages.WELCOME && <WelcomeOnboarding />}
              {activePage === OnboardingPages.ADD_IDEA && <AddIdeaOnboarding />}
              {activePage === OnboardingPages.ADD_TOPICS && (
                <AddTopicsOnboarding />
              )}
              {activePage === OnboardingPages.SUCCESS && <Success />}
            </div>
          </div>
          <div
            className={activePage === OnboardingPages.SUCCESS ? 'right' : ''}
          >
            {activePage === OnboardingPages.SUCCESS ? (
              <Testimonials />
            ) : (
              // <div className="right-container">
              //   {activePage === OnboardingPages.WELCOME && (
              //     <Video
              //       src="https://s3.amazonaws.com/app.productfeedback.co/videos/onboarding/Let's+set+up+your+board.mp4"
              //       poster="../../../static/images/lets-set-up-your-board.png"
              //     />
              //   )}
              //   {activePage === OnboardingPages.ADD_IDEA && (
              //     <Video
              //       src="https://s3.amazonaws.com/app.productfeedback.co/videos/onboarding/Add+your+first+idea.mp4"
              //       poster="../../../static/images/add-your-first-idea.png"
              //     />
              //   )}
              //   {activePage === OnboardingPages.ADD_TOPICS && (
              //     <Video
              //       src="https://s3.amazonaws.com/app.productfeedback.co/videos/onboarding/Add+tags+to+your+idea.mp4"
              //       poster="../../../static/images/add-tags-to-your-idea.png"
              //     />
              //   )}
              // </div>
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingPage;
