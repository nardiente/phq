import { useEffect, useState } from 'react';
import { RadioIcon } from '../../components/icons/radio.icon';
import { RadioFillIcon } from '../../components/icons/radio-fill.icon';
import './styles.css';
import { generateUserNameFormats } from '../../utils/user';
import {
  DisplayUserName as DisplayUserNameType,
  UserNameFormat,
} from '../../types/appearance';
import { useUser } from '../../contexts/UserContext';

export const DisplayUserName = ({
  selectedFormat,
  handleOnChangeUserNameFormat,
}: {
  selectedFormat?: UserNameFormat;
  handleOnChangeUserNameFormat: (format: UserNameFormat) => void;
}) => {
  const { user } = useUser();

  const [userNames, setUserNames] = useState<DisplayUserNameType[]>();

  useEffect(() => {
    if (user?.user) {
      setUserNames(generateUserNameFormats(user.user));
    }
  }, [user]);

  return (
    <div
      id="display-user-name"
      className="bg-white rounded-lg border border-gray-200 p-6 mx-8"
    >
      <div className="header-text">
        <p className="header">Display User Name</p>
        <p className="text-description">
          This setting allows you to change how your user&apos;s names are
          displayed on your public page.
        </p>
      </div>
      <div className="options">
        {userNames?.map((userName, idx) => (
          <div key={idx} className="option text-[#110733] text-[14px]">
            <a
              className="trigger"
              onClick={() => handleOnChangeUserNameFormat(userName.format)}
            >
              {selectedFormat === userName.format ? (
                <RadioFillIcon />
              ) : (
                <RadioIcon />
              )}
            </a>
            {userName.text}
          </div>
        ))}
      </div>
    </div>
  );
};
