// hooks/useChatbotMessage.ts
import { ChatbotRequest, ChatbotResponse } from '@/types/student';
import { useMutation } from '@tanstack/react-query';
import { ChatbotService } from '../service/ChatBotService';


export function useChatbotMessage() {
    return useMutation<ChatbotResponse, Error, ChatbotRequest>({
        mutationFn: ChatbotService.askQuestion,
    });
}
