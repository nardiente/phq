import { useEffect } from 'react';
import './styles.css';

export const SurveyOnboarding = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloaded');
    }
  }, []);

  return (
    <div id="SurveyOnboarding">
      <div
        id="zf-widget"
        data-zf-embed-id="7e633ab1-dc0c-41a1-a694-5cdb17bc846e"
        data-zf-id="NbU0c2EAZphS55zfEAdN"
        data-zf-d_id="rbOnyjuSRwg1CN0Yc"
        data-zf-type="standard"
      ></div>
    </div>
  );
};
