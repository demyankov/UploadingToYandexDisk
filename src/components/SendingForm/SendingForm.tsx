import { apiYandex } from 'api/apiYandex';
import { ErrorIcon } from 'assets';
import { useState } from 'react';

import { isAxiosError, isAxiosResponseError } from './errorTypes';
import styles from './styles.module.scss';

import { FileInput } from '../FileInput/FileInput';

export const SendingForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectFileError, setSelectFileError] = useState<string>('');
  const [successfulMessage, setSuccessfulMessage] = useState<string>('');

  const coutDownloadedFiles = files.length;

  const handleSendfiles = async () => {
    try {
      await apiYandex(files);
      setSelectFileError('');
      setFiles([]);
      setSuccessfulMessage('Файлы успешно загружены');
    } catch (e) {
      setSuccessfulMessage('');
      if (isAxiosResponseError(e)) {
        const { error, message } = e.data;
        setSelectFileError(`Error: ${error || ''}, message: ${message || ''}`);
      } else if (isAxiosError(e)) {
        const { message } = e;
        setSelectFileError(`Message: ${message || ''}`);
      } else {
        setSelectFileError('Что-то пошло не так. Ошибка загрузки.');
      }
    }
  };

  const isDisabled = files.length === 0 || !!selectFileError;
  const isShowDownloadmessage = !!coutDownloadedFiles && !selectFileError;

  return (
    <>
      <form className={styles.form}>
        <FileInput id="fileInput" onChange={setFiles} setSelectFileError={setSelectFileError} />

        <button onClick={handleSendfiles} type="button" className={styles.button} disabled={isDisabled}>
          Загрузить на Яндекс.Диск
        </button>
      </form>
      {isShowDownloadmessage && <p className={styles.message}> {`Выбран(о) ${coutDownloadedFiles} файл(-ов)`}</p>}
      {selectFileError && (
        <p className={styles.errorMessage}>
          <ErrorIcon /> {selectFileError}
        </p>
      )}
      {successfulMessage && files.length === 0 && <p className={styles.successfulMessage}>{successfulMessage}</p>}
    </>
  );
};
