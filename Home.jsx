import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a professional, production-ready React frontend.
      </p>
      <Link to="/dashboard">
        <Button size="lg">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default Home;