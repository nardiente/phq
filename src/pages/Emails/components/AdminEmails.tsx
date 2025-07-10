import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { removeHtmlTags } from '../../../utils/string';
import { Email } from '../../../types/email';
import { frequencies } from '../../../constants/emails';
import { useUser } from '../../../contexts/UserContext';
import { listComments, listIdeas, listUpvotes } from '../../../utils/emails';

export const AdminEmails = ({
  emailContext,
  setEmails,
}: {
  emailContext: Email;
  setEmails: (updated: Email) => void;
}) => {
  const {
    state: { comments, filteredIdeas, upvotes },
  } = useFeedback();
  const { user } = useUser();
  const { project } = user ?? {};

  const [email, setEmail] = useState<string>(emailContext.email);
  const [start, setStart] = useState<Moment>(moment().startOf('day'));

  useEffect(() => {
    setEmail(emailContext.email);
  }, [emailContext.email]);

  useEffect(() => {
    switch (emailContext.frequency.id) {
      case 'weekly':
        setStart(moment().subtract(7, 'days').startOf('day'));
        break;
      case 'monthly':
        setStart(moment().subtract(1, 'months').startOf('day'));
        break;
      default:
        setStart(moment().startOf('day'));
        break;
    }
  }, [emailContext.frequency.id]);

  return (
    <>
      <p className="text-[14px] text-gray-600 mb-4">
        Manage your email preferences for this project
      </p>

      <div className="space-y-2">
        <div className="space-y-2">
          {/* Email Address Section */}
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                Email address
              </h3>
              <p className="text-[13px] text-gray-500">Send emails to:</p>
            </div>
            <div className="w-[300px]">
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
                onBlur={() => setEmails({ ...emailContext, email })}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                type="email"
                value={email}
              />
            </div>
          </div>

          {/* Frequency Section */}
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                Frequency
              </h3>
              <p className="text-[13px] text-gray-500">
                Choose how often you'd like to receive emails
              </p>
            </div>
            <div className="space-x-4 flex items-center">
              {frequencies.map((frequency, idx) => (
                <label
                  key={idx}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="sr-only peer"
                    checked={emailContext.frequency.id === frequency.id}
                    onChange={() =>
                      setEmails({
                        ...emailContext,
                        frequency: {
                          id: frequency.id,
                          text: frequency.text,
                        },
                      })
                    }
                  />
                  <div className="overflow-hidden rounded-full border border-gray-200 flex justify-center items-center w-4 h-4 bg-white peer-checked:border-[#5a00cd] peer-checked:bg-[#5a00cd]">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3.5" fill="white" />
                    </svg>
                  </div>
                  <span className="ml-2 text-base leading-6 tracking-[0.005em] text-[#110733] font-medium">
                    {frequency.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-[14px] font-medium text-gray-900 mb-1">
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
                checked={emailContext.notificationSettings.ideas}
                onChange={() =>
                  setEmails({
                    ...emailContext,
                    notificationSettings: {
                      ...emailContext.notificationSettings,
                      ideas: !emailContext.notificationSettings.ideas,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <div>
              <h3 className="text-[14px] font-medium text-gray-900 mb-1">
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
                checked={emailContext.notificationSettings.feedback}
                onChange={() =>
                  setEmails({
                    ...emailContext,
                    notificationSettings: {
                      ...emailContext.notificationSettings,
                      feedback: !emailContext.notificationSettings.feedback,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <div>
              <h3 className="text-[14px] font-medium text-gray-900 mb-1">
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
                checked={emailContext.notificationSettings.comments}
                onChange={() =>
                  setEmails({
                    ...emailContext,
                    notificationSettings: {
                      ...emailContext.notificationSettings,
                      comments: !emailContext.notificationSettings.comments,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Email Preview Section */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="mb-3">
              <div className="text-sm text-gray-500">
                From: ProductHQ Updates &lt;noreply@producthq.io&gt;
              </div>
              <div className="text-sm text-gray-500">{`To: ${emailContext.email.length > 0 ? emailContext.email : 'admin@company.com'}`}</div>
              <div className="text-sm text-gray-500">
                Subject: Your {emailContext.frequency.text} Update from
                ProductHQ
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="text-[18px] font-medium text-gray-900 mb-2">
                Hi Admin! 👋
              </div>
              <p className="text-[14px] text-gray-700 mb-3">
                Here's your {emailContext.frequency.id} activity update from
                ProductHQ:
              </p>

              {emailContext.notificationSettings.ideas && (
                <div className="mb-4">
                  <h4 className="text-[15px] font-medium text-gray-900 mb-2">
                    New Ideas
                  </h4>
                  <div className="text-[14px] text-gray-700 pl-2 flex flex-col">
                    {listIdeas({ filteredIdeas, start }).map((idea, idx) => (
                      <p key={idx} className="text-[13px] leading-none">
                        • {idea.title}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {emailContext.notificationSettings.comments && (
                <div className="mb-4">
                  <h4 className="text-[15px] font-medium text-gray-900 mb-2">
                    New Comments
                  </h4>
                  <div className="text-[14px] text-gray-700 pl-2 flex flex-col">
                    {listComments({ feedbackComments: comments, start }).map(
                      (comment, idx) => (
                        <p key={idx} className="text-[13px] leading-none">
                          • {removeHtmlTags(comment.comment)}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}

              {emailContext.notificationSettings.feedback && (
                <div className="mb-4">
                  <h4 className="text-[15px] font-medium text-gray-900 mb-2">
                    New Feedback
                  </h4>
                  <div className="text-[14px] text-gray-700 pl-2 flex flex-col">
                    {listUpvotes({
                      upvoteLogs: upvotes,
                      filteredIdeas,
                      start,
                    }).map((upvote, idx) => (
                      <p key={idx} className="text-[13px] leading-none">
                        • {upvote.title}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4"
                onClick={() => {
                  const portal =
                    'http://' +
                    (project?.custom_domain && project.custom_domain.length > 0
                      ? project.custom_domain
                      : project?.portal_subdomain &&
                          project.portal_subdomain.length
                        ? project.portal_subdomain + '.producthq.io'
                        : '');
                  window.open(portal, '_blanck', 'noopener noreferrer');
                }}
              >
                Open Dashboard
              </button>

              <p className="text-[14px] text-gray-700 mb-2">
                Best regards,
                <br />
                The ProductHQ Team
              </p>

              <p className="text-[13px] text-gray-500">
                Need help?{' '}
                <a
                  href="https://support.producthq.io"
                  className="text-[#5a00cd]"
                  rel="noopen, noreferrer"
                  target="_blank"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
