import { useEffect, useRef, useState } from 'react';
import TabNavigation from '../../components/TabNavigation';
import { AdminEmails } from './components/AdminEmails';
import { CustomerEmails } from './components/CustomerEmails';
import { Emails } from '../../types/email';
import { getApi, putApi } from '../../utils/api/api';
import { useUser } from '../../contexts/UserContext';
import { useApp } from '../../contexts/AppContext';

export default function EmailsPage() {
  const { is_public } = useApp();
  const { setUser } = useUser();

  const [activeTab, setActiveTab] = useState<
    'Admin Emails' | 'Customer Emails'
  >('Admin Emails');
  const [emails, setEmails] = useState<Emails>({
    admin: {
      email: '',
      frequency: { label: 'Weekly', value: 'weekly' },
      notificationSettings: { comments: true, feedback: true, ideas: true },
    },
    customer: {
      email: '',
      frequency: { label: 'Weekly', value: 'weekly' },
      notificationSettings: { comments: true, feedback: true, ideas: true },
    },
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getApi<Emails>({ url: 'emails' }).then((res) => {
      const {
        results: { data },
      } = res;
      if (data) {
        setEmails(data);
        setUser((prev) => ({ ...prev, emails: data }));
      }
    });
  }, []);

  const handleUpdateEmails = (
    role: 'admin' | 'customer',
    updated: Emails['admin'] | Emails['customer']
  ) => {
    const updatedEmails = {
      ...emails,
      [role]: updated,
    };
    setEmails(updatedEmails);

    // Only PUT if we have an id (i.e., after initial fetch)
    if (emails.id) {
      putApi<Emails>(`emails/${emails.id}`, updatedEmails).then((res) => {
        const {
          results: { data },
        } = res;
        if (data) {
          setEmails(data);
        }
      });
    }
  };

  return (
    <div
      className={`flex-1 px-8 py-6 flex justify-center ${is_public ? 'background-color' : 'bg-zinc-50'}`}
    >
      <div className="max-w-[800px]">
        <h1 className="text-h1 font-semibold text-gray-900 mb-6">Emails</h1>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          tabs={['Admin Emails', 'Customer Emails']}
        />
        <p className="text-[14px] text-gray-600 mb-8 mt-4">
          Manage your email preferences for this project
        </p>

        {activeTab === 'Admin Emails' && (
          <AdminEmails
            emailContext={emails.admin}
            setEmails={(updated) => handleUpdateEmails('admin', updated)}
          />
        )}
        {activeTab === 'Customer Emails' && (
          <CustomerEmails
            emailContext={emails.customer}
            setEmails={(updated) => handleUpdateEmails('customer', updated)}
          />
        )}
      </div>
    </div>
  );
}
