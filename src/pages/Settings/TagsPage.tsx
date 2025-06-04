import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../contexts/SocketContext';
import { useUser } from '../../contexts/UserContext';
import { useState } from 'react';
import { Tag } from '../../types/feedback';
import { ApiFieldError } from '../../utils/api/types';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import { getApi, postApi } from '../../utils/api/api';
import { Loader } from 'lucide-react';
import { Permissions, RbacPermissions } from '../../types/common';
import { ErrorSnackBar } from '../../components/Snackbar';
import TagList from '../../components/TagList/tag-list';
import { useNavigate } from 'react-router-dom';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import SectionHeader from '../../components/SectionHeader';
import InputField from '../../components/InputField';
import { SocketAction } from '../../types/socket';

export default function TagsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    state: { socket },
  } = useSocket();
  const { user } = useUser();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [tag, setTag] = useState<string>('');
  const [tag_added, setTagAdded] = useState<Tag[]>([]);
  const [tag_list, setTagList] = useState<Tag[]>([]);
  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [general_error, setGeneralError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setHasUnsavedChanges(tag.length > 0);
  }, [tag]);

  const handleOnChangeTag = (e: any) => {
    setFieldErrors([]);
    setTag(e.target.value);
  };

  const handleOnClickSubmit = () => {
    setLoading(true);
    const set_tags = tag.split(',').map((x) => ({ tag: x.trim() })) as any;

    postApi({ url: `tags`, payload: set_tags }).then((res) => {
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      }

      if (res.results.data) {
        setTagAdded(res.results.data as Tag[]);
        setTag('');
      }
      setLoading(false);
    });
  };

  const handleGetTags = () => {
    getApi<Tag[]>({ url: `tags` }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setTagList(data);

        socket?.emit('message', {
          action: SocketAction.SET_TAGS,
          data: {
            created_by: data.length > 0 ? data[0].created_by || 0 : 0,
            projectId: user?.project?.id,
            tags: data,
          },
        });
      }
      if (res.results.error) {
        setGeneralError(res.results.error);
      }
    });
  };

  useEffect(() => {
    handleGetTags();
  }, [tag_added]);

  return (
    <div id="Tags">
      {!user || user?.rbac_permissions.length == 0 ? (
        <div className="flex items-center justify-center mt-8">
          <Loader />
        </div>
      ) : (
        <>
          {user.rbac_permissions?.includes(
            RbacPermissions.MANAGE_TAGS_PAGE
          ) && (
            <Settings>
              <SettingsHeader
                title="Account Settings"
                secondaryButton={
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                }
              />

              <SettingsContainer>
                <SectionHeader
                  title="Tags"
                  description={
                    <>
                      <b>Add tags here:</b> {t('tags-heading-label')}
                    </>
                  }
                />
                <div className="columns is-mobile is-multiline">
                  <div className="column">
                    <InputField
                      label="Add Tags"
                      onChange={handleOnChangeTag}
                      disabled={!user.permissions.includes(Permissions.TAGS)}
                      error={
                        field_errors.find((x) => x.field === 'tag')?.message
                      }
                      placeholder="e.g. Tag 1, Tag 2, Tag 3"
                      readOnly={!user.permissions.includes(Permissions.TAGS)}
                      value={tag}
                      variant={
                        field_errors.some((x) => x.field === 'tag')
                          ? 'error'
                          : 'default'
                      }
                    />
                    <button
                      disabled={
                        loading ||
                        (tag !== '' ? false : true) ||
                        !user.permissions.includes(Permissions.TAGS)
                      }
                      onClick={handleOnClickSubmit}
                      type="button"
                      className="button add-tags-button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      {loading ? 'Loading ...' : t('add-tags')}
                    </button>
                  </div>
                </div>
                <ErrorSnackBar error={general_error} errors={[]} />
                {tag_list.length > 0 && <TagList data={tag_list} />}
              </SettingsContainer>
            </Settings>
          )}
        </>
      )}
    </div>
  );
}
