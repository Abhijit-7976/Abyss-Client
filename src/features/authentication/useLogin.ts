import { useToast } from "@/components/ui/use-toast";
import { login as loginApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/chats");
    },
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { login, isPending };
}
