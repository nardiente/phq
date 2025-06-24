import { bottomMenuItems } from '../constants/menuItems';
import { RbacPermissions } from '../types/common';
import { User } from '../types/user';

export const getBottomMenuItems = (user?: User) => {
  return bottomMenuItems.map((menu) =>
    menu.id === 'settings'
      ? {
          ...menu,
          hidden: !user?.rbac_permissions?.includes(
            RbacPermissions.MANAGE_ACCOUNT_DETAILS_PAGE
          ),
        }
      : menu
  );
};
