import { useEffect, useRef, useState } from 'react';
import TabNavigation from '../../components/TabNavigation';
import { AdminEmails } from './components/AdminEmails';
import { CustomerEmail, Email, Emails } from '../../types/email';
import { defaultEmails } from '../../constants/emails';
import { putApi } from '../../utils/api/api';
import { useUser } from '../../contexts/UserContext';
import { CustomerEmails } from './components/CustomerEmails';

export default function EmailsPage() {
  const {
    team,
    user: userContext,
    getPublicUsers,
    getUserEmail,
    setEmails,
  } = useUser();
  const { emails = defaultEmails } = userContext ?? {};

  const [activeTab, setActiveTab] = useState<{ id: string; text: string }>({
    id: 'admin',
    text: 'Admin Emails',
  }); // 'admin' or 'customer'
  const [adminEmail, setAdminEmail] = useState<Email>(emails.admin);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getUserEmail();
    if (!team.owner) {
      getPublicUsers();
    }
  }, []);

  useEffect(() => {
    setAdminEmail(emails.admin);
  }, [emails]);

  const handleUpdateAdminEmail = (admin: Email) => {
    const updatedEmails = { ...emails, admin };
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

  const handleUpdateCustomerEmail = (customer?: CustomerEmail) => {
    const updatedEmails = { ...emails, customer };
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
    <div className="flex-1 px-8 py-6 flex justify-center">
      <div className="max-w-[800px] w-full">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Emails</h1>

        {/* Tabs */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          tabs={[
            { id: 'admin', text: 'Admin Emails' },
            { id: 'customer', text: 'Customer Emails' },
          ]}
        />

        {/* Admin Emails Tab Content */}
        {activeTab.id === 'admin' && (
          <AdminEmails
            emailContext={adminEmail}
            setEmails={handleUpdateAdminEmail}
          />
        )}

        {activeTab.id === 'customer' && (
          <CustomerEmails
            customerEmail={emails.customer}
            setEmails={handleUpdateCustomerEmail}
          />
        )}
      </div>
    </div>
  );
}
