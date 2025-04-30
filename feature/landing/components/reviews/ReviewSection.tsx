import { User2Icon } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Cristiano Ronaldo",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 2,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Liam Nelson",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 3,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Mesut Ozil",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 4,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Keylor Navas",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 5,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Katona Beatrix",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 6,
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it's very easy.",
        name: "Charlotte Harper",
        position: "Co-Founder, Heroes Digital",
        avatar: "/api/placeholder/32/32"
    }
];

export default function ReviewSection() {
    const looped = [...testimonials, ...testimonials, ...testimonials]

    return (
        <section className='bg-secondary-bg-color w-full flex flex-col items-center justify-center px-5 md:px-32 py-32 gap-8'>

            <div className='text-white w-full md:w-[90%]'>
                <p className='font-bold text-[min(10vw,40px)] text-center mb-4'>See What Our Students Are Saying</p>
                <p className='font-medium text-lg text-center'>Strong relationships start with strong interactions. Our feature lets you personalize customer experiences, building loyalty and revenue.</p>
            </div>

            <div className="relative w-[90%] overflow-hidden rounded-3xl mask-l-from-70% mask-r-from-70%">
                <div className="flex gap-8 animate-marquee will-change-transform mb-8">
                    {looped.map((t, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 p-6 bg-primary-bg-color rounded-2xl border-1 border-border-color text-white ${(i%2) !== 0 ? 'w-80' : 'w-96'}`}
                        >
                            <p className="text-base mb-4">“{t.quote}”</p>
                            <div className="flex items-center justify-between gap-3 mt-auto">
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs opacity-80">{t.position}</p>
                                </div>

                                <User2Icon className="h-8 w-8 text-white" size={16} />

                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-8 animate-marquee will-change-transform">
                    {looped.map((t, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 p-6 bg-primary-bg-color rounded-2xl border-1 border-border-color text-white ${(i%2) === 0 ? 'w-80' : 'w-96'}`}
                        >
                            <p className="text-base mb-4">“{t.quote}”</p>
                            <div className="flex items-center justify-between gap-3 mt-auto">
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs opacity-80">{t.position}</p>
                                </div>

                                <User2Icon className="h-8 w-8 text-white" size={16} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
