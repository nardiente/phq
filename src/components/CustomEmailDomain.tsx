import { useEffect, useState } from 'react';
import { Email } from '../types/email';

interface CustomEmailDomainProps {
  emailContext: Email;
  onChange: (customDomain: {
    enabled: boolean;
    email: string;
    from_name: string;
  }) => void;
}

export const CustomEmailDomain = ({
  emailContext,
  onChange,
}: CustomEmailDomainProps) => {
  const [email, setEmail] = useState(emailContext?.email || '');
  const [from_name, setFromName] = useState(
    emailContext.custom_domain?.from_name || ''
  );
  const [enabled, setEnabled] = useState(
    emailContext.custom_domain?.enabled || false
  );
  const [emailError, setEmailError] = useState('');

  const { custom_domain } = emailContext;
  const {
    enabled: customEnabled,
    email: customEmail,
    from_name: customFromName,
  } = custom_domain ?? {};

  useEffect(() => {
    setEnabled(customEnabled ?? false);
    setEmail(customEmail ?? '');
    setFromName(customFromName ?? '');
  }, [customEnabled, customEmail, customFromName]);

  const validateEmail = (email: string) => {
    if (!email) return '';
    const emailRegex = new RegExp(
      /^\w+([\\.+-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., notifications@mycompany.com)';
    }
    return '';
  };

  const handleToggle = (newEnabled: boolean) => {
    setEnabled(newEnabled);
    setEmailError('');
    onChange({
      enabled: newEnabled,
      email,
      from_name,
    });
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleFromNameChange = (newFromName: string) => {
    setFromName(newFromName);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] font-medium text-gray-900">
            Custom Email
          </h3>
          <p className="text-[13px] text-gray-500">
            Send emails from your own domain instead of the default ProductHQ
            domain.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {enabled && (
        <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100">
          <div className="flex justify-between items-center w-full gap-10">
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="fromName"
              >
                From Name
              </label>
              <p className="text-[14px] text-gray-600">
                Display name for email sender
              </p>
            </div>
            <input
              id="fromName"
              type="text"
              placeholder="ProductHQ Updates"
              className="w-[40%] px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary"
              value={from_name}
              onBlur={() => onChange({ email, enabled, from_name })}
              onChange={(e) => handleFromNameChange(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center w-full gap-10">
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="domain"
              >
                Email address
              </label>
              <p className="text-[14px] text-gray-600">
                Your custom email (e.g., notifications@mycompany.com)
              </p>
            </div>
            <div className="w-[40%] flex flex-col gap-1">
              <input
                id="domain"
                type="text"
                placeholder="noreply@producthq.io"
                className={`px-4 py-2 border rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary ${
                  emailError ? 'border-red-300' : 'border-gray-200'
                }`}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => {
                  const error = validateEmail(email);
                  setEmailError(error);
                  onChange({ enabled, email, from_name });
                }}
              />
              {emailError && (
                <p className="text-[12px] text-red-600">{emailError}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-[13px] text-blue-800">
              <strong>Note:</strong> You'll need to configure your domain's DNS
              settings to allow ProductHQ to send emails from your domain.
              Contact your domain provider for SPF and DKIM configuration
              details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
