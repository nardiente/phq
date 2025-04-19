import React, { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { FiletypeCsvIcon } from '../components/icons/filetype-csv.icon';
import { Toast } from '../components/Toast';
import { TypeOptions } from 'react-toastify';
import { postApi } from '../utils/api/api';

export default function ImportIdeasPage() {
  const fileReader = new FileReader();
  const inputRef = useRef<HTMLInputElement>();

  const [csvContent, setCsvContent] = useState<string>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileDataURL, setFileDataURL] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{
    message?: string;
    show: boolean;
    type?: TypeOptions;
  }>();

  useEffect(() => {
    if (csvContent && file) {
      parseCsvContent(file);
    }
  }, [csvContent]);

  useEffect(() => {
    let isCancel = false;

    if (file) {
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result && !isCancel) {
          setFileDataURL(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    if (file && fileDataURL && fileDataURL.length > 0) {
      fileReader.onload = (event) => {
        setCsvContent(event.target?.result as string);
      };
      fileReader.readAsText(file);
    }
  }, [fileDataURL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      handleSetFile(file);
    }
  };

  const handleSetFile = (file: File) => {
    setFile(undefined);
    const errorMessage = validateFile(file);
    if (errorMessage.length > 0) {
      setToast({
        message: errorMessage,
        show: true,
        type: 'error',
      });
      return;
    }
    setFile(file);
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const parseCsvContent = (file: File) => {
    const rows = csvContent?.split('\n').map((row) => row.split(','));
    console.log('Parsed CSV:', rows);
    // TODO: Process the CSV data as needed
    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    postApi({
      url: 'feedback/upload-csv',
      payload: { file: fileDataURL, file_name: file.name },
    }).then((res) => {
      console.log({ res });
    });
  };

  const validateFile = (file: File): string => {
    if (file.type !== 'text/csv') {
      return 'Please upload your file in the .CSV format.';
    }
    if (file.size > 2097152) {
      return 'Please upload a file no larger than 2 MB.';
    }
    return '';
  };

  return (
    <div className="flex-1 px-8 py-6 flex justify-center">
      <div className="max-w-[800px]">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">
          Import Ideas
        </h1>
        <p className="text-[14px] text-gray-600 mb-8">
          Kick-start your board by importing your ideas
        </p>

        <input
          className="hidden"
          onChange={handleChange}
          ref={inputRef as React.LegacyRef<HTMLInputElement>}
          type="file"
        />
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-8 flex flex-col items-center justify-center transition-colors ${
            isDragging ? 'border-[#FF5C35] bg-orange-50' : 'border-gray-200'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload size={24} className="text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">
            Drag & drop or{' '}
            <button
              className="text-[#FF5C35] hover:underline"
              onClick={onButtonClick}
            >
              Choose a file
            </button>{' '}
            to import
          </p>
        </div>

        {!!file && (
          <div className="rounded-lg bg-gray-50 flex items-center w-full p-5 gap-2.5 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-[56px] h-[56px] flex items-center justify-center">
                <FiletypeCsvIcon />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#110733] font-normal text-base leading-6">
                  {file.name}
                </p>
                <p className="text-[#888399] font-medium text-sm leading-5">
                  {file.size}KB
                </p>
              </div>
            </div>
            <button onClick={() => setFile(undefined)}>
              <X />
            </button>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-gray-900">
            Or send us the export CSV and we'll do it for you. (Easiest)
          </h2>
          <p className="text-[14px] text-gray-600">
            You can export your data as a CSV file and send it to{' '}
            <a
              href="mailto:support@producthq.io"
              className="text-[#FF5C35] hover:underline"
            >
              support@producthq.io
            </a>{' '}
            and we'll do the rest. Just make sure you have signed up for a free
            account first.
          </p>
        </div>
      </div>
      {toast?.show && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ show: false })}
          type={toast.type}
        />
      )}
    </div>
  );
}
