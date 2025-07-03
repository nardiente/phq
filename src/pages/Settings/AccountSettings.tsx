import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadPhoto } from '../../components/UploadPhoto';
import {
  COMPANY_LOGO_PLACEHOLDER,
  FAVICON_PLACEHOLDER,
  PROFILE_PLACEHOLDER,
} from '../../constants/placeholders';
import { ImageType, User } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { eraseKaslKey, setKaslKey } from '../../utils/localStorage';
import { deleteApi, putApi } from '../../utils/api/api';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import InputField from '../../components/InputField';
import SectionHeader from '../../components/SectionHeader';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { useApp } from '../../contexts/AppContext';

export function AccountSettings() {
  const navigate = useNavigate();

  const { api_error, setApiError } = useApp();
  const { initialUser, user, setUser } = useUser();
  const { user: userDetails } = user ?? {};
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [show_modal, setModal] = useState<boolean>(false);
  const [image_type, setImageType] = useState<ImageType>(ImageType['']);

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (api_error.length > 0) {
      toast(api_error, {
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
        icon: false,
        position: 'bottom-center',
        theme: 'colored',
        type: 'error',
        bodyClassName: 'p-2',
        pauseOnFocusLoss: false,
      });
    }
  }, [api_error]);

  const setCompanyLogo = (company_logo: string) => {
    setUser((prev) =>
      prev
        ? { ...prev, user: { ...prev.user, company_logo } }
        : { ...initialUser, user: { ...initialUser.user, company_logo } }
    );
  };

  const setFavicon = (favicon: string) => {
    setUser((prev) =>
      prev
        ? { ...prev, user: { ...prev.user, favicon } }
        : { ...initialUser, user: { ...initialUser.user, favicon } }
    );
  };

  const setProfilePhoto = (profile_photo: string) => {
    setUser((prev) =>
      prev
        ? { ...prev, user: { ...prev.user, profile_photo } }
        : { ...initialUser, user: { ...initialUser.user, profile_photo } }
    );
  };

  const deletePortal = () => {
    deleteApi({ url: 'ssl', pub: true }).catch((err) =>
      console.error('delete portal', { err })
    );
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    deletePortal();
    deleteApi<User>({ url: `users/hard-delete/${userDetails?.id}` })
      .then((res) => {
        if (res.results.data) {
          eraseKaslKey();
          toast(res.results.message, {
            autoClose: 3000,
            className: 'custom-theme',
            closeOnClick: true,
            hideProgressBar: true,
            icon: false,
            position: 'bottom-center',
            theme: 'dark',
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
          navigate('/sign-in');
        }
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onSubmit = () => {
    const {
      address_line1,
      address_line2,
      city,
      company_name,
      country,
      country_code,
      email: email_address,
      first_name,
      last_name,
      job_title,
      phone: phone_number,
      state,
      zip_code,
      website_url,
    } = userDetails ?? {};

    if (
      first_name &&
      first_name.length > 0 &&
      last_name &&
      last_name.length > 0
    ) {
      setIsLoading(true);
      putApi<User>(`users/me`, {
        address_line1,
        address_line2,
        city,
        company_name,
        country,
        country_code,
        email: email_address,
        first_name,
        last_name,
        job_title,
        phone: phone_number,
        state,
        zip_code,
        website_url,
      })
        .then((res) => {
          if (res.results.error) {
            setApiError(res.results.error);
          }
          if (res.results.data) {
            setUser((prev) =>
              prev
                ? { ...prev, user: res.results.data }
                : { ...initialUser, user: res.results.data }
            );

            if (res.headers['kasl-key']) {
              setKaslKey(res.headers['kasl-key'].toString());
            }

            toast('Saved', {
              autoClose: 3000,
              bodyClassName: 'p-2',
              className: 'bg-[#110733]',
              closeOnClick: true,
              hideProgressBar: true,
              icon: false,
              position: 'bottom-center',
              theme: 'dark',
              pauseOnFocusLoss: false,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
          setHasUnsavedChanges(false);
        });
    }
  };

  return (
    <Settings>
      <SettingsHeader
        title="Account Settings"
        primaryButton={
          <Button disabled={isLoading} loading={isLoading} onClick={onSubmit}>
            <label className="text-white">
              {`Updat${isLoading ? 'ing...' : 'e'}`}
            </label>
          </Button>
        }
        secondaryButton={
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Cancel
          </Button>
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
              userDetails?.profile_photo !== PROFILE_PLACEHOLDER &&
              userDetails.profile_photo.length > 0 ? (
                <img
                  className="is-rounded responsiveImage rounded-full"
                  src={userDetails?.profile_photo}
                />
              ) : (
                <span className="text-purple-600 text-2xl">
                  {userDetails?.first_name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <Button
              onClick={() => {
                setImageType(ImageType.PROFILE_PHOTOS);
                setModal((prev) => !prev);
              }}
              state="outline"
              variant="blue"
            >
              Upload
            </Button>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="First Name"
              onChange={(e) =>
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, first_name: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          first_name: e.target.value,
                        },
                      }
                )
              }
              value={userDetails?.first_name}
              placeholder="first name"
              type="text"
              variant="default"
            />
            <InputField
              label="Last Name"
              onChange={(e) =>
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, last_name: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          last_name: e.target.value,
                        },
                      }
                )
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
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, email: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, email: e.target.value },
                      }
                )
              }
              placeholder="email address"
              type="email"
              value={userDetails?.email}
              variant="default"
            />
            <InputField
              label="Job Title"
              onChange={(e) =>
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, job_title: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          job_title: e.target.value,
                        },
                      }
                )
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
            disabled={isLoading}
            loading={isLoading}
            state="outline"
            variant="blue"
          >
            {`Reset${isLoading ? 'ting' : ''} password`}
          </Button>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            title="Company"
            description="Share your company details with us so that we can customise
            ProductHQ just for you."
          />

          <div className="grid grid-cols-2 gap-4 m-0">
            {/* Company Logo */}
            <div className="flex flex-col gap-1.5">
              <label className="block text-[13px] font-medium m-0">
                Upload Logo
              </label>
              <div className="flex items-start gap-4 m-0">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  {userDetails?.company_logo !== undefined &&
                  userDetails?.company_logo !== COMPANY_LOGO_PLACEHOLDER &&
                  userDetails.company_logo.length > 0 ? (
                    <img
                      className="is-rounded responsiveImage rounded-full w-16 h-16"
                      src={userDetails?.company_logo}
                    />
                  ) : (
                    <span className="text-purple-600 text-2xl">
                      {(userDetails?.company_name &&
                      userDetails.company_name.length > 0
                        ? userDetails.company_name
                        : 'ProductHQ'
                      )
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => {
                    setImageType(ImageType.COMPANY_LOGO);
                    setModal((prev) => !prev);
                  }}
                  state="outline"
                  variant="blue"
                >
                  Upload
                </Button>
              </div>
            </div>

            {/* favicon */}
            <div className="flex flex-col gap-1.5">
              <label className="block text-[13px] font-medium m-0">
                Upload Favicon
              </label>
              <div className="flex items-start gap-4 m-0">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <img
                    className="is-rounded responsiveImage rounded-full w-16 h-16"
                    src={userDetails?.favicon ?? FAVICON_PLACEHOLDER}
                  />
                </div>
                <Button
                  onClick={() => {
                    setImageType(ImageType.FAVICON);
                    setModal((prev) => !prev);
                  }}
                  state="outline"
                  variant="blue"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>

          {/* Company Name and Website */}
          <div className="grid grid-cols-2 gap-4 m-0">
            <InputField
              label="Company Name"
              onChange={(e) =>
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, company_name: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          company_name: e.target.value,
                        },
                      }
                )
              }
              placeholder="company name"
              type="text"
              value={userDetails?.company_name}
              variant="default"
            />
            <InputField
              label="Website URL"
              onChange={(e) =>
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, website_url: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          website_url: e.target.value,
                        },
                      }
                )
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
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, country_code: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          country_code: e.target.value,
                        },
                      }
                );
              }}
              placeholder="country code"
              type="text"
              value={userDetails?.country_code}
              variant="default"
            />
            <InputField
              label="Phone Number"
              onChange={(e) => {
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, phone: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, phone: e.target.value },
                      }
                );
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
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, address_line1: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          address_line1: e.target.value,
                        },
                      }
                );
              }}
              placeholder="address line 1"
              value={userDetails?.address_line1}
            />
            <InputField
              label="Address Line 2"
              onChange={(e) => {
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, address_line2: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: {
                          ...initialUser.user,
                          address_line2: e.target.value,
                        },
                      }
                );
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
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, city: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, city: e.target.value },
                      }
                );
              }}
              placeholder="city"
              value={userDetails?.city}
            />
            <InputField
              label="State"
              onChange={(e) => {
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, state: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, state: e.target.value },
                      }
                );
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
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, zip_code: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, zip_code: e.target.value },
                      }
                );
              }}
            />
            <InputField
              label="Country"
              type="text"
              placeholder="country"
              value={userDetails?.country}
              onChange={(e) => {
                setUser((prev) =>
                  prev
                    ? {
                        ...prev,
                        user: { ...prev.user, country: e.target.value },
                      }
                    : {
                        ...initialUser,
                        user: { ...initialUser.user, country: e.target.value },
                      }
                );
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
            className="w-fit px-4 py-2 bg-red-500 rounded-lg hover:bg-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-[13px]"
            disabled={deleteConfirmation !== 'DELETE' || isDeleting}
            loading={isLoading}
            onClick={handleDeleteAccount}
          >
            {`DELET${isDeleting ? 'ING...' : 'E'} ACCOUNT`}
          </Button>
        </div>
      </SettingsContainer>

      <UploadPhoto
        image_type={image_type}
        maxFileSize={2097152}
        setCompanyLogo={setCompanyLogo}
        setFavicon={setFavicon}
        setModal={setModal}
        setProfilePhoto={setProfilePhoto}
        show_modal={show_modal}
      />
    </Settings>
  );
}
