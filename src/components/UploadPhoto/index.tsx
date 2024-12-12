import * as React from 'react';
import heic2any from 'heic2any';
import FadeLoader from 'react-spinners/FadeLoader';
import Tiff from 'tiff.js';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { postApi } from '../../utils/api/api';
import { ImageType } from '../../types/user';
import { User } from '../../types/user';
import { AllowedFileTypes } from './type';
import { WhatsNew } from '../../types/whats-new';
import './styles.css';
import { useTranslation } from 'react-i18next';
import { UserContextConfig, useUser } from '../../contexts/UserContext';

export const DROP_BOX_IMAGE = '../../../static/icons/updated_drop_images.svg';
export const PROFILE_PLACEHOLDER =
  '../../../static/assets/profile-placeholder.svg';
export const COMPANY_LOGO_PLACEHOLDER =
  '../../../static/icons/updated-company-logo-placeholder.svg';

export const UploadPhoto: React.FC<{
  image_type: string;
  maxFileSize: number;
  setCompanyLogo: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfilePhoto: React.Dispatch<React.SetStateAction<string>>;
  show_modal: boolean;
}> = (props) => {
  const { t } = useTranslation();

  const inputRef = React.useRef<HTMLInputElement>();

  const { user, setUser } = useUser();

  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [image_error_msg, setImageErrMsg] = React.useState('');
  const [fileDataURL, setFileDataURL] = React.useState(DROP_BOX_IMAGE);
  const [heic_blob_url, setHeicBlobUrl] = React.useState('');
  const [upload_btn_disabled, setUploadButtonDisabled] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);

  const handleSetFile = (file: any) => {
    const allowed_file_types = AllowedFileTypes.split(',');
    const allowed = allowed_file_types.find(
      (allowed_file_type) =>
        (file.name.toLowerCase().includes(allowed_file_type) ||
          file.type.includes('image/')) &&
        !file.name.toLowerCase().includes('.psd')
    );
    if ((file && file.size > props.maxFileSize) || !allowed) {
      setImageErrMsg(
        'Please upload an image in jpeg, png, gif, svg, bmp, tiff, heic or webp format and no larger than 2 MB.'
      );
      setUploadButtonDisabled(true);
    } else {
      setImageErrMsg('');
      setUploadButtonDisabled(false);
      setFile(file);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleSetFile(file);
    }
  };

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleSetFile(file);
    }
  };

  const handleUpload = (image_type: string) => {
    setUploading(!uploading);
    const { name, type } = file as File;
    const url =
      image_type === ImageType.WHATS_NEW_IMAGES
        ? 'whatsnew/upload/image'
        : 'users/upload/photo';
    postApi({
      url,
      payload: {
        content: fileDataURL,
        image_type,
        filename: name.replace('.heic', '.png'),
        type: type || fileDataURL.split(';base64,')[0].split(':')[1],
      },
    })
      .then((res) => {
        if (res.results.data) {
          setUser({
            ...user,
            user: res.results.data as User,
          } as UserContextConfig);
          if (image_type !== ImageType.WHATS_NEW_IMAGES) {
            const { company_logo, profile_photo } = res.results.data as User;
            if (profile_photo?.toLowerCase().includes('.heic')) {
              fetch(profile_photo)
                .then((response) => response.blob())
                .then((blob) => {
                  heic2any({ blob, toType: 'image/png' }).then((newImage) => {
                    const url = URL.createObjectURL(newImage as Blob);
                    props.setProfilePhoto(url);
                  });
                });
            } else {
              props.setProfilePhoto(profile_photo || PROFILE_PLACEHOLDER);
            }
            if (company_logo?.toLowerCase().includes('.heic')) {
              fetch(company_logo)
                .then((response) => response.blob())
                .then((blob) => {
                  heic2any({ blob, toType: 'image/png' }).then((newImage) => {
                    const url = URL.createObjectURL(newImage as Blob);
                    props.setCompanyLogo(url);
                  });
                });
            } else {
              props.setCompanyLogo(company_logo || COMPANY_LOGO_PLACEHOLDER);
            }
          }
          if (image_type === ImageType.WHATS_NEW_IMAGES) {
            const { image } = res.results.data as WhatsNew;
            if (image?.toLowerCase().includes('.heic')) {
              fetch(image)
                .then((response) => response.blob())
                .then((blob) => {
                  heic2any({ blob, toType: 'image/png' }).then((newImage) => {
                    const url = URL.createObjectURL(newImage as Blob);
                    props.setProfilePhoto(url);
                  });
                });
            } else {
              props.setProfilePhoto(image || '');
            }
          }
        }
      })
      .finally(() => {
        props.setModal(false);
        setTimeout(() => {
          setUploadButtonDisabled(true);
          setUploading(false);
          setFile(undefined);
          setFileDataURL(DROP_BOX_IMAGE);
          setHeicBlobUrl('');
          setImageErrMsg('');
        }, 500);
      });
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  React.useEffect(() => {
    let fileReader: FileReader | null = null;
    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result && !isCancel) {
          if (
            file.type &&
            (file.type.toLowerCase() === 'image/tiff' ||
              file.name.toLowerCase().includes('.tiff'))
          ) {
            const tiff = new Tiff({ buffer: result as ArrayBuffer });
            const canvas = tiff.toDataURL();
            setFileDataURL(canvas);
          } else if (
            file.type.toLowerCase() === 'image/heic' ||
            file.name.toLowerCase().includes('.heic')
          ) {
            setUploading(true);
            heic2any({ blob: file, toType: 'image/png' }).then((newImage) => {
              const reader = new FileReader();
              reader.readAsDataURL(newImage as Blob);
              reader.onloadend = function () {
                const base64data = reader.result;
                setHeicBlobUrl(base64data as string);
                setFileDataURL(base64data as string);
              };
              setUploading(false);
            });
          } else {
            setFileDataURL(result as string);
          }
        }
      };

      if (
        file.type &&
        (file.type.toLowerCase() === 'image/tiff' ||
          file.name.toLowerCase().includes('.tiff') ||
          file.type.toLowerCase() === 'image/heic' ||
          file.name.toLowerCase().includes('.heic'))
      ) {
        fileReader.readAsArrayBuffer(file);
      } else {
        fileReader.readAsDataURL(file);
      }
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Modal isOpen={props.show_modal}>
      <ModalHeader>
        <span style={{ float: 'right', fontSize: 'x-large' }}>
          <label
            onClick={() => {
              props.setModal(false);
              setTimeout(() => {
                setUploadButtonDisabled(true);
                setUploading(false);
                setFile(undefined);
                setFileDataURL(DROP_BOX_IMAGE);
                setHeicBlobUrl('');
                setImageErrMsg('');
              }, 500);
            }}
          >
            <img
              className="is-clickable"
              src="../../../static/icons/cross.svg"
              role="button"
            />
          </label>
        </span>
        <span className="upload-photo-heading">{`Upload ${props.image_type === ImageType.PROFILE_PHOTOS ? 'Profile Photo' : 'Company Logo'}`}</span>
      </ModalHeader>
      <ModalBody>
        {image_error_msg.length > 0 ? (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'red',
              paddingBottom: '5px',
              textAlign: 'center',
            }}
          >
            {image_error_msg}
          </span>
        ) : (
          ''
        )}
        <FadeLoader
          loading={uploading}
          cssOverride={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            opacity: '80%',
            width: '30px',
            height: '30px',
          }}
          color={'gray'}
          height={15}
          width={5}
        />
        <input
          id="input-file-upload"
          ref={inputRef as React.LegacyRef<HTMLInputElement>}
          type="file"
          // accept={AllowedFileTypes}
          onChange={handleChange}
        />
        <div
          className="upload__image-wrapper"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          onClick={onButtonClick}
        >
          <img
            src={
              !fileDataURL.toLowerCase().includes('image/') &&
              fileDataURL !== DROP_BOX_IMAGE
                ? heic_blob_url
                : fileDataURL
            }
            style={{
              opacity: uploading ? '0.5' : '1',
            }}
            className="cursor-pointer"
          />
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </div>
        <div id="button-div" style={{ justifyContent: 'end' }}>
          <button
            type="button"
            onClick={() => {
              handleUpload(props.image_type);
            }}
            className="button upload_button"
            disabled={upload_btn_disabled || uploading}
          >
            {t('upload')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
