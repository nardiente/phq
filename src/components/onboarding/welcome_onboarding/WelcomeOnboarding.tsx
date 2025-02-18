import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { ApiFieldError } from '../../../utils/api/types';
import { useState } from 'react';
import { postApi } from '../../../utils/api/api';
import { OnboardingPages, OnboardingUrls } from '../../../types/onboarding';
import { UIField } from '../../UIField';
import {
  validateCompanyName,
  validateSubdomain,
} from '../../../utils/custom-validation';
import { CheckSquareIcon } from '../../icons/check-square.icon';
import { XSquareIcon } from '../../icons/x-square.icon';

const WelcomeOnboarding = () => {
  const navigate = useNavigate();

  const {
    state: { token },
    setActivePage,
  } = useOnboarding();

  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [company_name, setCompanyName] = useState<string>('');
  const [portal_subdomain, setPortalSubdomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSslCert = () => {
    setLoading(true);
    postApi({
      url: 'ssl',
      pub: true,
      useOnboardingToken: true,
    })
      .then((res) => {
        setLoading(false);
        const errors = res.results?.errors as ApiFieldError[];
        if (errors?.length > 0) {
          errors?.forEach((error) => {
            switch (error.field) {
              case 'custom_domain':
              case 'domain':
                setFieldErrors((prev) => {
                  prev = prev.filter((p) => p.field !== 'portal_subdomain');
                  return [
                    ...prev,
                    { field: 'portal_subdomain', message: error.message },
                  ];
                });
                if (error.message.includes('already used')) {
                  setFieldErrors((prev) => {
                    prev = prev.filter((p) => p.field !== 'portal_subdomain');
                    return [
                      ...prev,
                      {
                        field: 'portal_subdomain',
                        message:
                          'The url is not unique. Please choose a different url.',
                      },
                    ];
                  });
                }
                if (error.message.includes('.invalid')) {
                  setFieldErrors((prev) => {
                    prev = prev.filter((p) => p.field !== 'portal_subdomain');
                    return [
                      ...prev,
                      { field: 'portal_subdomain', message: 'Invalid URL' },
                    ];
                  });
                }
                break;
              default:
                break;
            }
          });
          return;
        }
        localStorage.setItem('onboarding_page', OnboardingPages.ADD_IDEA);
        setActivePage(OnboardingPages.ADD_IDEA);
        navigate(OnboardingUrls[OnboardingPages.ADD_IDEA]);
      })
      .catch(() => setLoading(false));
  };

  const handleSubmit = () => {
    setLoading(true);
    postApi({
      url: 'users/onboarding/welcome',
      payload: {
        company_name,
        portal_subdomain: portal_subdomain.toLowerCase(),
        token,
      },
    }).then((res) => {
      setLoading(false);
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        handleSslCert();
      }
    });
  };

  return (
    <div id="WelcomeOnboarding">
      <h1>Let&apos;s set up your board</h1>
      <p>
        Your subdomain creates a unique, branded space for your team and
        customers to collaborate on ideas.
      </p>
      <UIField
        error_label={
          field_errors.find(
            (field_error) => field_error.field === 'company_name'
          )?.message
        }
        id="CompanyNameField"
        is_error_state={field_errors.some(
          (field_error) => field_error.field === 'company_name'
        )}
        label="Company Name"
        max_length={100}
        onBlur={(e) => {
          if (!validateCompanyName(e.target.value)) {
            const company_name_error = {
              field: 'company_name',
              message:
                'Please enter a company name between 2 and 100 characters.',
            };
            let copy_field_errors = field_errors.filter(
              (field_error) => field_error.field !== 'company_name'
            );
            if (copy_field_errors.length > 0)
              copy_field_errors.push(company_name_error);
            else copy_field_errors = [company_name_error];
            setFieldErrors(copy_field_errors);
          }
        }}
        onChange={(e) => {
          setFieldErrors(
            field_errors.filter(
              (field_error) => field_error.field !== 'company_name'
            )
          );
          setCompanyName(e.target.value);
        }}
        tab_index={3}
        type="text"
        value={company_name}
        placeholder="Acme Inc"
      />
      <UIField
        container_class="margin-bottom-10px"
        class_name="domain-suffix"
        id="SubdomainField"
        is_error_state={field_errors.some(
          (field_error) => field_error.field === 'portal_subdomain'
        )}
        label="Board URL"
        max_length={30}
        onBlur={(e) => {
          let portal_subdomain_error;
          if (e.target.value.length === 0) {
            portal_subdomain_error = {
              field: 'portal_subdomain',
              message: 'This field is mandatory.',
            };
          }
          if (
            e.target.value.length > 0 &&
            (e.target.value.length < 3 || e.target.value.length > 30)
          ) {
            portal_subdomain_error = {
              field: 'portal_subdomain',
              message: 'Please enter a subdomain between 3 and 30 characters.',
            };
          }
          if (!validateSubdomain(e.target.value)) {
            portal_subdomain_error = {
              field: 'portal_subdomain',
              message: 'Invalid subdomain.',
            };
          }
          if (portal_subdomain_error) {
            let copy_field_errors = field_errors.filter(
              (field_error) => field_error.field !== 'portal_subdomain'
            );
            if (copy_field_errors.length > 0)
              copy_field_errors.push(portal_subdomain_error);
            else copy_field_errors = [portal_subdomain_error];
            setFieldErrors(copy_field_errors);
          }
        }}
        onChange={(e) => {
          setFieldErrors(
            field_errors.filter(
              (field_error) => field_error.field !== 'portal_subdomain'
            )
          );
          setPortalSubdomain(e.target.value);
        }}
        tab_index={4}
        type="text"
        placeholder="acme"
        value={portal_subdomain}
        error_label={
          field_errors.find(
            (field_error) => field_error.field === 'portal_subdomain'
          )?.message
        }
        custom_message="This must be unique. It's best to use your company name."
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={
          loading || portal_subdomain.length == 0 || field_errors.length !== 0
        }
      >
        {loading ? 'Loading...' : 'Continue'}
      </button>
      <div className="sample-domains">
        <div className="domain-card">
          <span>companyname.producthq.io</span>
          <figure>
            <CheckSquareIcon />
          </figure>
        </div>
        <div className="domain-card">
          <span>company-name.producthq.io</span>
          <figure>
            <CheckSquareIcon />
          </figure>
        </div>
        <div className="domain-card">
          <span>
            <span>company</span>
            <span className="error">.com</span>
            <span>.producthq.io</span>
          </span>
          <figure>
            <XSquareIcon />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboarding;
