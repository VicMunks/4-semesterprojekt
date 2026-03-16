import { createBrowserRouter, redirect } from 'react-router';
import { Layout }                  from './components/Layout';
import { ConfigurePage }           from './pages/ConfigurePage';
import { ConfirmOrderPage }        from './pages/ConfirmOrderPage';
import { OrderStatusPage }         from './pages/OrderStatusPage';
import { OperatorRoot, OperatorProtectedLayout } from './components/OperatorRouteWrappers';
import { OperatorLoginPage }       from './pages/operator/OperatorLoginPage';
import { OperatorDashboardPage }   from './pages/operator/OperatorDashboardPage';
import { OperatorQueuePage }       from './pages/operator/OperatorQueuePage';
import { OperatorMachinesPage }    from './pages/operator/OperatorMachinesPage';
import { OperatorLogsPage }        from './pages/operator/OperatorLogsPage';

export const router = createBrowserRouter([
  // ── Customer side ──────────────────────────────────────────────────────────
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, loader: () => redirect('/configure') },
      { path: 'configure',     Component: ConfigurePage },
      { path: 'confirm-order', Component: ConfirmOrderPage },
      { path: 'order-status',  Component: OrderStatusPage },
    ],
  },

  // ── Operator side ──────────────────────────────────────────────────────────
  {
    path: '/operator',
    Component: OperatorRoot,               // provides ProductionProvider
    children: [
      { index: true, Component: OperatorLoginPage },
      {
        Component: OperatorProtectedLayout, // auth guard + OperatorLayout
        children: [
          { path: 'dashboard', Component: OperatorDashboardPage },
          { path: 'queue',     Component: OperatorQueuePage },
          { path: 'machines',  Component: OperatorMachinesPage },
          { path: 'logs',      Component: OperatorLogsPage },
        ],
      },
    ],
  },
]);
