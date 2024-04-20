import { type ApiData, type AuthData } from "@/lib/types";
import { signup as signupApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data: ApiData<AuthData>) => {
      console.log(data);
      const user = data?.data?.user;
      queryClient.setQueryData(["user"], user);
    },

    onError: error => {
      console.error(error);
    },
  });

  return { signup, isPending };
}
