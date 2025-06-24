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
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Message {
    text: string;
    isUser: boolean;
    id: string; // Add unique ID for better React key prop
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

    const handleSend = async () => {
        if (input.trim() && !isStreaming) {
            const userMessageId = `user-${Date.now()}`;
            const botMessageId = `bot-${Date.now()}`;
            
            // Add user message and empty bot message
            setMessages((prev) => [
                ...prev,
                { text: input, isUser: true, id: userMessageId },
                { text: '', isUser: false, id: botMessageId }
            ]);

            const response = dedent(`
            ## 🧠 **Understanding Maximum Height in Projectile Motion**
            
            When a projectile is launched at an angle, its motion can be decomposed into two components:
            
            - **Horizontal motion** — constant velocity.
            - **Vertical motion** — uniformly accelerated motion due to gravity.
            
            In this explanation, we **only focus on the vertical motion** to find the *maximum height*.
            
            ---
            
            ## 📌 *Key Assumptions*
            
            - Initial speed: **20 m/s**
            - Launch angle: **30°**
            - Gravity: $g = 9.8 \\, \\text{m/s}^2$
            
            ---
            
            ## 🔗 Learn More
            
            For more context, read about [Equations of Motion](https://en.wikipedia.org/wiki/Equations_of_motion).
            
            ---
            
            ## 🎯 Step 1: Resolve Initial Velocity
            
            Only the **vertical component** affects the height.  
            Using the equation:
            
            $$
            v_{0y} = v_0 \\sin\\theta = 20 \\cdot \\sin(30^\\circ) = 20 \\cdot 0.5 = 10 \\, \\text{m/s}
            $$
            
            ---
            
            ## 🧾 Step 2: Apply the Kinematic Equation
            
            Kinematic formula:
            
            $$
            v^2 = u^2 + 2as
            $$
            
            At **maximum height**:
            - Final velocity: $v = 0$
            - Initial vertical velocity: $u = v_{0y}$
            - Acceleration: $a = -g$
            - Displacement: $s = h_{\\text{max}}$
            
            So:
            
            $$
            0 = v_{0y}^2 - 2gh_{\\text{max}} \\Rightarrow h_{\\text{max}} = \\frac{v_{0y}^2}{2g}
            $$
            
            ---
            
            ## 🔢 Step 3: Plug In the Values
            
            $$
            h_{\\text{max}} = \\frac{10^2}{2 \\cdot 9.8} = \\frac{100}{19.6} \\approx 5.10 \\, \\text{m}
            $$
            
            ---
            
            ## ✅ Final Answer
            
            $$
            \\boxed{h_{\\text{max}} \\approx 5.10 \\, \\text{m}}
            $$
            
            ---
            
            ## 🧪 Extra Equations to Test Rendering
            
            - Inline: The kinetic energy is given by $KE = \\frac{1}{2}mv^2$
            - Quadratic formula:
            
            $$
            x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
            $$
            
            - Trig identity:
            
            $$
            \\sin^2\\theta + \\cos^2\\theta = 1
            $$
            
            - Derivative limit definition:
            
            $$
            f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}
            $$
            
            - Matrix multiplication:
            
            $$
            \\begin{bmatrix}
            1 & 2 \\\\
            3 & 4
            \\end{bmatrix}
            \\cdot
            \\begin{bmatrix}
            5 \\\\
            6
            \\end{bmatrix}
            =
            \\begin{bmatrix}
            17 \\\\
            39
            \\end{bmatrix}
            $$
            
            ---
            
            ## 🧪 Chemistry Equations
            
            - Combustion:
            
            $$
            CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O
            $$
            
            - Equilibrium:
            
            $$
            N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)
            $$
            
            - Acid-base neutralization:
            
            $$
            HCl + NaOH \\rightarrow NaCl + H_2O
            $$
            
            ---
            
            ## ∫🧮 Integration & Differentiation Equations
            
            - Basic integral:
            
            $$
            \\int x^2 dx = \\frac{x^3}{3} + C
            $$
            
            - Definite integral:
            
            $$
            \\int_0^\\pi \\sin x\\,dx = 2
            $$
            
            - Chain rule:
            
            $$
            \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}
            $$
            
            - Product rule:
            
            $$
            \\frac{d}{dx}(uv) = u \\cdot \\frac{dv}{dx} + v \\cdot \\frac{du}{dx}
            $$
            
            - Second derivative:
            
            $$
            f''(x) = \\frac{d^2f}{dx^2}
            $$
            
            ---
            
            ## 📋 Sample Markdown Table
            
            | Concept             | Formula / Value                          | Notes                            |
            |---------------------|-------------------------------------------|----------------------------------|
            | Initial Velocity    | $v_0 = 20$ m/s                            | Given                           |
            | Angle               | $\\theta = 30^\\circ$                     | Given                           |
            | Vertical Component  | $v_{0y} = 10$ m/s                         | $v_0 \\sin\\theta$              |
            | Gravity             | $g = 9.8$ m/s²                            | Standard value                  |
            | Max Height          | $h_{\\text{max}} = 5.10$ m                | Computed from kinematics        |
            
            ---
            
            ## 💻 Code Blocks
            
            ### JavaScript Example
            
            \`\`\`js
            const g = 9.8;
            const v0y = 10;
            const hMax = (v0y ** 2) / (2 * g);
            console.log("Maximum height:", hMax.toFixed(2), "m");
            \`\`\`
            
            ### Python Example
            
            \`\`\`python
            g = 9.8
            v0y = 10
            h_max = (v0y ** 2) / (2 * g)
            print(f"Maximum height: {h_max:.2f} m")
            \`\`\`
            `);
            

            let streamedText = '';

            await streamMessage(
                response,
                (char) => {
                    streamedText += char;
                    // Use functional update to avoid stale closures
                    setMessages((prev) => {
                        const newMessages = [...prev];
                        const lastMessageIndex = newMessages.length - 1;
                        newMessages[lastMessageIndex] = {
                            ...newMessages[lastMessageIndex],
                            text: streamedText
                        };
                        return newMessages;
                    });
                },
                () => setInput('')
            );
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
                <div className="fixed z-40 max-w-96 h-[600px]" style={getChatPositionStyle()}>
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

                        <CardContent className="flex-1 p-0 overflow-y-hidden">
                            <ScrollArea className="h-full" ref={scrollAreaRef}>
                                <div className="p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-muted-foreground py-8">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-sm">Start a conversation!</p>
                                        </div>
                                    )}
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                            {message.isUser ? (
                                                <Badge variant="default" className="bg-brand-color rounded-none rounded-l-lg rounded-br-lg max-w-xs lg:max-w-md px-4 py-2 text-sm whitespace-pre-wrap h-auto text-white">
                                                    {message.text}
                                                </Badge>
                                            ) : (
                                                <div className="bg-secondary-bg-color rounded-r-lg rounded-bl-lg max-w-xs lg:max-w-md overflow-x-auto px-4 py-2 h-auto">
                                                    <MarkdownRenderer 
                                                        content={message.text} 
                                                        isStreaming={isStreaming && message === messages[messages.length - 1]}
                                                    />
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