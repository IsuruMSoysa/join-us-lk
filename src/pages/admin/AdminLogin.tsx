import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginAdmin } from "../../lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { brand } from "../../config/brand";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form
        className="max-w-md w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setLoading(true);
          try {
            await loginAdmin(email, password);
            toast.success("Signed in.");
            navigate("/admin/sites");
          } catch {
            const msg = "Invalid admin credentials.";
            setError(msg);
            toast.error(msg);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-text/70">{brand.displayName} administration access</p>
          </CardHeader>
          <CardContent className="space-y-4">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="text-sm text-accent">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
