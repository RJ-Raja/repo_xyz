import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.name || "User"}!</p>
      <Button onClick={logout} variant="destructive">Log Out</Button>
    </div>
  );
};

export default Dashboard;