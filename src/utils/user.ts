import { User } from '../types/user';
import {
  DisplayUserName,
  UserNameFormat,
  userNameFormats,
} from '../types/appearance';

export const generateUserNameFormats = (user: User): DisplayUserName[] => {
  const userNames: DisplayUserName[] = [];

  for (const userNameFormat of userNameFormats) {
    switch (userNameFormat) {
      case UserNameFormat.AF_FL:
        userNames.push({
          text: user.first_name?.charAt(0) + '. ' + user.last_name,
          format: UserNameFormat.AF_FL,
        });
        break;
      case UserNameFormat.FF_AL:
        userNames.push({
          text: user.first_name + ' ' + user.last_name?.charAt(0) + '.',
          format: UserNameFormat.FF_AL,
        });
        break;
      case UserNameFormat.FF_FL:
        userNames.push({
          text: user.first_name + ' ' + user.last_name,
          format: UserNameFormat.FF_FL,
        });
        break;
      case UserNameFormat.FL_LF:
        userNames.push({
          text: user.last_name + ' ' + user.first_name,
          format: UserNameFormat.FL_LF,
        });
        break;
      case UserNameFormat.FN:
        userNames.push({
          text: user.first_name ?? '',
          format: UserNameFormat.FN,
        });
        break;
      case UserNameFormat.LN:
        userNames.push({
          text: user.last_name ?? '',
          format: UserNameFormat.LN,
        });
        break;
      default:
        userNames.push({
          text: user.first_name + ' ' + user.last_name,
          format: UserNameFormat.FF_FL,
        });
        break;
    }
  }

  return userNames;
};
