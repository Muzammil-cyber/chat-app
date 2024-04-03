import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const login = async (input) => {
    setLoading(true);
    if (!validInput(input)) {
      toast.error("Missing Fields");
      setLoading(false);
      return;
    }
    try {
      // Make API request to login user
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

const validInput = (input) => {
  return input.username && input.password;
};

export default useLogin;
