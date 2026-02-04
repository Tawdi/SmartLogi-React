import { Routes, Route } from 'react-router-dom';
import { appRoutes } from '../../config/routes.config';
import ProtectedRoute from './ProtectedRoute';

const RouteRenderer: React.FC = () => {
  const renderRoutes = (routes: typeof appRoutes) => {
    return routes.map((route) => {
      const element = route.isProtected ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        route.element
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={element}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(appRoutes)}</Routes>;
};

export default RouteRenderer;
