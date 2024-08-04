import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/services/authApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { toast } = useToast();
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
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: error.message,
      });
      navigate("/login");
    });
  }

  return { user, isLoading };
}
