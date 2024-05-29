import { useToast } from "@/components/ui/use-toast";
import { getChat } from "@/services/chatApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const usePrivateChat = () => {
  const { chatId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: privateChat,
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat({ chatId }),
  });

  if (error) {
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: error.message,
      });
      navigate("/chats");
    });
  }

  return { privateChat, isPending, isLoading };
};
