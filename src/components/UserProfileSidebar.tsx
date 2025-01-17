import React from 'react';
import {
  User,
  FileText,
  Activity,
  ClipboardList,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface UserProfileSidebarProps {
  userName: string;
  userEmail: string;
  userImage: string;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({
  userName,
  userEmail,
  activeSection = 'personal-info',
  onSectionChange,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* User Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-700">M</span>
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <h2 className="mt-4 text-lg font-semibold">{userName}</h2>
        <p className="text-gray-600 text-sm">{userEmail}</p>
        <div className="flex gap-2 mt-3">
          <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">f</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">t</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">in</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'personal-info'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('personal-info')}
            >
              <User className="w-5 h-5 mr-3" />
              Personal Info
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'user-research'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('user-research')}
            >
              <FileText className="w-5 h-5 mr-3" />
              User Research
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'recent-activities'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('recent-activities')}
            >
              <Activity className="w-5 h-5 mr-3" />
              Recent Activities
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'surveys'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('surveys')}
            >
              <ClipboardList className="w-5 h-5 mr-3" />
              Surveys
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'feedback'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('feedback')}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Feedback
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left ${
                activeSection === 'interviews'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-700'
              }`}
              onClick={() => onSectionChange?.('interviews')}
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Interviews
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserProfileSidebar;
