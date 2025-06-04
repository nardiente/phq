import { Tag } from '../../types/feedback';
import { Modal, ModalBody } from 'reactstrap';
import { useSocket } from '../../contexts/SocketContext';
import { useUser } from '../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ApiFieldError } from '../../utils/api/types';
import { deleteApi, patchApi } from '../../utils/api/api';
import { Permissions } from '../../types/common';
import styled from 'styled-components';
import InputField from '../InputField';
import { SocketAction } from '../../types/socket';

const IconImg = styled.img`
  vertical-align: middle;
  margin-bottom: 0.25em;
  margin-right: 0.5em;
`;

export const EditableTag: React.FC<Tag> = (props: Tag) => {
  const { t } = useTranslation();

  const {
    state: { socket },
  } = useSocket();
  const { user } = useUser();

  const [editable, setEditable] = useState(false);
  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [tag_name, setTagName] = useState(props.tag);
  const [tag_description, setTagDescription] = useState(
    props.description || ''
  );
  const [updated_tag_description, setUpdatedTagDescription] = useState(
    props.description
  );
  const [updated_tag_name, setUpdatedTagName] = useState(props.tag);
  const [loading, setLoading] = useState<boolean>(false);
  const [show_modal, setModal] = useState(false);

  const handleSetModal = (e: any) => {
    e.preventDefault();
    setModal(!show_modal);
  };

  const handleYes = (e: any) => {
    if (props.on_delete) {
      props.on_delete(e);
    }
    handleSetModal(e);
  };

  const handleOnClickEditTag = () => {
    setEditable(true);
  };

  const handleOnClickCancelEdit = () => {
    setEditable(false);
    setTagName(updated_tag_name);
    setTagDescription(updated_tag_description || '');
  };

  const handleTagNameOnChange = (e: any) => {
    setFieldErrors([]);
    setTagName(e.target.value);
  };

  const handleTagDescription = (e: any) => {
    setTagDescription(e.target.value);
  };

  const handleOnClickSubmit = (tag: Tag) => async () => {
    if (tag_name === '') {
      setFieldErrors([
        {
          field: 'tag',
          message: 'error.tag.name',
        },
      ]);
    } else {
      setLoading(true);
      await patchApi<Tag[]>(`tags/${tag.id}`, {
        tag: tag_name,
        description: tag_description,
      }).then((res) => {
        const {
          results: { data, errors },
        } = res;
        if (errors) {
          setFieldErrors(errors);
        }
        if (data && data.length > 0) {
          setEditable(false);
          setUpdatedTagName(tag_name);
          setUpdatedTagDescription(tag_description);

          socket?.emit('message', {
            action: SocketAction.UPDATE_TAG,
            data: {
              created_by:
                res.results.data && res.results.data.length > 0
                  ? res.results.data[0].created_by || 0
                  : 0,
              projectId: user?.project?.id,
              tag: data[0],
            },
          });
        }
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    setTagName(props.tag);
    setTagDescription(props.description || '');
    setUpdatedTagName(props.tag);
    setUpdatedTagDescription(props.description);
    setFieldErrors(props.field_errors || []);
  }, [props.tag, props.description, props.field_errors]);

  return (
    <>
      <Modal
        id="Tags"
        isOpen={show_modal}
        centered={true}
        style={{ width: 'inherit' }}
      >
        <ModalBody>
          <span
            style={{
              display: 'flex',
              fontSize: 'x-large',
              justifyContent: 'end',
            }}
          >
            <label onClick={(e) => handleSetModal(e)}>
              <img
                className="is-clickable"
                src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/cross.svg"
                role="button"
              />
            </label>
          </span>
          <div
            style={{
              display: 'grid',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <span className="modal-delete-text-header">Delete Tag</span>
            <span className="modal-delete-text-sub">
              Are you sure you want to delete selected tags? Your action cannot
              be undone.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={(e) => handleSetModal(e)}
              className="button modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleYes}
              id={props.id.toString()}
              className="button modal-delete-btn"
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {!editable ? (
        <tr key={`Tag${props.id}`}>
          <td>{updated_tag_name}</td>
          <td>{updated_tag_description}</td>
          <td className="flex justify-end gap-2">
            <button
              className="edit-tag"
              onClick={handleOnClickEditTag}
              role="button"
              aria-label={`Tag${props.id}EditButton`}
              disabled={!user?.permissions.includes(Permissions.TAGS)}
            >
              <span>
                <IconImg src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/pencil-square.svg" />
              </span>
            </button>
            <button
              className="delete-tag"
              onClick={handleSetModal}
              role="button"
              aria-label={`Tag${props.id}DeleteButton`}
              id={props.id.toString()}
              disabled={!user?.permissions.includes(Permissions.TAGS)}
            >
              <span>
                <IconImg src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/trash.svg" />
              </span>
            </button>
          </td>
        </tr>
      ) : (
        <tr key={`TagEdit${props.id}`}>
          <td>
            <InputField
              className="-mt-1.5"
              label=""
              onChange={handleTagNameOnChange}
              error={field_errors.find((x) => x.field === 'tag')?.message}
              value={tag_name}
            />
          </td>
          <td>
            <InputField
              className="-mt-1.5"
              label=""
              onChange={handleTagDescription}
              value={tag_description}
            />
          </td>
          <td>
            <div className="level is-pulled-right">
              <button
                onClick={handleOnClickCancelEdit}
                type="button"
                className="button btn-cancel"
              >
                {t('cancel')}
              </button>
              <button
                disabled={loading}
                type="submit"
                onClick={handleOnClickSubmit(props)}
                className="button btn-save"
              >
                {loading ? 'Loading ...' : t('save')}
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const TagList = ({ data }: { data: Tag[] }) => {
  const {
    state: { socket },
  } = useSocket();
  const { user } = useUser();
  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const handleOnClickDeleteTag = (e: any) => {
    const id = e.target.id;
    deleteApi({ url: `tags/${id}` }).then((res) => {
      const {
        results: { data, errors },
      } = res;
      if (errors) {
        setFieldErrors(errors);
      }
      if (data) {
        const created_by = tags.length > 0 ? tags[0].created_by || 0 : 0;
        setTags(tags.filter((tag) => tag.id !== Number(id)));

        socket?.emit('message', {
          action: SocketAction.DELETE_TAG,
          data: { created_by, projectId: user?.project?.id, tag: data },
        });
      }
    });
  };

  useEffect(() => {
    setTags(data);
  }, [data]);

  return (
    <div id="Tags" className="columns is-mobile is-multiline">
      <div className="column">
        <div
          className="table-container"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
          }}
        >
          <table className="table">
            <thead className="is-size-7">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, idx) => (
                <EditableTag
                  key={idx}
                  id={tag.id}
                  tag={tag.tag}
                  description={tag.description || ''}
                  field_errors={field_errors}
                  on_delete={handleOnClickDeleteTag}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TagList;
