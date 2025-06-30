import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useFeedback } from '../../../contexts/FeedbackContext';
import { RadioButtonOptions } from '../../../components/RadioButtonOptions';
import { removeHtmlTags } from '../../../utils/string';
import { Email, frequencies } from '../../../types/email';
import { CustomEmailDomain } from '../../../components/CustomEmailDomain';

export const CustomerEmails = ({
  emailContext,
  setEmails,
}: {
  emailContext: Email;
  setEmails: (updated: Email) => void;
}) => {
  const {
    state: { comments, filteredIdeas, upvotes },
  } = useFeedback();

  const [start, setStart] = useState<Moment>(moment().startOf('day'));
  const end = moment().endOf('day');

  useEffect(() => {
    switch (emailContext.frequency.value) {
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
  }, [emailContext.frequency.value]);

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
    <div className="flex flex-col gap-8">
      {/* <div className="flex justify-between items-center w-full gap-10">
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
          placeholder="customer@company.com"
          className="w-[40%] px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary"
          onBlur={() => setEmails({ ...emailContext, email })}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div> */}

      <CustomEmailDomain
        emailContext={emailContext}
        onChange={(custom_domain) =>
          setEmails({
            ...emailContext,
            custom_domain,
          })
        }
      />

      <div className="flex justify-between items-center w-full gap-10">
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
          select={(selected) =>
            setEmails({ ...emailContext, frequency: selected })
          }
          selected={emailContext.frequency}
        />
      </div>

      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">New ideas</h3>
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

        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              New feedback
            </h3>
            <p className="text-[13px] text-gray-500">
              Receive notifications when a new response or feedback is received.
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

      <div className="border rounded-lg p-3 w-full">
        <div className="border rounded-lg w-full h-full bg-white p-4">
          <div className="flex flex-col text-[14px] text-gray-400 pb-2.5 border-b">
            <span>
              {`From: ${emailContext.custom_domain?.from_name && emailContext.custom_domain.from_name.length > 0 ? emailContext.custom_domain.from_name : 'ProductHQ Updates'} <${emailContext.custom_domain?.email && emailContext.custom_domain.email.length > 0 ? emailContext.custom_domain.email : 'noreply@producthq.io'}>`}
            </span>
            <span>{`To: ${emailContext.email.length > 0 ? emailContext.email : 'customer@company.com'}`}</span>
            <span>{`Subject: Your ${emailContext.frequency.label} Update from ProductHQ`}</span>
          </div>
          <div className="pt-2.5 flex flex-col gap-3 text-gray-700 text-[14px]">
            <p className="font-semibold">
              Hi Customer!{' '}
              <span role="img" aria-label="clap">
                👏
              </span>
            </p>
            <span>{`Here's your ${emailContext.frequency.value} activity update from ProductHQ:`}</span>
            {emailContext.notificationSettings.ideas && (
              <>
                <span className="font-medium">New Ideas</span>
                <ul className="list-disc pl-5 text-[13px]">
                  {ideasByFrequency().map((idea, idx) => (
                    <li key={idx}>{idea.title}</li>
                  ))}
                </ul>
              </>
            )}
            {emailContext.notificationSettings.feedback && (
              <>
                <span className="font-medium">New Feedbacks</span>
                <ul className="list-disc pl-5 text-[13px]">
                  {upvotesByFrequency().map((upvote, idx) => (
                    <li key={idx}>{upvote.title}</li>
                  ))}
                </ul>
              </>
            )}
            {emailContext.notificationSettings.comments && (
              <>
                <span className="font-medium">New Comments</span>
                <ul className="list-disc pl-5 text-[13px]">
                  {commentsByFrequency().map((comment, idx) => (
                    <li key={idx}>{removeHtmlTags(comment.comment)}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
