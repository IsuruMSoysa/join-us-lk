import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthUser } from "./lib/auth";
import { LandingPage } from "./pages/landing/LandingPage";
import { InviteSiteLoader } from "./pages/invite/InviteSiteLoader";
import { PortalLogin } from "./pages/portal/PortalLogin";
import { PortalDashboard } from "./pages/portal/PortalDashboard";

const AdminLogin = lazy(() =>
  import("./pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })),
);
const AdminLayout = lazy(() =>
  import("./pages/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })),
);
const SitesListPage = lazy(() =>
  import("./pages/admin/SitesListPage").then((m) => ({
    default: m.SitesListPage,
  })),
);
const SiteFormPage = lazy(() =>
  import("./pages/admin/SiteFormPage").then((m) => ({ default: m.SiteFormPage })),
);
const SiteInviteesPage = lazy(() =>
  import("./pages/admin/SiteInviteesPage").then((m) => ({
    default: m.SiteInviteesPage,
  })),
);
const PortalUsersPage = lazy(() =>
  import("./pages/admin/PortalUsersPage").then((m) => ({
    default: m.PortalUsersPage,
  })),
);
const ShowcaseProjectsPage = lazy(() =>
  import("./pages/admin/ShowcaseProjectsPage").then((m) => ({
    default: m.ShowcaseProjectsPage,
  })),
);

function RequireAdminAuth() {
  const { user, isAdmin, loading } = useAuthUser();
  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return <Navigate to="/portal?reason=admin-access-required" replace />;
  }
  return <Outlet />;
}

function RequirePortalSession() {
  const { user, loading } = useAuthUser();
  const clientId = sessionStorage.getItem("portalClientId");
  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!clientId || !user || user.uid !== clientId) {
    sessionStorage.removeItem("portalClientId");
    sessionStorage.removeItem("portalSiteIds");
    return <Navigate to="/portal" replace />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequireAdminAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/sites" replace />} />
            <Route path="sites" element={<SitesListPage />} />
            <Route path="portal-users" element={<PortalUsersPage />} />
            <Route path="showcase" element={<ShowcaseProjectsPage />} />
            <Route path="sites/new" element={<SiteFormPage />} />
            <Route path="sites/:siteId" element={<SiteFormPage />} />
            <Route path="sites/:siteId/invitees" element={<SiteInviteesPage />} />
          </Route>
        </Route>

        <Route path="/portal" element={<PortalLogin />} />
        <Route element={<RequirePortalSession />}>
          <Route path="/portal/dashboard" element={<PortalDashboard />} />
        </Route>

        <Route path="/:siteSlug" element={<InviteSiteLoader />} />
        <Route path="/:siteSlug/:inviteeSlug" element={<InviteSiteLoader />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}
