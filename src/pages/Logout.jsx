import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await logout();
      } finally {
        navigate("/login", { replace: true });
      }
    })();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Logging out...
    </div>
  );
}
