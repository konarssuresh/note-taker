import { useMutation } from "@tanstack/react-query";

const useSignup = () => {
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const { firstName, lastName, emailId, password } = data;
      const response = await fetch("http://localhost:8000/signup", {
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
      return response.json();
    },
  });

  return signupMutation;
};

export { useSignup };
