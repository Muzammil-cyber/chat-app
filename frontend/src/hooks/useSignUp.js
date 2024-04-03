import { useState } from "react";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (input) => {
    const error = validateInput(input);
    if (!error) return;

    setLoading(true);
    try {
      // Make API request to sign up user
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};

function validateInput({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignUp;
