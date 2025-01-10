import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProjectAppearance, UserNameFormat } from '../../types/appearance';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { getApi, postApi } from '../../utils/api/api';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';
import { Loader } from 'lucide-react';
import { RbacPermissions, Permissions } from '../../types/common';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DisplayUserName } from '../../components/DisplayUserName/display-user-name';
import './styles.css';

const SettingsArea = styled.div`
  grid-column-start: 2;
  background-color: white;
  border-top-right-radius: 6px;
  width: 704px;
`;

const SettingsSection = styled.div`
  background: #ffffff;
  border: 1px solid #f9f9fa;
  border-radius: 8px;
  padding: 24px 20px;
`;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 8px 8px;
  border: 1px solid #e2e2ec;
  border-radius: 4px;
  gap: 0.5rem;

  input[type='color'] {
    -webkit-appearance: none;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 24px;
      height: 24px;
    }
    &::-webkit-color-swatch {
      border: 1px solid #e2e2ec;
      border-radius: 50%;
      padding: 0;
    }
  }

  input[type='text'] {
    border: none;
    width: 100%;
    font-size: 16px;
  }
`;

export default function AppearancePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setHasUnsavedChanges } = useUnsavedChanges();
  const { user } = useUser();

  const [appearance, setAppearance] = useState<ProjectAppearance>();
  const [active_link_color, setActiveLinkColor] = useState('');
  const [active_link_color_valid_hex, setActiveLinkColorValidHex] =
    useState(true);
  const [appearance_id, setAppearanceId] = useState(0);
  const [background_color, setBackgroundColor] = useState('');
  const [background_color_valid_hex, setBackgroundColorValidHex] =
    useState(true);
  const [button_text_color, setButtonTextColor] = useState('');
  const [button_text_color_valid_hex, setButtonTextColorValidHex] =
    useState(true);
  const [default_text_color, setDefaultTextColor] = useState('');
  const [default_text_color_valid_hex, setDefaultTextColorValidHex] =
    useState(true);
  const [focus_al_container, setFocusALContainer] = useState('');
  const [focus_bg_container, setFocusBGContainer] = useState('');
  const [focus_dt_container, setFocusDTContainer] = useState('');
  const [focus_ic_container, setFocusICContainer] = useState('');
  const [focus_pb_container, setFocusPBContainer] = useState('');
  const [focus_pbb_container, setFocusPBBContainer] = useState('');
  const [focus_tc_container, setFocusTCContainer] = useState('');
  const [focus_sb_container, setFocusSBContainer] = useState('');
  const [focus_sbb_container, setFocusSBBContainer] = useState('');
  const [focus_sbh_container, setFocusSBHContainer] = useState('');
  const [focus_sbt_container, setFocusSBTContainer] = useState('');
  const [focus_sub_container, setFocusSUBContainer] = useState('');
  const [focus_subb_container, setFocusSUBBContainer] = useState('');
  const [focus_subh_container, setFocusSUBHContainer] = useState('');
  const [focus_subt_container, setFocusSUBTContainer] = useState('');
  const [focus_tb_container, setFocusTBContainer] = useState('');
  const [focus_tt_container, setFocusTTContainer] = useState('');
  const [focus_tdb_container, setFocusTDBContainer] = useState('');
  const [focus_tdt_container, setFocusTDTContainer] = useState('');
  const [icon_color, setIconColor] = useState('');
  const [icon_color_valid_hex, setIconColorValidHex] = useState(true);
  const [primary_button_border, setPrimaryButtonBorder] = useState('');
  const [primary_button_border_valid_hex, setPrimaryButtonBorderValidHex] =
    useState(true);
  const [primary_button_color, setPrimaryButtonColor] = useState('');
  const [primary_button_color_valid_hex, setPrimaryButtonColorValidHex] =
    useState(true);
  const [sign_in_button_color, setInButtonColor] = useState('');
  const [sign_in_button_color_valid_hex, setInButtonColorValidHex] =
    useState(true);
  const [sign_in_button_border_color, setInButtonBorderColor] = useState('');
  const [
    sign_in_button_border_color_valid_hex,
    setInButtonBorderColorValidHex,
  ] = useState(true);
  const [sign_in_button_hover_color, setInButtonHoverColor] = useState('');
  const [sign_in_button_hover_color_valid_hex, setInButtonHoverColorValidHex] =
    useState(true);
  const [sign_in_button_text_color, setInButtonTextColor] = useState('');
  const [sign_in_button_text_color_valid_hex, setInButtonTextColorValidHex] =
    useState(true);
  const [sign_in_button_text_hover_color, setInButtonTextHoverColor] =
    useState('');
  const [
    sign_in_button_text_hover_color_valid_hex,
    setInButtonTextHoverColorValidHex,
  ] = useState(true);
  const [sign_up_button_color, setUpButtonColor] = useState('');
  const [sign_up_button_color_valid_hex, setUpButtonColorValidHex] =
    useState(true);
  const [sign_up_button_border_color, setUpButtonBorderColor] = useState('');
  const [
    sign_up_button_border_color_valid_hex,
    setUpButtonBorderColorValidHex,
  ] = useState(true);
  const [sign_up_button_hover_color, setUpButtonHoverColor] = useState('');
  const [sign_up_button_hover_color_valid_hex, setUpButtonHoverColorValidHex] =
    useState(true);
  const [sign_up_button_text_color, setUpButtonTextColor] = useState('');
  const [sign_up_button_text_color_valid_hex, setUpButtonTextColorValidHex] =
    useState(true);
  const [sign_up_button_text_hover_color, setUpButtonTextHoverColor] =
    useState('');
  const [
    sign_up_button_text_hover_color_valid_hex,
    setUpButtonTextHoverColorValidHex,
  ] = useState(true);
  const [tags_active_background_color, setTagsActiveBackgroundColor] =
    useState('');
  const [
    tags_active_background_color_valid_hex,
    setTagsActiveBackgroundColorValidHex,
  ] = useState(true);
  const [tags_active_text_color, setTagsActiveTextColor] = useState('');
  const [tags_active_text_color_valid_hex, setTagsActiveTextColorValidHex] =
    useState(true);
  const [tags_default_background_color, setTagsDefaultBackgroundColor] =
    useState('');
  const [
    tags_default_background_color_valid_hex,
    setTagsDefaultBackgroundColorValidHex,
  ] = useState(true);
  const [tags_default_text_color, setTagsDefaultTextColor] = useState('');
  const [tags_default_text_color_valid_hex, setTagsDefaultTextColorValidHex] =
    useState(true);
  const [user_name_display_format, setUserNameDisplayFormat] =
    useState<UserNameFormat>(UserNameFormat.FF_FL);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading_user, setLoadingUser] = useState<boolean>(true);
  const [is_member, setIsMember] = useState<boolean>(false);

  const is_admin = import.meta.env.VITE_SYSTEM_TYPE === 'admin';

  useEffect(() => {
    setHasUnsavedChanges(
      (appearance &&
        ((appearance.active_link_color &&
          appearance.active_link_color !== active_link_color) ||
          (appearance.background_color &&
            appearance.background_color !== background_color) ||
          (appearance.button_text_color &&
            appearance.button_text_color !== button_text_color) ||
          (appearance.default_text_color &&
            appearance.default_text_color !== default_text_color) ||
          (appearance.icon_color && appearance.icon_color !== icon_color) ||
          (appearance.primary_button_border &&
            appearance.primary_button_border !== primary_button_border) ||
          (appearance.primary_button_color &&
            appearance.primary_button_color !== primary_button_color) ||
          (appearance.sign_in_button_color &&
            appearance.sign_in_button_color !== sign_in_button_color) ||
          (appearance.sign_in_button_border_color &&
            appearance.sign_in_button_border_color !==
              sign_in_button_border_color) ||
          (appearance.sign_in_button_hover_color &&
            appearance.sign_in_button_hover_color !==
              sign_in_button_hover_color) ||
          (appearance.sign_in_button_text_color &&
            appearance.sign_in_button_text_color !==
              sign_in_button_text_color) ||
          (appearance.sign_in_button_text_hover_color &&
            appearance.sign_in_button_text_hover_color !==
              sign_in_button_text_hover_color) ||
          (appearance.sign_up_button_color &&
            appearance.sign_up_button_color !== sign_up_button_color) ||
          (appearance.sign_up_button_border_color &&
            appearance.sign_up_button_border_color !==
              sign_up_button_border_color) ||
          (appearance.sign_up_button_hover_color &&
            appearance.sign_up_button_hover_color !==
              sign_up_button_hover_color) ||
          (appearance.sign_up_button_text_color &&
            appearance.sign_up_button_text_color !==
              sign_up_button_text_color) ||
          (appearance.sign_up_button_text_hover_color &&
            appearance.sign_up_button_text_hover_color !==
              sign_up_button_text_hover_color) ||
          (appearance.tags_active_background_color &&
            appearance.tags_active_background_color !==
              tags_active_background_color) ||
          (appearance.tags_active_text_color &&
            appearance.tags_active_text_color !== tags_active_text_color) ||
          (appearance.tags_default_background_color &&
            appearance.tags_default_background_color !==
              tags_default_background_color) ||
          (appearance.tags_default_text_color &&
            appearance.tags_default_text_color !== tags_default_text_color) ||
          (appearance.user_name_display_format &&
            appearance.user_name_display_format !==
              user_name_display_format))) ??
        false
    );
  }, [
    active_link_color,
    background_color,
    button_text_color,
    default_text_color,
    icon_color,
    primary_button_border,
    primary_button_color,
    sign_in_button_color,
    sign_in_button_border_color,
    sign_in_button_hover_color,
    sign_in_button_text_color,
    sign_in_button_text_hover_color,
    sign_up_button_color,
    sign_up_button_border_color,
    sign_up_button_hover_color,
    sign_up_button_text_color,
    sign_up_button_text_hover_color,
    tags_active_background_color,
    tags_active_text_color,
    tags_default_background_color,
    tags_default_text_color,
    user_name_display_format,
  ]);

  const handleGetAppearance = () => {
    getApi<ProjectAppearance>('projects/appearance').then((appearance) => {
      const data = appearance.results.data;
      setAppearance(data);
      setActiveLinkColor(data?.active_link_color || '#913187');
      setAppearanceId(data?.id || appearance_id);
      setBackgroundColor(data?.background_color || '#ffffff');
      setButtonTextColor(data?.button_text_color || '#ffffff');
      setDefaultTextColor(data?.default_text_color || '#3d3d5e');
      setIconColor(data?.icon_color || '#913187');
      setPrimaryButtonBorder(data?.primary_button_border || '#e5e7eb');
      setPrimaryButtonColor(data?.primary_button_color || '#913187');
      setInButtonColor(data?.sign_in_button_color || '#ffffff');
      setInButtonBorderColor(data?.sign_in_button_border_color || '#e5e7eb');
      setInButtonHoverColor(data?.sign_in_button_hover_color || '#5a00cd');
      setInButtonTextColor(data?.sign_in_button_text_color || '#5a00cd');
      setInButtonTextHoverColor(
        data?.sign_in_button_text_hover_color || '#ffffff'
      );
      setUpButtonColor(data?.sign_up_button_color || '#5a00cd');
      setUpButtonBorderColor(data?.sign_up_button_border_color || '#e5e7eb');
      setUpButtonHoverColor(data?.sign_up_button_hover_color || '#5a00cd');
      setUpButtonTextColor(data?.sign_up_button_text_color || '#ffffff');
      setUpButtonTextHoverColor(
        data?.sign_up_button_text_hover_color || '#5a00cd'
      );
      setTagsActiveBackgroundColor(
        data?.tags_active_background_color || '#ebdff9'
      );
      setTagsActiveTextColor(data?.tags_active_text_color || '#5a00cd');
      setTagsDefaultBackgroundColor(
        data?.tags_default_background_color || '#f3f4f6'
      );
      setTagsDefaultTextColor(data?.tags_default_text_color || '#110733');
      setUserNameDisplayFormat(
        data?.user_name_display_format ?? UserNameFormat.FF_FL
      );
    });
  };

  const handleOnActiveLinkColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setActiveLinkColor(value);

    if (!check) {
      setActiveLinkColorValidHex(false);
    } else {
      setActiveLinkColorValidHex(true);
    }
  };

  const handleOnBackgroundColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setBackgroundColor(value);

    if (!check) {
      setBackgroundColorValidHex(false);
    } else {
      setBackgroundColorValidHex(true);
    }
  };

  const handleOnButtonTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setButtonTextColor(value);

    if (!check) {
      setButtonTextColorValidHex(false);
    } else {
      setButtonTextColorValidHex(true);
    }
  };

  const handleOnDefaultTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setDefaultTextColor(value);

    if (!check) {
      setDefaultTextColorValidHex(false);
    } else {
      setDefaultTextColorValidHex(true);
    }
  };

  const handleOnIconColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setIconColor(value);

    if (!check) {
      setIconColorValidHex(false);
    } else {
      setIconColorValidHex(true);
    }
  };

  const handleOnPrimaryButtonBorder = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setPrimaryButtonBorder(value);

    if (!check) {
      setPrimaryButtonBorderValidHex(false);
    } else {
      setPrimaryButtonBorderValidHex(true);
    }
  };

  const handleOnPrimaryButtonColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setPrimaryButtonColor(value);

    if (!check) {
      setPrimaryButtonColorValidHex(false);
    } else {
      setPrimaryButtonColorValidHex(true);
    }
  };

  const handleOnInButtonColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setInButtonColor(value);

    if (!check) {
      setInButtonColorValidHex(false);
    } else {
      setInButtonColorValidHex(true);
    }
  };

  const handleOnInButtonBorderColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setInButtonBorderColor(value);

    if (!check) {
      setInButtonBorderColorValidHex(false);
    } else {
      setInButtonBorderColorValidHex(true);
    }
  };

  const handleOnInButtonHoverColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setInButtonHoverColor(value);

    if (!check) {
      setInButtonHoverColorValidHex(false);
    } else {
      setInButtonHoverColorValidHex(true);
    }
  };

  const handleOnInButtonTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setInButtonTextColor(value);

    if (!check) {
      setInButtonTextColorValidHex(false);
    } else {
      setInButtonTextColorValidHex(true);
    }
  };

  const handleOnInButtonTextHoverColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setInButtonTextHoverColor(value);

    if (!check) {
      setInButtonTextHoverColorValidHex(false);
    } else {
      setInButtonTextHoverColorValidHex(true);
    }
  };

  const handleOnUpButtonColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setUpButtonColor(value);

    if (!check) {
      setUpButtonColorValidHex(false);
    } else {
      setUpButtonColorValidHex(true);
    }
  };

  const handleOnUpButtonBorderColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setUpButtonBorderColor(value);

    if (!check) {
      setUpButtonBorderColorValidHex(false);
    } else {
      setUpButtonBorderColorValidHex(true);
    }
  };

  const handleOnUpButtonHoverColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setUpButtonHoverColor(value);

    if (!check) {
      setUpButtonHoverColorValidHex(false);
    } else {
      setUpButtonHoverColorValidHex(true);
    }
  };

  const handleOnUpButtonTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setUpButtonTextColor(value);

    if (!check) {
      setUpButtonTextColorValidHex(false);
    } else {
      setUpButtonTextColorValidHex(true);
    }
  };

  const handleOnUpButtonTextHoverColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setUpButtonTextHoverColor(value);

    if (!check) {
      setUpButtonTextHoverColorValidHex(false);
    } else {
      setUpButtonTextHoverColorValidHex(true);
    }
  };

  const handleOnTagsActiveBackgroundColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setTagsActiveBackgroundColor(value);

    if (!check) {
      setTagsActiveBackgroundColorValidHex(false);
    } else {
      setTagsActiveBackgroundColorValidHex(true);
    }
  };

  const handleOnTagsActiveTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setTagsActiveTextColor(value);

    if (!check) {
      setTagsActiveTextColorValidHex(false);
    } else {
      setTagsActiveTextColorValidHex(true);
    }
  };

  const handleOnTagsDefaultBackgroundColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setTagsDefaultBackgroundColor(value);

    if (!check) {
      setTagsDefaultBackgroundColorValidHex(false);
    } else {
      setTagsDefaultBackgroundColorValidHex(true);
    }
  };

  const handleOnTagsDefaultTextColor = (e: any) => {
    const value = e.target.value;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    const check = reg.test(value);

    setTagsDefaultTextColor(value);

    if (!check) {
      setTagsDefaultTextColorValidHex(false);
    } else {
      setTagsDefaultTextColorValidHex(true);
    }
  };

  const handleOnChangeUserNameFormat = (format: UserNameFormat) => {
    setUserNameDisplayFormat(format);
  };

  const handleUpdate = () => {
    setLoading(true);
    postApi({
      url: 'projects/appearance',
      payload: {
        id: appearance_id,
        active_link_color,
        background_color,
        button_text_color,
        default_text_color,
        icon_color,
        primary_button_border,
        primary_button_color,
        sign_in_button_color,
        sign_in_button_border_color,
        sign_in_button_hover_color,
        sign_in_button_text_color,
        sign_in_button_text_hover_color,
        sign_up_button_color,
        sign_up_button_border_color,
        sign_up_button_hover_color,
        sign_up_button_text_color,
        sign_up_button_text_hover_color,
        tags_active_background_color,
        tags_active_text_color,
        tags_default_background_color,
        tags_default_text_color,
        user_name_display_format,
      },
    }).then((res) => {
      const data = res.results.data as ProjectAppearance;

      setAppearance(data);
      setAppearanceId(data?.id || appearance_id);

      if (data) {
        toast('Updated', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
        });
      }

      setLoading(false);
    });
    setHasUnsavedChanges(false);
  };

  useEffect(() => {
    if (user?.user) {
      if (user.user.role_id) {
        setIsMember(true);
      }
      setLoadingUser(false);
    }
  }, [user]);

  useEffect(() => {
    handleGetAppearance();
    setHasUnsavedChanges(false);
  }, []);

  return (
    <div id="Settings" className="min-h-screen bg-[#fafafa] pb-12">
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
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg"
              disabled={loading || loading_user}
            >
              Update
            </button>
          </div>
        </div>
        {!user || user.rbac_permissions.length == 0 ? (
          <SettingsArea>
            <SettingsSection>
              <div className="center-loader">
                <Loader />
              </div>
            </SettingsSection>
          </SettingsArea>
        ) : (
          <>
            {(is_member &&
              user.rbac_permissions.includes(
                RbacPermissions.MANAGE_PROJECT_DETAILS_PAGE
              )) ||
            (!is_member && is_admin) ? (
              <>
                <div
                  id="Appearance"
                  className="bg-white rounded-lg border border-gray-200 p-6 mb-2"
                >
                  <div className="settings-section">
                    <h3>Appearance</h3>
                    <p>
                      Customise the appearance of your Upvotes, Roadmap and
                      What&apos;s New interface to match your brand&apos;s look
                      and feel.
                    </p>
                  </div>
                  <div className="settings-section">
                    <h3>General</h3>
                    <div className="custom-grid">
                      <div className="custom-input">
                        <label>Active Link Colour</label>
                        <Container
                          className={focus_al_container}
                          onFocus={() => {
                            setFocusALContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusALContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="ActiveLinkColorField"
                            name="ActiveLinkColorField"
                            onChange={handleOnActiveLinkColor}
                            value={active_link_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="ActiveLinkColorField"
                            name="ActiveLinkColorField"
                            onChange={handleOnActiveLinkColor}
                            value={active_link_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="ActiveLinkColorHexError"
                          style={{
                            display: active_link_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Background Colour</label>
                        <Container
                          className={focus_bg_container}
                          onFocus={() => {
                            setFocusBGContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusBGContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="BackgroundColorField"
                            name="BackgroundColorField"
                            onChange={handleOnBackgroundColor}
                            value={background_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="BackgroundColorField"
                            name="BackgroundColorField"
                            onChange={handleOnBackgroundColor}
                            value={background_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="BackgroundColorHexError"
                          style={{
                            display: background_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Default Text Colour</label>
                        <Container
                          className={focus_dt_container}
                          onFocus={() => {
                            setFocusDTContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusDTContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="DefaultTextColorField"
                            name="DefaultTextColorField"
                            onChange={handleOnDefaultTextColor}
                            value={default_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="DefaultTextColorField"
                            name="DefaultTextColorField"
                            onChange={handleOnDefaultTextColor}
                            value={default_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="DefaultTextColorHexError"
                          style={{
                            display: default_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Icon Colour</label>
                        <Container
                          className={focus_ic_container}
                          onFocus={() => {
                            setFocusICContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusICContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="IconColorField"
                            name="IconColorField"
                            onChange={handleOnIconColor}
                            value={icon_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="IconColorField"
                            name="IconColorField"
                            onChange={handleOnIconColor}
                            value={icon_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="IconColorHexError"
                          style={{
                            display: icon_color_valid_hex ? 'none' : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>Primary button colour</h3>
                    <div className="custom-grid">
                      <div className="custom-input">
                        <label>Primary Button Border</label>
                        <Container
                          className={focus_pbb_container}
                          onFocus={() => {
                            setFocusPBBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusPBBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="PrimaryButtonBorderField"
                            name="PrimaryButtonBorderField"
                            onChange={handleOnPrimaryButtonBorder}
                            value={primary_button_border}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="PrimaryButtonBorderField"
                            name="PrimaryButtonBorderField"
                            onChange={handleOnPrimaryButtonBorder}
                            value={primary_button_border}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="PrimaryButtonBorderHexError"
                          style={{
                            display: primary_button_border_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Primary Button Colour</label>
                        <Container
                          className={focus_pb_container}
                          onFocus={() => {
                            setFocusPBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusPBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="PrimaryButtonColorField"
                            name="PrimaryButtonColorField"
                            onChange={handleOnPrimaryButtonColor}
                            value={primary_button_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="PrimaryButtonColorField"
                            name="PrimaryButtonColorField"
                            onChange={handleOnPrimaryButtonColor}
                            value={primary_button_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="PrimaryButtonColorHexError"
                          style={{
                            display: primary_button_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Primary Button Text Colour</label>
                        <Container
                          className={focus_tc_container}
                          onFocus={() => {
                            setFocusTCContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusTCContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="PrimaryButtonTextColorField"
                            name="PrimaryButtonTextColorField"
                            onChange={handleOnButtonTextColor}
                            value={button_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="PrimaryButtonTextColorField"
                            name="PrimaryButtonTextColorField"
                            onChange={handleOnButtonTextColor}
                            value={button_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="PrimaryButtonTextColorHexError"
                          style={{
                            display: button_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>Sign in buttons</h3>
                    <div className="custom-grid">
                      <div className="custom-input">
                        <label>Sign In Button Border Colour</label>
                        <Container
                          className={focus_sbb_container}
                          onFocus={() => {
                            setFocusSBBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSBBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignInButtonBorderColorField"
                            name="SignInButtonBorderColorField"
                            onChange={handleOnInButtonBorderColor}
                            value={sign_in_button_border_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignInButtonBorderColorField"
                            name="SignInButtonBorderColorField"
                            onChange={handleOnInButtonBorderColor}
                            value={sign_in_button_border_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignInButtonBorderHexError"
                          style={{
                            display: sign_in_button_border_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign In Button Colour</label>
                        <Container
                          className={focus_sb_container}
                          onFocus={() => {
                            setFocusSBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignInButtonColorField"
                            name="SignInButtonColorField"
                            onChange={handleOnInButtonColor}
                            value={sign_in_button_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignInButtonColorField"
                            name="SignInButtonColorField"
                            onChange={handleOnInButtonColor}
                            value={sign_in_button_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignInButtonHexError"
                          style={{
                            display: sign_in_button_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign In Button Hover Colour</label>
                        <Container
                          className={focus_sbh_container}
                          onFocus={() => {
                            setFocusSBHContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSBHContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignInButtonHoverColorField"
                            name="SignInButtonHoverColorField"
                            onChange={handleOnInButtonHoverColor}
                            value={sign_in_button_hover_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignInButtonHoverColorField"
                            name="SignInButtonHoverColorField"
                            onChange={handleOnInButtonHoverColor}
                            value={sign_in_button_hover_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignInButtonHoverHexError"
                          style={{
                            display: sign_in_button_hover_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign In Button Text Colour</label>
                        <Container
                          className={focus_sbt_container}
                          onFocus={() => {
                            setFocusSBTContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSBTContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignInButtonTextColorField"
                            name="SignInButtonTextColorField"
                            onChange={handleOnInButtonTextColor}
                            value={sign_in_button_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignInButtonTextColorField"
                            name="SignInButtonTextColorField"
                            onChange={handleOnInButtonTextColor}
                            value={sign_in_button_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignInButtonTextHexError"
                          style={{
                            display: sign_in_button_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign In Button Text Hover Colour</label>
                        <Container
                          className={focus_sb_container}
                          onFocus={() => {
                            setFocusSBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignInButtonTextHoverColorField"
                            name="SignInButtonTextHoverColorField"
                            onChange={handleOnInButtonTextHoverColor}
                            value={sign_in_button_text_hover_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignInButtonTextHoverColorField"
                            name="SignInButtonTextHoverColorField"
                            onChange={handleOnInButtonTextHoverColor}
                            value={sign_in_button_text_hover_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignInButtonHexError"
                          style={{
                            display: sign_in_button_text_hover_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>Sign up buttons</h3>
                    <div className="custom-grid">
                      <div className="custom-input">
                        <label>Sign Up Button Border Colour</label>
                        <Container
                          className={focus_subb_container}
                          onFocus={() => {
                            setFocusSUBBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSUBBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignUpButtonBorderColorField"
                            name="SignUpButtonBorderColorField"
                            onChange={handleOnUpButtonBorderColor}
                            value={sign_up_button_border_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignUpButtonBorderColorField"
                            name="SignUpButtonBorderColorField"
                            onChange={handleOnUpButtonBorderColor}
                            value={sign_up_button_border_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignUpButtonBorderHexError"
                          style={{
                            display: sign_up_button_border_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign Up Button Colour</label>
                        <Container
                          className={focus_sub_container}
                          onFocus={() => {
                            setFocusSUBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSUBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignUpButtonColorField"
                            name="SignUpButtonColorField"
                            onChange={handleOnUpButtonColor}
                            value={sign_up_button_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignUpButtonColorField"
                            name="SignUpButtonColorField"
                            onChange={handleOnUpButtonColor}
                            value={sign_up_button_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignUpButtonHexError"
                          style={{
                            display: sign_up_button_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign Up Button Hover Colour</label>
                        <Container
                          className={focus_subh_container}
                          onFocus={() => {
                            setFocusSUBHContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSUBHContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignUpButtonHoverColorField"
                            name="SignUpButtonHoverColorField"
                            onChange={handleOnUpButtonHoverColor}
                            value={sign_up_button_hover_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignUpButtonHoverColorField"
                            name="SignUpButtonHoverColorField"
                            onChange={handleOnUpButtonHoverColor}
                            value={sign_up_button_hover_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignUpButtonHoverHexError"
                          style={{
                            display: sign_up_button_hover_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign Up Button Text Colour</label>
                        <Container
                          className={focus_subt_container}
                          onFocus={() => {
                            setFocusSUBTContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSUBTContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignUpButtonTextColorField"
                            name="SignUpButtonTextColorField"
                            onChange={handleOnUpButtonTextColor}
                            value={sign_up_button_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignUpButtonTextColorField"
                            name="SignUpButtonTextColorField"
                            onChange={handleOnUpButtonTextColor}
                            value={sign_up_button_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignUpButtonTextHexError"
                          style={{
                            display: sign_up_button_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Sign Up Button Text Hover Colour</label>
                        <Container
                          className={focus_sub_container}
                          onFocus={() => {
                            setFocusSUBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusSUBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="SignUpButtonTextHoverColorField"
                            name="SignUpButtonTextHoverColorField"
                            onChange={handleOnUpButtonTextHoverColor}
                            value={sign_up_button_text_hover_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="SignUpButtonTextHoverColorField"
                            name="SignUpButtonTextHoverColorField"
                            onChange={handleOnUpButtonTextHoverColor}
                            value={sign_up_button_text_hover_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="SignUpButtonHexError"
                          style={{
                            display: sign_up_button_text_hover_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>Tags</h3>
                    <div className="custom-grid">
                      <div className="custom-input">
                        <label>Tags Default Background Colour</label>
                        <Container
                          className={focus_tdb_container}
                          onFocus={() => {
                            setFocusTDBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusTDBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="TagsDefaultBackgroundColorField"
                            name="TagsDefaultBackgroundColorField"
                            onChange={handleOnTagsDefaultBackgroundColor}
                            value={tags_default_background_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="TagsDefaultBackgroundColorField"
                            name="TagsDefaultBackgroundColorField"
                            onChange={handleOnTagsDefaultBackgroundColor}
                            value={tags_default_background_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="TagsDefaultBackgroundHexError"
                          style={{
                            display: tags_default_background_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Tags Default Text Colour</label>
                        <Container
                          className={focus_tdt_container}
                          onFocus={() => {
                            setFocusTDTContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusTDTContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="TagsDefaultTextColorField"
                            name="TagsDefaultTextColorField"
                            onChange={handleOnTagsDefaultTextColor}
                            value={tags_default_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="TagsDefaultTextColorField"
                            name="TagsDefaultTextColorField"
                            onChange={handleOnTagsDefaultTextColor}
                            value={tags_default_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="TagsDefaultTextHexError"
                          style={{
                            display: tags_default_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Tags Highlighted Background Colour</label>
                        <Container
                          className={focus_tb_container}
                          onFocus={() => {
                            setFocusTBContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusTBContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="TagsActiveBackgroundColorField"
                            name="TagsActiveBackgroundColorField"
                            onChange={handleOnTagsActiveBackgroundColor}
                            value={tags_active_background_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="TagsActiveBackgroundColorField"
                            name="TagsActiveBackgroundColorField"
                            onChange={handleOnTagsActiveBackgroundColor}
                            value={tags_active_background_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="TagsActiveTextHexError"
                          style={{
                            display: tags_active_background_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>Tags Highlighted Text Colour</label>
                        <Container
                          className={focus_tt_container}
                          onFocus={() => {
                            setFocusTTContainer('focus-container');
                          }}
                          onBlur={() => {
                            setFocusTTContainer('');
                          }}
                        >
                          <input
                            type="color"
                            id="TagsActiveTextColorField"
                            name="TagsActiveTextColorField"
                            onChange={handleOnTagsActiveTextColor}
                            value={tags_active_text_color}
                            disabled={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                          <input
                            className="no-outline"
                            type="text"
                            id="TagsActiveTextColorField"
                            name="TagsActiveTextColorField"
                            onChange={handleOnTagsActiveTextColor}
                            value={tags_active_text_color}
                            readOnly={
                              !user.permissions.includes(Permissions.APPEARANCE)
                            }
                          />
                        </Container>
                        <label
                          className="has-text-danger is-size-7"
                          id="TagsActiveTextHexError"
                          style={{
                            display: tags_active_text_color_valid_hex
                              ? 'none'
                              : 'inline',
                          }}
                        >
                          {t('error.invalid_hex_value')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <DisplayUserName
                  selectedFormat={user_name_display_format}
                  handleOnChangeUserNameFormat={handleOnChangeUserNameFormat}
                />
              </>
            ) : (
              <Navigate to="/no-access-page" replace />
            )}
          </>
        )}
      </div>
    </div>
  );
}
