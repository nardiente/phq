import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  COMPANY_LOGO_PLACEHOLDER,
  PROFILE_PLACEHOLDER,
  UploadPhoto,
} from '../components/UploadPhoto';
import { ImageType, User } from '../types/user';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { eraseKaslKey } from '../utils/localStorage';
import { deleteApi } from '../utils/api/api';

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
    <div className="min-h-screen bg-[#fafafa] pb-12">
      <div className="max-w-[1200px] mx-auto pt-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-semibold text-gray-900">
            Account Settings
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg">
              Update
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="max-w-[600px] space-y-8 text-gray-700">
            {/* User Details Section */}
            <div className="space-y-6">
              <h2 className="text-[16px] font-semibold text-gray-900">
                User details
              </h2>

              {/* Profile Photo */}
              <div className="flex items-start gap-4">
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
                <button
                  onClick={() => {
                    setImageType(ImageType.PROFILE_PHOTOS);
                    setModal((prev) => !prev);
                  }}
                  className="px-3 py-1.5 text-[13px] bg-gray-100  rounded hover:bg-gray-200"
                >
                  Upload
                </button>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 ">
                  <label className="block text-[13px] font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userDetails?.first_name}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, first_name: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userDetails?.last_name}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, last_name: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
              </div>

              {/* Email and Job Title */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userDetails?.email}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, email: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={userDetails?.job_title}
                    placeholder="job title"
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, job_title: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-6">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Password
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="new password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
              </div>
              <button className="px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                Reset password
              </button>
            </div>

            {/* Company Section */}
            <div className="space-y-6">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Company
              </h2>
              <p className="text-[13px] text-gray-600">
                Share your company details with us so that we can customise
                ProductHQ just for you.
              </p>

              {/* Company Logo */}
              <div className="flex items-start gap-4">
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
                <button
                  onClick={() => {
                    setImageType(ImageType.COMPANY_LOGO);
                    setModal((prev) => !prev);
                  }}
                  className="px-3 py-1.5 text-[13px] bg-gray-100  rounded hover:bg-gray-200"
                >
                  Upload
                </button>
              </div>

              {/* Company Name and Website */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={userDetails?.company_name}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, company_name: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={userDetails?.website_url}
                    placeholder="website url"
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, website_url: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                  />
                </div>
              </div>

              {/* Country Code and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Country Code
                  </label>
                  <input
                    type="text"
                    placeholder="country code"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.country_code}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, country_code: e.target.value },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="phone number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.phone}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, phone: e.target.value },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div className="space-y-6">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Invoice Information
              </h2>

              {/* Address Lines */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    placeholder="address line 1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.address_line1}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, address_line1: e.target.value },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    placeholder="address line 2"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.address_line2}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, address_line2: e.target.value },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">City</label>
                  <input
                    type="text"
                    placeholder="city"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.city}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, city: e.target.value },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="state"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.state}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, state: e.target.value },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Zip Code and Country */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="zip code"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.zip_code}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, zip_code: e.target.value },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium ">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="country"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                    value={userDetails?.country}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        user: { ...prev.user, country: e.target.value },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="space-y-6">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Delete Account
              </h2>
              <p className="text-[13px] text-gray-600">
                This will delete <span className="font-medium">ALL</span> your
                account information including your board URL, ideas, roadmap,
                posts, comments, etc. This is{' '}
                <span className="font-medium">NOT</span> reversable.
              </p>
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium ">
                  Type DELETE in the field below
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px]"
                />
              </div>
              <button
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-[13px]"
                disabled={deleteConfirmation !== 'DELETE' || isLoading}
                onClick={handleDeleteAccount}
              >
                {isLoading ? 'Loading...' : 'DELETE ACCOUNT'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UploadPhoto
        image_type={image_type}
        maxFileSize={2097152}
        setCompanyLogo={setCompanyLogo}
        setModal={setModal}
        setProfilePhoto={setProfilePhoto}
        show_modal={show_modal}
      />
    </div>
  );
}
