import { useToast } from "@/components/ui/use-toast";
import { uploadAvatar as uploadAvatarApi } from "@/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: data => {
      toast({
        variant: "success",
        title: "Avatar uploaded successfully.",
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

  return { uploadAvatar, isPending };
};
