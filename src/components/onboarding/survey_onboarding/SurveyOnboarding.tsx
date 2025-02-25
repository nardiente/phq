import './styles.css';

export const SurveyOnboarding = () => {
  return (
    <iframe
      className="border-0 w-max-[1000px] w-full h-screen overflow-hidden flex items-center"
      src={import.meta.env.VITE_SURVEY_FORM_URL}
      scrolling="yes"
    />
  );
};
