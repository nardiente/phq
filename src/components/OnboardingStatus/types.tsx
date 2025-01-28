export interface OnboardingStatusProps {
  active_status: string;
  roadmaps: Roadmap[];
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
}

interface Roadmap {
  name: string;
}
