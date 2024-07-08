import { Suspense, lazy } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const Countries = lazy(() => import("../pages/Countries"));
const Country = lazy(() => import("../pages/Country"));
const NoMatch = lazy(() => import("../pages/NoMatch"));

const CountryWrapper = () => {
  const { name } = useParams();

  if (name && /^\d+$/.test(name)) {
    return <Navigate to="/nomatch" replace />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Country />
    </Suspense>
  );
};

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<Countries />} />
      <Route path="/country/:name" element={<CountryWrapper />} />
      <Route path="nomatch" element={<NoMatch />} />
      <Route path="*" element={<Navigate to="/nomatch" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
