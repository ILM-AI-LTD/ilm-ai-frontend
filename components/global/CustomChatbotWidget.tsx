"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MarkdownRenderer from '@/feature/students/chapters-stream/components/MarkdownRenderer';
import { TypingIndicator } from '@/feature/students/chapters-stream/components/TypingIndicator';
import { useChatbotMessage } from '@/feature/students/chapters-stream/hooks/useChatBot';
import { useStreamedMessage } from '@/feature/students/chapters-stream/hooks/useStreamedMessage';
import { Bot, Send, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Message {
    text: string;
    isUser: boolean;
    id: string;
}

interface ChatbotWidgetProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'small' | 'medium' | 'large';
    placeholder?: string;
    offset?: { x: number; y: number };
    data: {
        board: string;
        subject: string;
        paper: number;
        topic: string;
        subtopic: string;
    }
}

function ChatbotWidget({
    position = 'bottom-right',
    size = 'medium',
    placeholder = 'Type your message...',
    offset = { x: 20, y: 20 },
    data
}: ChatbotWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([{
        text: 'Hello! I am ILMI Bot. How can I assist you today?',
        isUser: false,
        id: 'initial'
    }]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { isStreaming, streamMessage } = useStreamedMessage();

    // Optimized scroll function with debouncing
    const scrollToBottom = useCallback(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    }, []);

    // Only scroll when messages change (not during streaming)
    useEffect(() => {
        if (!isStreaming) {
            scrollToBottom();
        }
    }, [messages, isStreaming, scrollToBottom]);

    // Handle streaming scroll with proper cleanup
    useEffect(() => {
        if (isStreaming) {
            // Clear any existing interval
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }

            // Set up new interval for streaming
            scrollIntervalRef.current = setInterval(scrollToBottom, 50); // Reduced frequency

            return () => {
                if (scrollIntervalRef.current) {
                    clearInterval(scrollIntervalRef.current);
                    scrollIntervalRef.current = null;
                }
            };
        } else {
            // Clean up interval when not streaming
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
                scrollIntervalRef.current = null;
            }
        }
    }, [isStreaming, scrollToBottom]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, []);


    const { mutateAsync: askQuestion, error, isPending } = useChatbotMessage();

    const handleSend = async () => {
        setInput('');
        if (input.trim() && !isStreaming) {
          const userMessageId = `user-${Date.now()}`;
      
          setMessages((prev) => [
            ...prev,
            { text: input, isUser: true, id: userMessageId }
          ]);
      
          const payload = {
            ...data,
            question: input
          };
      
          try {
            const res = await askQuestion(payload);
            const fullText = res.data.answer;
            let streamedText = '';
      
            setMessages((prev) => [
              ...prev,
              { text: '', isUser: false, id: `bot-${Date.now()}` }
            ]);
      
            await streamMessage(
              fullText,
              (char) => {
                streamedText += char;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    text: streamedText,
                  };
                  return updated;
                });
              },
              () => setInput('')
            );
          } catch (err) {
            setMessages((prev) => [
              ...prev,
              {
                text: 'Sorry, something went wrong. Please try again.',
                isUser: false,
                id: `error-${Date.now()}`
              }
            ]);
          }
        }
      };
      


    const toggleChat = () => setIsOpen(!isOpen);

    const getSizeClasses = () => {
        switch (size) {
            case 'small': return 'w-12 h-12';
            case 'large': return 'w-20 h-20';
            default: return 'w-16 h-16';
        }
    };

    const getIconSize = () => {
        switch (size) {
            case 'small': return 'size-6';
            case 'large': return 'size-10';
            default: return 'size-8';
        }
    };

    const getPositionStyle = () => {
        switch (position) {
            case 'top-left': return { top: `${offset.y}px`, left: `${offset.x}px` };
            case 'top-right': return { top: `${offset.y}px`, right: `${offset.x}px` };
            case 'bottom-left': return { bottom: `${offset.y}px`, left: `${offset.x}px` };
            case 'bottom-right':
            default: return { bottom: `${offset.y}px`, right: `${offset.x}px` };
        }
    };

    const getChatPositionStyle = () => {
        const buttonSize = size === 'small' ? 48 : size === 'large' ? 80 : 64;
        const spacing = 10;

        switch (position) {
            case 'top-left': return { top: `${offset.y + buttonSize + spacing}px`, left: `${offset.x}px` };
            case 'top-right': return { top: `${offset.y + buttonSize + spacing}px`, right: `${offset.x}px` };
            case 'bottom-left': return { bottom: `${offset.y + buttonSize + spacing}px`, left: `${offset.x}px` };
            case 'bottom-right':
            default: return { bottom: `${offset.y + buttonSize + spacing}px`, right: `${offset.x}px` };
        }
    };

    const { theme } = useTheme();
    const iconColor = theme === 'dark' ? 'white' : 'black';

    return (
        <div>
            <div className="fixed z-50" style={getPositionStyle()}>
                <Button onClick={toggleChat} size="icon" variant="ghost" className={`${getSizeClasses()} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border px-0 py-0`}>
                    {isOpen ? <X className={`${getIconSize()}`} style={{ color: iconColor }} /> : <Bot className={`${getIconSize()}`} style={{ color: iconColor }} />}
                </Button>
            </div>

            {isOpen && (
                <Card className="fixed z-100 w-[350px] h-[550px] md:w-[450px] md:h-[650px] flex flex-col bg-background p-0 drop-shadow-xl" style={getChatPositionStyle()}>
                    <CardHeader className="flex flex-row items-center justify-between text-foreground border-b pt-4">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-sm">ILMI Bot</h3>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="h-6 w-6 rounded-full p-1 cursor-pointer bg-secondary">
                            <X className="size-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 px-3 overflow-y-hidden">
                        <ScrollArea className="h-full" ref={scrollAreaRef}>
                            <div className="p-2 mr-1">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                        {message.isUser ? (
                                            <Badge variant="default" className="bg-primary rounded-none rounded-l-lg rounded-br-lg max-w-xs lg:max-w-md px-4 py-2 text-sm whitespace-pre-wrap h-auto text-white mb-4">
                                                {message.text}
                                            </Badge>
                                        ) : (
                                            <div className="bg-secondary rounded-r-lg rounded-bl-lg max-w-xs lg:max-w-md overflow-x-auto p-4 h-auto text-foreground mb-4">
                                                <MarkdownRenderer
                                                    content={message.text}
                                                    isStreaming={isStreaming && message === messages[messages.length - 1]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isPending && (
                                    <div className="flex justify-start">
                                        <TypingIndicator />
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <div className="border-t p-4 rounded-b-xl">
                        <div className="flex space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={placeholder}
                                disabled={isStreaming || isPending}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                className="border text-foreground flex-1"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={isStreaming || isPending || !input.trim()}
                                size="icon"
                                className="border-0 h-10"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default ChatbotWidget;