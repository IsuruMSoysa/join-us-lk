import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { templateRegistry } from "./config/templates/templateRegistry";
import { TemplatePage } from "./routing/TemplatePage";

function WeddingRootRoute() {
  const location = useLocation();
  return <TemplatePage template={templateRegistry.wedding} pathname={location.pathname} />;
}

function WeddingInviteeRoute() {
  const location = useLocation();
  const params = useParams<{ inviteeName: string }>();
  return (
    <TemplatePage
      template={templateRegistry.wedding}
      pathname={location.pathname}
      inviteeSlug={params.inviteeName ?? ""}
    />
  );
}

function HomeComingRootRoute() {
  const location = useLocation();
  return (
    <TemplatePage
      template={templateRegistry.homeComing}
      pathname={location.pathname}
    />
  );
}

function HomeComingInviteeRoute() {
  const location = useLocation();
  const params = useParams<{ inviteeName: string }>();
  return (
    <TemplatePage
      template={templateRegistry.homeComing}
      pathname={location.pathname}
      inviteeSlug={params.inviteeName ?? ""}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WeddingRootRoute />} />
      <Route path="/:inviteeName" element={<WeddingInviteeRoute />} />
      <Route path="/home-coming" element={<HomeComingRootRoute />} />
      <Route
        path="/home-coming/:inviteeName"
        element={<HomeComingInviteeRoute />}
      />
    </Routes>
  );
}
