import { Outlet, Navigate } from 'react-router';
import { ProductionProvider, useProduction } from '../context/ProductionContext';
import { OperatorLayout } from './OperatorLayout';

/**
 * Provides ProductionContext to all /operator/* routes.
 * Must be the outermost wrapper so both Login and protected pages can use useProduction().
 */
export function OperatorRoot() {
  return (
    <ProductionProvider>
      <Outlet />
    </ProductionProvider>
  );
}

/**
 * Auth guard — redirects unauthenticated users to /operator (login).
 * Renders OperatorLayout (with <Outlet />) when authenticated.
 */
export function OperatorProtectedLayout() {
  const { isAuthenticated } = useProduction();
  if (!isAuthenticated) return <Navigate to="/operator" replace />;
  return <OperatorLayout />;
}
