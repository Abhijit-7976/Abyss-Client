import { useToast } from "@/components/ui/use-toast";
import { createPrivateChat as createPrivateChatApi } from "@/services/chatApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePrivateChat = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createPrivateChat, isPending } = useMutation({
    mutationFn: createPrivateChatApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["privateChats"] });
      await queryClient.invalidateQueries({ queryKey: ["unknownUsers"] });
    },
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { createPrivateChat, isPending };
};
