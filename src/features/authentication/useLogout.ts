import { useToast } from "@/components/ui/use-toast";
import { logout as logoutApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "logged out successfully.",
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

  return { logout, isPending };
};
