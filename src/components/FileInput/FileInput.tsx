import { LegacyRef, forwardRef, Dispatch, SetStateAction } from 'react';

import styles from './styles.module.scss';
import { setFile } from './helpers';

export interface IFileInputProps {
  id: string;
  label?: string;
  onChange: Dispatch<SetStateAction<File[]>>;
  setSelectFileError: Dispatch<SetStateAction<string>>;
}

const MAX_COUNT = 100;

export const FileInput = forwardRef(
  ({ id, label, onChange, setSelectFileError }: IFileInputProps, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (fileList) setFile(MAX_COUNT, fileList, onChange, setSelectFileError);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const fileList = event.dataTransfer.files;

      if (fileList) setFile(MAX_COUNT, fileList, onChange, setSelectFileError);
    };

    return (
      <div className={styles.fileInputWrapper} onDragOver={handleDragOver} onDrop={handleDrop}>
        <label htmlFor={id} className={styles.label}>
          {label && <span>{label}</span>}
          <input id={id} className={styles.fileInputDefault} type="file" onChange={handleFileChange} ref={ref} />
          <div className={styles.fileInputCustom} />
        </label>
      </div>
    );
  },
);
