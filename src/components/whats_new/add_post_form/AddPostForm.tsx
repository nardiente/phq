import './styles.css';
import { ChangeType, Image, WhatsNew } from '../../../types/whats-new';
import { getApi, postApi, putApi } from '../../../utils/api/api';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { Publications } from '../../../utils/constants';
import { ApiFieldError } from '../../../utils/api/types';
import { UploadPhoto } from '../../../components/UploadPhoto';
import { ImageType } from '../../../types/user';
import { RbacPermissions } from '../../../types/common';
import TypeOfChangeDropdown from '../../ui/dropdown/type_of_change_dropdown/TypeOfChangeDropdown';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../contexts/UserContext';
import { useWhatsNew } from '../../../contexts/WhatsNewContext';

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    toolbarStyles: { display: 'none' },
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

let selected_image = '';

const AddPostForm = () => {
  const quillRef = useRef<ReactQuill>(null);

  const { t } = useTranslation();

  const { user } = useUser();
  const {
    state: { selectedPost: post },
    listWhatsNew,
    setShowAddForm,
  } = useWhatsNew();

  const [field_errors, setFieldErrors] = useState<ApiFieldError[]>([]);
  const [changeTypes, setChangeTypes] = useState<ChangeType[]>([]);
  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [selectedChangeTypes, setSelectedChangeTypes] = useState<ChangeType[]>(
    post?.change_types ?? []
  );
  const [description, setDescription] = useState<string>(
    post?.formatted_description ?? ''
  );
  const [images, setImages] = useState<Image[]>(post?.images ?? []);
  const [image_uploaded, setImageUploaded] = useState<string>('');
  const [publish_on, setPublishOn] = useState<Date>(
    post && post.scheduled_date ? new Date(post.scheduled_date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [show_modal, setModal] = useState<boolean>(false);

  const [draftLoading, setDraftLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [enable_button, setEnableButton] = useState<boolean>(false);

  const listChangeType = () => {
    getApi<ChangeType[]>({ url: 'whatsnew/change-types' }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setChangeTypes(data);
      }
    });
  };

  const save = (publication: string, is_scheduled?: boolean) => {
    if (publication == Publications.DRAFT) {
      setDraftLoading(true);
    }
    if (publication == Publications.PUBLISHED) {
      setLoading(true);
    }

    const new_images: Image[] = [];
    const post_images = document.querySelectorAll(
      '[src^="https://s3.amazonaws.com/uat-app.productfeedback.co/whats-new-images/"]'
    ) as NodeListOf<HTMLImageElement>;
    post_images.forEach((post_image) => {
      if (images.length > 0) {
        const current_image = images.find(
          (image) => image.image === post_image.currentSrc
        );
        if (current_image) new_images.push(current_image);
      }
    });

    const editor_text = quillRef?.current?.getEditor().getText();
    const privileged_editor = quillRef?.current?.makeUnprivilegedEditor(
      quillRef?.current?.getEditor()
    );
    const html = privileged_editor?.getHTML();

    postApi({
      url: 'whatsnew',
      payload: {
        change_types: selectedChangeTypes.map((type) => type.id),
        description: (editor_text == '\n' ? '' : editor_text) || '',
        formatted_description: description == '<p><br></p>' ? '' : html || '',
        images: new_images,
        is_scheduled,
        publication,
        title,
        publish_on: publish_on.toUTCString(),
      },
    }).then((res) => {
      setDraftLoading(false);
      setLoading(false);
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      } else {
        setShowAddForm(false);
        listWhatsNew([]);
      }
    });
  };

  const updatePost = (publication: string, is_scheduled?: boolean) => {
    if (publication == Publications.DRAFT) {
      setDraftLoading(true);
    }
    if (publication == Publications.PUBLISHED) {
      setLoading(true);
    }
    const new_images: Image[] = [];
    const post_images = document.querySelectorAll(
      '[src^="https://s3.amazonaws.com/uat-app.productfeedback.co/whats-new-images/"]'
    ) as NodeListOf<HTMLImageElement>;
    post_images.forEach((post_image) => {
      if (images.length > 0) {
        const current_image = images.find(
          (image) => image.image === post_image.currentSrc
        );
        if (current_image) new_images.push(current_image);
      }
    });

    const editor_text = quillRef?.current?.getEditor().getText();
    const privileged_editor = quillRef?.current?.makeUnprivilegedEditor(
      quillRef?.current?.getEditor()
    );
    const html = privileged_editor?.getHTML();
    setLoading(true);
    const payload = {
      change_types: selectedChangeTypes.map((type) => type.id),
      description: (editor_text == '\n' ? '' : editor_text) || '',
      formatted_description: description == '<p><br></p>' ? '' : html || '',
      is_scheduled,
      publication,
      title,
      publish_on: publish_on.toUTCString(),
    };
    if (new_images.length > 0) {
      Object.assign(payload, { images: new_images });
    }
    putApi<WhatsNew>(`whatsnew/${post?.id}`, payload).then((res) => {
      setDraftLoading(false);
      setLoading(false);
      if (res.results.errors) {
        setFieldErrors(res.results.errors);
      } else {
        setShowAddForm(false);
        listWhatsNew([]);
      }
    });
  };

  const uploadImage = () => {
    setModal(true);
  };

  useEffect(() => {
    listChangeType();

    quillRef?.current
      ?.getEditor()
      .getModule('toolbar')
      .addHandler('image', uploadImage);
  }, []);

  useEffect(() => {
    // convert HTML text to plain text
    const trimmed_description = description.replace(/<[^>]+>/g, '').trim();

    setEnableButton(
      !loading &&
        !draftLoading &&
        title.length > 0 &&
        (trimmed_description.length > 0 || images.length > 0) &&
        selectedChangeTypes.length > 0
    );

    // on Link/URL work around
    let has_link = false;
    const contents = quillRef?.current?.getEditor().getContents();
    const ops = contents?.ops;
    const new_ops = ops?.map((op) => {
      const attributes = op?.attributes;
      if (attributes) {
        let link = attributes.link;
        if (link) {
          if (!link.includes('http')) {
            has_link = true;
            delete attributes.link;
            delete op?.attributes;
            link = `http://${link}`;
          }
          Object.assign(attributes, { link });
        }
        Object.assign(op, { attributes });
      }
      return op;
    });
    if (contents && has_link) {
      delete contents?.ops;
      Object.assign(contents, { ops: new_ops });
      quillRef?.current?.getEditor().setContents(contents);
    }

    if (!description.includes('whats-new-images') && images.length > 0) {
      setImages([]);
    }

    const element = document.querySelector(
      `[src="${selected_image}"]`
    ) as HTMLImageElement;
    element?.style.removeProperty('width');

    const qlEditor = document.querySelector(
      '[class="ql-editor"]'
    ) as HTMLDivElement;
    if (qlEditor) {
      const post_images = qlEditor.getElementsByTagName(
        'img'
      ) as HTMLCollectionOf<HTMLImageElement>;
      for (let index = 0; index < post_images.length; index++) {
        const post_image = post_images[index];

        post_image.style.display = 'block';
        post_image.style.marginLeft = 'auto';
        post_image.style.marginRight = 'auto';

        if (images.length > 0) {
          const resizer = document.querySelector(
            '[style^="position: absolute; box-sizing: border-box; border: 1px dashed rgb(68, 68, 68);"]'
          );
          if (resizer) {
            const text_content = resizer.textContent;
            const text_contents = text_content?.split(' ');
            const image = images.find((image) => image.image == selected_image);
            if (
              text_contents &&
              text_contents[0].trim() != image?.image_width &&
              image
            ) {
              setImages(
                images.map((new_image) => {
                  if (
                    new_image.image == selected_image &&
                    text_contents &&
                    text_contents.length > 0
                  ) {
                    new_image.image_height = text_contents[2].trim();
                    new_image.image_width = text_contents[0].trim();
                  }
                  return new_image;
                })
              );
            }
          } else {
            const image = images.find((image) => image.image == post_image.src);
            if (image) {
              const image_width =
                image.image_width && image.image_width !== 'auto'
                  ? image.image_width.replace(/\D/g, '')
                  : '';
              if (image_width.length > 0) {
                post_image.width = Number(image_width);
              }
            }
          }
        }

        function mousedown(e: any) {
          selected_image = e.target.currentSrc;
        }

        post_image.addEventListener('mousedown', mousedown);
      }
    }
  }, [loading, draftLoading, title, description, selectedChangeTypes, images]);

  useEffect(() => {
    if (image_uploaded.length > 0) {
      const range = quillRef?.current?.getEditorSelection();
      quillRef?.current
        ?.getEditor()
        .insertEmbed(range?.index || 0, 'image', image_uploaded);

      const new_images = images;
      new_images.push({
        image: image_uploaded,
        image_height: 'auto',
        image_width: 'auto',
      });
      setImages(new_images);
    }
  }, [image_uploaded]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 animate-fade-in w-max bg-white rounded shadow-lg p-4">
      <div id="AddPostForm">
        <div className="title-container flex gap-2">
          <input
            type="text"
            placeholder="Write title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={() => setFieldErrors([])}
            readOnly={
              post &&
              post.created_by !== user?.user?.id &&
              !user?.rbac_permissions.includes(
                RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
              )
            }
          />
          <button
            type="button"
            className="close-button"
            onClick={() => setShowAddForm(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
            Close
          </button>
        </div>
        {field_errors.some((field_error) => field_error.field === 'title') ? (
          <label id="TitleError" className="error">
            {t(
              field_errors
                .find((field_error) => field_error.field === 'title')
                ?.message.replace('"title"', 'Title') ?? ''
            )}
          </label>
        ) : (
          ''
        )}
        <div className="type-of-change-container">
          <TypeOfChangeDropdown
            changeTypes={changeTypes}
            disabled={
              (post &&
                post.created_by !== user?.user?.id &&
                !user?.rbac_permissions.includes(
                  RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
                )) ??
              false
            }
            selectedChangeTypes={selectedChangeTypes}
            setSelectedChangeTypes={setSelectedChangeTypes}
          />
        </div>
        <hr className="divider"></hr>
        <div className="description-container">
          <div className="description">
            <ReactQuill
              className={`quill-wrapper word-break ${
                post &&
                post.created_by !== user?.user?.id &&
                !user?.rbac_permissions.includes(
                  RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
                )
                  ? 'no-pointer-events'
                  : ''
              }`}
              formats={formats}
              modules={modules}
              onChange={setDescription}
              placeholder="Start writing here..."
              ref={quillRef}
              tabIndex={4}
              theme="snow"
              value={description}
              readOnly={
                post &&
                post.created_by !== user?.user?.id &&
                !user?.rbac_permissions.includes(
                  RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
                )
              }
            />
          </div>
        </div>
        {field_errors.some(
          (field_error) => field_error.field === 'formatted_description'
        ) ? (
          <label id="DescriptionError" className="error">
            {t(
              field_errors
                .find(
                  (field_error) => field_error.field === 'formatted_description'
                )
                ?.message.replace('"formatted_description"', 'Description') ??
                ''
            )}
          </label>
        ) : (
          ''
        )}
        <div className="bottom-container">
          <div className="bottom">
            {(!post ||
              (post &&
                ((post.created_by == user?.user?.id &&
                  user.rbac_permissions.includes(
                    RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                  )) ||
                  (post.created_by != user?.user?.id &&
                    [
                      RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST,
                      RbacPermissions.MOVE_ANY_POST_FROM_PUBLISHED_TO_DRAFT,
                      RbacPermissions.SCHEDULE_OTHERS_POST,
                    ].some((rbac_permission) =>
                      user?.rbac_permissions.includes(rbac_permission)
                    ))))) && (
              <>
                {/* <button className="preview-button is-clickable" type="button">
                Preview
              </button> */}
                <div className="post-buttons">
                  <div className="button-group">
                    {(!post ||
                      (post &&
                        user?.rbac_permissions.includes(
                          RbacPermissions.MOVE_ANY_POST_FROM_PUBLISHED_TO_DRAFT
                        ))) && (
                      <button
                        className={`draft-button${
                          loading || draftLoading ? '' : ' is-clickable'
                        }`}
                        type="button"
                        onClick={() =>
                          post
                            ? updatePost(Publications.DRAFT)
                            : save(Publications.DRAFT)
                        }
                        disabled={!enable_button}
                      >
                        {draftLoading ? 'Loading...' : 'Save as draft'}
                      </button>
                    )}
                    <button
                      className={`publish-button${
                        loading || draftLoading ? '' : ' is-clickable'
                      }${
                        !post ||
                        (post &&
                          ((post.created_by != user?.user?.id &&
                            user?.rbac_permissions.includes(
                              RbacPermissions.SCHEDULE_OTHERS_POST
                            )) ||
                            (post.created_by == user?.user?.id &&
                              user.rbac_permissions.includes(
                                RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                              ))))
                          ? ''
                          : ' no-schedule-post'
                      }`}
                      type="button"
                      onClick={() => {
                        const is_scheduled = post?.scheduled_date
                          ? true
                          : false;
                        if (post)
                          updatePost(Publications.PUBLISHED, is_scheduled);
                        else save(Publications.PUBLISHED, is_scheduled);
                      }}
                      disabled={
                        !enable_button ||
                        (post &&
                          post.created_by !== user?.user?.id &&
                          !user?.rbac_permissions.includes(
                            RbacPermissions.EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST
                          ))
                      }
                    >
                      {loading
                        ? 'Loading...'
                        : post?.scheduled_date
                          ? 'Save'
                          : 'Publish Now'}
                    </button>
                    {(!post ||
                      (post &&
                        ((post.created_by != user?.user?.id &&
                          user?.rbac_permissions.includes(
                            RbacPermissions.SCHEDULE_OTHERS_POST
                          )) ||
                          (post.created_by == user?.user?.id &&
                            user?.rbac_permissions.includes(
                              RbacPermissions.CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST
                            ))))) && (
                      <button
                        className={`schedule-button${
                          loading || draftLoading ? '' : ' is-clickable'
                        }`}
                        type="button"
                        onClick={() => setShowDatePicker(true)}
                        disabled={!enable_button}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill="currentColor"
                          className="bi bi-calendar-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                      </button>
                    )}
                    {showDatePicker && (
                      <div>
                        <DatePicker
                          className="example-datepicker"
                          shouldCloseOnSelect={false}
                          selected={publish_on}
                          onChange={(date) => setPublishOn(date ?? new Date())}
                          inline
                          timeInputLabel=""
                          showTimeInput
                        >
                          <button
                            className={`datepicker-schedule-btn${
                              loading || draftLoading
                                ? ' is-not-clickable'
                                : ' is-clickable'
                            }`}
                            onClick={() => {
                              setShowDatePicker(false);
                              if (post) {
                                updatePost(Publications.PUBLISHED, true);
                              } else {
                                save(Publications.PUBLISHED, true);
                              }
                            }}
                            disabled={loading || draftLoading}
                          >
                            Schedule
                          </button>
                          <button
                            className="datepicker-cancel-btn is-clickable"
                            onClick={() => setShowDatePicker(false)}
                          >
                            Cancel
                          </button>
                        </DatePicker>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <UploadPhoto
          image_type={ImageType.WHATS_NEW_IMAGES}
          maxFileSize={2097152}
          setModal={setModal}
          setPhoto={setImageUploaded}
          show_modal={show_modal}
        />
      </div>
    </div>
  );
};

export default AddPostForm;
