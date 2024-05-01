import { signup as signupApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: signupApi,
  });

  return { signup, isPending };
}
