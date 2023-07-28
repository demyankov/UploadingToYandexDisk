import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_URL}`;
export const yandexUserAxiosInstance = axios.create({ baseURL });

yandexUserAxiosInstance.interceptors.request.use((requestConfigArgs) => {
  const requestConfig = requestConfigArgs;
  requestConfig.headers = requestConfig.headers || {};

  requestConfig.headers.Authorization = 'OAuth y0_AgAAAABZXaEzAApANQAAAADo0kuNdKkVm7QJRNeTTjbnYIbAscDAr-A';
  requestConfig.headers['Content-Type'] = 'application/xml';

  return requestConfig;
});

export const sendFile = (url: string, file: File | null): Promise<void> => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }
  return axios.put(url, formData);
};

export const apiYandex = (files: File[]): Promise<void[]> =>
  Promise.all(
    files.map(async (file) => {
      const { name } = file;
      const { data } = await yandexUserAxiosInstance.get(`/upload?path=${name}&overwrite=true&fields=name`);
      await sendFile(data.href, file);
    }),
  );
