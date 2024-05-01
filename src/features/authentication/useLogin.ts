import { login as loginApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: loginApi,
  });

  return { login, isPending };
}
