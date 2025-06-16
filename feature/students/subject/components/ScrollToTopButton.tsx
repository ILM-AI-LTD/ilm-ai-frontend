import { useEffect, useState } from 'react';
import { ChevronsUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                // className="fixed bottom-6 right-50 z-50 p-3 bg-button-hover-color text-white rounded-full shadow-md hover:scale-105 transition-transform"
                className="fixed bottom-6 right-6 z-50 hover:scale-105 transition-transform"
            >
                <ChevronsUp size={40} />
            </button>
        )
    );
};

export default ScrollToTopButton;