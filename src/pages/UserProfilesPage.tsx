import { useState } from 'react';
import PersonalInfo from '../components/PersonalInfo';
import RecentActivities from '../components/RecentActivities';
import Surveys from '../components/Surveys';
import Feedback from '../components/Feedback';
import Interviews from '../components/Interviews';
import UserProfileSidebar from '../components/UserProfileSidebar';

export default function UserProfilesPage() {
  const [activeSection, setActiveSection] = useState('personal-info');

  const renderContent = () => {
    switch (activeSection) {
      case 'personal-info':
        return <PersonalInfo />;
      case 'user-research':
        return <div>User Research Content</div>;
      case 'recent-activities':
        return <RecentActivities />;
      case 'surveys':
        return <Surveys />;
      case 'feedback':
        return <Feedback />;
      case 'interviews':
        return <Interviews />;
      default:
        return (
          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold mb-6">Select a section</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1">
      <UserProfileSidebar
        userName="Mark Williams"
        userEmail="mark@producthq.io"
        userImage="/path-to-image.jpg"
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {renderContent()}
    </div>
  );
}
