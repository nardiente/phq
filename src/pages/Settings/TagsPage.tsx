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
import styled from 'styled-components';
import { Permissions, RbacPermissions } from '../../types/common';
import Field from '../../components/Field';
import { ErrorSnackBar } from '../../components/Snackbar';
import TagList from '../../components/TagList/tag-list';
import { useNavigate } from 'react-router-dom';

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
        console.log('TagsPage handleGetTags socket:', socket);
        socket?.current?.send(
          JSON.stringify({
            action: 'updateTag',
            created_by: data.length > 0 ? data[0].created_by || 0 : 0,
          })
        );
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
        <SettingsArea>
          <SettingsSection>
            <div className="center-loader">
              <Loader />
            </div>
          </SettingsSection>
        </SettingsArea>
      ) : (
        <>
          {user.rbac_permissions?.includes(
            RbacPermissions.MANAGE_TAGS_PAGE
          ) && (
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
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="max-w-[600px] space-y-8 text-gray-700">
                    {/* User Details Section */}
                    <div className="space-y-6">
                      <h2 className="text-[16px] font-semibold text-gray-900">
                        Tags
                      </h2>
                    </div>
                  </div>
                  <div className="columns is-mobile is-multiline">
                    <div className="column">
                      <span className="add-tags-font">
                        <b>Add tags here:</b> {t('tags-heading-label')}
                      </span>
                      <Field
                        is_required={false}
                        class_name="input-enclosed w-full"
                        id="TagsField"
                        placeholder="e.g. Tag 1, Tag 2, Tag 3"
                        value={tag}
                        name="TagsField"
                        type="text"
                        tab_index={1}
                        onChange={handleOnChangeTag}
                        label="Add Tags"
                        has_error={field_errors.some((x) => x.field === 'tag')}
                        error_msg={
                          field_errors.find((x) => x.field === 'tag')?.message
                        }
                        readOnly={!user.permissions.includes(Permissions.TAGS)}
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
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
