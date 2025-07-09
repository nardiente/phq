import { Fragment, LegacyRef, ReactNode, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TeamMember, User } from '../../types/user';
import { ApiFieldError } from '../../utils/api/types';
import { useUser } from '../../contexts/UserContext';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { string as yupString, StringSchema } from 'yup';
import { ModalBody } from 'reactstrap';
import { Modal } from 'reactstrap';
import { deleteApi, getApi, postApi, putApi } from '../../utils/api/api';
import { toast } from 'react-toastify';
import { ChevronDownIcon, Loader } from 'lucide-react';
import { RbacPermissions } from '../../types/common';
import SettingsTable from '../../components/SettingsTable/SettingsTable';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import SectionHeader from '../../components/SectionHeader';
import InputField from '../../components/InputField';
import * as yup from 'yup';
import { useApp } from '../../contexts/AppContext';

export default function TeamMembersPage() {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>();

  const { t } = useTranslation();

  const { is_public } = useApp();
  const { user } = useUser();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [first_name, setFirstName] = useState('');
  const [first_name_old, setFirstNameOld] = useState('');
  const [first_name_error_msg, setFirstNameErrorMsg] = useState('');
  const [last_name, setLastName] = useState('');
  const [last_name_old, setLastNameOld] = useState('');
  const [last_name_error_msg, setLastNameErrorMsg] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [email_address_old, setEmailAddressOld] = useState('');
  const [email_error_message, setEmailErrorMessage] = useState('');
  const [role, setRole] = useState('');
  const [role_error_msg, setRoleErrorMsg] = useState('');
  const [role_old, setRoleOld] = useState('');
  const [role_id, setRoleId] = useState(0);
  const [member_id, setMemberId] = useState(0);
  const [fetching_team, setFetchingTeam] = useState<boolean>(true);
  const [team_members, setTeamMembers] = useState<User[]>([]);
  const [loadingInvite, setLoadingInvite] = useState<boolean>(false);
  const [api_field_error, setApiFieldError] = useState<string>('');
  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [button_name, setButtonName] = useState<string>('Invite');
  const [toast_message, setToastMessage] = useState<ReactNode>(<>Saved!</>);
  const [selected_member_name, setSelectedMemberName] = useState<string>('');
  const [is_member, setIsMember] = useState<boolean>(false);
  const [modalStates, setModalStates] = useState(team_members.map(() => false));
  const [is_expanded, setExpanded] = useState(false);
  const [resend, setResend] = useState<boolean>(false);

  const is_admin = !is_public;

  const toggle = () => setExpanded(!is_expanded);

  const isEmailValid = (email: string) => {
    const schema: StringSchema = yupString().email().required();

    return schema.isValidSync(email);
  };

  useEffect(() => {
    setHasUnsavedChanges(
      (first_name_old && first_name_old !== first_name) ||
        (first_name_old.length === 0 && first_name.length > 0) ||
        (last_name_old && last_name_old !== last_name) ||
        (last_name_old.length === 0 && last_name.length > 0) ||
        (email_address_old && email_address_old !== email_address) ||
        (email_address_old.length === 0 && email_address.length > 0) ||
        (role_old && role_old !== role) ||
        (role_old.length === 0 && role.length > 0)
    );
  }, [first_name, last_name, email_address, role]);

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setRole('');
    setButtonName('Invite');
  };

  const clearErrorMsgs = () => {
    setFirstNameErrorMsg('');
    setLastNameErrorMsg('');
    setEmailErrorMessage('');
    setApiFieldError('');
    setFieldErrors([]);
    setResend(false);
  };

  const handleSetModal = (idx: number) => {
    const newModalStates = [...modalStates];
    newModalStates[idx] = !newModalStates[idx];
    setModalStates(newModalStates);
  };

  const handleOnClickDelete = (id: number, idx: number) => {
    setMemberId(id);
    setSelectedMemberName(
      team_members.find((team) => team.id === id)?.full_name || ''
    );
    handleSetModal(idx);
  };

  const handleOnFirstname = (e: any) => {
    setFirstNameErrorMsg('');
    setFirstName(e.target.value);
  };

  const handleOnLastname = (e: any) => {
    setLastNameErrorMsg('');
    setLastName(e.target.value);
  };

  const handleOnChangeEmail = (e: any) => {
    setEmailErrorMessage('');

    const new_email = e.target.value;
    const is_valid = isEmailValid(new_email);

    if (new_email === '' || new_email.length === 0) {
      setEmailErrorMessage(t('error.email.required'));
    } else if (new_email !== '' && new_email.length > 0 && !is_valid) {
      setEmailErrorMessage(t('error.email.invalid'));
    } else {
      setEmailErrorMessage('');
    }

    if (email_address_old !== new_email) {
      setToastMessage(
        <>
          Email verification sent to
          <br />
          {new_email}!
        </>
      );
    } else {
      setToastMessage(<>Saved!</>);
    }

    setEmailAddress(new_email);
  };

  const handleOnChangeRole = (new_role: string) => {
    setRoleErrorMsg('');
    setRole(new_role);

    if (new_role === 'Super Admin') {
      setRoleId(1);
    } else if (new_role === 'Manager') {
      setRoleId(2);
    } else if (new_role === 'Admin') {
      setRoleId(3);
    }
  };

  const handleGetProfiles = () => {
    setFetchingTeam(true);
    getApi<TeamMember>({ url: 'users/me/team' })
      .then((res) => {
        if (res.results.data) {
          const data = res.results.data.updatedTeamMembers;
          setTeamMembers(data);
        }
      })
      .finally(() => setFetchingTeam(false));
  };

  const onSubmitDelete = (idx: number) => {
    deleteApi({ url: `users/soft-delete/${member_id}` }).then((res) => {
      if (res.results.error) {
        setApiFieldError(res.results.error);
      } else if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }
      if (res.results.data) {
        setTeamMembers(team_members.filter((team) => team.id !== member_id));
        toast('Member successfully deleted!', {
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

  const handleOnClickEdit = (id: number) => {
    document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth' });

    if (loadingInvite) {
      return;
    }

    const first_name =
      team_members.find((team) => team.id === id)?.first_name || '';
    const last_name =
      team_members.find((team) => team.id === id)?.last_name || '';
    const email_address =
      team_members.find((team) => team.id === id)?.email || '';
    const role = team_members.find((team) => team.id === id)?.role_name || '';

    setMemberId(id);
    setFirstName(first_name);
    setFirstNameOld(first_name);
    setLastName(last_name);
    setLastNameOld(last_name);
    setEmailAddress(email_address);
    setEmailAddressOld(email_address);
    setRole(role);
    setRoleOld(role);
    setRoleId(team_members.find((team) => team.id === id)?.role_id || 0);
    setButtonName('Save');
    clearErrorMsgs();
  };

  // Yup schema for team member form validation
  const teamMemberSchema = yup.object().shape({
    first_name: yup.string().required('This is a required field.'),
    last_name: yup.string().required('This is a required field.'),
    email_address: yup
      .string()
      .required('This is a required field.')
      .email('Please enter a valid email address.'),
    role: yup.string().required('Please select a role.'),
  });

  const validateFields = async () => {
    try {
      await teamMemberSchema.validate(
        { first_name, last_name, email_address, role },
        { abortEarly: false }
      );
      setFirstNameErrorMsg('');
      setLastNameErrorMsg('');
      setEmailErrorMessage('');
      setApiFieldError('');
      return true;
    } catch (err: any) {
      setFirstNameErrorMsg('');
      setLastNameErrorMsg('');
      setEmailErrorMessage('');
      setApiFieldError('');
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((validationError: any) => {
          if (validationError.path === 'first_name')
            setFirstNameErrorMsg(validationError.message);
          if (validationError.path === 'last_name')
            setLastNameErrorMsg(validationError.message);
          if (validationError.path === 'email_address')
            setEmailErrorMessage(validationError.message);
          if (validationError.path === 'role')
            setRoleErrorMsg(validationError.message);
        });
      }
      return false;
    }
  };

  const onSubmitEdit = async () => {
    if (!(await validateFields())) {
      return;
    }
    if (first_name.length > 0 && last_name.length > 0) {
      setLoadingInvite(true);
      putApi<User>(`users/me`, {
        email: team_members.find((team) => team.id === member_id)?.email || '',
        alternate_email: email_address,
        first_name,
        last_name,
        role_id,
      }).then((res) => {
        setLoadingInvite(false);

        if (res.results.errors) {
          setFieldErrors(res.results.errors);
        } else if (res.results.error) {
          setApiFieldError(res.results.error);
        }

        if (res.results.data) {
          const data = res.results.data;
          const updatedTeamMembers = team_members.map((team) => {
            if (team.email === data.email) {
              return {
                ...team,
                first_name: data.first_name,
                last_name: data.last_name,
                full_name: data.full_name,
                email: data.email,
                role_name: data.role_name,
                role_id: data.role_id,
              };
            } else {
              return team;
            }
          });
          setTeamMembers(updatedTeamMembers);
          clearFields();
          toast(toast_message, {
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
          setButtonName('Invite');
          setToastMessage(<>Saved!</>);
        }
      });
    }

    setHasUnsavedChanges(false);
    clearErrorMsgs();
  };

  const onSubmit = async () => {
    if (!(await validateFields())) {
      return;
    }
    if (first_name.length > 0 && last_name.length > 0) {
      setLoadingInvite(true);
      postApi({
        url: 'auth/invite-member',
        payload: {
          first_name,
          last_name,
          email: email_address,
          role_id,
          password: 'P@ssw0rd',
          confirm_password: 'P@ssw0rd',
          resend,
        },
      }).then((res) => {
        setLoadingInvite(false);
        clearErrorMsgs();
        if (res.results.errors) {
          if (
            res.results.errors.find(
              (error) => error.message === 'error.email.taken'
            )
          ) {
            setButtonName('Resend');
            setResend(true);
          }
          setFieldErrors(res.results.errors);
        } else if (res.results.error) {
          setApiFieldError(res.results.error);
        } else {
          clearFields();
          toast(
            <>
              Invite successfully sent to
              <br />
              {first_name} {last_name}!
            </>,
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
              bodyClassName: 'p-2',
              pauseOnFocusLoss: false,
            }
          );
        }
      });
    }
    setHasUnsavedChanges(false);
  };

  useEffect(() => {
    handleGetProfiles();
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    if (user?.user?.role_id) {
      setIsMember(true);
    }
  }, [user]);

  return (
    <Settings>
      <SettingsHeader
        title="Account Settings"
        secondaryButton={
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Cancel
          </Button>
        }
      />

      <SettingsContainer id="TeamMembers">
        <div className="flex flex-col gap-6">
          <SectionHeader title="Team Members" />
          <SectionHeader
            title="Invite team"
            description={<>{t('team-member-label')}</>}
          />
          {user?.user?.rbac_permissions?.includes(
            RbacPermissions.MANAGE_TEAM_MEMBERS_PAGE
          ) && (
            <>
              <SectionHeader title="Invite admins to company" />

              <div className="grid grid-cols-2 gap-4 m-0">
                <InputField
                  disabled={loadingInvite}
                  label="First Name"
                  onChange={handleOnFirstname}
                  error={first_name_error_msg}
                  placeholder="First name"
                  value={first_name}
                  variant={first_name_error_msg !== '' ? 'error' : 'default'}
                />
                <InputField
                  disabled={loadingInvite}
                  label="Last Name"
                  onChange={handleOnLastname}
                  error={last_name_error_msg}
                  placeholder="Last name"
                  value={last_name}
                  variant={last_name_error_msg !== '' ? 'error' : 'default'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 m-0">
                <InputField
                  disabled={loadingInvite}
                  label="Email Address"
                  onBlur={(e: any) => {
                    if (e.target.value.length === 0) {
                      setEmailErrorMessage('This is a required field.');
                    }
                  }}
                  onChange={handleOnChangeEmail}
                  error={
                    email_error_message ||
                    field_errors.find((x) => x.field === 'email')?.message ||
                    api_field_error
                  }
                  placeholder="Email@domain.com"
                  value={email_address}
                  variant={
                    email_error_message !== '' ||
                    field_errors.some((x) => x.field === 'email') ||
                    api_field_error !== ''
                      ? 'error'
                      : 'default'
                  }
                />
                <div
                  className="flex flex-col gap-1.5"
                  ref={ref as LegacyRef<HTMLDivElement>}
                >
                  <div
                    className={`dropdown ${is_expanded ? ' is-active' : ''}`}
                  >
                    <div className="dropdown-trigger">
                      <button
                        aria-controls="dropdown-menu"
                        aria-haspopup="true"
                        className={`button drop-down-button focus:outline-none focus:ring-1 focus:ring-indigo-500 ${role_error_msg.length > 0 ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={toggle}
                        tabIndex={3}
                        disabled={loadingInvite}
                      >
                        <Fragment>
                          <span
                            className={`for-dropdown ${role ? 'text-gray-700' : 'text-gray-500'}`}
                          >
                            {role ? role : 'Role'}
                          </span>
                          <span
                            className="icon is-small"
                            style={{ marginTop: '2px' }}
                          >
                            <ChevronDownIcon />
                          </span>
                        </Fragment>
                      </button>
                    </div>
                    <div
                      aria-hidden={!is_expanded}
                      className="dropdown-menu"
                      id="dropdown-menu"
                      onClick={toggle}
                      role="menu"
                    >
                      <div className="dropdown-content text-gray-600">
                        <Fragment>
                          <span
                            onClick={() => handleOnChangeRole('Super Admin')}
                            className="dropdown-item is-clickable drop-down-font text-inherit"
                          >
                            Super Admin
                          </span>
                          <span
                            onClick={() => handleOnChangeRole('Admin')}
                            className="dropdown-item is-clickable drop-down-font text-inherit"
                          >
                            Admin
                          </span>
                          <span
                            onClick={() => handleOnChangeRole('Manager')}
                            className="dropdown-item is-clickable drop-down-font text-inherit"
                          >
                            Manager
                          </span>
                        </Fragment>
                      </div>
                    </div>
                  </div>
                  {role_error_msg && (
                    <label className="not-italic font-medium text-sm leading-[17px] tracking-[0.005em] text-red-400 !important">
                      {role_error_msg}
                    </label>
                  )}
                </div>
              </div>

              <div>
                <Button
                  className="max-w-fit text-[13px]"
                  loading={loadingInvite}
                  onClick={async () => {
                    if (button_name === 'Save') {
                      await onSubmitEdit();
                    } else {
                      await onSubmit();
                    }
                  }}
                  variant="blue"
                >
                  {loadingInvite
                    ? `${
                        button_name === 'Resend'
                          ? button_name
                          : button_name === 'Save'
                            ? 'Sav'
                            : 'Invit'
                      }ing...`
                    : button_name}
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="columns is-mobile is-multiline">
          <div className="column">
            <div className="team-display-area">
              <div
                style={{
                  display: 'flex',
                  gap: '15px',
                  flexDirection: 'column',
                }}
              >
                <span className="header-label">Team</span>
                {fetching_team ? (
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {team_members.length === 0 ? (
                      <span
                        className="no-members"
                        style={{
                          marginBottom: '0px',
                          marginTop: '0px',
                        }}
                      >
                        {t('no-team-members-label')}
                      </span>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th className="team-member-name-width">Name</th>
                            <th className="role-width">Role</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {team_members.map((team, idx) => (
                            <>
                              <Modal id="Tags" isOpen={modalStates[idx]}>
                                <ModalBody>
                                  <span
                                    style={{
                                      display: 'flex',
                                      fontSize: 'x-large',
                                      justifyContent: 'end',
                                    }}
                                  >
                                    <label
                                      onClick={(e: any) => {
                                        e.preventDefault();
                                        handleSetModal(idx);
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
                                      Delete {selected_member_name}
                                    </span>
                                    <span className="modal-delete-text-sub">
                                      Are you sure you want to delete this
                                      admin?
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <button
                                      type="button"
                                      onClick={(e: any) => {
                                        e.preventDefault();
                                        handleSetModal(idx);
                                      }}
                                      className="button modal-cancel-btn"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e: any) => {
                                        e.preventDefault();
                                        onSubmitDelete(idx);
                                      }}
                                      id={idx.toString()}
                                      className="button modal-delete-btn"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </ModalBody>
                              </Modal>
                              <tr key={idx}>
                                <td className="team-member-name-width">
                                  <div className="avatar-and-info">
                                    <div className="placeholder-avatar">
                                      {team.profile_photo !=
                                      'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/profile-placeholder.svg' ? (
                                        <img
                                          className="is-rounded responsiveImage"
                                          src={team.profile_photo}
                                        />
                                      ) : (
                                        team.first_name?.charAt(0)
                                      )}
                                    </div>
                                    <div className="team-member-name">
                                      {team.full_name}
                                      <div className="team-member-email">
                                        {team.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="role-width">
                                  <div>{team.role_name}</div>
                                </td>
                                <td className="delete-member">
                                  {user?.rbac_permissions.includes(
                                    RbacPermissions.MANAGE_TEAM_MEMBERS_PAGE
                                  ) && (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="#44009a"
                                        className="bi bi-pencil-square is-clickable"
                                        viewBox="0 0 16 16"
                                        onClick={() =>
                                          handleOnClickEdit(team?.id || 0)
                                        }
                                      >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                      </svg>
                                      {((is_member &&
                                        user?.rbac_permissions.includes(
                                          RbacPermissions.DELETE_USER
                                        )) ||
                                        (!is_member && is_admin)) && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="red"
                                          className="bi bi-trash is-clickable"
                                          viewBox="0 0 16 16"
                                          onClick={(e: any) => {
                                            e.preventDefault();
                                            handleOnClickDelete(
                                              team?.id || 0,
                                              idx
                                            );
                                          }}
                                        >
                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SettingsContainer>
      <SettingsTable />
    </Settings>
  );
}
