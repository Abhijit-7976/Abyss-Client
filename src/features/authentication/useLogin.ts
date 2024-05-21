import { useToast } from "@/components/ui/use-toast";
import { login as loginApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { toast } = useToast();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: loginApi,
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { login, isPending };
}
