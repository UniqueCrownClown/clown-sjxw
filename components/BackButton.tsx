"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // 优先使用next/navigation的API
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      返回
    </button>
  );
}
