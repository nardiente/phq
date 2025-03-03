import * as React from 'react';
import './styles.css';
import { getApi } from '../../utils/api/api';
import SettingsContainer from '../SettingsContainer';
import SectionHeader from '../SectionHeader';
import { Loader } from 'lucide-react';

interface RbacPermission {
  id: number;
  is_hidden?: boolean;
  name: string;
  rbac_group_id: number;
  tag: string;
}

interface RolesPermission {
  id: number;
  has_permission: boolean;
  rbac_permission_id: number;
  role_id: number;
}

export const SettingsTable: React.FC = () => {
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [permissions, setPermissions] = React.useState<RbacPermission[]>([]);
  const [rolesPermission, setRolesPermission] = React.useState<
    RolesPermission[]
  >([]);

  const rolesData = [
    { id: 1, tag: 'superadmin', name: 'Super Admin' },
    { id: 2, tag: 'admin', name: 'Admin' },
    { id: 3, tag: 'manager', name: 'Manager' },
  ];

  React.useEffect(() => {
    setFetching(true);

    const rbcaPermissionsPromise = getApi<RbacPermission[]>({
      url: 'users/rbac-permissions',
    });

    const rolesPermissionPromise = getApi<RolesPermission[]>({
      url: 'users/roles-permission',
    });

    Promise.all([rbcaPermissionsPromise, rolesPermissionPromise]).then(
      ([rbcaPermissionsRes, rolesPermissionRes]) => {
        setFetching(false);
        setPermissions(rbcaPermissionsRes.results.data || []);
        setRolesPermission(rolesPermissionRes.results.data || []);
      }
    );
  }, []);

  const roles = permissions.map((rbacGroup) => {
    const permissions = rolesPermission
      .filter((permission) => permission.rbac_permission_id === rbacGroup.id)
      .map((permission) => {
        const rolePermissions = rolesData.map((role) => {
          const rolesPermissionRes = rolesPermission.find(
            (rp) =>
              rp.rbac_permission_id === permission.id && rp.role_id === role.id
          );

          return {
            role: role.name,
            value: rolesPermissionRes
              ? rolesPermissionRes.has_permission
              : false,
          };
        });

        // Extract the first three third-level values
        const firstThreeThirdLevelValues = rolePermissions
          .slice(0, 3)
          .map((permission, index) => ({
            role: permission.role,
            value:
              index === 1
                ? rolePermissions[2].value
                : index === 2
                  ? rolePermissions[1].value
                  : permission.value,
          }));

        return firstThreeThirdLevelValues; // Keep only the first three third-level values
      })
      .reduce((acc, curr) => acc.concat(curr), []) // Flatten the third-level values using reduce
      .slice(0, 3)
      .reverse();

    return {
      name: rbacGroup.name,
      permissions, // Assign the flattened and limited third-level values to 'permissions'
      rbac_group_id: rbacGroup.rbac_group_id,
    };
  });

  return fetching ? (
    <div className="flex items-center justify-center mt-5">
      <Loader />
    </div>
  ) : (
    <SettingsContainer id="rolePermission">
      <div className="flex flex-col gap-6">
        <SectionHeader title="Role Permissions" />
        <span className="table-title">Settings</span>
        <table>
          <thead>
            <tr>
              <th className="permissions-col">Permissions</th>
              <th className="status">Manager</th>
              <th className="status">Admin</th>
              <th className="status">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((item) => item.rbac_group_id == 1)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {item.permissions.map((item, index) => (
                    <td className="status" key={index}>
                      {item.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg check-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x  x-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <span className="table-title">General</span>

        <table>
          <thead>
            <tr>
              <th className="permissions-col">Permissions</th>
              <th className="status">Manager</th>
              <th className="status">Admin</th>
              <th className="status">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((item) => item.rbac_group_id == 2)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {item.permissions.map((item, index) => (
                    <td className="status" key={index}>
                      {item.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg check-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x  x-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <span className="table-title">Upvotes</span>

        <table>
          <thead>
            <tr>
              <th className="permissions-col">Permissions</th>
              <th className="status">Manager</th>
              <th className="status">Admin</th>
              <th className="status">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((item) => item.rbac_group_id == 3)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {item.permissions.map((item, index) => (
                    <td className="status" key={index}>
                      {item.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg check-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x  x-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <span className="table-title">Roadmap</span>

        <table>
          <thead>
            <tr>
              <th className="permissions-col">Permissions</th>
              <th className="status">Manager</th>
              <th className="status">Admin</th>
              <th className="status">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((item) => item.rbac_group_id == 4)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {item.permissions.map((item, index) => (
                    <td className="status" key={index}>
                      {item.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg check-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x  x-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <span className="table-title">What&apos;s new</span>

        <table>
          <thead>
            <tr>
              <th className="permissions-col">Permissions</th>
              <th className="status">Manager</th>
              <th className="status">Admin</th>
              <th className="status">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((item) => item.rbac_group_id == 5)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {item.permissions.map((item, index) => (
                    <td className="status" key={index}>
                      {item.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg check-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x  x-mark"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </SettingsContainer>
  );
};

export default SettingsTable;
