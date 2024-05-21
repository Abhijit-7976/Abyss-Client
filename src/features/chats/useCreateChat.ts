import { useToast } from "@/components/ui/use-toast";
import { createPrivateChat as createPrivateChatApi } from "@/services/chatApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePrivateChat = ({ friendId }: { friendId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  console.log({ friendId });

  const { mutate: createPrivateChat, isPending } = useMutation({
    mutationKey: ["new_chat", friendId],
    mutationFn: createPrivateChatApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privateChats"] });
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
