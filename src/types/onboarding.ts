export enum OnboardingPages {
  WELCOME = 'welcome',
  ADD_IDEA = 'add_idea',
  ADD_TOPICS = 'add_topics',
  SURVEY = 'survey',
  SUCCESS = 'success',
}

export const OnboardingUrls = {
  [OnboardingPages.WELCOME]: '/ob-board',
  [OnboardingPages.ADD_IDEA]: '/ob-idea',
  [OnboardingPages.ADD_TOPICS]: '/ob-tags',
  [OnboardingPages.SURVEY]: '/ob-survey',
  [OnboardingPages.SUCCESS]: '/ob-success',
};
