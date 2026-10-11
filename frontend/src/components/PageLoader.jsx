import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
    </div>
  );
};

export default PageLoader;