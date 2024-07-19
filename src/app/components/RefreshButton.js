"use client";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();

  const handleRefresh = () => {
    return router.refresh();
  };

  return (
    <>
      <div className="">
        <button
          onClick={handleRefresh}
          className="bg-blue-400 p-2 px-5 rounded-lg"
        >
          Refresh
        </button>
      </div>
    </>
  );
}
