import { useState } from 'react';
import { CustomerEmail } from '../../../types/email';

export const CustomerEmails = ({
  emailContext,
  setEmails,
}: {
  emailContext?: CustomerEmail;
  setEmails: (updated?: CustomerEmail) => void;
}) => {
  const [sender_settings, setSenderSettings] = useState<string>(
    emailContext?.sender_settings ?? ''
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center w-full gap-10">
        <div className="flex flex-col gap-2">
          <label
            className="text-[14px] font-medium text-gray-700"
            htmlFor="sender_settings"
          >
            Sender Settings
          </label>
          <p className="text-[14px] text-gray-600">
            Send emails from your own domain instead of the default ProductHQ
            domain.
          </p>
        </div>
        <input
          id="sender_settings"
          autoComplete="sender_settings"
          name="sender_settings"
          type="email"
          placeholder="notifications@mycompany.com"
          className="w-[25%] px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary"
          onBlur={() => setEmails({ ...emailContext, sender_settings })}
          onChange={(e) => setSenderSettings(e.target.value)}
          value={sender_settings}
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] font-medium text-gray-900">
            Customer weekly update
          </h3>
          <p className="text-[13px] text-gray-500">Send weekly update.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={emailContext?.weekly_update}
            onChange={() =>
              setEmails({
                ...emailContext,
                weekly_update: emailContext?.weekly_update
                  ? !emailContext.weekly_update
                  : true,
              })
            }
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              New vote on my idea
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when a new vote is submitted on customer's
              idea.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.new_vote_on_idea}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  new_vote_on_idea: emailContext?.new_vote_on_idea
                    ? !emailContext.new_vote_on_idea
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              Admin edited my idea
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when admin edited customer's idea.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.admin_edited_idea}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  admin_edited_idea: emailContext?.admin_edited_idea
                    ? !emailContext.admin_edited_idea
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              My idea was approved
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when customer's idea was approved.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.idea_was_approved}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  idea_was_approved: emailContext?.idea_was_approved
                    ? !emailContext.idea_was_approved
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              My idea was rejected
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when customer's idea was rejected.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.idea_was_rejected}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  idea_was_rejected: emailContext?.idea_was_rejected
                    ? !emailContext.idea_was_rejected
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              Idea status change
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when customer's idea status change.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.idea_status_change}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  idea_status_change: emailContext?.idea_status_change
                    ? !emailContext.idea_status_change
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              Idea created on my behalf
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when an idea created on customer's behalf.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.idea_created_on_behalf}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  idea_created_on_behalf: emailContext?.idea_created_on_behalf
                    ? !emailContext.idea_created_on_behalf
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              New comment on my idea
            </h3>
            <p className="text-[13px] text-gray-500">
              Send notifications when a new comment submitted on customer's
              idea.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailContext?.comment_on_idea}
              onChange={() =>
                setEmails({
                  ...emailContext,
                  comment_on_idea: emailContext?.comment_on_idea
                    ? !emailContext.comment_on_idea
                    : true,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
