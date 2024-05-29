import { useToast } from "@/components/ui/use-toast";
import { createGroupChat as createGroupChatApi } from "@/services/chatApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGroupChat = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createGroupChat, isPending } = useMutation({
    mutationFn: createGroupChatApi,
    onSuccess: async () =>
      Promise.all([
        await queryClient.invalidateQueries({ queryKey: ["groupChats"] }),
        await queryClient.invalidateQueries({ queryKey: ["users"] }),
      ]),
    onError: error => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  return { createGroupChat, isPending };
};
