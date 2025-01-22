import { useOnboarding } from '../../../contexts/OnboardingContext';
import { LayoutTextSidebarIcon } from '../../icons/layout-text-sidebar.icon';
import './styles.css';
import { OnboardingPages } from '../../../types/onboarding';
import { Calendar3RangeIcon } from '../../icons/calendar3-range.icon';
import { CalendarCheckIcon } from '../../icons/calendar-check.icon';
import { InfoSquareIcon } from '../../icons/info-square.icon';
import { LineIcon } from '../../icons/line.icon';

export const ProgressionBar = () => {
  const {
    state: { activePage },
  } = useOnboarding();

  const highlightColor = '#5a00cd';

  return (
    <div id="ProgressionBar">
      <LayoutTextSidebarIcon
        color={
          [OnboardingPages.WELCOME, OnboardingPages.ADD_IDEA].includes(
            activePage
          )
            ? highlightColor
            : undefined
        }
      />
      <LineIcon
        color={
          [OnboardingPages.WELCOME, OnboardingPages.ADD_IDEA].includes(
            activePage
          )
            ? highlightColor
            : undefined
        }
      />
      <InfoSquareIcon
        color={
          [OnboardingPages.WELCOME, OnboardingPages.ADD_IDEA].includes(
            activePage
          )
            ? highlightColor
            : undefined
        }
      />
      <LineIcon
        color={
          [OnboardingPages.ADD_IDEA].includes(activePage)
            ? highlightColor
            : undefined
        }
      />
      <Calendar3RangeIcon
        color={
          [OnboardingPages.ADD_IDEA].includes(activePage)
            ? highlightColor
            : undefined
        }
      />
      <LineIcon />
      <CalendarCheckIcon
        color={
          [OnboardingPages.ADD_TOPICS].includes(activePage)
            ? highlightColor
            : undefined
        }
      />
    </div>
  );
};
