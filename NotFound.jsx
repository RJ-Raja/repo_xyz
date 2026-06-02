import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-2xl mt-4 mb-8">Page Not Found</p>
      <Link to="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;