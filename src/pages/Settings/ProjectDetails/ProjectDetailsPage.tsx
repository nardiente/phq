import { Fragment, useEffect, useState } from 'react';
import { Textarea } from '../../../components/Field';
import { Field } from '../../../components/Field';
import styled from 'styled-components';
import { Loader, TrashIcon } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';
import { Permissions, RbacPermissions } from '../../../types/common';
import { toast } from 'react-toastify';
import { Project } from '../../../types/project';
import { deleteApi, getApi, patchApi, postApi } from '../../../utils/api/api';
import { User } from '../../../types/user';
import { ApiFieldError } from '../../../utils/api/types';
import { UIField } from '../../../components/UIField';
import { validateEmail } from '../../../utils/custom-validation';
import { ModalBody } from 'reactstrap';
import { Modal } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useUnsavedChanges } from '../../../contexts/UnsavedChangesContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { Toggle } from '../../../components/ui/Toggle';

const SettingsArea = styled.div`
  background-color: white;
  border-top-right-radius: 6px;
  overflow: auto;
  width: 704px;
`;
const SettingsSection = styled.div`
  background: #ffffff;
  border: 1px solid #f9f9fa;
  border-radius: 8px;
  padding: 24px 20px;
`;

export default function ProjectDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [project, setProject] = useState<Project>();
  const [custom_domain, setCustomDomain] = useState('');
  const [custom_domain_error_msg, setCustomDomainErrorMsg] = useState('');
  const [description, setDescription] = useState('');
  const [description_error_msg, setDescriptionErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetching_private_users, setFetchingPrivateUsers] =
    useState<boolean>(false);
  const [field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [first_name, setFirstName] = useState('');
  const [hide_datetime, setHideDatetime] = useState<boolean>(false);
  const [id, setId] = useState(0);
  const [index_search_engine, setIndexSearchEngine] = useState(false);
  const [is_private_settings, setIsPrivateSettings] = useState<boolean>(false);
  const [last_name, setLastName] = useState('');
  const [loadingInvite, setLoadingInvite] = useState<boolean>(false);
  const [module_roadmap, setModuleRoadmap] = useState(false);
  const [module_upvotes, setModuleUpvotes] = useState(false);
  const [module_whats_new, setModuleWhatsNew] = useState(false);
  const [portal_subdomain, setPortalSubdomain] = useState('');
  const [portal_subdomain_error_msg, setPortalSubdomainErrorMsg] = useState('');
  const [private_user_id, setPrivateUserId] = useState(0);
  const [private_users, setPrivateUsers] = useState<User[]>([]);
  const [modalStates, setModalStates] = useState(
    private_users.map(() => false)
  );
  const [project_name, setProjectName] = useState('');
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

  const handleGetPrivateUsers = () => {
    setFetchingPrivateUsers(true);
    getApi<User[]>('projects/private-users')
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
    getApi<Project>('projects')
      .then((res) => {
        setFetching(false);
        if (res.results.data) {
          const data = res.results.data;
          setProject(data);
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

    return !!urlPattern.test(urlString);
  };

  const handlePortalSubdomainOnChange = (e: any) => {
    setPortalSubdomainErrorMsg('');
    const value = e.target.value.trim().toLowerCase();
    setPortalSubdomain(value);
    if (value.length > 0 && !isValidUrl(value + domain)) {
      setPortalSubdomainErrorMsg('Invalid URL');
    }
  };

  const handleCustomDomainOnChange = (e: any) => {
    setCustomDomainErrorMsg('');
    const value = e.target.value.trim().toLowerCase();
    setCustomDomain(value);
    if (value.length > 0 && !isValidUrl(value)) {
      setCustomDomainErrorMsg('Invalid URL');
    }
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
        setUser((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            project: {
              ...data,
              custom_domain: custom_domain.trim().toLowerCase(),
            },
          },
        }));
        setProject(data);
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
    <div id="Settings" className="min-h-screen bg-[#fafafa] pb-12">
      <div className="max-w-[1200px] mx-auto pt-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-semibold text-gray-900">
            Account Settings
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProject}
              className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg"
              disabled={loading}
            >
              Update
            </button>
          </div>
        </div>
        {!user || user.rbac_permissions.length == 0 ? (
          <SettingsArea>
            <SettingsSection>
              <div className="center-loader">
                <Loader />
              </div>
            </SettingsSection>
          </SettingsArea>
        ) : (
          <>
            {user.rbac_permissions?.includes(
              RbacPermissions.MANAGE_PROJECT_DETAILS_PAGE
            ) && (
              <div
                id="ProjectDetails"
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="space-y-8 text-gray-700 settings-section">
                  <div className="space-y-6">
                    <h2 className="text-[16px] font-semibold text-gray-900">
                      Project Details
                    </h2>
                  </div>
                  <div className="custom-input">
                    <label className="custom-label">Project Name</label>
                    <Field
                      class_name="input-enclosed w-full h-10"
                      id="ProjectNameField"
                      placeholder="Your project name."
                      value={project_name}
                      name="ProjectNameField"
                      type="text"
                      tab_index={1}
                      onChange={handleProjectNameOnChange}
                      has_error={project_name_error_msg !== '' ? true : false}
                      error_msg={project_name_error_msg}
                      readOnly={
                        !user.permissions.includes(Permissions.PROJECT_DETAILS)
                      }
                    />
                  </div>
                  <Textarea
                    class_name="textarea w-full"
                    id="DescriptionField"
                    placeholder="Your project description here."
                    value={description}
                    name="DescriptionField"
                    type="text"
                    tab_index={2}
                    onChange={handleDescriptionOnChange}
                    has_error={description_error_msg !== '' ? true : false}
                    error_msg={description_error_msg}
                    readonly={
                      !user.permissions.includes(Permissions.PROJECT_DETAILS)
                    }
                  />
                </div>
                <div className="settings-section">
                  <h3>Default Domain Name</h3>
                  <p>
                    Once configured, add this link to your site to display the
                    upvote, roadmap, and what&apos;s new features. We recommend
                    adding it to your main menu or footer.
                  </p>
                  <p>
                    Click&nbsp;
                    <a
                      href="https://support.producthq.io/articles/how-to-add-a-board-to-your-site-145e70-32dd7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    &nbsp;for instructions on how to set up a default domain
                    name.
                  </p>
                  <div className="custom-input">
                    <label className="custom-label">Default Domain Name</label>
                    <div className="default-domain-name">
                      <div className="default-domain-field">
                        <Field
                          class_name="input-enclosed w-full h-10"
                          id="PortalSubdomainField"
                          placeholder="your-company"
                          value={portal_subdomain}
                          name="PortalSubdomainField"
                          type="text"
                          tab_index={3}
                          onChange={handlePortalSubdomainOnChange}
                          has_error={
                            portal_subdomain_error_msg !== '' ? true : false
                          }
                          error_msg={portal_subdomain_error_msg}
                          readOnly={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                      </div>
                      <div className="sub-domain-border">{domain}</div>
                      <a
                        className="domain-copy-button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${portal_subdomain}${domain}`
                          );
                          toast(
                            'Default Domain Name successfully copied to clipboard',
                            {
                              position: 'bottom-center',
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: 'dark',
                              className: 'custom-theme',
                            }
                          );
                        }}
                      >
                        <img
                          className="max-width"
                          src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/updated_copy.svg"
                        />
                        Copy
                      </a>
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3>Custom Domain Name</h3>
                  <p>
                    Click&nbsp;
                    <a
                      href="https://support.producthq.io/articles/how-to-set-up-your-custom-domain-name-145e70-e8cd0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    &nbsp;for instructions on how to set up a customer domain
                    name.
                  </p>
                  <div className="custom-input">
                    <label className="custom-label">Custom Domain</label>
                    <div className="custom-domain-name">
                      <div className="custom-domain-field">
                        <Field
                          is_required={false}
                          class_name="input-enclosed w-full h-10"
                          id="CustomDomainField"
                          placeholder="feedback.yoursite.com"
                          value={custom_domain}
                          name="CustomDomainField"
                          type="text"
                          tab_index={4}
                          onChange={handleCustomDomainOnChange}
                          has_error={
                            custom_domain_error_msg !== '' ? true : false
                          }
                          error_msg={custom_domain_error_msg}
                          readOnly={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                      </div>
                      <a
                        className="domain-copy-button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${custom_domain}`);
                          toast(
                            'Custom Domain successfully copied to clipboard',
                            {
                              position: 'bottom-center',
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: 'dark',
                              className: 'custom-theme',
                            }
                          );
                        }}
                      >
                        <img
                          className="max-width"
                          src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/updated_copy.svg"
                        />
                        Copy
                      </a>
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3>Hide Date And Time</h3>
                  <p>
                    Hide the date and time on upvotes, comments, and what&apos;s
                    new posts.
                  </p>
                  <div className="custom-input">
                    <div className="modules">
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={hide_datetime}
                          onChange={handleHideDatetime}
                          disabled={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                        <label
                          className="switch-label"
                          htmlFor="switchHideDatetime"
                        >
                          Hide/Show time and date
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3>Modules</h3>
                  <p>
                    By default, these modules are turned on (purple) which means
                    all features are visible to public view. When the toggles
                    are turned off, the feature is hidden from public view.
                  </p>
                  <div className="custom-input">
                    <label className="custom-label">Modules</label>
                    <div className="modules">
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={module_upvotes}
                          onChange={handleModuleUpvotes}
                          disabled={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                        <label className="switch-label" htmlFor="switchUpvotes">
                          Upvotes
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={module_roadmap}
                          onChange={handleModuleRoadmap}
                          disabled={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                        <label className="switch-label" htmlFor="switchRoadmap">
                          Roadmap
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Toggle
                          checked={module_whats_new}
                          onChange={handleModuleWhatsNew}
                          disabled={
                            !user.permissions.includes(
                              Permissions.PROJECT_DETAILS
                            )
                          }
                        />
                        <label
                          className="switch-label"
                          htmlFor="switchWhatsNew"
                        >
                          What&apos;s New
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {!fetching && (
                  <div className="settings-section">
                    <h3>Board Privacy</h3>
                    <div className="idea-settings">
                      <button
                        className={!is_private_settings ? 'active' : ''}
                        onClick={() => handlePrivateSetting(false)}
                        disabled={
                          !user.permissions.includes(
                            Permissions.PROJECT_DETAILS
                          )
                        }
                      >
                        Public
                      </button>
                      <button
                        className={is_private_settings ? 'active' : ''}
                        onClick={() => handlePrivateSetting(true)}
                        disabled={
                          !user.permissions.includes(
                            Permissions.PROJECT_DETAILS
                          )
                        }
                      >
                        Private
                      </button>
                    </div>
                    <div className="custom-input">
                      {!is_private_settings ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <Toggle
                              checked={index_search_engine}
                              onChange={() => {
                                setIndexSearchEngine(!index_search_engine);
                              }}
                              disabled={
                                !user.permissions.includes(
                                  Permissions.PROJECT_DETAILS
                                )
                              }
                            />
                            <label
                              className="switch-label"
                              htmlFor="switchUsers"
                            >
                              Index in Search engines like google
                            </label>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="settings-section">
                            <h3>Specific Person</h3>
                            <p>
                              Grant access to specific people, Invited via Email
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                gap: '15px',
                                alignItems: 'flex-start',
                              }}
                            >
                              <UIField
                                error_label={
                                  field_errors.find(
                                    (field_error) =>
                                      field_error.field === 'first_name'
                                  )?.message
                                }
                                id="FirstNameField"
                                is_error_state={field_errors.some(
                                  (field_error) =>
                                    field_error.field === 'first_name'
                                )}
                                label="First Name"
                                value={first_name}
                                type="text"
                                tab_index={5}
                                onChange={(e) => {
                                  setApiFieldErrors(
                                    field_errors.filter(
                                      (field_error) =>
                                        field_error.field !== 'first_name'
                                    )
                                  );
                                  setFirstName(e.target.value);
                                }}
                                placeholder="First name"
                                readOnly={loadingInvite}
                                input_class="no-background"
                              />
                              <UIField
                                error_label={
                                  field_errors.find(
                                    (field_error) =>
                                      field_error.field === 'last_name'
                                  )?.message
                                }
                                id="LastNameField"
                                is_error_state={field_errors.some(
                                  (field_error) =>
                                    field_error.field === 'last_name'
                                )}
                                label="Last Name"
                                value={last_name}
                                type="text"
                                tab_index={6}
                                onChange={(e) => {
                                  setApiFieldErrors(
                                    field_errors.filter(
                                      (field_error) =>
                                        field_error.field !== 'last_name'
                                    )
                                  );
                                  setLastName(e.target.value);
                                }}
                                placeholder="Last name"
                                readOnly={loadingInvite}
                                input_class="no-background"
                              />
                            </div>
                            <div className="custom-input">
                              <div className="email-address">
                                <UIField
                                  error_label={
                                    field_errors.find(
                                      (field_error) =>
                                        field_error.field === 'email'
                                    )?.message
                                  }
                                  id="EmailAddressField"
                                  is_error_state={field_errors.some(
                                    (field_error) =>
                                      field_error.field === 'email'
                                  )}
                                  label="Email Address"
                                  max_length={256}
                                  onBlur={(e) => {
                                    let email_address_error;
                                    if (!validateEmail(e.target.value)) {
                                      email_address_error = {
                                        field: 'email',
                                        message: 'Invalid email address.',
                                      };
                                    }
                                    if (email_address_error) {
                                      let copy_field_errors =
                                        field_errors.filter(
                                          (field_error) =>
                                            field_error.field !== 'email'
                                        );
                                      if (copy_field_errors.length > 0)
                                        copy_field_errors.push(
                                          email_address_error
                                        );
                                      else
                                        copy_field_errors = [
                                          email_address_error,
                                        ];
                                      setApiFieldErrors(copy_field_errors);
                                    }
                                  }}
                                  value={email}
                                  type="email"
                                  tab_index={7}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    setApiFieldErrors(
                                      field_errors.filter(
                                        (field_error) =>
                                          field_error.field !== 'email'
                                      )
                                    );
                                  }}
                                  placeholder="name@address.com"
                                  input_class="no-background"
                                  readOnly={loadingInvite}
                                />
                                <button
                                  className={`invite-button${
                                    !user.permissions.includes(
                                      Permissions.PROJECT_DETAILS
                                    ) ||
                                    email.length === 0 ||
                                    field_errors.some(
                                      (field_error) =>
                                        field_error.field === 'email'
                                    )
                                      ? ' is-not-clickable'
                                      : ' is-clickable'
                                  }${
                                    field_errors.some(
                                      (field_error) =>
                                        field_error.field === 'email'
                                    )
                                      ? ' margin-bottom-34'
                                      : ''
                                  }`}
                                  disabled={
                                    !user.permissions.includes(
                                      Permissions.PROJECT_DETAILS
                                    ) ||
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
                                  onClick={handleInvite}
                                  tabIndex={8}
                                >
                                  Invite
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="settings-section">
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
                                    private_users.length === 0
                                      ? { display: 'flex' }
                                      : {}
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
                                                Delete{' '}
                                                {selected_private_user_name}
                                              </span>
                                              <span className="modal-delete-text-sub">
                                                Are you sure you want to delete
                                                this user?
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
                                                      src={
                                                        private_user.profile_photo
                                                      }
                                                    />
                                                  ) : (
                                                    private_user.first_name?.charAt(
                                                      0
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                              <div className="user-details">
                                                <h3 className="name">
                                                  {(private_user.first_name &&
                                                    private_user.first_name
                                                      .length > 0) ||
                                                  (private_user.last_name &&
                                                    private_user.last_name
                                                      .length > 0)
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
                                    <span
                                      className="no-members"
                                      style={{ margin: '10px' }}
                                    >
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
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
