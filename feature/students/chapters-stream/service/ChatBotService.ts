import { ChatbotRequest, ChatbotResponse } from '@/types/student';
import { streamingApiRequest } from '@/utils/axios';

export const ChatbotService = {
    askQuestion: (payload: ChatbotRequest): Promise<ChatbotResponse> =>
        streamingApiRequest('/learning/chat', {
            method: 'POST',
            data: payload,
        }),
};


