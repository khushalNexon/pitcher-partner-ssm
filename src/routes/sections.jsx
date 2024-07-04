import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isAuthenticated } from 'src/utils/auth';

import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoute from './components/PrivateRoutes';

// Lazy load pages
const ClientsPage = lazy(() => import('src/pages/clients'));
const LoginPage = lazy(() => import('src/pages/login'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
const EmployeesPage = lazy(() => import('src/pages/employees'));
const ShareOptionsPage = lazy(() => import('src/pages/shareoptions'));

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: 'client',
          element: (
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <ClientsPage />,
            },
            {
              path: ':id',
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>
              ),
              children: [
                {
                  index: true,
                  element: <EmployeesPage />,
                },
                {
                  path: 'employee/:empid',
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <ShareOptionsPage />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        {
          index: true,
          element: <Navigate to="/client" replace />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated() ? (
        <Navigate to="/client" replace />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Page404 />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
};

export default Router;
