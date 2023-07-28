import { Dispatch, SetStateAction } from 'react';

export const setFile = (
  maxCount: number,
  fileList: FileList,
  onChange: Dispatch<SetStateAction<File[]>>,
  setSelectFileError: Dispatch<SetStateAction<string>>,
) => {
  if (fileList.length > 0 && fileList.length <= maxCount) {
    onChange(() => Array.from(fileList));
    setSelectFileError('');
  } else {
    setSelectFileError(`Загружине не более ${maxCount} файлов`);
  }
};
