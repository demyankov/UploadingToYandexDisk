import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

export const MainLayout = () => (
  <div className={styles.wrapper}>
    <div>
      <Outlet />
    </div>
  </div>
);
