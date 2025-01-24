import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProjectAppearance, UserNameFormat } from '../../types/appearance';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { getApi, postApi } from '../../utils/api/api';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';
import { RbacPermissions, Permissions } from '../../types/common';
import { DisplayUserName } from '../../components/DisplayUserName/display-user-name';
import './styles.css';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import SectionHeader from '../../components/SectionHeader';
import ColorPicker from '../../components/ColorPicker';

export default function AppearancePage() {
  const navigate = useNavigate();

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
    getApi<ProjectAppearance>({
      url: 'projects/appearance',
    }).then((appearance) => {
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
    <Settings>
      <SettingsHeader
        title="Account Settings"
        primaryButton={
          <Button
            text="Update"
            disabled={loading || loading_user}
            onClick={handleUpdate}
          />
        }
        secondaryButton={
          <Button
            text="Cancel"
            onClick={() => navigate('/dashboard')}
            variant="secondary"
          />
        }
      />

      <>
        {(is_member &&
          user?.rbac_permissions.includes(
            RbacPermissions.MANAGE_PROJECT_DETAILS_PAGE
          )) ||
        (!is_member && is_admin) ? (
          <>
            <SettingsContainer id="Appearance">
              <SectionHeader
                title="Appearance"
                description={
                  <p>
                    Customise the appearance of your Upvotes, Roadmap and
                    What&apos;s New interface to match your brand&apos;s look
                    and feel.
                  </p>
                }
              />
              <div className="flex flex-col gap-6">
                <SectionHeader title="General" />
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Active Link Colour"
                    onChange={handleOnActiveLinkColor}
                    className={focus_al_container}
                    error={!active_link_color_valid_hex}
                    onBlur={() => {
                      setFocusALContainer('');
                    }}
                    onFocus={() => {
                      setFocusALContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={active_link_color}
                  />
                  <ColorPicker
                    className={focus_bg_container}
                    error={!background_color_valid_hex}
                    label="Background Colour"
                    onChange={handleOnBackgroundColor}
                    onBlur={() => {
                      setFocusBGContainer('');
                    }}
                    onFocus={() => {
                      setFocusBGContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={background_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Default Text Colour"
                    onChange={handleOnDefaultTextColor}
                    className={focus_dt_container}
                    error={!default_text_color_valid_hex}
                    onBlur={() => {
                      setFocusDTContainer('');
                    }}
                    onFocus={() => {
                      setFocusDTContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={default_text_color}
                  />
                  <ColorPicker
                    label="Icon Colour"
                    onChange={handleOnIconColor}
                    className={focus_ic_container}
                    error={!icon_color_valid_hex}
                    onBlur={() => {
                      setFocusICContainer('');
                    }}
                    onFocus={() => {
                      setFocusICContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value="icon_color"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SectionHeader title="Primary button colour" />
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Primary Button Border"
                    onChange={handleOnPrimaryButtonBorder}
                    className={focus_pbb_container}
                    error={!primary_button_border_valid_hex}
                    onBlur={() => {
                      setFocusPBBContainer('');
                    }}
                    onFocus={() => {
                      setFocusPBBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={primary_button_border}
                  />
                  <ColorPicker
                    label="Primary Button Colour"
                    onChange={handleOnPrimaryButtonColor}
                    className={focus_pb_container}
                    error={!primary_button_color_valid_hex}
                    onBlur={() => {
                      setFocusPBContainer('');
                    }}
                    onFocus={() => {
                      setFocusPBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={primary_button_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Primary Button Text Colour"
                    onChange={handleOnButtonTextColor}
                    className={focus_tc_container}
                    error={!button_text_color_valid_hex}
                    onBlur={() => {
                      setFocusTCContainer('');
                    }}
                    onFocus={() => {
                      setFocusTCContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={button_text_color}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SectionHeader title="Sign in buttons" />
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign In Button Border Colour"
                    onChange={handleOnInButtonBorderColor}
                    className={focus_sbb_container}
                    error={!sign_in_button_border_color_valid_hex}
                    onBlur={() => {
                      setFocusSBBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSBBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_in_button_border_color}
                  />
                  <ColorPicker
                    label="Sign In Button Colour"
                    onChange={handleOnInButtonColor}
                    className={focus_sb_container}
                    error={!sign_in_button_color_valid_hex}
                    onBlur={() => {
                      setFocusSBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_in_button_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign In Button Hover Colour"
                    onChange={handleOnInButtonHoverColor}
                    className={focus_sbh_container}
                    error={!sign_in_button_hover_color_valid_hex}
                    onBlur={() => {
                      setFocusSBHContainer('');
                    }}
                    onFocus={() => {
                      setFocusSBHContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_in_button_hover_color}
                  />
                  <ColorPicker
                    label="Sign In Button Text Colour"
                    onChange={handleOnInButtonTextColor}
                    className={focus_sbt_container}
                    error={!sign_in_button_text_color_valid_hex}
                    onBlur={() => {
                      setFocusSBTContainer('');
                    }}
                    onFocus={() => {
                      setFocusSBTContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_in_button_text_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign In Button Text Hover Colour"
                    onChange={handleOnInButtonTextHoverColor}
                    className={focus_sb_container}
                    error={!sign_in_button_text_hover_color_valid_hex}
                    onBlur={() => {
                      setFocusSBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_in_button_text_hover_color}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SectionHeader title="Sign up buttons" />
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign Up Button Border Colour"
                    onChange={handleOnUpButtonBorderColor}
                    className={focus_subb_container}
                    error={!sign_up_button_border_color_valid_hex}
                    onBlur={() => {
                      setFocusSUBBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSUBBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_up_button_border_color}
                  />
                  <ColorPicker
                    label="Sign Up Button Colour"
                    onChange={handleOnUpButtonColor}
                    className={focus_sub_container}
                    error={!sign_up_button_color_valid_hex}
                    onBlur={() => {
                      setFocusSUBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSUBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_up_button_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign Up Button Hover Colour"
                    onChange={handleOnUpButtonHoverColor}
                    className={focus_subh_container}
                    error={!sign_up_button_hover_color_valid_hex}
                    onBlur={() => {
                      setFocusSUBHContainer('');
                    }}
                    onFocus={() => {
                      setFocusSUBHContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_up_button_hover_color}
                  />
                  <ColorPicker
                    label="Sign Up Button Text Colour"
                    onChange={handleOnUpButtonTextColor}
                    className={focus_subt_container}
                    error={!sign_up_button_text_color_valid_hex}
                    onBlur={() => {
                      setFocusSUBTContainer('');
                    }}
                    onFocus={() => {
                      setFocusSUBTContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_up_button_text_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Sign Up Button Text Hover Colour"
                    onChange={handleOnUpButtonTextHoverColor}
                    className={focus_sub_container}
                    error={!sign_up_button_text_hover_color_valid_hex}
                    onBlur={() => {
                      setFocusSUBContainer('');
                    }}
                    onFocus={() => {
                      setFocusSUBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={sign_up_button_text_hover_color}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SectionHeader title="Tags" />
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Tags Default Background Colour"
                    onChange={handleOnTagsDefaultBackgroundColor}
                    className={focus_tdb_container}
                    error={!tags_default_background_color_valid_hex}
                    onBlur={() => {
                      setFocusTDBContainer('');
                    }}
                    onFocus={() => {
                      setFocusTDBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={tags_default_background_color}
                  />
                  <ColorPicker
                    label="Tags Default Text Colour"
                    onChange={handleOnTagsDefaultTextColor}
                    className={focus_tdt_container}
                    error={!tags_default_text_color_valid_hex}
                    onBlur={() => {
                      setFocusTDTContainer('');
                    }}
                    onFocus={() => {
                      setFocusTDTContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={tags_default_text_color}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 m-0">
                  <ColorPicker
                    label="Tags Highlighted Background Colour"
                    onChange={handleOnTagsActiveBackgroundColor}
                    className={focus_tb_container}
                    error={!tags_active_background_color_valid_hex}
                    onBlur={() => {
                      setFocusTBContainer('');
                    }}
                    onFocus={() => {
                      setFocusTBContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={tags_active_background_color}
                  />
                  <ColorPicker
                    label="Tags Highlighted Text Colour"
                    onChange={handleOnTagsActiveTextColor}
                    className={focus_tt_container}
                    error={!tags_active_text_color_valid_hex}
                    onBlur={() => {
                      setFocusTTContainer('');
                    }}
                    onFocus={() => {
                      setFocusTTContainer('focus-container');
                    }}
                    readOnly={
                      !user?.permissions.includes(Permissions.APPEARANCE)
                    }
                    value={tags_active_text_color}
                  />
                </div>
              </div>
            </SettingsContainer>
            <DisplayUserName
              selectedFormat={user_name_display_format}
              handleOnChangeUserNameFormat={handleOnChangeUserNameFormat}
            />
          </>
        ) : (
          <Navigate to="/no-access-page" replace />
        )}
      </>
    </Settings>
  );
}
