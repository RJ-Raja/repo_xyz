import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
};

export default Loader;