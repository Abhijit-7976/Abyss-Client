import { type ApiData, type AuthData } from "@/lib/types";
import { login as loginApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data: ApiData<AuthData>) => {
      const user = data?.data?.user;
      queryClient.setQueryData(["user"], user);
    },

    onError: error => {
      console.error(error);
    },
  });

  return { login, isPending };
}
