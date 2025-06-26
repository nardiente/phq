import { Fragment, useEffect, useState } from 'react';
import { Loader, TrashIcon } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { Permissions } from '../../types/common';
import { toast } from 'react-toastify';
import { Project } from '../../types/project';
import { deleteApi, getApi, patchApi, postApi } from '../../utils/api/api';
import { User } from '../../types/user';
import { ApiFieldError } from '../../utils/api/types';
import { ModalBody } from 'reactstrap';
import { Modal } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { Toggle } from '../../components/ui/Toggle';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import { Settings } from '../../components/Settings';
import InputField from '../../components/InputField';
import SectionHeader from '../../components/SectionHeader';
import TextAreaInput from '../../components/TextAreaInput';

export default function ProjectDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { initialUser, user, setUser } = useUser();
  const { permissions, project } = user ?? {};
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [custom_domain, setCustomDomain] = useState(
    project?.custom_domain ?? ''
  );
  const [custom_domain_error_msg, setCustomDomainErrorMsg] = useState('');
  const [description, setDescription] = useState(project?.description ?? '');
  const [description_error_msg, setDescriptionErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetching_private_users, setFetchingPrivateUsers] =
    useState<boolean>(false);
  const [field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [first_name, setFirstName] = useState('');
  const [hide_datetime, setHideDatetime] = useState<boolean>(
    project?.hide_datetime ?? false
  );
  const [id, setId] = useState(project?.id ?? 0);
  const [index_search_engine, setIndexSearchEngine] = useState(
    project?.is_index_search_engine ?? false
  );
  const [is_private_settings, setIsPrivateSettings] = useState<boolean>(
    project?.is_public_settings ?? false
  );
  const [last_name, setLastName] = useState('');
  const [loadingInvite, setLoadingInvite] = useState<boolean>(false);
  const [module_roadmap, setModuleRoadmap] = useState(
    project?.is_visible_roadmap ?? false
  );
  const [module_upvotes, setModuleUpvotes] = useState(
    project?.is_visible_upvotes ?? false
  );
  const [module_whats_new, setModuleWhatsNew] = useState(
    project?.is_visible_whats_new ?? false
  );
  const [portal_subdomain, setPortalSubdomain] = useState(
    project?.portal_subdomain ?? ''
  );
  const [portal_subdomain_error_msg, setPortalSubdomainErrorMsg] = useState('');
  const [private_user_id, setPrivateUserId] = useState(0);
  const [private_users, setPrivateUsers] = useState<User[]>([]);
  const [modalStates, setModalStates] = useState(
    private_users.map(() => false)
  );
  const [project_name, setProjectName] = useState(project?.name ?? '');
  const [project_name_error_msg, setProjectNameErrorMsg] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected_private_user_name, setSelectedPrivateUserName] =
    useState<string>('');

  const domain = '.producthq.io';

  useEffect(() => {
    handleGetProject();
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    if (is_private_settings === true) {
      handleGetPrivateUsers();
    }
  }, [is_private_settings]);

  useEffect(() => {
    setHasUnsavedChanges(
      (project?.custom_domain ?? '') !== custom_domain ||
        (project?.description ?? '') !== description ||
        (project?.is_visible_roadmap ?? false) !== module_roadmap ||
        (project?.is_visible_upvotes ?? false) !== module_upvotes ||
        (project?.is_visible_whats_new ?? false) !== module_whats_new ||
        (project?.portal_subdomain ?? '') !== portal_subdomain ||
        (project?.name ?? '') !== project_name ||
        (project?.is_index_search_engine ?? false) !== index_search_engine
    );
  }, [
    custom_domain,
    description,
    module_roadmap,
    module_upvotes,
    module_whats_new,
    portal_subdomain,
    project_name,
    index_search_engine,
  ]);

  const clearFieldErrors = () => {
    setCustomDomainErrorMsg('');
    setDescriptionErrorMsg('');
    setApiFieldErrors([]);
    setPortalSubdomainErrorMsg('');
    setProjectNameErrorMsg('');
  };

  const handleGetPrivateUsers = () => {
    setFetchingPrivateUsers(true);
    getApi<User[]>({ url: 'projects/private-users' })
      .then((res) => {
        setFetchingPrivateUsers(false);
        if (res.results.data) {
          setPrivateUsers(res.results.data as User[]);
        }
      })
      .catch(() => setFetchingPrivateUsers(false));
  };

  const handleGetProject = () => {
    setFetching(true);
    getApi<Project>({ url: 'projects' })
      .then((res) => {
        setFetching(false);
        if (res.results.data) {
          const data = res.results.data;
          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  project: data,
                }
              : { ...initialUser, project: data }
          );
          setCustomDomain(data.custom_domain || '');
          setDescription(data.description || '');
          setHideDatetime(data.hide_datetime || false);
          setId(data.id || 0);
          setIndexSearchEngine(data.is_index_search_engine || false);
          setIsPrivateSettings(
            data.is_public_settings !== undefined
              ? !data.is_public_settings
              : false
          );
          setModuleWhatsNew(data.is_visible_whats_new || false);
          setModuleRoadmap(data.is_visible_roadmap || false);
          setModuleUpvotes(data.is_visible_upvotes || false);
          setPortalSubdomain(data.portal_subdomain || '');
          setProjectName(data.name || '');
        }
      })
      .catch(() => setFetching(false));
  };

  const handleDescriptionOnChange = (e: any) => {
    setDescriptionErrorMsg('');
    setDescription(e.target.value);
  };

  const handleProjectNameOnChange = (e: any) => {
    setProjectNameErrorMsg('');
    setProjectName(e.target.value);
  };

  const isValidUrl = (urlString: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i' // validate fragment locator
    );

    return (
      urlString.length === 0 ||
      (urlString.length > 0 && !!urlPattern.test(urlString))
    );
  };

  const handlePortalSubdomainOnChange = (e: any) => {
    setPortalSubdomainErrorMsg('');
    const value = e.target.value.trim().toLowerCase();
    setPortalSubdomain(value);
  };

  const handleCustomDomainOnChange = (e: any) => {
    setCustomDomainErrorMsg('');
    const value = e.target.value.trim().toLowerCase();
    setCustomDomain(value);
  };

  const handleHideDatetime = () => {
    setHideDatetime(!hide_datetime);
    patchApi<Project>('projects/' + id, {
      hide_datetime: !hide_datetime,
    }).then((res) => {
      if (res.results.data) {
        toast('Date and time setting has been updated successfully.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        });
      }
    });
  };

  const handleModuleUpvotes = () => {
    setModuleUpvotes(!module_upvotes);
  };

  const handleModuleRoadmap = () => {
    setModuleRoadmap(!module_roadmap);
  };

  const handleModuleWhatsNew = () => {
    setModuleWhatsNew(!module_whats_new);
  };

  const handlePrivateSetting = (value: boolean) => {
    setIsPrivateSettings(value);
    patchApi<Project>('projects/' + id, {
      is_public_settings: !value,
    }).then((res) => {
      if (res.results.data) {
        toast('Idea setting has been updated successfully.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        });
      }
    });
  };

  const handleInvite = () => {
    setLoadingInvite(true);
    postApi({
      url: 'auth/invite-user',
      payload: {
        email,
        first_name,
        last_name,
      },
    })
      .then((res) => {
        setLoadingInvite(false);
        if (res.results.errors) {
          setApiFieldErrors(res.results.errors);
        }
        if (res.results.message) {
          toast(res.results.message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'custom-theme',
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
        }
      })
      .catch(() => setLoadingInvite(false));
  };

  const handleSetModal = (idx: number) => {
    const newModalStates = [...modalStates];
    newModalStates[idx] = !newModalStates[idx];
    setModalStates(newModalStates);
  };

  const onSubmitDelete = (idx: number) => {
    deleteApi({ url: `users/soft-delete/${private_user_id}` }).then((res) => {
      if (res.results.data) {
        setPrivateUsers(
          private_users.filter((team) => team.id !== private_user_id)
        );
        toast('Specific person successfully deleted!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        });
      }
      handleSetModal(idx);
    });
  };

  const handleOnClickDelete = (id: number, idx: number) => {
    setPrivateUserId(id);
    const selected_private_user = private_users.find(
      (private_user) => private_user.id === id
    );
    setSelectedPrivateUserName(
      ((selected_private_user?.first_name &&
        selected_private_user?.first_name.length > 0) ||
      (selected_private_user?.last_name &&
        selected_private_user?.last_name?.length > 0)
        ? `${selected_private_user?.first_name} ${selected_private_user?.last_name}`
        : selected_private_user?.full_name) || ''
    );
    handleSetModal(idx);
  };

  const handleUpdateProject = () => {
    clearFieldErrors();
    const isValidCustomDomain = isValidUrl(custom_domain);
    const isValidPortalSubdomain = isValidUrl(portal_subdomain + domain);
    if (!isValidCustomDomain) {
      setCustomDomainErrorMsg('Invalid URL');
    }
    if (!isValidPortalSubdomain) {
      setPortalSubdomainErrorMsg('Invalid URL');
    }
    if (!isValidCustomDomain || !isValidPortalSubdomain) {
      return;
    }

    const is_index_search_engine = !is_private_settings
      ? index_search_engine
      : false;

    setIndexSearchEngine(is_index_search_engine);

    setLoading(true);
    postApi({
      url: 'projects',
      payload: {
        custom_domain: custom_domain.trim().toLowerCase(),
        description,
        hide_datetime,
        id,
        is_index_search_engine,
        is_public_settings: !is_private_settings,
        is_visible_roadmap: module_roadmap,
        is_visible_upvotes: module_upvotes,
        is_visible_whats_new: module_whats_new,
        name: project_name,
        portal_subdomain,
      },
    }).then((res) => {
      setLoading(false);
      if (res.results.error) {
        toast(t(res.results.error), {
          autoClose: 3000,
          closeOnClick: true,
          hideProgressBar: true,
          icon: false,
          position: 'bottom-center',
          theme: 'dark',
          type: 'error',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        });
      }
      const errors = res.results?.errors as ApiFieldError[];
      if (errors?.length > 0) {
        errors?.forEach((error) => {
          switch (error.field) {
            case 'custom_domain':
              setCustomDomainErrorMsg(error.message);
              if (error.message.includes('already used')) {
                setCustomDomainErrorMsg(
                  'The url is not unique. Please choose a different url.'
                );
              }
              if (error.message.includes('.invalid')) {
                setCustomDomainErrorMsg('Invalid URL');
              }
              break;
            case 'description':
              if (error.message.includes('not allowed to be empty')) {
                setDescriptionErrorMsg('Required');
              }
              break;
            case 'name':
              if (error.message.includes('not allowed to be empty')) {
                setProjectNameErrorMsg('Required');
              }
              break;
            case 'portal_subdomain':
              if (error.message.includes('not allowed to be empty')) {
                setPortalSubdomainErrorMsg('Required');
              }
              if (
                error.message.includes('already used') ||
                error.message.includes('already reserved')
              ) {
                setPortalSubdomainErrorMsg(
                  'This domain is already being used and is no longer available. Please select another one.'
                );
              }
              if (error.message.includes('.invalid')) {
                setPortalSubdomainErrorMsg('Invalid URL');
              }
              break;
            default:
              break;
          }
        });
        return;
      }
      if (res.results.data) {
        const data = res.results.data as Project;
        setUser((prev) =>
          prev
            ? {
                ...prev,
                project: {
                  ...data,
                  custom_domain: custom_domain.trim().toLowerCase(),
                },
              }
            : {
                ...initialUser,
                project: {
                  ...data,
                  custom_domain: custom_domain.trim().toLowerCase(),
                },
              }
        );
        setId(data?.id || 0);

        toast('Updated', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        });
        setHasUnsavedChanges(false);

        handleSslCert();
      }
    });
  };

  const handleSslCert = () => {
    setLoading(true);
    postApi({
      url: 'ssl',
      payload: {
        domain: custom_domain.trim().toLowerCase(),
      },
      pub: true,
    })
      .then((res) => {
        setLoading(false);
        const errors = res.results?.errors as ApiFieldError[];
        if (errors?.length > 0) {
          errors?.forEach((error) => {
            switch (error.field) {
              case 'custom_domain':
              case 'domain':
                setCustomDomainErrorMsg(error.message);
                if (error.message.includes('already used')) {
                  setCustomDomainErrorMsg(
                    'The url is not unique. Please choose a different url.'
                  );
                }
                if (error.message.includes('.invalid')) {
                  setCustomDomainErrorMsg('Invalid URL');
                }
                break;
              default:
                break;
            }
          });
          return;
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Settings>
      <SettingsHeader
        title="Account Settings"
        primaryButton={
          <Button
            disabled={loading}
            loading={loading}
            onClick={handleUpdateProject}
          >
            <div className="text-white">{`Updat${loading ? 'ing...' : 'e'}`}</div>
          </Button>
        }
        secondaryButton={
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Cancel
          </Button>
        }
      />
      <SettingsContainer id="ProjectDetails">
        <div className="flex flex-col gap-6">
          <SectionHeader title="Project Details" />
          <InputField
            error={project_name_error_msg}
            label="Project Name"
            onChange={handleProjectNameOnChange}
            placeholder="Your project name."
            value={project_name}
            variant={project_name_error_msg.length > 0 ? 'error' : 'default'}
          />
          <TextAreaInput
            className=""
            error={description_error_msg}
            onChange={handleDescriptionOnChange}
            value={description}
            placeholder="Your project description here."
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Default Domain Name"
            description={
              <div className="flex flex-col gap-1">
                <span>
                  Once configured, add this link to your site to display the
                  upvote, roadmap, and what&apos;s new features. We recommend
                  adding it to your main menu or footer.
                </span>
                <span>
                  Click{' '}
                  <a
                    href="https://support.producthq.io/en/article/9-how-to-add-a-board-to-your-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5a00cd] hover:underline"
                  >
                    here
                  </a>{' '}
                  for instructions on how to set up a default domain name.
                </span>
              </div>
            }
          />
          <InputField
            domain={domain}
            error={portal_subdomain_error_msg}
            label="Default Domain Name"
            onChange={handlePortalSubdomainOnChange}
            onClick={() => {
              navigator.clipboard.writeText(`${portal_subdomain}${domain}`);
              toast('Default Domain Name successfully copied to clipboard', {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                bodyClassName: 'p-2',
                className: 'custom-theme',
              });
            }}
            placeholder="your-company"
            value={portal_subdomain}
            variant={
              portal_subdomain_error_msg.length > 0 ? 'error' : 'default'
            }
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Custom Domain Name"
            description={
              <span>
                Click&nbsp;
                <a
                  href="https://support.producthq.io/en/article/10-how-to-set-up-your-custom-domain-name"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5a00cd] hover:underline"
                >
                  here
                </a>
                &nbsp;for instructions on how to set up a customer domain name.
              </span>
            }
          />
          <InputField
            error={custom_domain_error_msg}
            label="Custom Domain"
            onChange={handleCustomDomainOnChange}
            onClick={() => {
              navigator.clipboard.writeText(`${custom_domain}`);
              toast('Custom Domain successfully copied to clipboard', {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                className: 'custom-theme',
                bodyClassName: 'p-2',
                pauseOnFocusLoss: false,
              });
            }}
            placeholder="feedback.yoursite.com"
            value={custom_domain}
            variant={custom_domain_error_msg.length > 0 ? 'error' : 'default'}
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Hide Date And Time"
            description={
              <span>
                Hide the date and time on upvotes, comments, and what&apos;s new
                posts.
              </span>
            }
          />
          <div className="custom-input">
            <div className="modules">
              <div className="flex items-center gap-2">
                <Toggle
                  checked={hide_datetime}
                  onChange={handleHideDatetime}
                  disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
                />
                <label
                  className="switch-label text-[14px]"
                  htmlFor="switchHideDatetime"
                >
                  Hide/Show time and date
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Modules"
            description={
              <span>
                By default, these modules are turned on (purple) which means all
                features are visible to public view. When the toggles are turned
                off, the feature is hidden from public view.
              </span>
            }
          />
          <div className="flex flex-col gap-1.5">
            <label className="block text-[13px] font-medium m-0">Modules</label>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Toggle
                  checked={module_upvotes}
                  onChange={handleModuleUpvotes}
                  disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
                />
                <label
                  className="switch-label text-[14px]"
                  htmlFor="switchUpvotes"
                >
                  Upvotes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Toggle
                  checked={module_roadmap}
                  onChange={handleModuleRoadmap}
                  disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
                />
                <label
                  className="switch-label text-[14px]"
                  htmlFor="switchRoadmap"
                >
                  Roadmap
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Toggle
                  checked={module_whats_new}
                  onChange={handleModuleWhatsNew}
                  disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
                />
                <label
                  className="switch-label text-[14px]"
                  htmlFor="switchWhatsNew"
                >
                  What&apos;s New
                </label>
              </div>
            </div>
          </div>
        </div>
        {!fetching && (
          <div className="flex flex-col gap-6">
            <SectionHeader title="Board Privacy" />
            <div className="bg-gray-200 rounded-lg flex gap-1 p-1">
              <button
                className={`flex-1 cursor-pointer bg-gray-200 border-none rounded-lg py-3 font-satoshi font-medium text-sm leading-5 tracking-tight text-[#110733] disabled:cursor-default ${!is_private_settings ? 'bg-white' : ''}`}
                onClick={() => handlePrivateSetting(false)}
                disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
              >
                Public
              </button>
              <button
                className={`flex-1 cursor-pointer bg-gray-200 border-none rounded-lg py-3 font-satoshi font-medium text-sm leading-5 tracking-tight text-[#110733] disabled:cursor-default ${is_private_settings ? 'bg-white' : ''}`}
                onClick={() => handlePrivateSetting(true)}
                disabled={!permissions?.includes(Permissions.PROJECT_DETAILS)}
              >
                Private
              </button>
            </div>
            {!is_private_settings ? (
              <div className="flex flex-col gap-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={index_search_engine}
                      onChange={() => {
                        setIndexSearchEngine(!index_search_engine);
                      }}
                      disabled={
                        !permissions?.includes(Permissions.PROJECT_DETAILS)
                      }
                    />
                    <label
                      className="switch-label text-[14px]"
                      htmlFor="switchUsers"
                    >
                      Index in Search engines like google
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  <SectionHeader
                    title="Specific Person"
                    description={
                      <span>
                        Grant access to specific people, Invited via Email
                      </span>
                    }
                  />
                  <div className="grid grid-cols-2 gap-4 m-0">
                    <InputField
                      label="First Name"
                      onChange={(e) => {
                        setApiFieldErrors(
                          field_errors.filter(
                            (field_error) => field_error.field !== 'first_name'
                          )
                        );
                        setFirstName(e.target.value);
                      }}
                      placeholder="First name"
                      value={first_name}
                      variant={
                        field_errors.some(
                          (field_error) => field_error.field === 'first_name'
                        )
                          ? 'error'
                          : 'default'
                      }
                      error={
                        field_errors.find(
                          (field_error) => field_error.field === 'first_name'
                        )?.message
                      }
                      readOnly={loadingInvite}
                    />
                    <InputField
                      label="Last Name"
                      onChange={(e) => {
                        setApiFieldErrors(
                          field_errors.filter(
                            (field_error) => field_error.field !== 'last_name'
                          )
                        );
                        setLastName(e.target.value);
                      }}
                      error={
                        field_errors.find(
                          (field_error) => field_error.field === 'last_name'
                        )?.message
                      }
                      placeholder="Last name"
                      readOnly={loadingInvite}
                      value={last_name}
                      variant={
                        field_errors.some(
                          (field_error) => field_error.field === 'last_name'
                        )
                          ? 'error'
                          : 'default'
                      }
                    />
                  </div>
                  <InputField
                    label="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setApiFieldErrors(
                        field_errors.filter(
                          (field_error) => field_error.field !== 'email'
                        )
                      );
                    }}
                    error={
                      field_errors.find(
                        (field_error) => field_error.field === 'email'
                      )?.message
                    }
                    placeholder="name@address.com"
                    readOnly={loadingInvite}
                    type="email"
                    value={email}
                    variant={
                      field_errors.some(
                        (field_error) => field_error.field === 'email'
                      )
                        ? 'error'
                        : 'default'
                    }
                  />
                  <Button
                    className="w-fit text-[13px]"
                    disabled={
                      !permissions?.includes(Permissions.PROJECT_DETAILS) ||
                      email.length === 0 ||
                      first_name.length === 0 ||
                      last_name.length === 0 ||
                      field_errors.some(
                        (field_error) =>
                          field_error.field === 'email' ||
                          field_error.field === 'first_name' ||
                          field_error.field === 'last_name'
                      ) ||
                      loadingInvite
                    }
                    loading={loadingInvite}
                    onClick={handleInvite}
                    variant="outline"
                  >
                    {`Invit${loadingInvite ? 'ing...' : 'e'}`}
                  </Button>
                </div>
                <div className="flex flex-col gap-6 settings-section">
                  {fetching_private_users && (
                    <div className="center-loader">
                      <Loader />
                    </div>
                  )}
                  {!fetching_private_users && (
                    <table id="UserTable">
                      <thead>
                        <tr>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody
                        style={
                          private_users.length === 0 ? { display: 'flex' } : {}
                        }
                      >
                        {private_users.length > 0 &&
                          private_users.map((private_user, key) => (
                            <Fragment key={key}>
                              <Modal isOpen={modalStates[key]}>
                                <ModalBody>
                                  <span
                                    style={{
                                      display: 'flex',
                                      fontSize: 'x-large',
                                      justifyContent: 'end',
                                    }}
                                  >
                                    <label
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSetModal(key);
                                      }}
                                    >
                                      <img
                                        className="is-clickable"
                                        src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/cross.svg"
                                        role="button"
                                      />
                                    </label>
                                  </span>
                                  <div
                                    style={{
                                      display: 'grid',
                                      textAlign: 'center',
                                      marginBottom: '20px',
                                    }}
                                  >
                                    <span className="modal-delete-text-header">
                                      Delete {selected_private_user_name}
                                    </span>
                                    <span className="modal-delete-text-sub">
                                      Are you sure you want to delete this user?
                                    </span>
                                  </div>
                                  <div className="flex justify-center pb-3.5 gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSetModal(key);
                                      }}
                                      className="button modal-cancel-btn"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onSubmitDelete(key);
                                      }}
                                      id={key.toString()}
                                      className="button modal-delete-btn"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </ModalBody>
                              </Modal>
                              <tr>
                                <td>
                                  <div className="user-container">
                                    <div className="avatar-and-info">
                                      <div className="placeholder-avatar">
                                        {private_user.profile_photo &&
                                        private_user.profile_photo !=
                                          'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/profile-placeholder.svg' ? (
                                          <img
                                            className="is-rounded responsiveImage"
                                            src={private_user.profile_photo}
                                          />
                                        ) : (
                                          private_user.first_name?.charAt(0)
                                        )}
                                      </div>
                                    </div>
                                    <div className="user-details">
                                      <h3 className="name">
                                        {(private_user.first_name &&
                                          private_user.first_name.length > 0) ||
                                        (private_user.last_name &&
                                          private_user.last_name.length > 0)
                                          ? `${private_user.first_name} ${private_user.last_name}`
                                          : private_user.full_name}
                                      </h3>
                                      <p className="email">
                                        {private_user.email}
                                      </p>
                                    </div>
                                    <button
                                      className="delete-user-button is-clickable"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOnClickDelete(
                                          private_user.id || 0,
                                          key
                                        );
                                      }}
                                    >
                                      <TrashIcon />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                        {private_users.length === 0 && (
                          <span className="no-members text-[14px] m-[10px]">
                            {t('no-specific-persons-label')}
                          </span>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </SettingsContainer>
    </Settings>
  );
}
