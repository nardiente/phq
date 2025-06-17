import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import './styles.css';
import { Option } from './types';
import { useUser } from '../../../../contexts/UserContext';
import { useFeedback } from '../../../../contexts/FeedbackContext';
import { postApi } from '../../../../utils/api/api';
import { ChevronDownIcon } from '../../../icons/chevron-down.icon';
import { UserTypes } from '../../../../types/user';
import { PlusIcon } from '../../../icons/plus.icon';
import { AddNewUserModal } from '../../../AddNewUserModal';
import { useApp } from '../../../../contexts/AppContext';

interface Props {
  label?: string;
  placeholder?: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  selectedOption?: Option;
  setSelectedOption: Dispatch<SetStateAction<Option | undefined>>;
}

interface SearchUser {
  message: string;
  user_list: Option[];
}

export const CustomDropdown = ({
  label,
  options,
  setOptions,
  placeholder,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const ref = useRef<HTMLElement>();

  const { is_public } = useApp();
  const { user } = useUser();
  const {
    state: { selectedIdea },
  } = useFeedback();

  const [is_expanded, setExpanded] = useState(false);
  const [name, setName] = useState<string>('');
  const [showAddNewUser, setShowAddNewUser] = useState<boolean>(false);

  const toggle = () => setExpanded(!is_expanded);

  const seachUsers = (name: string, onChange: boolean = false) => {
    postApi({
      url: 'users/search',
      payload: {
        name,
        is_public,
        is_on_behalf: true,
        limit: 100,
      },
    }).then((res) => {
      if (res.results.data) {
        const data = res.results.data as SearchUser;
        const options = data.user_list.filter(
          (option) => option.id !== user?.user?.id
        );
        setOptions(options);
        if (!onChange) {
          setSelectedOption(
            options.find(
              (option) => option.id === selectedIdea?.vote_on_behalf_id
            )
          );
        }
      }
    });
  };

  useEffect(() => {
    seachUsers(name);
    const expand = (e: any) => {
      if (!ref.current || !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', expand);
    return () => {
      document.removeEventListener('mousedown', expand);
    };
  }, []);

  useEffect(() => {
    setName(selectedOption?.value ?? name);
  }, [selectedOption]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpanded(true);
    setName(e.target.value);
  };

  const onSelectOption = (option: Option) => {
    setSelectedOption(option);
    toggle();
  };

  return (
    <>
      <div id="custom-dropdown" ref={ref as LegacyRef<HTMLDivElement>}>
        {label && label.length > 0 && <label>{label}</label>}
        <div className={`dropdown width-100 ${is_expanded ? 'is-active' : ''}`}>
          <input
            className={`input${is_expanded ? ' focus' : ''}`}
            aria-controls="options"
            placeholder={placeholder}
            onChange={onInputChange}
            onKeyUp={(e) =>
              seachUsers((e.target as HTMLInputElement).value, true)
            }
            onFocus={() => setExpanded(true)}
            value={name}
          />
          <span className="icon is-small is-right" onClick={toggle}>
            <ChevronDownIcon />
          </span>
          <div
            aria-hidden={!is_expanded}
            className={`dropdown-menu${
              !is_expanded || !options ? ' hidden' : ''
            }`}
            id="options"
          >
            {options?.map((option, idx) => (
              <div
                key={idx}
                className="item is-clickable"
                onClick={() => onSelectOption(option)}
              >
                <figure className="image">
                  {option.profile_photo ? (
                    <img className="is-rounded" src={option.profile_photo} />
                  ) : (
                    <div className="is-rounded avatar">
                      {option.value.toUpperCase().charAt(0)}
                    </div>
                  )}
                </figure>
                <div className="details">
                  <div className="name">{option.value}</div>
                  <div className="email">{option.email}</div>
                </div>
                {option.type === UserTypes.CUSTOMER && (
                  <div className="admin-tag">Admin</div>
                )}
              </div>
            ))}
            <div className="add-new-user">
              <hr />
              <div
                className="item is-clickable"
                onClick={() => setShowAddNewUser(true)}
              >
                <PlusIcon />
                Add a new user
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewUserModal
        open={showAddNewUser}
        title="Vote on behalf of"
        onClose={() => setShowAddNewUser(false)}
      />
    </>
  );
};
