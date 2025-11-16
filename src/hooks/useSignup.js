import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../constants/constants";

const useSignup = () => {
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const { firstName, lastName, emailId, password } = data;
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailId,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      return true;
    },
  });

  return signupMutation;
};

const useSignupWithGoogle = () => {
  const loginMutation = useMutation({
    mutationKey: ["signup-with-google"],
    mutationFn: async (data) => {
      const { credential } = data;
      const response = await fetch(`${API_BASE}/google/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }

      return true;
    },
  });

  return loginMutation;
};

export { useSignup, useSignupWithGoogle };
