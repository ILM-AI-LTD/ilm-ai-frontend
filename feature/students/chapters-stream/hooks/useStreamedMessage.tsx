// hooks/useStreamedMessage.ts
import { useState } from 'react';

export function useStreamedMessage() {
    const [isStreaming, setIsStreaming] = useState(false);

    const streamMessage = async (response: string, onUpdate: (text: string) => void) => {
        let streamedResponse = '';
        setIsStreaming(true);

        for (let i = 0; i < response.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1));
            streamedResponse += response[i];
            onUpdate(streamedResponse);
        }

        setIsStreaming(false);
    };

    return { isStreaming, streamMessage };
} 
