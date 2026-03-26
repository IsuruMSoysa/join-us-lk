import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginWithGoogle, logoutAdmin } from "../../lib/auth";
import {
  getPortalUser,
  upsertPortalUserRequest,
} from "../../lib/firestore/portalUsers";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { brand } from "../../config/brand";

export function PortalLogin() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessMessage =
    searchParams.get("reason") === "admin-access-required"
      ? "This account cannot access admin pages. Use a super admin account to manage approvals."
      : "";

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form
        className="max-w-md w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setMessage("");

          try {
            const cred = await loginWithGoogle();
            const user = cred.user;
            if (!user.email) {
              throw new Error("Google account email is required.");
            }

            await upsertPortalUserRequest({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email,
            });
            const portalUser = await getPortalUser(user.uid);
            if (!portalUser?.approved) {
              await logoutAdmin();
              setMessage("Your account is pending admin approval.");
              return;
            }

            sessionStorage.setItem("portalClientId", user.uid);
            sessionStorage.setItem(
              "portalSiteIds",
              JSON.stringify(portalUser.siteIds || []),
            );
            navigate("/portal/dashboard");
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Google sign-in failed.",
            );
            return;
          }
        }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Client Portal</CardTitle>
            <p className="text-sm text-text/70">Continue with Google to access {brand.displayName}</p>
          </CardHeader>
          <CardContent className="space-y-4">
        {accessMessage && <p className="text-sm text-secondary">{accessMessage}</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {message && <p className="text-sm text-secondary">{message}</p>}
        <Button type="submit" className="w-full">
          Continue with Google
        </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
