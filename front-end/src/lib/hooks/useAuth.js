import { loginUser, registerUser, logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const user = await loginUser({ email, password });
      console.log("Login response:", user);
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/shop");
      }

      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    try {
      const user = await registerUser({ name, email, password });
      // After register → redirect to shop
      router.push("/shop");
      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, error, loading };
}
