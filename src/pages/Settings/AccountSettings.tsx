import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  COMPANY_LOGO_PLACEHOLDER,
  PROFILE_PLACEHOLDER,
  UploadPhoto,
} from '../../components/UploadPhoto';
import { ImageType, User } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { eraseKaslKey } from '../../utils/localStorage';
import { deleteApi } from '../../utils/api/api';
import { Settings } from '../../components/Settings/Settings';
import SettingsHeader from '../../components/Settings/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/Settings/SettingsContainer';
import InputField from '../../components/InputField';
import SectionHeader from '../../components/Settings/SectionHeader';

export function AccountSettings() {
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { user: userDetails } = user ?? {};

  const [show_modal, setModal] = useState<boolean>(false);
  const [image_type, setImageType] = useState<string>('');

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setCompanyLogo = (company_logo: string) => {
    setUser((prev) => ({ ...prev, user: { ...prev.user, company_logo } }));
  };

  const setProfilePhoto = (profile_photo: string) => {
    setUser((prev) => ({ ...prev, user: { ...prev.user, profile_photo } }));
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    deleteApi<User>({ url: `users/hard-delete/${userDetails?.id}` })
      .then((res) => {
        if (res.results.data) {
          eraseKaslKey();
          toast.success(res.results.message, {
            closeOnClick: true,
            position: 'bottom-center',
          });
          navigate('/sign-in');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Settings>
      <SettingsHeader
        title="Account Settings"
        primaryButton={<Button text="Update" variant="primary" />}
        secondaryButton={
          <Button
            text="Cancel"
            onClick={() => navigate('/dashboard')}
            variant="secondary"
          />
        }
      />

      <SettingsContainer>
        {/* User Details Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="User details" />

          {/* Profile Photo */}
          <div className="flex items-start gap-4 m-0">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              {userDetails?.profile_photo !== undefined &&
              userDetails?.profile_photo !== PROFILE_PLACEHOLDER ? (
                <img
                  className="is-rounded responsiveImage rounded-full"
                  src={userDetails?.profile_photo}
                />
              ) : (
                <span className="text-purple-600 text-2xl">P</span>
              )}
            </div>
            <Button
              className="w-fit text-[13px]"
              text="Upload"
              onClick={() => {
                setImageType(ImageType.PROFILE_PHOTOS);
                setModal((prev) => !prev);
              }}
              variant="secondary"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="First Name"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, first_name: e.target.value },
                }))
              }
              value={userDetails?.first_name}
              placeholder="first name"
              type="text"
              variant="default"
            />
            <InputField
              label="Last Name"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, last_name: e.target.value },
                }))
              }
              placeholder="last name"
              type="text"
              value={userDetails?.last_name}
              variant="default"
            />
          </div>

          {/* Email and Job Title */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="Email Address"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, email: e.target.value },
                }))
              }
              placeholder="email address"
              type="email"
              value={userDetails?.email}
              variant="default"
            />
            <InputField
              label="Job Title"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, job_title: e.target.value },
                }))
              }
              placeholder="job title"
              type="text"
              value={userDetails?.job_title}
              variant="default"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Password" />
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="New Password"
              onChange={() => {}}
              placeholder="new password"
              type="password"
            />
            <InputField
              label="Confirm Password"
              onChange={() => {}}
              placeholder="confirm password"
              type="password"
            />
          </div>
          <Button
            className="w-fit text-[13px]"
            text="Reset password"
            disabled={isLoading}
            variant="secondary"
          />
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Company"
            description="Share your company details with us so that we can customise
            ProductHQ just for you."
          />

          {/* Company Logo */}
          <div className="flex items-start gap-4 m-0">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              {userDetails?.company_logo !== undefined &&
              userDetails?.company_logo !== COMPANY_LOGO_PLACEHOLDER ? (
                <img
                  className="is-rounded responsiveImage rounded-full"
                  src={userDetails?.company_logo}
                />
              ) : (
                <span className="text-purple-600 text-2xl">P</span>
              )}
            </div>
            <Button
              className="w-fit text-[13px]"
              text="Upload"
              onClick={() => {
                setImageType(ImageType.COMPANY_LOGO);
                setModal((prev) => !prev);
              }}
              variant="secondary"
            />
          </div>

          {/* Company Name and Website */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="Company Name"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, company_name: e.target.value },
                }))
              }
              placeholder="company name"
              type="text"
              value={userDetails?.company_name}
              variant="default"
            />
            <InputField
              label="Website URL"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, website_url: e.target.value },
                }))
              }
              placeholder="website url"
              type="url"
              value={userDetails?.website_url}
              variant="default"
            />
          </div>

          {/* Country Code and Phone */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="Country Code"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, country_code: e.target.value },
                }));
              }}
              placeholder="country code"
              type="text"
              value={userDetails?.country_code}
              variant="default"
            />
            <InputField
              label="Phone Number"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, phone: e.target.value },
                }));
              }}
              placeholder="phone number"
              type="tel"
              value={userDetails?.phone}
              variant="default"
            />
          </div>
        </div>

        {/* Invoice Information */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Invoice Information" />

          {/* Address Lines */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Address Line 1"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, address_line1: e.target.value },
                }));
              }}
              placeholder="address line 1"
              value={userDetails?.address_line1}
            />
            <InputField
              label="Address Line 2"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, address_line2: e.target.value },
                }));
              }}
              placeholder="address line 2"
              value={userDetails?.address_line2}
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="City"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, city: e.target.value },
                }));
              }}
              placeholder="city"
              value={userDetails?.city}
            />
            <InputField
              label="State"
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, state: e.target.value },
                }));
              }}
              placeholder="state"
              value={userDetails?.state}
            />
          </div>

          {/* Zip Code and Country */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="Zip Code"
              placeholder="zip code"
              value={userDetails?.zip_code}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, zip_code: e.target.value },
                }));
              }}
            />
            <InputField
              label="Country"
              type="text"
              placeholder="country"
              value={userDetails?.country}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  user: { ...prev.user, country: e.target.value },
                }));
              }}
              variant="default" // You can change this to any variant you want
            />
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Delete Account"
            description={
              <>
                This will delete <span className="font-medium">ALL</span> your
                account information including your board URL, ideas, roadmap,
                posts, comments, etc. This is{' '}
                <span className="font-medium">NOT</span> reversable.
              </>
            }
          />
          <InputField
            label="Type DELETE in the field below"
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="DELETE"
            variant="default" // You can change this to any variant you want
          />
          <Button
            text={isLoading ? 'Loading ...' : 'DELETE ACCOUNT'}
            onClick={handleDeleteAccount}
            variant="danger" // Assuming you have a 'danger' variant for delete actions
            className="w-fit px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-[13px]"
            disabled={deleteConfirmation !== 'DELETE' || isLoading}
          />
        </div>
      </SettingsContainer>

      <UploadPhoto
        image_type={image_type}
        maxFileSize={2097152}
        setCompanyLogo={setCompanyLogo}
        setModal={setModal}
        setProfilePhoto={setProfilePhoto}
        show_modal={show_modal}
      />
    </Settings>
  );
}
