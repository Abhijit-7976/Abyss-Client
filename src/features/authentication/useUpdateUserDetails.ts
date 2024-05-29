import { useToast } from "@/components/ui/use-toast";
import { updateUserDetails as updateUserDetailsApi } from "@/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserDetails = (
  message = "User details updated successfully."
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateUserDetails, isPending } = useMutation({
    mutationFn: updateUserDetailsApi,
    onSuccess: data => {
      toast({
        variant: "success",
        title: message,
      });
      queryClient.setQueryData(["user"], data);
    },
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { updateUserDetails, isPending };
};
