import { useState } from 'react';
import { CustomerEmail } from '../../../types/email';
import { ChevronDownIcon } from '../../../components/icons/chevron-down.icon';
import { emailCategories } from '../../../constants/emails';
import { CustomerWeeklyUpdate } from './email-templates/customers/CustomerWeeklyUpdate';
import { DefaultTemplate } from './email-templates/customers/DefaultTemplate';
import { NewVoteOnIdea } from './email-templates/customers/NewVoteOnIdea';

export const CustomerEmails = ({
  customerEmail,
  setEmails,
}: {
  customerEmail?: CustomerEmail;
  setEmails: (updated?: CustomerEmail) => void;
}) => {
  const [activeCategorySection, setActiveCategorySection] = useState<
    string | null
  >('ideas');
  const [email, setEmail] = useState<CustomerEmail | undefined>(customerEmail);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategorySection(
      activeCategorySection === categoryId ? null : categoryId
    );
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <p className="text-[14px] text-gray-600 mb-4">
        Configure emails that are sent to your customers
      </p>

      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-3">
          Sender Settings
        </h2>
        <div className="flex gap-8">
          <div className="w-1/2">
            <p className="text-[14px] text-gray-600">
              Customize the sender address for all customer emails instead of
              using notifications@producthq.io.{' '}
              <a href="#" className="text-[#5a00cd]">
                Learn how to set up your custom email
              </a>
              .
            </p>
          </div>

          <div className="w-1/2">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="notifications@yoursite.com"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
                onChange={(e) =>
                  setEmail((prev) => {
                    const sender_settings = e.target.value;
                    if (prev) {
                      return { ...prev, sender_settings };
                    }
                    return { sender_settings };
                  })
                }
                value={email?.sender_settings}
              />
              <button
                className="px-4 py-2 bg-[#FF6334] text-white rounded-lg text-[14px] font-medium hover:bg-[#e55a2f]"
                onClick={() => setEmails(email)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-2">
          Email Templates
        </h2>
        <div className="flex gap-6">
          <div className="w-[250px] space-y-2 pt-4">
            <div
              className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-[#F9F5FF] transition-colors cursor-pointer ${
                selectedTemplate === 'Customer Weekly Update'
                  ? 'bg-[#F9F5FF]'
                  : ''
              }`}
              onClick={() => handleTemplateSelect('Customer Weekly Update')}
            >
              <div className="flex-1">
                <h4 className="text-[14px] font-medium text-gray-900">
                  Customer Weekly Update
                </h4>
              </div>
              <label
                className="relative inline-flex items-center cursor-pointer ml-4"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={email?.weekly_update}
                  onChange={() => {
                    setEmail((prev) => {
                      const weekly_update = email?.weekly_update
                        ? !email.weekly_update
                        : true;
                      if (prev) {
                        return { ...prev, weekly_update };
                      }
                      return { weekly_update };
                    });
                  }}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5a00cd]"></div>
              </label>
            </div>

            {emailCategories.map((category, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => handleCategoryChange(category.id)}
                  className="w-full flex justify-between items-center p-3 bg-gray-50 text-left hover:bg-gray-100"
                >
                  <h4 className="text-[14px] font-medium text-gray-900">
                    {category.title}
                  </h4>
                  <ChevronDownIcon
                    className={
                      activeCategorySection === category.id
                        ? 'rotate-180 transform'
                        : ''
                    }
                  />
                </button>

                {activeCategorySection === category.id && (
                  <div className="border-t border-gray-200">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2.5 hover:bg-[#F9F5FF] transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer ${
                          selectedTemplate === item.id ? 'bg-[#F9F5FF]' : ''
                        }`}
                        onClick={() => handleTemplateSelect(item.text)}
                      >
                        <span className="text-[13px] text-gray-700">
                          {item.text}
                        </span>
                        <label
                          className="relative inline-flex items-center cursor-pointer ml-6"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={
                              category.id === 'ideas'
                                ? email?.ideas?.[
                                    item.id as keyof typeof email.ideas
                                  ]
                                : category.id === 'comments'
                                  ? email?.comments?.[
                                      item.id as keyof typeof email.comments
                                    ]
                                  : false
                            }
                            className="sr-only peer"
                            defaultChecked={false}
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5a00cd]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="p-4">
              <div className="bg-white rounded-lg border p-4 min-h-[600px]">
                {selectedTemplate === 'Admin edited my Idea' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your idea has been updated
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        An admin at{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        has amended your idea.
                      </p>

                      <div className="mb-4">
                        <h4 className="text-[15px] font-medium text-gray-900 mb-2">
                          Here are some reasons an idea might be updated:
                        </h4>
                        <div className="text-[14px] text-gray-700 pl-2">
                          <p className="text-[13px] mb-1">
                            1. To amend a typo (most common)
                          </p>
                          <p className="text-[13px] mb-1">
                            2. More context has been added to better describe
                            the idea
                          </p>
                          <p className="text-[13px] mb-1">
                            3. The title was updated to better describe the idea
                          </p>
                          <p className="text-[13px]">
                            4. Multiple ideas in one entry
                          </p>
                        </div>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Updated Idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks!
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'New comment on my Idea' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: New comment on your idea
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        <span className="text-gray-500">[Comment Author]</span>{' '}
                        left a comment on your idea.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700 italic">
                          "
                          <span className="text-gray-500">
                            [First line of comment...]
                          </span>
                          "
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Comment
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks!
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'My comment was approved' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your comment has been approved
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Great work! 🎉
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Your comment has been approved and is now live on our
                        board here:
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700 italic">
                          "
                          <span className="text-gray-500">
                            [First line of comment...]
                          </span>
                          "
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Comment
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'My comment was rejected' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your comment was not approved
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Uh oh! 😕
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Your comment has been rejected.
                      </p>

                      <p className="text-[14px] text-gray-700 mb-4">
                        Please contact the board administrator if you would like
                        to appeal this decision.
                      </p>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        Contact Admin
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'New comment reply' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: New reply to your comment
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        <span className="text-gray-500">[Replier Name]</span>{' '}
                        replied to your comment.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700 italic">
                          "
                          <span className="text-gray-500">
                            [First line of comment...]
                          </span>
                          "
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Reply
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks!
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === "New vote on Idea I'm following" ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: New vote on idea you're following
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Nice work. It looks like someone loves your idea.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        See your idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks for your input.
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'Idea status change' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Status update on your idea
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        The status of your idea has changed to{' '}
                        <span className="text-gray-500">[New Status]</span>.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        See your idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks!
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'Idea created on my behalf' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: New idea created for you
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        <span className="text-gray-500">[Short Name]</span>{' '}
                        added this idea for you.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'New vote on my Idea' ? (
                  <NewVoteOnIdea email={customerEmail} />
                ) : selectedTemplate === 'My Idea was approved' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your idea has been approved
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Great work! 🎉
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Your idea has been approved and is now live on our board
                        here:
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'My Idea was rejected' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your idea was not approved
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Uh oh! 😕
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Your idea has been rejected.
                      </p>

                      <div className="mb-4">
                        <h4 className="text-[15px] font-medium text-gray-900 mb-2">
                          Reason
                        </h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-[14px] text-gray-700">
                            <span className="text-gray-500">
                              [Rejection reason will appear here]
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <p className="text-[14px] text-gray-700 mb-4">
                        Please contact the board administrator if you would like
                        to appeal this decision.
                      </p>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        Contact Admin
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'Mentioned in comment' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: You were mentioned in a comment
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        <span className="text-gray-500">[Comment Author]</span>{' '}
                        just mentioned you in a comment.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700 italic">
                          "
                          <span className="text-gray-500">
                            [First line of comment...]
                          </span>
                          "
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Comment
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'New user signup approved' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Your account has been approved
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Your account has been approved.
                      </p>

                      <p className="text-[14px] text-gray-700 mb-4">
                        You can now login and add your first feature request.
                      </p>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        Start here
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        The{' '}
                        <span className="text-gray-500">[Company Name]</span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'Welcome new user' ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Welcome to our ideas board
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Thanks for signing up to our ideas board.
                      </p>

                      <p className="text-[14px] text-gray-700 mb-3">
                        Why not start by voting up a few ideas that you like.
                        <br />
                        And of course, when you are ready, submit your own ideas
                        to the community.
                      </p>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        Get Started
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks for your help,
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : selectedTemplate === 'Customer Weekly Update' ? (
                  <CustomerWeeklyUpdate />
                ) : selectedTemplate ===
                  "Status changed on Idea I'm following" ? (
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-500">
                        From: ProductHQ Updates &lt;noreply@producthq.io&gt;
                      </div>
                      <div className="text-sm text-gray-500">
                        To: customer@company.com
                      </div>
                      <div className="text-sm text-gray-500">
                        Subject: Status update on idea you're following
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-[18px] font-medium text-gray-900 mb-2">
                        Hey <span className="text-gray-500">[First Name]</span>!
                        👋
                      </div>

                      <p className="text-[14px] text-gray-700 mb-3">
                        The status of an Idea you are following has changed to{' '}
                        <span className="text-gray-500">[New Status]</span>.
                      </p>

                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-[14px] text-gray-700">
                          <span className="text-gray-500">[Idea Name]</span>
                        </p>
                      </div>

                      <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
                        View Idea
                      </button>

                      <p className="text-[14px] text-gray-700 mb-2">
                        Thanks!
                        <br />
                        The{' '}
                        <span className="text-gray-500">
                          [Company Name]
                        </span>{' '}
                        Team
                      </p>

                      <p className="text-[13px] text-gray-500">
                        Help us improve -{' '}
                        <a href="#" className="text-[#5a00cd]">
                          share your thoughts
                        </a>
                      </p>
                    </div>
                  </div>
                ) : (
                  <DefaultTemplate />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-4">
              <button className="px-4 py-2 text-[14px] font-medium text-[#5a00cd] bg-white border border-[#5a00cd] rounded-lg hover:bg-[#F9F5FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a00cd]">
                Send test email
              </button>
              <button
                className="px-4 py-2 text-[14px] font-medium text-white bg-[#FF6334] rounded-lg hover:bg-[#e5592f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6334]"
                onClick={() => setEmails(email)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-3">Branding</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* First Row */}
          <div>
            <h3 className="text-[14px] font-medium text-gray-700">Unfollow</h3>
            <div className="mt-2">
              <input
                type="text"
                value="Unfollow this idea"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-medium text-gray-700">
              Unsubscribe
            </h3>
            <div className="mt-2">
              <input
                type="text"
                value="Unsubscribe from all emails"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          {/* Second Row */}
          <div>
            <h3 className="text-[14px] font-medium text-gray-700">
              Change preferences
            </h3>
            <div className="mt-2">
              <input
                type="text"
                value="Change email preferences"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-medium text-gray-700">Footer</h3>
            <div className="mt-2">
              <input
                type="text"
                value="#### ProductHQ Group Pty Ltd, 69 Ruthven St, Bondi Junction, NSW, 2022, Australia"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
