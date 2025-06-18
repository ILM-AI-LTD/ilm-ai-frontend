// components/ChatbotWidget.tsx
"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MarkdownRenderer from '@/feature/students/chapters-stream/components/MarkdownRenderer';
import { useStreamedMessage } from '@/feature/students/chapters-stream/hooks/useStreamedMessage';
import dedent from 'dedent';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


interface Message {
    text: string;
    isUser: boolean;
}

interface ChatbotWidgetProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'small' | 'medium' | 'large';
    iconColor?: string;
    placeholder?: string;
    offset?: { x: number; y: number };
}

function ChatbotWidget({
    position = 'bottom-right',
    size = 'medium',
    iconColor = '#ffffff',
    placeholder = 'Type your message...',
    offset = { x: 20, y: 20 }
}: ChatbotWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { isStreaming, streamMessage } = useStreamedMessage();

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    }, [messages]);

    useEffect(() => {
        if (isStreaming && scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                const scrollToBottom = () => {
                    scrollElement.scrollTop = scrollElement.scrollHeight;
                };
                scrollToBottom();
                const interval = setInterval(scrollToBottom, 100);
                return () => clearInterval(interval);
            }
        }
    }, [isStreaming, messages]);

    const handleSend = async () => {
        if (input.trim() && !isStreaming) {
            setMessages((prev) => [...prev, { text: input, isUser: true }, { text: '', isUser: false }]);
            const response = dedent(`
          Here's a Markdown response to your input:
        
          # Heading 1
        
          ## Heading 2
        
          ### Heading 3
        
          ---
        
          **Bold Text**
        
          *Italic Text*
                
          **~~Strikethrough Text~~**
                
          - Unordered list item 1
          - Unordered list item 2
        
          1. Ordered list item 1
          2. Ordered list item 2
        
          [A clickable link](https://example.com)
                
          \`Inline code example\`
        
          \`\`\`javascript
          // Code block example
          function greet() {
            console.log('Hello, Markdown!');
          }
          greet();
          \`\`\`
        
          | Syntax    | Description |
          |-----------|-------------|
          | Header    | Title       |
          | Paragraph | Text        |
        
          ---
        
          _Thank you for your message!_
        `);

            await streamMessage(response, (streamedText) => {
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { text: streamedText, isUser: false };
                    return updated;
                });
            });

            setInput('');
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

    return (
        <>
            <div className="fixed z-50" style={getPositionStyle()}>
                <Button onClick={toggleChat} size="icon" variant="ghost" className={`${getSizeClasses()} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-transparent border-1 border-card-border-color px-0 py-0`}>
                    {isOpen ? <X className={`${getIconSize()}`} style={{ color: iconColor }} /> : <Bot className={`${getIconSize()}`} style={{ color: iconColor }} />}
                </Button>
            </div>

            {isOpen && (
                <div className="fixed z-40 w-96 h-[600px]" style={getChatPositionStyle()}>
                    <Card className="h-full flex flex-col shadow-2xl bg-primary-bg-color border-card-border-color p-4">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 text-white">
                            <div className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold text-sm">ILMI Bot</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-4 w-4 rounded-full bg-brand-color hover:bg-brand-color p-1 cursor-pointer">
                                <X className="size-3" />
                            </Button>
                        </CardHeader>

                        <CardContent className="flex-1 p-0 overflow-hidden">
                            <ScrollArea className="h-full" ref={scrollAreaRef}>
                                <div className="p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-muted-foreground py-8">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-sm">Start a conversation!</p>
                                        </div>
                                    )}
                                    {messages.map((message, index) => (
                                        <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                            {message.isUser ? (
                                                <Badge variant="default" className="bg-brand-color rounded-none rounded-l-lg rounded-br-lg max-w-xs lg:max-w-md px-4 py-2 text-sm whitespace-pre-wrap h-auto">
                                                    {message.text}
                                                </Badge>
                                            ) : (
                                                <div className="bg-secondary-bg-color rounded-r-lg rounded-bl-lg max-w-xs lg:max-w-md px-4 py-2 h-auto">
                                                    <MarkdownRenderer content={message.text} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        <div className="border-t border-card-border-color py-4">
                            <div className="flex space-x-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={placeholder}
                                    disabled={isStreaming}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    className="border-1 border-card-border-color text-white flex-1"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isStreaming || !input.trim()}
                                    size="icon"
                                    className="border-0 h-10 bg-brand-color"
                                >
                                    <Send className="w-4 h-4" style={{ color: iconColor }} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}

export default ChatbotWidget;