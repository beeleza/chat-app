import { useEffect } from "react";
import { userAuthStore } from "../store/userAuthStore";

const Toast = () => {
  const { error, clearError } = userAuthStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-error flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
        <button
          className="btn btn-sm btn-ghost"
          onClick={clearError}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
