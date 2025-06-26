import { Trash2, Edit } from 'lucide-react';
import { AccessHistory } from '../types/super-duper-admin';

const SuperDuperAdminPage = () => {
  const teamMembers: AccessHistory[] = [
    {
      accessed_by_id: 0,
      customer_id: 0,
      customer: {
        full_name: 'Margie Sutton',
        email: 'margiesutton@gmail.com',
      },
      role: { name: 'Admin', tag: 'admin' },
      timestamp: new Date().toISOString(),
    },
    {
      accessed_by_id: 0,
      customer_id: 0,
      customer: { full_name: 'Della Lewis', email: 'dellalewis@gmail.com' },
      role: { name: 'Super Admin', tag: 'superadmin' },
      timestamp: new Date().toISOString(),
    },
    {
      accessed_by_id: 0,
      customer_id: 0,
      customer: { full_name: 'Earl Owen', email: 'owen@gmail.com' },
      role: { name: 'Manager', tag: 'manager' },
      timestamp: new Date().toISOString(),
    },
  ];

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
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Customer ID or Name"
                  className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
                <select className="border rounded-md px-3 py-2 focus:outline-none focus:border-primary">
                  <option>Role</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Contributor</option>
                </select>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary">
                  Access
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
                      <td className="py-3 flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div>{member.customer?.full_name}</div>
                          <div className="text-sm text-gray-500">
                            {member.customer?.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3">{member.role.name}</td>
                      <td className="py-3">2 hours ago</td>
                      <td className="py-3">
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
