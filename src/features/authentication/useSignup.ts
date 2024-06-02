import { useToast } from "@/components/ui/use-toast";
import { signup as signupApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: signupApi,
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

  return { signup, isPending };
}
