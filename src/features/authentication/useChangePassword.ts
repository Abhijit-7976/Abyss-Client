import { useToast } from "@/components/ui/use-toast";
import { changePassword as changePasswordApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useChangePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Password changed successfully.",
      });
      queryClient.clear();
      navigate("/login");
    },
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { changePassword, isPending };
};
