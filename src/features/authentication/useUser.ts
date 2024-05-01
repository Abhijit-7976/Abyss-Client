import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/services/authApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (error) {
    console.log(error.message);

    setTimeout(() => {
      toast({
        variant: "destructive",
        title: error.message,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    });
  }

  return { user, isLoading };
}
