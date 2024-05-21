import { useToast } from "@/components/ui/use-toast";
import { signup as signupApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { toast } = useToast();

  const { mutate: signup, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: signupApi,
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { signup, isPending };
}
