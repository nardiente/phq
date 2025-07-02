import { Trash2, Edit } from 'lucide-react';
import { UserContextConfig, useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { postApi } from '../utils/api/api';
import { setImpersonator, setKaslKey } from '../utils/localStorage';
import { useApp } from '../contexts/AppContext';
import {
  bottomMenuItems,
  designSystemItem,
  mainMenuItems,
  publicViewMenuItems,
  settingsMenuItems,
  superDuperAdminItems,
} from '../constants/menuItems';
import { isSuperDuperAdmin } from '../utils/user';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../utils/date';
import moment from 'moment';

const SuperDuperAdminPage = () => {
  const navigate = useNavigate();

  const { is_public, roles, setMenuItems } = useApp();
  const { access_history: teamMembers, user: userContext, setUser } = useUser();
  const { user } = userContext ?? {};

  const [id_email, setIdEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [role_id, setRoleId] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const onAccess = () => {
    let inputError = 'Please';
    if (id_email.length === 0) {
      inputError += ' enter a customer ID/email';
    }
    if (role_id === 0) {
      inputError += `${id_email.length === 0 ? ' and' : ''} select a role`;
    }
    if (id_email.length === 0 || role_id === 0) {
      inputError += '.';
      setError(inputError);
      return;
    }
    setError('');
    // Proceed with access logic
    setLoading(true);
    postApi<UserContextConfig>({
      url: 'users/impersonate',
      payload: { id_email, role_id },
    }).then((res) => {
      setLoading(false);
      const {
        results: { error, data },
      } = res;
      if (error) {
        setError(error);
      }
      if (data?.user?.kasl_key) {
        setMenuItems(
          is_public
            ? publicViewMenuItems
            : isSuperDuperAdmin(data.user)
              ? superDuperAdminItems
              : [
                  ...mainMenuItems,
                  ...settingsMenuItems,
                  ...bottomMenuItems,
                  designSystemItem,
                ]
        );
        setImpersonator(user);
        setKaslKey(data.user?.kasl_key);
        setUser(data);
        navigate(
          isSuperDuperAdmin(data.user)
            ? '/super-duper-admin'
            : is_public
              ? '/upvotes'
              : '/dashboard'
        );
      }
    });
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">
            <h2 className="text-xl font-semibold mb-4">
              Super Duper Admin Access
            </h2>
            <p className="mb-6">
              Super Duper admins can access and control any customer's instance
              for efficient troubleshooting and support.
            </p>

            {/* Invite Form */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">
                Access Customer Instance
              </h3>
              {error && (
                <div className="mb-2 text-red-500 text-sm">{error}</div>
              )}
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Customer ID or email"
                  className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                  onChange={(e) => setIdEmail(e.target.value)}
                  value={id_email}
                />
                <select
                  className="border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                  onChange={(e) => setRoleId(Number(e.target.value))}
                  value={role_id ?? ''}
                >
                  <option value="">Role</option>
                  {roles.map((role, idx) => (
                    <option key={idx} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary"
                  disabled={loading}
                  onClick={onAccess}
                  type="button"
                >
                  {`Access${loading ? 'ing...' : ''}`}
                </button>
              </div>
            </div>

            {/* Team Members Table */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Recent Access History
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 text-inherit">Customer</th>
                    <th className="pb-2 text-inherit">Accessed As</th>
                    <th className="pb-2 text-inherit">Time</th>
                    <th className="pb-2 text-inherit">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 flex items-center align-middle">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3">
                          {member.customer?.profile_photo &&
                          member.customer?.profile_photo !==
                            'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/profile-placeholder.svg' ? (
                            <img
                              className="is-rounded responsiveImage rounded-full"
                              src={member.customer?.profile_photo}
                            />
                          ) : (
                            <span className="h-8 flex items-center justify-center bg-purple-100 text-purple-600 text-lg rounded-full">
                              {member.customer?.first_name?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div>{member.customer?.full_name}</div>
                          <div className="text-sm text-gray-500">
                            {member.customer?.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 align-middle">{member.role.name}</td>
                      <td className="py-3 align-middle">
                        {convertDate(
                          member.created_at ?? moment().toISOString()
                        )}
                      </td>
                      <td className="py-3 align-middle">
                        <button className="text-purple-600 mr-2">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-gray-500 text-sm">
          Super Duper Admin access will expire in 23:45:30.{' '}
          <a href="#" className="text-purple-600">
            Extend access
          </a>
        </footer>
      </div>
    </div>
  );
};

export default SuperDuperAdminPage;
