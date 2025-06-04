import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './styles.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useState } from 'react';
import { ApiFieldError } from '../../utils/api/types';
import { postApi } from '../../utils/api/api';
import { usePanel } from '../../contexts/PanelContext';
import { Feedback } from '../../types/feedback';
import { UIField } from '../UIField';
import {
  validateEmailWithResponse,
  validateFullName,
} from '../../utils/custom-validation';
import { Loader } from 'lucide-react';
import { PlusIcon } from '../icons/plus.icon';
import { Checkbox } from '../Checkbox';
import { useUser } from '../../contexts/UserContext';
import { useSocket } from '../../contexts/SocketContext';
import { SocketAction } from '../../types/socket';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
}

export const AddNewUserModal = ({ open, title, onClose }: Props) => {
  const { t } = useTranslation();

  const {
    state: { selectedIdea },
    updateIdea,
    setSelectedIdea,
  } = useFeedback();
  const { setActivePage } = usePanel();
  const { user: userContext } = useUser();
  const { project, user } = userContext ?? {};
  const {
    state: { socket },
  } = useSocket();

  const [addingUser, setAddingUser] = useState<boolean>(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<ApiFieldError[]>([]);

  const disabled =
    first_name.trim().length === 0 ||
    last_name.trim().length === 0 ||
    email.trim().length === 0 ||
    !hasPermission ||
    fieldErrors.length > 0 ||
    addingUser;

  const resetFormData = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setHasPermission(false);
    setFieldErrors([]);
    setAddingUser(false);
  };

  const handleClose = () => {
    onClose();
    resetFormData();
  };

  const onAddUser = () => {
    setAddingUser(true);
    postApi({
      url: `feedback/${selectedIdea?.id ?? 0}/vote-on-behalf/add-user`,
      payload: {
        email,
        first_name,
        last_name,
      },
    }).then((res) => {
      setAddingUser(false);
      if (res.results.errors && res.results.errors.length > 0) {
        setFieldErrors((prev) => {
          let err = prev;
          res.results.errors?.forEach((error) => {
            err = prev.filter((e) => e.field !== error.field);
          });
          res.results.errors?.forEach((error) => {
            err.push({
              field: error.field,
              message: t(error.message),
            });
          });
          return err;
        });
        return;
      }
      if (res.results.error) {
        toast('Vote on behalf of was not successful.', {
          autoClose: 3000,
          bodyClassName: 'p-2',
          className: 'custom-theme',
          closeOnClick: true,
          draggable: false,
          hideProgressBar: true,
          pauseOnHover: true,
          pauseOnFocusLoss: false,
          position: 'bottom-center',
          theme: 'dark',
        });
        return;
      }

      handleClose();
      setActivePage('add_comment');

      toast('The user has been successfully added to the upvote.', {
        bodyClassName: 'p-2',
        className: 'toast-success',
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        autoClose: 3000,
        position: 'bottom-center',
        hideProgressBar: true,
        draggable: false,
        theme: 'colored',
      });

      const idea = res.results.data as Feedback;

      const updated_idea = {
        ...selectedIdea,
        vote: idea.vote,
        vote_on_behalf: idea.vote_on_behalf,
        vote_on_behalf_id: idea.vote_on_behalf_id,
        index: selectedIdea?.index ?? 0,
      };
      updateIdea(updated_idea);
      setSelectedIdea(updated_idea);
      socket?.emit('message', {
        action: SocketAction.UPDATE_IDEA,
        data: {
          idea: updated_idea,
          user_id: user?.id,
          projectId: project?.id,
        },
      });
    });
  };

  return (
    <Modal id="addNewUserModal" isOpen={open}>
      <ModalHeader>
        <span className="x-button">
          <label
            onClick={() => {
              if (!addingUser) {
                handleClose();
              }
            }}
          >
            <img
              className={addingUser ? 'disabled' : 'is-clickable'}
              src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/cross.svg"
              role="button"
            />
          </label>
        </span>
        <span className="title">{title}</span>
      </ModalHeader>
      <ModalBody>
        <div className="body-container">
          <div className="form-container">
            <UIField
              class_name="input-enclosed for-input"
              id="FirstNameField"
              placeholder="First name"
              value={first_name}
              type="text"
              tab_index={1}
              onBlur={(e) => {
                const message = validateFullName(e.target.value);
                if (message !== null) {
                  setFieldErrors((prev) => {
                    const err = prev.filter(
                      (err) => err.field !== 'first_name'
                    );
                    err.push({ field: 'first_name', message });
                    return err;
                  });
                }
              }}
              onChange={(e) => {
                setFieldErrors((prev) =>
                  prev.filter((error) => error.field !== 'first_name')
                );
                setFirstName(e.target.value);
              }}
              label="First Name"
              is_error_state={fieldErrors.some(
                (error) => error.field === 'first_name'
              )}
              error_label={
                fieldErrors.find((error) => error.field === 'first_name')
                  ?.message
              }
              input_class="bg-white"
            />
            <UIField
              class_name="input-enclosed for-input"
              id="LastNameField"
              placeholder="Last name"
              value={last_name}
              type="text"
              tab_index={2}
              onBlur={(e) => {
                const message = validateFullName(e.target.value);
                if (message !== null) {
                  setFieldErrors((prev) => {
                    const err = prev.filter((err) => err.field !== 'last_name');
                    err.push({ field: 'last_name', message });
                    return err;
                  });
                }
              }}
              onChange={(e) => {
                setFieldErrors((prev) =>
                  prev.filter((error) => error.field !== 'last_name')
                );
                setLastName(e.target.value);
              }}
              label="Last Name"
              is_error_state={fieldErrors.some(
                (error) => error.field === 'last_name'
              )}
              error_label={
                fieldErrors.find((error) => error.field === 'last_name')
                  ?.message
              }
              input_class="bg-white"
            />
            <UIField
              container_class="width-49"
              id="EmailField"
              placeholder="Email"
              type="email"
              max_length={256}
              onChange={(e) => {
                setFieldErrors((prev) =>
                  prev.filter((field_error) => field_error.field !== 'email')
                );
                setEmail(e.target.value);
              }}
              value={email}
              label="Email"
              input_class="bg-white"
              onBlur={(e) => {
                const message = validateEmailWithResponse(e.target.value);
                if (message != null) {
                  setFieldErrors((prev) => {
                    const err = prev.filter((error) => error.field !== 'email');
                    err.push({ field: 'email', message });
                    return err;
                  });
                }
              }}
              error_label={
                fieldErrors.find((field_error) => field_error.field === 'email')
                  ?.message
              }
              is_error_state={fieldErrors.some(
                (error) => error.field === 'email'
              )}
              tab_index={3}
            />
            <Checkbox
              checked={hasPermission}
              onChange={setHasPermission}
              label={"I have permission to add this person's details"}
            />
          </div>
          <div className="submit-idea-button">
            <button
              className="cancel is-clickable"
              onClick={handleClose}
              type="button"
              disabled={addingUser}
            >
              Cancel
            </button>
            <button
              className="is-clickable"
              disabled={disabled}
              onClick={onAddUser}
              type="button"
            >
              {addingUser ? (
                <div style={{ marginTop: '0.8rem', marginLeft: '24px' }}>
                  <Loader />
                </div>
              ) : (
                <>
                  <PlusIcon />
                  Add user
                </>
              )}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
