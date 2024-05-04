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
    error,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat({ chatId }),
  });

  if (error) {
    console.log(error.message);

    setTimeout(() => {
      toast({
        variant: "destructive",
        title: error.message,
      });
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      navigate("/chats");
    });
  }

  return { privateChat, isLoading };
};
