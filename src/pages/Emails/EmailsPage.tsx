import { useEffect, useRef, useState } from 'react';
import TabNavigation from '../../components/TabNavigation';
import { AdminEmails } from './components/AdminEmails';
import { CustomerEmails } from './components/CustomerEmails';
import { Emails } from '../../types/email';
import { getApi, putApi } from '../../utils/api/api';
import { useUser } from '../../contexts/UserContext';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import SettingsContainer from '../../components/SettingsContainer';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export default function EmailsPage() {
  const navigate = useNavigate();

  const { initialUser, setUser } = useUser();

  const [activeTab, setActiveTab] = useState<
    'Admin Emails' | 'Customer Emails'
  >('Admin Emails');
  const [emails, setEmails] = useState<Emails>({
    admin: {
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
        setUser((prev) =>
          prev ? { ...prev, emails: data } : { ...initialUser, emails: data }
        );
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
    <Settings>
      <SettingsHeader
        title="Account Settings"
        secondaryButton={
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Cancel
          </Button>
        }
      />
      <SettingsContainer>
        <SectionHeader
          title="Emails"
          description="Manage your email preferences for this project"
        />
        <TabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          tabs={['Admin Emails', 'Customer Emails']}
        />
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
      </SettingsContainer>
    </Settings>
  );
}
