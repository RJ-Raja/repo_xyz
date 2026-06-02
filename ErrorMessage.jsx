import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;