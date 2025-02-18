import { useState } from 'react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import './styles.css';
import { postApi } from '../../../utils/api/api';
import { ApiFieldError } from '../../../utils/api/types';
import { UIField } from '../../UIField';
import { OnboardingStatus } from '../../OnboardingStatus';
import { setOnboardingToken } from '../../../utils/localStorage';

const AddTopicsOnboarding = () => {
  const {
    state: { token },
  } = useOnboarding();

  const [, /* field_errors */ setFieldErrors] = useState<ApiFieldError[]>([]);
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [active_status, setActiveStatus] = useState<string>('Select status');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    postApi({
      url: 'users/onboarding/topic',
      payload: {
        tags: tags.join(','),
        status: active_status,
        token,
      },
    }).then(async (res) => {
      setLoading(false);
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        setOnboardingToken(token);
        window.location.href = import.meta.env.VITE_SURVEY_FORM_URL ?? '';
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
  //       history.push(OnboardingUrls[OnboardingPages.SUCCESS])
  //     }
  //   })
  // }

  return (
    <div id="AddTopicsOnboarding">
      <h1>Add tags to your idea</h1>
      <p>
        A tag is a simple way to categorise ideas so you can find and filter
        them later. We&apos;re provided 3 of the most common but you can change
        them any time.
      </p>
      <div style={{ marginTop: '24px' }}>
        <UIField
          id="TagField"
          placeholder="Enter tags"
          value={tag}
          type="text"
          tab_index={1}
          label="Setup to 3 tags related to this idea (optional)"
          onBlur={() => {
            if (tag.trim().length > 0) {
              if (tags.length >= 3) {
                setError('Only three tags are allowed.');
                return;
              }
              const tagList = tag.split(',');
              if (tagList.length > 3) {
                setError('Only three tags are allowed.');
                return;
              }
              tagList.forEach((tagName) => {
                if (!tags.includes(tagName) && tags.length < 3) {
                  tags.push(tagName);
                }
              });
              setTag('');
            }
          }}
          onChange={(e) => {
            setTag(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 13 && tag.trim().length > 0) {
              if (tags.length >= 3) {
                setError('Only three tags are allowed.');
                return;
              }
              const tagList = tag.split(',');
              if (tagList.length > 3) {
                setError('Only three tags are allowed.');
                return;
              }
              tagList.forEach((tagName) => {
                if (!tags.includes(tagName) && tags.length < 3) {
                  tags.push(tagName);
                }
              });
              setTag('');
            }
          }}
        />
        {error && <span className="for-tag-error">{error}</span>}
        {tags.length > 0 && (
          <div className="for-tags">
            {tags.map((tagName, idx) => (
              <span key={idx} className="tags-name-and-button ">
                {tagName}
                <button
                  className="x-button"
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t != tagName))}
                >
                  <span style={{ marginBottom: '1px' }}>×</span>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <OnboardingStatus
        active_status={active_status}
        roadmaps={[
          {
            name: 'Under Review',
          },
          {
            name: 'Planned',
          },
          {
            name: 'In Progress',
          },
          {
            name: 'Completed',
          },
        ]}
        setActiveStatus={setActiveStatus}
      />
      <button
        disabled={loading || active_status == 'Select status'}
        style={{ marginTop: '16px' }}
        type="button"
        onClick={handleSubmit}
      >
        {loading ? 'Loading...' : 'Submit Idea'}
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

export default AddTopicsOnboarding;
