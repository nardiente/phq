import './styles.css';
import SettingsContainer from '../SettingsContainer';
import SectionHeader from '../SectionHeader';
import { Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const SettingsTable: React.FC = () => {
  const { fetching, permissions, roles, rolesPermission } = useApp();

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
            {permissions
              .filter((item) => item.rbac_group_id === 1 && !item.is_hidden)
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="permissions-col">{item.name}</td>

                    {roles.map((role, idx) => {
                      const hasPermission =
                        rolesPermission.find(
                          (rolePermission) =>
                            rolePermission.rbac_permission_id === item.id &&
                            rolePermission.role_id === role.id
                        )?.has_permission ?? false;

                      return (
                        <td key={idx} className="status">
                          {hasPermission ? (
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
                      );
                    })}
                  </tr>
                );
              })}
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
            {permissions
              .filter((item) => item.rbac_group_id == 2)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {roles.map((role, idx) => {
                    const hasPermission =
                      rolesPermission.find(
                        (rolePermission) =>
                          rolePermission.rbac_permission_id === item.id &&
                          rolePermission.role_id === role.id
                      )?.has_permission ?? false;

                    return (
                      <td key={idx} className="status">
                        {hasPermission ? (
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
                    );
                  })}
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
            {permissions
              .filter((item) => item.rbac_group_id == 3)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {roles.map((role, idx) => {
                    const hasPermission =
                      rolesPermission.find(
                        (rolePermission) =>
                          rolePermission.rbac_permission_id === item.id &&
                          rolePermission.role_id === role.id
                      )?.has_permission ?? false;

                    return (
                      <td key={idx} className="status">
                        {hasPermission ? (
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
                    );
                  })}
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
            {permissions
              .filter((item) => item.rbac_group_id == 4)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {roles.map((role, idx) => {
                    const hasPermission =
                      rolesPermission.find(
                        (rolePermission) =>
                          rolePermission.rbac_permission_id === item.id &&
                          rolePermission.role_id === role.id
                      )?.has_permission ?? false;

                    return (
                      <td key={idx} className="status">
                        {hasPermission ? (
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
                    );
                  })}
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
            {permissions
              .filter((item) => item.rbac_group_id == 5)
              .map((item, index) => (
                <tr key={index}>
                  <td className="permissions-col">{item.name}</td>

                  {roles.map((role, idx) => {
                    const hasPermission =
                      rolesPermission.find(
                        (rolePermission) =>
                          rolePermission.rbac_permission_id === item.id &&
                          rolePermission.role_id === role.id
                      )?.has_permission ?? false;

                    return (
                      <td key={idx} className="status">
                        {hasPermission ? (
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
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </SettingsContainer>
  );
};

export default SettingsTable;
