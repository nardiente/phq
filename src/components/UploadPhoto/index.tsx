import * as React from 'react';
import heic2any from 'heic2any';
import { Loader } from 'lucide-react';
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
import {
  COMPANY_LOGO_PLACEHOLDER,
  DROP_BOX_IMAGE,
  FAVICON_PLACEHOLDER,
  PROFILE_PLACEHOLDER,
} from '../../constants/placeholders';
import { Feedback } from '../../types/feedback';

export const UploadPhoto: React.FC<{
  id?: number;
  image_type: ImageType;
  maxFileSize: number;
  setCompanyLogo?: (value: string) => void;
  setFavicon?: (value: string) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoto?: (value: string) => void;
  setProfilePhoto?: (value: string) => void;
  show_modal: boolean;
}> = (props) => {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>();
  const { user, setUser } = useUser();

  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [imageErrorMsg, setImageErrorMsg] = React.useState('');
  const [fileDataURL, setFileDataURL] = React.useState(DROP_BOX_IMAGE);
  const [heicBlobUrl, setHeicBlobUrl] = React.useState('');
  const [uploadState, setUploadState] = React.useState({
    buttonDisabled: true,
    uploading: false,
  });

  const handleSetFile = (file: File) => {
    const isValidFile = validateFile(file);
    if (!isValidFile) {
      setImageErrorMsg('Please upload a valid image file.');
      setUploadState((prev) => ({ ...prev, buttonDisabled: true }));
    } else {
      setImageErrorMsg('');
      setUploadState((prev) => ({ ...prev, buttonDisabled: false }));
      setFile(file);
    }
  };

  const validateFile = (file: File) => {
    const allowedFileTypes = AllowedFileTypes.split(',');
    const isAllowedType = allowedFileTypes.some(
      (type) =>
        file.name.toLowerCase().includes(type) || file.type.includes('image/')
    );
    return (
      file.size <= props.maxFileSize &&
      isAllowedType &&
      !file.name.toLowerCase().includes('.psd')
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleSetFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (imageType: ImageType) => {
    setUploadState((prev) => ({ ...prev, uploading: true }));
    const { name, type } = file as File;

    let url = '';
    switch (imageType) {
      case ImageType.WHATS_NEW_IMAGES:
        url = 'whatsnew/upload/image';
        break;
      case ImageType.IDEA_COVER:
        url = `feedback/${props.id}/upload-cover`;
        break;
      default:
        url = 'users/upload/photo';
        break;
    }

    try {
      const res = await postApi({
        url,
        payload: {
          content: fileDataURL,
          image_type: imageType,
          filename: name.replace('.heic', '.png'),
          type: type || fileDataURL.split(';base64,')[0].split(':')[1],
        },
      });
      handleResponse(res, imageType);
    } finally {
      resetUploadState();
    }
  };

  const handleResponse = (res: any, imageType: ImageType) => {
    if (res.results.data) {
      if (
        [ImageType.COMPANY_LOGO, ImageType.PROFILE_PHOTOS].includes(imageType)
      ) {
        setUser({
          ...user,
          user: res.results.data as User,
        } as UserContextConfig);
      }
      updatePhotos(res.results.data, imageType);
    }
  };

  const updatePhotos = (data: any, imageType: ImageType) => {
    const { company_logo, favicon, profile_photo } = data;
    if (props.setCompanyLogo) {
      updatePhoto(company_logo, props.setCompanyLogo, COMPANY_LOGO_PLACEHOLDER);
    }
    if (props.setFavicon) {
      updatePhoto(favicon, props.setFavicon, FAVICON_PLACEHOLDER);
    }
    if (props.setProfilePhoto) {
      updatePhoto(profile_photo, props.setProfilePhoto, PROFILE_PLACEHOLDER);
    }
    if (props.setPhoto) {
      if (imageType === ImageType.WHATS_NEW_IMAGES) {
        const { image } = data as WhatsNew;
        updatePhoto(image, props.setPhoto, '');
      }
      if (imageType === ImageType.IDEA_COVER) {
        const { cover_photo } = data as Feedback;
        updatePhoto(cover_photo, props.setPhoto, '');
      }
    }
  };

  const updatePhoto = (
    photoUrl: string | undefined,
    setPhoto: (url: string) => void,
    placeholder: string
  ) => {
    if (photoUrl?.toLowerCase().includes('.heic')) {
      fetch(photoUrl)
        .then((response) => response.blob())
        .then((blob) => heic2any({ blob, toType: 'image/png' }))
        .then((newImage) => {
          const url = URL.createObjectURL(newImage as Blob);
          setPhoto(url);
        });
    } else {
      setPhoto(photoUrl || placeholder);
    }
  };

  const resetUploadState = () => {
    props.setModal(false);
    setTimeout(() => {
      setUploadState({ buttonDisabled: true, uploading: false });
      setFile(undefined);
      setFileDataURL(DROP_BOX_IMAGE);
      setHeicBlobUrl('');
      setImageErrorMsg('');
    }, 500);
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
          processFile(result);
        }
      };

      const isImageType = (file: File) => {
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();
        return (
          fileType === 'image/tiff' ||
          fileName.includes('.tiff') ||
          fileType === 'image/heic' ||
          fileName.includes('.heic')
        );
      };

      if (file.type && isImageType(file)) {
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

  const processFile = (result: string | ArrayBuffer) => {
    if (
      file?.type &&
      (file.type.toLowerCase() === 'image/tiff' ||
        file.name.toLowerCase().includes('.tiff'))
    ) {
      const tiff = new Tiff({ buffer: result as ArrayBuffer });
      setFileDataURL(tiff.toDataURL());
    } else if (
      file?.type.toLowerCase() === 'image/heic' ||
      file?.name.toLowerCase().includes('.heic')
    ) {
      convertHeicToPng(file);
    } else {
      setFileDataURL(result as string);
    }
  };

  const convertHeicToPng = (file: File) => {
    setUploadState((prev) => ({ ...prev, uploading: true }));
    heic2any({ blob: file, toType: 'image/png' }).then((newImage) => {
      const reader = new FileReader();
      reader.readAsDataURL(newImage as Blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setHeicBlobUrl(base64data as string);
        setFileDataURL(base64data as string);
      };
      setUploadState((prev) => ({ ...prev, uploading: false }));
    });
  };

  let uploadHeader = 'Upload';
  switch (props.image_type) {
    case ImageType.PROFILE_PHOTOS:
      uploadHeader = uploadHeader + ' Profile Photo';
      break;
    case ImageType.FAVICON:
      uploadHeader = uploadHeader + ' favicon';
      break;
    case ImageType.IDEA_COVER:
      uploadHeader = uploadHeader + ' Cover';
      break;
    default:
      uploadHeader = uploadHeader + ' Company Logo';
      break;
  }

  return (
    <Modal isOpen={props.show_modal}>
      {uploadState.uploading && (
        <div className="absolute flex items-center justify-center h-32 mt-8 pt-8">
          <Loader />
        </div>
      )}
      <ModalHeader>
        <span style={{ float: 'right', fontSize: 'x-large' }}>
          <label onClick={() => resetUploadState()}>
            <img
              className="is-clickable"
              src="../../../static/icons/cross.svg"
              role="button"
            />
          </label>
        </span>
        <span className="upload-photo-heading">{uploadHeader}</span>
      </ModalHeader>
      <ModalBody>
        {imageErrorMsg && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'red',
              paddingBottom: '5px',
              textAlign: 'center',
            }}
          >
            {imageErrorMsg}
          </span>
        )}
        <input
          id="input-file-upload"
          ref={inputRef as React.LegacyRef<HTMLInputElement>}
          type="file"
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
                ? heicBlobUrl
                : fileDataURL
            }
            style={{ opacity: uploadState.uploading ? '0.5' : '1' }}
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
            onClick={() => handleUpload(props.image_type)}
            className="button upload_button w-max"
            disabled={uploadState.buttonDisabled || uploadState.uploading}
          >
            {uploadState.uploading ? 'Loading...' : t('upload')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
