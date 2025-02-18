import { useState } from 'react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { postApi } from '../../../utils/api/api';
import { ApiFieldError } from '../../../utils/api/types';
import './styles.css';
import { OnboardingPages, OnboardingUrls } from '../../../types/onboarding';
import { useNavigate } from 'react-router-dom';
import { UIField } from '../../UIField';

const AddIdeaOnboarding = () => {
  const navigate = useNavigate();
  const {
    state: { token },
    setActivePage,
  } = useOnboarding();

  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [idea, setIdea] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    postApi({
      url: 'users/onboarding/idea',
      payload: {
        title: idea,
        description: description.replace(/<[^>]+>/g, '').trim(),
        token,
      },
    }).then((res) => {
      setLoading(false);
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        localStorage.setItem('onboarding_page', OnboardingPages.ADD_TOPICS);
        setActivePage(OnboardingPages.ADD_TOPICS);
        navigate(OnboardingUrls[OnboardingPages.ADD_TOPICS]);
      }
    });
  };

  // const handleSkip = () => {
  //   setSkipLoading(true)
  //   postApi('users/onboarding/skip', {
  //     token,
  //   }).then(async (res) => {
  //     setSkipLoading(false)
  //     if (res.results.errors) {
  //       setFieldErrors(res.results.errors)
  //     }
  //     if (res.results.data) {
  //       setKaslKey(token)
  //       await handleGetUser()
  //       localStorage.removeItem('onboarding_page')
  //       eraseOnboardingToken()
  //       navigate(OnboardingUrls[OnboardingPages.SUCCESS])
  //     }
  //   })
  // }

  return (
    <div id="AddIdeaOnboarding">
      <h1>Add your first idea</h1>
      <p>
        An idea could be a something like &quot;add dark mode&quot;,
        &quot;improve the onboarding flow&quot; or &quot;add single sign
        on&quot;.
      </p>
      <div style={{ marginBottom: '16px' }}>
        <UIField
          error_label={field_errors
            .find((field_error) => field_error.field === 'title')
            ?.message.replace(
              '"title" is not allowed to be empty',
              'This is a required field.'
            )}
          id="IdeaNameField"
          is_error_state={field_errors.some(
            (api_field_error) => api_field_error.field === 'title'
          )}
          onBlur={(e) => {
            let error;
            if (e.target.value.length == 0) {
              error = {
                field: 'title',
                message: 'This is a required field.',
              };
            }
            if (error) {
              let copy_field_errors = field_errors.filter(
                (field_error) => field_error.field !== 'title'
              );
              if (copy_field_errors.length > 0) copy_field_errors.push(error);
              else copy_field_errors = [error];
              setFieldErrors(copy_field_errors);
            }
          }}
          onChange={(e) => {
            setFieldErrors(
              field_errors.filter(
                (api_field_error) => api_field_error.field != 'title'
              )
            );
            setIdea(e.target.value);
          }}
          value={idea}
          type="text"
          tab_index={1}
          label="What's your awesome idea?"
          placeholder="Integrate payment gateway"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <UIField
          id="DescriptionField"
          placeholder="We need a better, cheaper, and more secure way to receive customer payments."
          value={description}
          type="textarea"
          tab_index={2}
          onChangeArea={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        disabled={loading || idea.trim().length == 0}
        type="button"
        onClick={handleSubmit}
      >
        {loading ? 'Loading...' : 'Continue'}
      </button>
      {/* <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <a
          className={`skip-text ${skipLoading || loading ? 'disabled' : ''}`}
          onClick={() => (!skipLoading && !loading ? handleSkip() : {})}
        >
          Skip for now
        </a>
      </div> */}
    </div>
  );
};

export default AddIdeaOnboarding;
