import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logoutAdmin } from "../../lib/auth";
import { Button } from "../../components/ui/button";
import { brand } from "../../config/brand";

export function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-secondary/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/admin/sites" className="hover:text-secondary">
              Sites
            </Link>
            <Link to="/admin/portal-users" className="hover:text-secondary">
              Portal Users (Approvals)
            </Link>
            <Link to="/admin/showcase" className="hover:text-secondary">
              Landing showcase
            </Link>
            <Link to="/admin/sites/new" className="hover:text-secondary">
              New Site
            </Link>
          </nav>
          <div className="flex items-center gap-3">
          <span className="text-xs text-text/70 hidden sm:inline">{brand.productName}</span>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await logoutAdmin();
                toast.success("Logged out.");
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to log out.");
              }
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
