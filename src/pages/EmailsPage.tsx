import { useEffect, useState } from 'react';
import TabNavigation from '../components/TabNavigation';
import { RadioButtonOptions } from '../components/RadioButtonOptions';
import { useFeedback } from '../contexts/FeedbackContext';
import moment, { Moment } from 'moment';
import { removeHtmlTags } from '../utils/string';

export default function EmailsPage() {
  const {
    state: { comments, filteredIdeas, upvotes },
  } = useFeedback();

  const [activeTab, setActiveTab] = useState<string>('Admin Emails');
  const [email, setEmail] = useState<string>('');
  const [frequency, setFrequency] = useState<{
    label: string | 'Daily' | 'Weekly' | 'Monthly';
    value: string | 'daily' | 'weekly' | 'monthly';
  }>({
    label: 'Weekly',
    value: 'weekly',
  });
  const [notificationSettings, setNotificationSettings] = useState<{
    ideas: boolean;
    feedback: boolean;
    comments: boolean;
  }>({ ideas: true, feedback: true, comments: true });

  const [start, setStart] = useState<Moment>(moment());
  const end = moment();

  const frequencies = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  useEffect(() => {
    switch (frequency.value) {
      case 'weekly':
        setStart(moment().subtract(7, 'days'));
        break;
      case 'monthly':
        setStart(moment().subtract(1, 'months'));
        break;
      default:
        setStart(moment());
        break;
    }
  }, [frequency.value]);

  const commentsByFrequency = () => {
    return comments.filter((comment) => {
      const created_at = moment(comment.created_at);
      return created_at.isBetween(start, end, undefined, '[]');
    });
  };

  const ideasByFrequency = () => {
    return filteredIdeas.filter((idea) => {
      const created_at = moment(idea.created_at);
      return created_at.isBetween(start, end, undefined, '[]');
    });
  };

  const upvotesByFrequency = () => {
    const feedbacks = upvotes.filter((upvote) => {
      const created_at = moment(upvote.created_at);
      return created_at.isBetween(start, end, undefined, '[]');
    });

    return filteredIdeas.filter((idea) =>
      feedbacks
        .map((feedback) => idea.id && feedback.feedback_id)
        .includes(idea.id)
    );
  };

  return (
    <div className="flex-1 px-8 py-6 flex justify-center">
      <div className="max-w-[800px]">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Emails</h1>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          tabs={['Admin Emails', 'Customer Emails']}
        />
        <p className="text-[14px] text-gray-600 mb-8 mt-4">
          Manage your email preferences for this project
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center w-full gap-[200px]">
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="email"
              >
                Email address
              </label>
              <p className="text-[14px] text-gray-600">Send emails to:</p>
            </div>
            <input
              id="email"
              autoComplete="email"
              name="email"
              type="email"
              placeholder="admin@company.com"
              className="w-[40%] px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex justify-between items-center w-full gap-[200px]">
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="email"
              >
                Frequency
              </label>
              <p className="text-[14px] text-gray-600">
                Choose how often you'd like to receive emails
              </p>
            </div>
            <RadioButtonOptions
              options={frequencies}
              select={setFrequency}
              selected={frequency}
            />
          </div>

          <div>
            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-medium text-gray-900">
                  New ideas
                </h3>
                <p className="text-[13px] text-gray-500">
                  Receive notifications when a new idea is received.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.ideas}
                  onChange={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      ideas: !prev.ideas,
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-medium text-gray-900">
                  New feedback
                </h3>
                <p className="text-[13px] text-gray-500">
                  Receive notifications when a new response or feedback is
                  received.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.feedback}
                  onChange={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      feedback: !prev.feedback,
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] font-medium text-gray-900">
                  New comments
                </h3>
                <p className="text-[13px] text-gray-500">
                  Receive notifications when a new comment is submitted.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.comments}
                  onChange={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      comments: !prev.comments,
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-3 w-full">
            <div className="border rounded-lg w-full h-full bg-white p-4">
              <div className="flex flex-col text-[14px] text-gray-400 pb-2.5 border-b">
                <span>{'From: ProductHQ Updates <noreply@producthq.io>'}</span>
                <span>{`To: ${email.length > 0 ? email : 'admin@company.com'}`}</span>
                <span>{`Subject: Your ${frequency.label} Update from ProductHQ`}</span>
              </div>
              <div className="pt-2.5 flex flex-col gap-3 text-gray-700 text-[14px]">
                <p className="font-semibold">
                  Hi Admin!{' '}
                  <span role="img" aria-label="clap">
                    👏
                  </span>
                </p>
                <span>{`Here's your ${frequency.value} activity update from ProductHQ:`}</span>
                {notificationSettings.ideas && (
                  <>
                    <span className="font-medium">New Ideas</span>
                    <ul className="list-disc pl-5 text-[13px]">
                      {ideasByFrequency().map((idea) => (
                        <li>{idea.title}</li>
                      ))}
                    </ul>
                  </>
                )}
                {notificationSettings.feedback && (
                  <>
                    <span className="font-medium">New Feedbacks</span>
                    <ul className="list-disc pl-5 text-[13px]">
                      {upvotesByFrequency().map((upvote) => (
                        <li>{upvote.title}</li>
                      ))}
                    </ul>
                  </>
                )}
                {notificationSettings.comments && (
                  <>
                    <span className="font-medium">New Comments</span>
                    <ul className="list-disc pl-5 text-[13px]">
                      {commentsByFrequency().map((comment) => (
                        <li>{removeHtmlTags(comment.comment)}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
