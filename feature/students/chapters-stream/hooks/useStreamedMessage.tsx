// hooks/useStreamedMessage.ts
import { useState, useCallback, useRef } from 'react';

export function useStreamedMessage() {
    const [isStreaming, setIsStreaming] = useState(false);
    const streamingRef = useRef<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const streamMessage = useCallback(async (
        response: string,
        onAppend: (char: string) => void,
        onDone?: () => void
    ) => {
        // Prevent multiple simultaneous streams
        if (streamingRef.current) {
            return;
        }

        setIsStreaming(true);
        streamingRef.current = true;

        try {
            for (let i = 0; i < response.length; i++) {
                // Check if streaming was cancelled
                if (!streamingRef.current) {
                    break;
                }

                await new Promise((resolve) => {
                    timeoutRef.current = setTimeout(resolve, 10); // Slightly increased delay for better performance
                });
                
                onAppend(response[i]);
            }
        } catch (error) {
            console.error('Error during streaming:', error);
        } finally {
            streamingRef.current = false;
            setIsStreaming(false);
            onDone?.();
        }
    }, []);

    const stopStreaming = useCallback(() => {
        streamingRef.current = false;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsStreaming(false);
    }, []);

    return { 
        isStreaming, 
        streamMessage, 
        stopStreaming 
    };
}