import { MainLayout } from 'layouts';

import { HomePage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { ROUTE } from './routes';

const routes = () => [
  ...createRoutesFromElements(
    <Route
      id="home"
      path={ROUTE.HOME}
      element={<MainLayout />}
      handle={{
        crumb: { path: ROUTE.HOME, name: 'Главная' },
      }}
    >
      <Route id="home-layout" index element={<HomePage />} />
    </Route>,
  ),
];

export const router = () => createBrowserRouter(routes());
